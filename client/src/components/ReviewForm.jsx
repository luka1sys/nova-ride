import React, { useState, useEffect } from "react";
import { useReview } from "../contexts/ReviewContext";
import { useTranslation } from "react-i18next"; // იმპორტი

const ReviewForm = ({ carId }) => {
  const { addReview } = useReview();
  const { t } = useTranslation(); // ინიციალიზაცია
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", text: "" });

  // შეტყობინება ავტომატურად გაქრება 5 წამში
  useEffect(() => {
    if (status.text) {
      const timer = setTimeout(() => setStatus({ type: "", text: "" }), 5000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) {
      setStatus({ type: "error", text: t("Please write a comment before submitting.") });
      return;
    }

    try {
      setLoading(true);
      await addReview({ carId, rating, comment });
      
      // წარმატების შემთხვევაში აქ ვასუფთავებთ მნიშვნელობებს:
      setStatus({ type: "success", text: t("Review submitted successfully! 🎉") });
      setComment(""); // <--- კომენტარის ველი ცარიელდება
      setRating(5);   // <--- რეიტინგი ბრუნდება 5-ზე
    } catch (err) {
      setStatus({ 
        type: "error", 
        text: err.response?.data?.message || err.message || t("Failed to submit review.") 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/[0.03] border border-white/10 rounded-[30px] p-8 md:p-10 shadow-2xl relative overflow-hidden group">
      <h3 className="text-2xl font-bold mb-8 text-white flex items-center gap-4">
        {t("Share Your Experience")} <div className="h-[1px] flex-1 bg-white/10"></div>
      </h3>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Rating */}
          <div className="md:col-span-4">
            <label className="block text-xs uppercase tracking-[0.2em] font-bold text-gray-500 mb-3">
              {t("Your Rating")}
            </label>
            <select 
              value={rating} 
              onChange={(e) => setRating(Number(e.target.value))}
              className="w-full bg-white/5 border border-white/10 text-white py-4 px-5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#FE9A00]/50 focus:border-[#FE9A00] transition-all appearance-none cursor-pointer"
            >
              {[5, 4, 3, 2, 1].map((n) => (
                <option key={n} value={n} className="bg-[#0c0c0c] text-white">
                  {n} {n > 1 ? t("Stars") : t("Star")} {"★".repeat(n)}
                </option>
              ))}
            </select>
          </div>

          {/* Comment */}
          <div className="md:col-span-8">
            <label className="block text-xs uppercase tracking-[0.2em] font-bold text-gray-500 mb-3">
              {t("Your Review")}
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder={t("How was the drive? Tell us more...")}
              rows={2}
              className="w-full bg-white/5 border border-white/10 text-white py-4 px-5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#FE9A00]/50 focus:border-[#FE9A00] transition-all placeholder-gray-600 resize-none"
            />
          </div>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className={`px-10 h-[60px] rounded-full font-black text-[15px] uppercase tracking-widest transition-all duration-300 ${
            loading 
              ? "bg-gray-800 text-gray-500 cursor-not-allowed" 
              : "bg-[#FE9A00] text-black hover:bg-white hover:shadow-[0_0_30px_rgba(254,154,0,0.3)]"
          }`}
        >
          {loading ? t("Processing...") : t("Submit Review")}
        </button>

        {status.text && (
          <div className={`mt-4 text-sm font-bold tracking-wide animate-fade-in ${
            status.type === "success" ? "text-green-500" : "text-red-500"
          }`}>
            {status.text}
          </div>
        )}
      </form>
    </div>
  );
};

export default ReviewForm;