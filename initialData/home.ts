import dichvu1 from "@/public/assets/home/dichvu1.png";
import dichvu2 from "@/public/assets/home/dichvu2.png";
import dichvu3 from "@/public/assets/home/dichvu3.png";
import dichvu4 from "@/public/assets/home/dichvu4.png";
import payIcon from "@/public/assets/home/badge-pay.png";
import protectIcon from "@/public/assets/home/badge-protect.png";
import timeIcon from "@/public/assets/home/badge-time-clock.png";
import serviceIcon from "@/public/assets/home/badge-service.png";

const listService = [
  {
    img: dichvu1,
    title: "Tổng vệ sinh",
    content:
      "Giữ cho nhà cửa của bạn luôn ngăn nắp, sạch sẽ, thoáng đãng với dịch vụ dọn dẹp của chúng tôi. Hãy để chúng tôi giúp bạn duy trì không gian sống thật lý tưởng!",
    link: "/home",
  },
  {
    img: dichvu2,
    title: "Vệ sinh Sofa, Rèm, Nệm",
    content:
      "Mang lại vẻ mới mẻ và sạch sẽ cho sofa, rèm và nệm với dịch vụ vệ sinh chuyên nghiệp. Sử dụng công nghệ vệ sinh an toàn, hiệu quả để loại bỏ bụi bẩn, vi khuẩn và vết bẩn cứng đầu.",
    link: "/home",
  },
  {
    img: dichvu3,
    title: "Giặt Ủi",
    content:
      "Làm sạch và giữ gìn quần áo của bạn luôn mới mẻ. Từ quần áo hàng ngày đến các loại vải cao cấp, chúng tôi đảm bảo quần áo sẽ luôn sạch sẽ và thơm tho.",
    link: "/home",
  },
  {
    img: dichvu4,
    title: "Dọn Dẹp Văn Phòng",
    content:
      "Tiết kiệm thời gian và tận hưởng bữa cơm gia đình ấm cúng mà không cần phải lo lắng về việc nấu nướng. Hãy để chúng tôi chăm sóc bữa ăn của bạn!",
    link: "/home",
  },
  {
    img: dichvu4,
    title: "Dọn Dẹp Văn Phòng",
    content:
      "Tiết kiệm thời gian và tận hưởng bữa cơm gia đình ấm cúng mà không cần phải lo lắng về việc nấu nướng. Hãy để chúng tôi chăm sóc bữa ăn của bạn!",
    link: "/home",
  },
  {
    img: dichvu4,
    title: "Dọn Dẹp Văn Phòng",
    content:
      "Tiết kiệm thời gian và tận hưởng bữa cơm gia đình ấm cúng mà không cần phải lo lắng về việc nấu nướng. Hãy để chúng tôi chăm sóc bữa ăn của bạn!",
    link: "/home",
  },
];
const listBenefit = [
  {
    img: timeIcon,
    title: "Đặt lịch nhanh chóng",
    content:
      "Thao tác 60 giây trên ứng dụng, có ngay người nhận việc sau 60 phút",
  },
  {
    img: payIcon,
    title: "Giá cả rõ ràng",
    content:
      "Giá dịch vụ được hiển thị rõ ràng trên ứng dụng. Bạn không phải trả thêm bất kỳ khoản chi phí nào.",
  },
  {
    img: serviceIcon,
    title: "Đa dạng dịch vụ",
    content:
      "Với những dịch vụ tiện ích, HomeShine sẵn sàng hỗ trợ mọi nhu cầu việc nhà của bạn.",
  },
  {
    img: protectIcon,
    title: "An toàn tối đa",
    content:
      "Người làm uy tín, luôn có hồ sơ lý lịch rõ ràng và được Công ty giám sát trong suốt quá trình làm việc.",
  },
];

const bookingOptionData = [
  {
    id: "1",
    title: "Chung toi se tu dong tim kiem nhung nhan vien phu hop nhat voi yeu cau cua ban",
  },
  {
    id: "2",
    title: "Chon nhan vien ua thich cua ban",
  },
]

export type bookingOptionDataType = typeof bookingOptionData



export { listService, listBenefit, bookingOptionData };
