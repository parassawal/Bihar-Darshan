
import { useState } from "react";
import { Globe, Menu, X } from "lucide-react";
import logo from "../../assets/logo.png";

const navItems = [
  "Home",
  "Districts",
  "Culture",
  "Community",
  "Tribals",
  "Tourism",
  "Marketplace",
  "Gallery",
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="h-14 sm:h-16 px-4 sm:px-8 rounded-full flex items-center justify-between bg-transparent">
          {/* Logo */}
          <div className="flex items-center gap-3 shrink-0">
            <img
              src={logo}
              alt="Bihar Darshan"
              className="h-16 sm:h-20 w-auto object-contain"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-6 2xl:gap-8">
            {navItems.map((item, index) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className={`relative text-sm font-medium transition-all duration-300 hover:text-amber-400 ${
                  index === 0 ? "text-amber-400" : "text-white"
                }`}
              >
                {item}

                {index === 0 && (
                  <span className="absolute -bottom-2 left-0 h-[2px] w-full bg-amber-400 rounded-full" />
                )}
              </a>
            ))}
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button className="hidden lg:flex items-center gap-2 px-4 h-10 rounded-xl border border-white/15 bg-white/5 text-white text-sm hover:border-amber-400 hover:text-amber-400 transition-all duration-300 cursor-pointer">
              <Globe size={16} />
              Translator
            </button>

            <button className="hidden lg:block px-5 h-10 rounded-xl border border-white/15 bg-white/5 text-white text-sm hover:border-white/30 hover:bg-white/10 transition-all duration-300 cursor-pointer">
              Login
            </button>

            <button className="hidden md:block px-5 h-10 rounded-xl bg-amber-500 hover:bg-amber-600 text-black font-semibold text-sm transition-all duration-300 cursor-pointer">
              Share Your Story
            </button>

            {/* Mobile Menu Toggle */}
            <button
              className="xl:hidden text-white p-1 cursor-pointer"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileOpen && (
          <div className="xl:hidden mt-2 rounded-2xl bg-black/80 backdrop-blur-2xl border border-white/10 p-6">
            <nav className="flex flex-col gap-4">
              {navItems.map((item, index) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setMobileOpen(false)}
                  className={`text-base font-medium transition-colors duration-300 ${
                    index === 0
                      ? "text-amber-400"
                      : "text-white/90 hover:text-amber-400"
                  }`}
                >
                  {item}
                </a>
              ))}
            </nav>

            <div className="flex flex-col gap-3 mt-6 pt-6 border-t border-white/10">
              <button className="flex items-center justify-center gap-2 px-4 h-11 rounded-xl border border-white/15 bg-white/5 text-white text-sm">
                <Globe size={16} />
                Translator
              </button>

              <button className="px-5 h-11 rounded-xl border border-white/15 bg-white/5 text-white text-sm">
                Login
              </button>

              <button className="px-5 h-11 rounded-xl bg-amber-500 text-black font-semibold text-sm">
                Share Your Story
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;

