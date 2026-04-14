"use client";
import { useState } from "react";
import { useData } from "../context/DataContext";
import { ChevronDown, MessageSquare, Phone, Video, Users, Search, ArrowUpDown } from "lucide-react";

export default function Timeline() {
  const { interactions } = useData();
  
  // State for search, filter, and sort
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("newest");

  // 1. Process data (Filter -> Search -> Sort)
  const processedInteractions = interactions
    .filter((item) => {
      const matchesFilter = filter === "All" || item.type === filter;
      const matchesSearch = item.friendName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            item.type.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesFilter && matchesSearch;
    })
    .sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });

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

        {/* Controls Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          
          {/* Search Bar */}
<div className="relative flex-grow">
  <Search className="absolute left-3 top-3 text-gray-500" size={18} />
  <input 
    type="text"
    placeholder="Search by friend or type..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="w-full bg-white border border-gray-300 rounded-lg pl-10 pr-4 py-2.5 text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#244D37] focus:border-transparent shadow-sm transition-all"
  />
</div>

          <div className="flex gap-4">
            {/* Filter Dropdown */}
            <div className="relative">
              <select 
                onChange={(e) => setFilter(e.target.value)}
                className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2.5 pr-10 text-sm font-medium text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#244D37] cursor-pointer shadow-sm"
              >
                <option value="All">All Types</option>
                <option value="Call">Calls</option>
                <option value="Text">Texts</option>
                <option value="Video">Videos</option>
                <option value="Meetup">Meetups</option>
              </select>
              <ChevronDown className="absolute right-3 top-3 text-gray-400 pointer-events-none" size={16} />
            </div>

            {/* Sort Toggle */}
<button 
  onClick={() => setSortOrder(sortOrder === "newest" ? "oldest" : "newest")}
  className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors shadow-sm group"
>
  <ArrowUpDown size={16} className="text-[#244D37] group-hover:rotate-180 transition-transform duration-300" />
  <span className="hidden sm:inline">
    {/* If current is newest, show 'Oldest' as the target action */}
    {sortOrder === "newest" ? "Show Oldest" : "Show Newest"}
  </span>
</button>
          </div>
        </div>

        {/* Timeline Stack */}
        <div className="space-y-3">
          {processedInteractions.length > 0 ? (
            processedInteractions.map((item) => (
              <div 
                key={item.id} 
                className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between hover:border-gray-200 transition-all hover:shadow-md"
              >
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 flex items-center justify-center bg-white border border-gray-50 rounded-2xl shadow-sm relative overflow-hidden">
                    <img 
                      src={`/assets/${item.type.toLowerCase()}.png`} 
                      alt="" 
                      className={`object-contain z-10 transition-transform ${
                        item.type === 'Call' || item.type === 'Video' 
                        ? 'w-16 h-16' 
                        : 'w-9 h-9'
                      }`} 
                      onError={(e) => {
                        e.target.style.display='none';
                        e.target.nextSibling.style.display='block';
                      }} 
                    />
                    <div style={{ display: 'none' }}>
                        {getIconFallback(item.type)}
                    </div>
                  </div>

                  <div>
                    <p className="text-base font-bold text-[#1e293b]">
                      {item.type} <span className="font-medium text-gray-500 ml-1">with {item.friendName}</span>
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5 font-medium">
                      {new Date(item.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-200">
               <p className="text-gray-400 font-medium">No matches found for your search or filter.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}