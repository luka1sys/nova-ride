import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useTranslation } from "react-i18next"; // იმპორტი

const UpdateMyProfileForm = () => {
  const { user, updateMyProfile } = useAuth();
  const { t } = useTranslation(); // ჰუკი
  const [fullname, setFullname] = useState(user?.fullname || "");
  const [email, setEmail] = useState(user?.email || "");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateMyProfile({ fullname, email });
    } catch (err) {
      console.error("Failed to update profile:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#0A0A0A] border border-white/10 rounded-[32px] p-10 shadow-2xl relative overflow-hidden">
      {/* სათაური - მკაფიო და სუფთა */}
      <div className="mb-10 relative z-10">
        <h3 className="text-2xl font-bold text-white tracking-tight">
          {t("Update")} <span className="text-[#FE9A00]">{t("Profile")}</span>
        </h3>
        <p className="text-sm text-gray-400 mt-2 font-medium">
          {t("Manage and update your personal account details")}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
        {/* Fullname ველი */}
        <div className="flex flex-col gap-2.5">
          <label className="text-sm font-semibold text-gray-300 ml-1">
            {t("Full Name")}
          </label>
          <input
            type="text"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            className="w-full bg-white/[0.05] border border-white/10 rounded-2xl py-4 px-6 text-base font-medium text-white placeholder:text-gray-600 focus:outline-none focus:border-[#FE9A00]/50 focus:bg-white/[0.08] transition-all"
            placeholder={t("Enter your full name")}
            required
          />
        </div>

        {/* Email ველი */}
        <div className="flex flex-col gap-2.5">
          <label className="text-sm font-semibold text-gray-300 ml-1">
            {t("Email Address")}
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-white/[0.05] border border-white/10 rounded-2xl py-4 px-6 text-base font-medium text-white placeholder:text-gray-600 focus:outline-none focus:border-[#FE9A00]/50 focus:bg-white/[0.08] transition-all"
            placeholder={t("Enter your email")}
            required
          />
        </div>

        {/* ღილაკი - უფრო გამოსაჩენი */}
        <button
          type="submit"
          disabled={loading}
          className="w-full mt-4 bg-[#FE9A00] hover:bg-[#ffaa22] disabled:opacity-50 disabled:cursor-not-allowed text-black font-bold text-base py-4.5 rounded-2xl transition-all active:scale-[0.98] shadow-xl shadow-orange-500/10 flex justify-center items-center"
        >
          {loading ? (
            <span className="flex items-center gap-3">
              <svg className="animate-spin h-5 w-5 text-black" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {t("Updating Profile...")}
            </span>
          ) : (
            t("Save Changes")
          )}
        </button>
      </form>

      {/* დეკორატიული ელემენტი */}
      <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-[#FE9A00]/10 blur-[80px] rounded-full pointer-events-none" />
    </div>
  );
};

export default UpdateMyProfileForm;