import React from 'react';
import { Instagram, Facebook, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#244D37] text-white py-16 px-6">
      <div className="container mx-auto max-w-6xl flex flex-col items-center text-center">
        
        {/* Logo/Brand Name */}
        <h2 className="text-5xl font-bold mb-4 tracking-tight">KeenKeeper</h2>
        
        {/* Tagline */}
        <p className="text-sm text-gray-300 max-w-2xl mb-8 leading-relaxed opacity-90">
          Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.
        </p>

        {/* Social Links Section */}
        <div className="flex flex-col items-center gap-4 mb-16">
          <span className="text-sm font-semibold uppercase tracking-widest">Social Links</span>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#244D37] hover:bg-gray-200 transition-colors">
              <Instagram size={20} />
            </a>
            <a href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#244D37] hover:bg-gray-200 transition-colors">
              <Facebook size={20} fill="currentColor" />
            </a>
            <a href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#244D37] hover:bg-gray-200 transition-colors">
              <Twitter size={20} fill="currentColor" />
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="w-full border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[13px] text-gray-400">
          <p>© 2026 KeenKeeper. All rights reserved.</p>
          
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>

      </div>
    </footer>
  );
}