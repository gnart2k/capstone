"use server";
import { isUser } from "@/app/lib/checkPermittedRole";
import prismadb from "@/lib/prisma";
import { feedbackSchema } from "@/schema";
import { z } from "zod";

export async function feedbackOnRequestAction(
  values: z.infer<typeof feedbackSchema>
) {
  const isPermitted = await isUser();
  if (!isPermitted) {
    return { error: "Bạn không có quyền thực hiện chức năng này" };
  }

  const validatedFields = feedbackSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Có lỗi xảy ra, vui lòng thử lại" };
  }

  try {
    let currentFeedback
    // Find the list of staff associated with the request
    const currentRequest = await prismadb.request.findFirst({
      where: {
        id: +values.requestId,
      },
      include: {
        staffs: {
          select: {
            id: true,
            user: {
              select: {
                id: true,
                name: true,
                credibility: true,
              },
            },
          },
        },
      },
    });

    // Check if feedback already exists for this request and user
    const feedbackExisted = await prismadb.feedback.findFirst({
      where: {
        requestId: +values.requestId,
        userId: values.userId,
      },
    });

    if (feedbackExisted) {
      // Update existing feedback
      currentFeedback = await prismadb.feedback.update({
        where: {
          requestId: +values.requestId,
          userId: values.userId,
        },
        data: {
          rate: +values.rate,
          text: values.feedback,
        },
      });
    } else {
      // Create new feedback
      currentFeedback = await prismadb.feedback.create({
        data: {
          requestId: +values.requestId,
          userId: values.userId,
          rate: +values.rate,
          text: values.feedback,
        },
      });
    }

    // Update credibility for each staff associated with the request
    for (const staff of currentRequest.staffs) {
      const staffId = staff.user.id;

      // Fetch all feedbacks for the staff member to calculate the average rate
      const allFeedbacks = await prismadb.feedback.findMany({
        where: {
          request: {
            staffs: {
              some: {
                user: {
                  id: staffId
                }
              }
            }
          }
        },
        select: {
          rate: true,
        },
      });


      if (allFeedbacks.length == 0) {
        const z = await prismadb.user.update({
          where: {
            id: staffId,
          },
          data: {
            credibility: values.rate,
          },
        });
      } else {
        // Calculate the average rating
        const totalRate = allFeedbacks.reduce((sum, feedback) => {
          const rate = feedback.rate !== null && !isNaN(feedback.rate) ? feedback.rate : 0;
          const rs = sum + rate;
          console.log(rs)
          return rs
        }, 0);

        console.log(totalRate)
        console.log(allFeedbacks.length)


        const averageRate = totalRate / (allFeedbacks.length);

        // Update the user's credibility
        await prismadb.user.update({
          where: {
            id: staffId,
          },
          data: {
            credibility: averageRate + "",
          },
        });
      }
    }

    return { success: true, message: "Đánh giá thành công" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Đánh giá thất bại" };
  }
}

