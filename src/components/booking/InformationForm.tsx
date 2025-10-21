import { Button } from "@/components/ui/button";
import BookingSummary from "./BookingSummary";

interface Props {
  nextStep: () => void;
}

const InformationForm: React.FC<Props> = ({ nextStep }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-8">
        {/* Thông tin liên lạc */}
        <section>
          <h2 className="text-lg font-semibold mb-4">THÔNG TIN LIÊN LẠC</h2>
          <div className="grid grid-cols-2 gap-4">
            <input placeholder="Họ tên *" className="input" />
            <input placeholder="Điện thoại *" className="input" />
            <input placeholder="Email *" className="input" />
            <input placeholder="Địa chỉ" className="input" />
          </div>
        </section>

        {/* Hành khách */}
        <section>
          <h2 className="text-lg font-semibold mb-4">HÀNH KHÁCH</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["Người lớn", "Trẻ nhỏ", "Trẻ em", "Em bé"].map((label) => (
              <div
                key={label}
                className="border rounded-lg p-3 flex justify-between items-center"
              >
                <span>{label}</span>
                <div className="flex items-center gap-2">
                  <button className="w-6 h-6 border rounded">-</button>
                  <span>1</span>
                  <button className="w-6 h-6 border rounded">+</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Ghi chú */}
        <section>
          <h2 className="text-lg font-semibold mb-4">GHI CHÚ</h2>
          <textarea
            placeholder="Quý khách có ghi chú gì, hãy nói với chúng tôi..."
            className="w-full border rounded-lg p-3"
            rows={4}
          />
        </section>

        <Button onClick={nextStep} className="bg-red-600 hover:bg-red-700">
          Nhập thông tin để đặt tour
        </Button>
      </div>

      {/* Sidebar */}
      <div>
        <BookingSummary />
      </div>
    </div>
  );
};

export default InformationForm;
