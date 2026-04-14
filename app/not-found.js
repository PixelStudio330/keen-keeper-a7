"use client";
import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-[80vh] flex flex-col items-center justify-center bg-[#F8FAFC] px-6 text-center">
      <div className="flex flex-col items-center">
        <div className="relative mb-8">
          <h1 className="text-9xl font-extrabold text-[#244D37] opacity-100 select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
          </div>
        </div>

        <h2 className="text-3xl font-bold text-[#1e293b] mb-4">
          This shelf seems to be empty
        </h2>
        
        <p className="text-gray-500 max-w-md mb-10 leading-relaxed">
          We couldn't find the page you're looking for. It might have been moved, 
          deleted, or perhaps it never existed in our website.
        </p>

        <Link 
          href="/"
          className="px-8 py-3 bg-[#244D37] text-white rounded-full font-semibold shadow-lg hover:bg-[#1a3a2a] transition-all hover:-translate-y-1 active:scale-95 inline-block"
        >
          Back to the Home
        </Link>
      </div>
    </main>
  );
}