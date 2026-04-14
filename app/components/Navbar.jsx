"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, History, BarChart3 } from "lucide-react";

const Navbar = () => {
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/", icon: <Home size={18} /> },
    { name: "Timeline", href: "/timeline", icon: <History size={18} /> },
    { name: "Stats", href: "/stats", icon: <BarChart3 size={18} /> },
  ];

  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-100 sticky top-0 z-50">
      {/* Left Side: Logo */}
      <div className="flex items-center">
        <span className="text-2xl font-bold tracking-tight">
          <span className="text-[#1e293b]">Keen</span>
          <span className="text-[#244D37]">Keeper</span>
        </span>
      </div>

      {/* Right Side: Links */}
      <div className="flex items-center gap-2">
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
    </nav>
  );
};

export default Navbar;