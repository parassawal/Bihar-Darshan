import { useState, useEffect } from "react";
import { Globe, Menu, X, UserCircle, ShieldCheck, Store } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import logo from "../../assets/logo.png";

const navItems = [
  "Home",
  "Districts",
  "Culture",
  "Community",
  "Tourism",
  "Tribals",
  "MarketPlace",
  "Gallery"
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lang, setLang] = useState(() => {
    const match = document.cookie.match(/googtrans=\/en\/(hi|en)/);
    return (match && match[1] === "hi") ? "Hindi" : "English";
  });
  const [langOpen, setLangOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, isAdmin, ownedShop } = useAuth();
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getPath = (item: string) => {
    if (item === "Home") return "/";
    if (item === "Culture") return "/culture";
    if (item === "Tribals") return "/tribals";
    if (item === "MarketPlace") return "/marketplace";
    return `/#${item.toLowerCase()}`;
  };

  const isActive = (item: string) => {
    if (item === "Home" && location.pathname === "/") return true;
    if (item === "Culture" && location.pathname === "/culture") return true;
    if (item === "Tribals" && location.pathname === "/tribals") return true;
    if (item === "MarketPlace" && location.pathname === "/marketplace") return true;
    return false;
  };

  return (
    <header className={`fixed top-0 left-0 w-full z-[200] transition-all duration-500 ${scrolled
      ? "bg-[#0a0a0a]/80 backdrop-blur-2xl shadow-lg border-b border-white/10 py-3"
      : "bg-transparent py-5"
      }`}>
      <div className="max-w-[1920px] mx-auto px-6 sm:px-10 flex items-center justify-between">
        <div className="flex items-center gap-3 shrink-0">
          <img
            src={logo}
            alt="Bihar Darshan"
            className={`h-10 sm:h-12 w-auto object-contain transition-all duration-500`}
          />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden xl:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item}
              to={getPath(item)}
              className={`relative text-sm font-semibold transition-all duration-300 text-white/90 hover:text-gold ${isActive(item) ? "text-gold" : ""}`}
            >
              {t(`nav.${item}`)}
              {isActive(item) && (
                <span className="absolute -bottom-2 left-0 h-[2px] w-full bg-gold rounded-full" />
              )}
            </Link>
          ))}
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {/* Language Selector */}
          <div className="relative hidden lg:block">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className={`flex items-center gap-2 px-4 h-9 rounded-xl border border-white/15 text-white hover:bg-white/5 transition-all duration-300 font-semibold text-[11px] uppercase tracking-wider`}
            >
              <Globe size={14} />
              {lang}
              <span className={`transition-transform duration-300 ${langOpen ? "rotate-180" : ""}`}>▼</span>
            </button>

            {langOpen && (
              <div className="absolute top-full mt-2 right-0 w-32 bg-white dark:bg-zinc-900 border border-black/5 shadow-xl rounded-xl overflow-hidden animate-in fade-in zoom-in duration-200">
                {["English", "Hindi"].map((l) => (
                  <button
                    key={l}
                    onClick={() => {
                      setLang(l);
                      if (l === "Hindi") {
                        document.cookie = "googtrans=/en/hi; path=/";
                      } else {
                        document.cookie = "googtrans=/en/en; path=/";
                      }
                      window.location.reload();
                    }}
                    className={`w-full text-left px-4 py-2 text-[11px] font-bold uppercase tracking-wider transition-colors ${lang === l
                      ? "bg-gold text-black"
                      : "text-black/70 dark:text-white/70 hover:bg-black/5 dark:hover:bg-white/5"
                      }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            )}
          </div>

          {currentUser ? (
            <div className="flex items-center gap-2">
              {isAdmin && (
                <Link
                  to="/admin"
                  className={`hidden lg:flex items-center gap-1.5 px-3 h-9 rounded-xl transition-all duration-300 font-semibold text-[11px] uppercase tracking-wider text-emerald-400 hover:bg-emerald-400/10`}
                >
                  <ShieldCheck size={14} />
                  {t('nav.Admin')}
                </Link>
              )}
              {ownedShop && (
                <Link
                  to="/manage-shop"
                  className={`hidden lg:flex items-center gap-1.5 px-3 h-9 rounded-xl transition-all duration-300 font-semibold text-[11px] uppercase tracking-wider text-gold hover:bg-gold/10`}
                >
                  <Store size={14} />
                  Manage Shop
                </Link>
              )}
              <Link to="/profile" className={`flex items-center justify-center w-10 h-10 rounded-full bg-white/10 border border-white/20 transition-all hover:scale-105 overflow-hidden`}>
                {currentUser.photoURL ? (
                  <img src={currentUser.photoURL} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <UserCircle size={24} className="text-white/80" />
                )}
              </Link>
            </div>
          ) : (
            <Link 
              to="/login"
              className={`hidden lg:flex items-center justify-center gap-2 px-4 h-9 rounded-xl transition-all duration-300 font-semibold text-[11px] uppercase tracking-wider text-white hover:bg-white/5`}>
              <UserCircle size={14} />
              {t('nav.Login')}
            </Link>
          )}

          <button 
            onClick={() => navigate(currentUser ? '/share-story' : '/login')}
            className="hidden md:block px-5 h-9 rounded-xl bg-gold hover:bg-gold-dark text-black font-bold text-[11px] uppercase tracking-wider transition-all duration-300 shadow-md"
          >
            {t('nav.Share Your Story')}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            className={`lg:hidden p-2 rounded-xl transition-colors text-white hover:bg-white/10`}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileOpen && (
        <div className="xl:hidden mt-3 rounded-3xl bg-white dark:bg-black shadow-2xl border border-black/5 p-8">
          <nav className="flex flex-col gap-6">
            {navItems.map((item) => (
              <Link
                key={item}
                to={getPath(item)}
                onClick={() => setMobileOpen(false)}
                className={`text-lg font-bold transition-colors ${isActive(item) ? "text-gold" : "text-black/80 dark:text-white/90"
                  }`}
              >
                {item}
              </Link>
            ))}
            <div className="h-px bg-black/5 dark:bg-white/5 my-2" />
            <div className="flex gap-4">
              {["English", "Hindi"].map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`text-sm font-bold uppercase tracking-wider ${lang === l ? "text-gold" : "text-black/40 dark:text-white/40"
                    }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;

