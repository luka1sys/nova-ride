import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { motion } from "framer-motion";
import { IconLock, IconShieldCheck, IconEye, IconEyeOff } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";

// ✅ InputGroup-შიც შევცვალეთ ფონტის სტილი
const InputGroup = ({ label, value, onChange, show, setShow, placeholder, t }) => (
  <div className="space-y-2">
    <label className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold ml-1">
      {label}
    </label>
    <div className="relative group">
      <input
        type={show ? "text" : "password"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required
        className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 pr-12 focus:outline-none focus:border-[#FE9A00]/50 transition-all text-sm text-white placeholder:text-gray-700"
      />
      <button
        type="button"
        onClick={() => setShow(!show)}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-[#FE9A00] transition-colors"
      >
        {show ? <IconEyeOff size={18} /> : <IconEye size={18} />}
      </button>
    </div>
  </div>
);

const ChangePassword = () => {
  const { changeUserPassword } = useAuth();
  const { t } = useTranslation();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert(t("Passwords do not match"));
      return;
    }

    setLoading(true);
    try {
      await changeUserPassword({ currentPassword, newPassword });
      alert(t("Password changed successfully!"));
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      alert(error.message || t("Failed to change password"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-xl"
    >
      <div className="bg-[#0A0A0A] border border-white/5 rounded-[40px] p-8 md:p-10 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 p-8 opacity-5 text-[#FE9A00] pointer-events-none">
          <IconLock size={100} />
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-12 h-12 rounded-2xl bg-[#FE9A00]/10 flex items-center justify-center text-[#FE9A00]">
              <IconShieldCheck size={28} />
            </div>
            <div>
              <h3 className="text-xl font-bold uppercase tracking-tight text-white">
                {t("Update")} <span className="text-[#FE9A00] font-medium">{t("Security")}</span>
              </h3>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest font-medium">{t("Access management")}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <InputGroup 
              label={t("Current Password")} 
              value={currentPassword} 
              onChange={setCurrentPassword} 
              show={showCurrent} 
              setShow={setShowCurrent} 
              placeholder="••••••••"
              t={t}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputGroup 
                label={t("New Password")} 
                value={newPassword} 
                onChange={setNewPassword} 
                show={showNew} 
                setShow={setShowNew} 
                placeholder="••••••••"
                t={t}
              />
              <InputGroup 
                label={t("Confirm New")} 
                value={confirmPassword} 
                onChange={setConfirmPassword} 
                show={showConfirm} 
                setShow={setShowConfirm} 
                placeholder="••••••••"
                t={t}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#FE9A00] text-black font-bold uppercase tracking-widest py-5 rounded-2xl hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 shadow-lg shadow-[#FE9A00]/10 disabled:opacity-50 mt-4 h-[60px] flex items-center justify-center"
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-black/20 border-t-black rounded-full animate-spin" />
              ) : (
                t("Save New Credentials")
              )}
            </button>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default ChangePassword;