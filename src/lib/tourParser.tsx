// utils/tourParser.ts

export interface ParsedTour {
  id: string;
  title: string;
  description: string;
  price: string;
  location: string;
  duration: string;
  link: string;
}

export const parseTourString = (rawString: string): ParsedTour | null => {
  try {
    const idMatch = rawString.match(/Tour ID:\s*(\d+)/);
    const titleMatch = rawString.match(/Tên tour:\s*(.*?)(?=\.\s*Mô tả)/);
    const descMatch = rawString.match(
      /Mô tả:\s*(.*?)(?=\.\s*(Giá|Địa điểm|Vào|Nghe))/
    );
    const priceMatch = rawString.match(/Giá:\s*([\d\.]+)\s*VND/);
    const locationMatch = rawString.match(
      /Địa điểm:\s*(.*?)(?=\.\s*Thời lượng)/
    );
    const durationMatch = rawString.match(/Thời lượng:\s*(.*?)(?=\.\s*Link)/);
    const linkMatch = rawString.match(/Link chi tiết:\s*(\S+)/);
    if (!linkMatch) return null;

    return {
      id: idMatch ? idMatch[1] : "",
      title: titleMatch ? titleMatch[1].trim() : "Gợi ý tour hấp dẫn",
      description: descMatch ? descMatch[1].trim() : "",
      price: priceMatch
        ? Number(priceMatch[1]).toLocaleString() + " đ"
        : "Liên hệ",
      location: locationMatch ? locationMatch[1].trim() : "",
      duration: durationMatch ? durationMatch[1].trim() : "",
      link: linkMatch[1].trim(),
    };
  } catch (error) {
    console.error("Lỗi parse tour:", error);
    return null;
  }
};
