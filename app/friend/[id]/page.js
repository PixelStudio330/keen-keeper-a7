"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useData } from "../../context/DataContext";
import { 
  Phone, MessageSquare, Video, Clock, 
  Archive, Trash2, Edit3, History 
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

export default function FriendDetails() {
  const { id } = useParams();
  const { friends, interactions, addInteraction } = useData();
  
  const friend = friends.find((f) => f.id === parseInt(id));

  if (!friend) {
    return <div className="p-20 text-center text-xl font-bold">Friend not found!</div>;
  }

  // Filter only interactions for THIS specific friend
  const friendHistory = interactions
    .filter(item => item.friendId === friend.id)
    .slice(0, 3); 

  const handleAction = (type) => {
    addInteraction(friend.id, friend.name, type);
    
    toast.success(`${type} with ${friend.name} recorded!`, {
      style: {
        border: '1px solid #244D37',
        padding: '16px',
        color: '#244D37',
      },
      iconTheme: {
        primary: '#244D37',
        secondary: '#FFFAEE',
      },
    });
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC] pb-20 pt-10">
      <Toaster position="top-center" />
      
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* LEFT COLUMN: Profile & Actions */}
          <div className="md:col-span-4 space-y-6">
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm text-center">
              <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 border-4 border-gray-50">
                <img src={friend.picture} alt={friend.name} className="w-full h-full object-cover" />
              </div>
              <h1 className="text-2xl font-bold text-[#1e293b]">{friend.name}</h1>
              <div className="flex flex-col gap-2 mt-3 items-center">
                <span className={`px-4 py-1 text-white text-[10px] font-bold rounded-full uppercase ${
                  friend.status === 'overdue' ? 'bg-red-500' : 
                  friend.status === 'almost due' ? 'bg-orange-400' : 'bg-[#244D37]'
                }`}>
                  {friend.status}
                </span>
                <span className="px-4 py-1 bg-[#D1FAE5] text-[#065F46] text-[10px] font-bold rounded-full uppercase">
                  {friend.tags?.[0] || "Friend"}
                </span>
              </div>
              <p className="mt-6 text-gray-500 italic text-sm">"{friend.bio}"</p>
              <p className="mt-2 text-xs text-gray-400 font-medium uppercase">Preferred: email</p>
            </div>

            <div className="space-y-3">
              <button className="w-full flex items-center justify-center gap-2 bg-white p-4 rounded-xl border border-gray-100 font-semibold text-[#1e293b] hover:bg-gray-50 transition-colors shadow-sm">
                <Clock size={18} /> Snooze 2 Weeks
              </button>
              <button className="w-full flex items-center justify-center gap-2 bg-white p-4 rounded-xl border border-gray-100 font-semibold text-[#1e293b] hover:bg-gray-50 transition-colors shadow-sm">
                <Archive size={18} /> Archive
              </button>
              <button className="w-full flex items-center justify-center gap-2 bg-white p-4 rounded-xl border border-gray-100 font-semibold text-red-500 hover:bg-red-50 transition-colors shadow-sm">
                <Trash2 size={18} /> Delete
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="md:col-span-8 space-y-6">
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
                <p className="text-3xl font-bold text-[#244D37]">{friend.days_since_contact}</p>
                <p className="text-xs text-gray-500 mt-1 font-medium">Days Since Contact</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
                <p className="text-3xl font-bold text-[#244D37]">{friend.goal}</p>
                <p className="text-xs text-gray-500 mt-1 font-medium">Goal (Days)</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
                <p className="text-xl font-bold text-[#244D37] mt-1.5">Apr 27, 2026</p>
                <p className="text-xs text-gray-500 mt-2 font-medium">Next Due</p>
              </div>
            </div>

            {/* Quick Check-In */}
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="font-bold text-[#1e293b] mb-6">Quick Check-In</h3>
              <div className="grid grid-cols-3 gap-4">
                <button onClick={() => handleAction('Call')} className="flex flex-col items-center gap-2 p-6 rounded-xl border border-gray-100 hover:bg-gray-50 transition-all group">
                  <Phone className="text-gray-400 group-hover:text-[#244D37]" size={24} />
                  <span className="text-sm font-medium text-gray-600">Call</span>
                </button>
                <button onClick={() => handleAction('Text')} className="flex flex-col items-center gap-2 p-6 rounded-xl border border-gray-100 hover:bg-gray-50 transition-all group">
                  <MessageSquare className="text-gray-400 group-hover:text-[#244D37]" size={24} />
                  <span className="text-sm font-medium text-gray-600">Text</span>
                </button>
                <button onClick={() => handleAction('Video')} className="flex flex-col items-center gap-2 p-6 rounded-xl border border-gray-100 hover:bg-gray-50 transition-all group">
                  <Video className="text-gray-400 group-hover:text-[#244D37]" size={24} />
                  <span className="text-sm font-medium text-gray-600">Video</span>
                </button>
              </div>
            </div>

            {/* Recent Interactions */}
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-[#1e293b]">Recent Interactions</h3>
                <Link href="/timeline" className="flex items-center gap-2 text-xs font-bold text-[#1e293b] bg-gray-100 px-3 py-1.5 rounded-md">
                  <History size={14} /> Full History
                </Link>
              </div>
              <div className="divide-y divide-gray-100">
                {friendHistory.length > 0 ? (
                  friendHistory.map((item) => (
                    <div key={item.id} className="py-4 flex justify-between items-center">
                      <div className="flex gap-4 items-center">
                        <div className="p-2 bg-gray-50 rounded-lg text-gray-600">
                           <img src={`/icons/${item.type.toLowerCase()}.png`} alt="" className="w-5 h-5" 
                                onError={(e) => {
                                  e.target.style.display='none';
                                  // Fallback to text icon logic if needed
                                }} />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-[#1e293b]">{item.type}</p>
                          <p className="text-xs text-gray-500">Logged via Quick Check-In</p>
                        </div>
                      </div>
                      <span className="text-xs text-gray-400">{item.date}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-400 py-4">No recent interactions logged.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}