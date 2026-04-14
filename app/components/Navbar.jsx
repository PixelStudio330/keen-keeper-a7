"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, History, BarChart3, Menu, X } from "lucide-react";

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/", icon: <Home size={18} /> },
    { name: "Timeline", href: "/timeline", icon: <History size={18} /> },
    { name: "Stats", href: "/stats", icon: <BarChart3 size={18} /> },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="flex items-center justify-between px-8 py-4 max-w-7xl mx-auto">
        {/* Left Side: Logo */}
        <Link href="/" className="flex items-center">
          <span className="text-2xl font-bold tracking-tight">
            <span className="text-[#1e293b]">Keen</span>
            <span className="text-[#244D37]">Keeper</span>
          </span>
        </Link>

        {/* Desktop Links - Hidden on Mobile */}
        <div className="hidden md:flex items-center gap-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-[#244D37] text-white shadow-sm"
                    : "text-[#64748b] hover:bg-gray-50 hover:text-[#1e293b]"
                }`}
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            );
          })}
        </div>

        {/* Mobile Hamburger Button - Hidden on Desktop */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMenu}
            className="text-[#1e293b] p-2 hover:bg-gray-50 rounded-lg transition-colors"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-white border-b border-gray-100 ${
          isOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-8 pb-6 pt-2 space-y-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)} 
                className={`flex items-center gap-4 px-4 py-3 rounded-xl font-semibold transition-all ${
                  isActive
                    ? "bg-[#244D37]/10 text-[#244D37]"
                    : "text-[#64748b] hover:bg-gray-50"
                }`}
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;