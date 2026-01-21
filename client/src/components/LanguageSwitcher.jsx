import { useTranslation } from "react-i18next";

function LanguageSwitcher() {
  const { i18n } = useTranslation();

  // ფუნქცია, რომელიც ამოწმებს არის თუ არა ეს ენა ამჟამად არჩეული
  const isActive = (lng) => i18n.language === lng;

  return (
    <div className="flex items-center gap-3 font-medium">
      <button
        onClick={() => i18n.changeLanguage("en")}
        className={`transition-all duration-300 text-[13px] uppercase tracking-wider ${
          isActive("en")
            ? "text-amber-500 scale-110"
            : "text-white/50 hover:text-white"
        }`}
      >
        EN
      </button>

      {/* გამყოფი ხაზი */}
      <div className="w-[1px] h-3 bg-white/20"></div>

      <button
        onClick={() => i18n.changeLanguage("ka")}
        className={`transition-all duration-300 text-[13px] uppercase tracking-wider ${
          isActive("ka")
            ? "text-amber-500 scale-110"
            : "text-white/50 hover:text-white"
        }`}
      >
        KA
      </button>
    </div>
  );
}

export default LanguageSwitcher;