import { Question } from '@/types/game';

// Sample questions - Bạn có thể thay đổi câu hỏi tại đây!
export const sampleQuestions: Question[] = [
  {
    id: 1,
    question: "Theo triết học Mác - Lênin, nguồn gốc duy nhất của nhận thức là gì?",
    answers: {
      A: "Ý niệm tuyệt đối",
      B: "Thế giới khách quan",
      C: "Sự hồi tưởng của linh hồn",
      D: "Cảm giác thuần túy"
    },
    correct: "B"
  },
  {
    id: 2,
    question: "Chủ thể của quá trình nhận thức là ai?",
    answers: {
      A: "Máy móc và trí tuệ nhân tạo",
      B: "Cá nhân tách rời xã hội",
      C: "Mọi sinh vật có hệ thần kinh",
      D: "Con người có ý thức và thực tiễn"
    },
    correct: "D"
  },
  {
    id: 3,
    question: "Đặc điểm của giai đoạn nhận thức cảm tính là gì?",
    answers: {
      A: "Phản ánh trực tiếp, bề ngoài",
      B: "Sử dụng các khái niệm và phán đoán",
      C: "Phản ánh gián tiếp, trừu tượng",
      D: "Vạch ra quy luật của sự vật"
    },
    correct: "A"
  },
  {
    id: 4,
    question: "Hình thức nào sau đây KHÔNG thuộc nhận thức lý tính?",
    answers: {
      A: "Khái niệm",
      B: "Phán đoán",
      C: "Biểu tượng",
      D: "Suy luận"
    },
    correct: "C"
  },
  {
    id: 5,
    question: "Tình huống: Một người nếm quả chanh và thấy chua, màu vàng. Quá trình này thuộc hình thức nào?",
    answers: {
      A: "Tri giác",
      B: "Khái niệm",
      C: "Cảm giác",
      D: "Suy luận"
    },
    correct: "C"
  },
  {
    id: 6,
    question: "Vì sao các nhà khoa học phải thực hiện thí nghiệm lặp lại nhiều lần trước khi đưa ra lý thuyết?",
    answers: {
      A: "Vì mục đích tăng thêm thu nhập nghiên cứu",
      B: "Vì họ chưa tin vào tư duy của mình",
      C: "Vì thực tiễn là tiêu chuẩn của chân lý",
      D: "Vì quy định của ngành khoa học"
    },
    correct: "C"
  },
  {
    id: 7,
    question: "Khi Newton nhìn quả táo rơi và xây dựng định luật vạn vật hấp dẫn, ông đã thực hiện bước nhảy nào?",
    answers: {
      A: "Từ chân lý này sang chân lý khác",
      B: "Từ cảm tính sang lý tính",
      C: "Từ sai lầm sang đúng đắn",
      D: "Từ chân lý tương đối sang chân lý tuyệt đối"
    },
    correct: "B"
  },
  {
    id: 8,
    question: "Trong kỷ nguyên số, việc con người quá tin vào AI mà bỏ qua kiểm chứng thực tế dễ dẫn đến sai lầm gì?",
    answers: {
      A: "Duy vật biện chứng triệt để",
      B: "Rơi vào chủ nghĩa giáo điều mới",
      C: "Phát triển tư duy sáng tạo",
      D: "Thuyết không thể biết"
    },
    correct: "B"
  },
  {
    id: 9,
    question: "Vấn đề 'Tin giả' (Fake news) hiện nay đòi hỏi chúng ta áp dụng nguyên tắc nào của lý luận nhận thức?",
    answers: {
      A: "Tin vào số đông bình luận",
      B: "Chờ đợi thông tin tự biến mất",
      C: "Kiểm tra thực tiễn khách quan",
      D: "Chỉ đọc các thông tin mình thích"
    },
    correct: "C"
  },
  {
    id: 10,
    question: "Để giải quyết tình trạng 'học đi đôi với hành' còn yếu ở sinh viên hiện nay, triết học nhấn mạnh vai trò nào của thực tiễn?",
    answers: {
      A: "Thực tiễn làm tăng thị lực",
      B: "Thực tiễn là sự trang trí cho lý luận",
      C: "Thực tiễn là mục đích của nhận thức",
      D: "Thực tiễn là nguồn gốc cảm giác"
    },
    correct: "C"
  },
  {
    id: 11,
    question: "Đại thi hào nào được mệnh danh là 'Thi tiên'?",
    answers: {
      A: "Nguyễn Du",
      B: "Hồ Xuân Hương",
      C: "Nguyễn Trãi",
      D: "Cao Bá Quát"
    },
    correct: "D"
  },
  {
    id: 12,
    question: "Phở Việt Nam có nguồn gốc từ vùng nào?",
    answers: {
      A: "Nam Định",
      B: "Hà Nội",
      C: "Sài Gòn",
      D: "Huế"
    },
    correct: "A"
  },
  {
    id: 13,
    question: "Lễ hội Chọi trâu diễn ra ở đâu?",
    answers: {
      A: "Hải Phòng",
      B: "Bắc Ninh",
      C: "Hà Nam",
      D: "Phú Thọ"
    },
    correct: "A"
  },
  {
    id: 14,
    question: "Ai là vị vua cuối cùng của triều Nguyễn?",
    answers: {
      A: "Khải Định",
      B: "Bảo Đại",
      C: "Duy Tân",
      D: "Thành Thái"
    },
    correct: "B"
  },
  {
    id: 15,
    question: "UNESCO công nhận Vịnh Hạ Long là Di sản Thiên nhiên Thế giới năm nào?",
    answers: {
      A: "1990",
      B: "1992",
      C: "1994",
      D: "2000"
    },
    correct: "C"
  }
];
