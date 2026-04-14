"use client";
import { useState } from "react";
import { useData } from "../context/DataContext";
import { ChevronDown, MessageSquare, Phone, Video, Users } from "lucide-react";

export default function Timeline() {
  const { interactions } = useData();
  const [filter, setFilter] = useState("All");

  const filteredInteractions = filter === "All" 
    ? interactions 
    : interactions.filter(i => i.type === filter);

  const getIconFallback = (type) => {
    switch (type) {
      case "Call": return <Phone size={32} className="text-gray-400" />;
      case "Video": return <Video size={32} className="text-gray-400" />;
      case "Text": return <MessageSquare size={30} className="text-gray-400" />;
      default: return <Users size={28} className="text-gray-400" />;
    }
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC] py-12">
      <div className="container mx-auto px-6 max-w-4xl">
        <h1 className="text-3xl font-extrabold text-[#1e293b] mb-8">Timeline</h1>

        {/* Filter Dropdown */}
        <div className="relative inline-block mb-8">
          <select 
            onChange={(e) => setFilter(e.target.value)}
            className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2.5 pr-10 text-sm font-medium text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#244D37] cursor-pointer shadow-sm"
          >
            <option value="All">Filter timeline</option>
            <option value="Call">Calls</option>
            <option value="Text">Texts</option>
            <option value="Video">Videos</option>
            <option value="Meetup">Meetups</option>
          </select>
          <ChevronDown className="absolute right-3 top-3 text-gray-400 pointer-events-none" size={16} />
        </div>

        {/* Timeline Stack */}
        <div className="space-y-3">
          {filteredInteractions.length > 0 ? (
            filteredInteractions.map((item) => (
              <div 
                key={item.id} 
                className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between hover:border-gray-200 transition-colors"
              >
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 flex items-center justify-center bg-white border border-gray-50 rounded-2xl shadow-sm relative overflow-hidden">
                    <img 
                      src={`/assets/${item.type.toLowerCase()}.png`} 
                      alt="" 
                      className={`object-contain z-10 transition-transform ${
                        item.type === 'Call' || item.type === 'Video' 
                        ? 'w-16 h-16' // Large fill
                        : 'w-9 h-9'   // Text fill
                      }`} 
                      onError={(e) => {
                        e.target.style.display='none';
                        e.target.nextSibling.style.display='block';
                      }} 
                    />
                    
                    {/* Fallback Icon */}
                    <div style={{ display: 'none' }}>
                        {getIconFallback(item.type)}
                    </div>
                  </div>

                  <div>
                    <p className="text-base font-bold text-[#1e293b]">
                      {item.type} <span className="font-medium text-gray-500 ml-1">with {item.friendName}</span>
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5 font-medium">{item.date}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-200">
               <p className="text-gray-400 font-medium">No interactions found for this filter.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}