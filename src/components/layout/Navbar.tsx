import { Globe, Menu } from "lucide-react";

const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 glass-navbar transition-all duration-300">
      <div className="w-full max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center gap-1">
          <span className="text-amber-500 font-black text-2xl uppercase bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
            Bihar
          </span>
          <span className="text-white font-light text-2xl uppercase">
            Darshan
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium tracking-wide">
          {["Home", "Districts", "Culture", "Community", "Tribals", "Tourism", "Marketplace", "Gallery"].map((item) => (
            <a 
              key={item}
              href={`#${item.toLowerCase()}`} 
              className="text-gray-300 hover:text-amber-400 transition-colors duration-300 relative py-1 group"
            >
              {item}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-400 transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button className="hidden sm:flex items-center gap-2 border border-white/10 hover:border-amber-500/50 px-4 py-2 rounded-full text-xs font-semibold text-gray-200 hover:text-amber-400 bg-white/5 hover:bg-amber-500/5 transition-all duration-300 cursor-pointer">
            <Globe size={14} className="animate-spin-slow" />
            Translator
          </button>

          <button className="hidden sm:block border border-white/10 hover:border-white/20 px-5 py-2 rounded-full text-xs font-semibold text-white bg-white/5 hover:bg-white/10 transition-all duration-300 cursor-pointer">
            Login
          </button>

          <button className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 px-6 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer">
            Share Story
          </button>

          <button className="lg:hidden text-white hover:text-amber-400 transition-colors duration-200">
            <Menu size={24} />
          </button>
        </div>

      </div>
    </header>
  );
};

export default Navbar;