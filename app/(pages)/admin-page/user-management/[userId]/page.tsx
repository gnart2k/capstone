import UserDetailHeader from '../../transaction-management/components/UserDetailHeader'
import UserBox from '../../transaction-management/components/UserBox'
import UpdateUserForm from '../components/UpdateUserForm'
import DeleteUserForm from '../../transaction-management/components/DeleteUserForm'
import CreateUserForm from '../../components/CreateUserForm'
import prismadb from '@/lib/prisma'


export default async function UserDetail({ params }: { params: { userId: string } }) {

  const u = await prismadb.user.findFirst({
    where: {
      id: params.userId
    },
    select: {
      id: true,
      status: true,
      name: true,
      phone: true,
      dob: true,
      email: true,
      image: true,
      gender: true,
      addresses: {
        select: {
          address: {
            select: {
              id: true,
              province: {
                select: {
                  id: true,
                  provinceName: true
                }

              },
              district: {
                select: {
                  id: true,
                  districtName: true
                }
              },
              ward: {
                select: {
                  id: true,
                  wardName: true
                }
              },
              specificAddress: true,
              isDefault: true
            }

          }
        }
      },
      role: {
        select: {
          roleName: true
        }
      }
    }
  })

  return (
    <div>
      {params.userId == "add" ? <CreateUserForm />
        : <div className='flex flex-col items-center mt-12 '>
          <div className='w-11/12 h-screen'>
            <UserDetailHeader userId={params?.userId} />
            <div className='flex justify-between'>
              <div className='w-3/12'>
                <UserBox userName={u.name} userAvatar={u.image} userEmail={u.email} />
              </div>
              <div className='w-9/12'>
                <UpdateUserForm
                  id={u.id}
                  name={u.name}
                  dob={u.dob}
                  phone={u.phone}
                  email={u.email}
                  role={u.role.roleName}
                  status={u.status}
                  addresses={u.addresses}
                  gender = {u.gender}
                />
              </div>
            </div>
          </div>
        </div>
      }
    </div>


  )
}
