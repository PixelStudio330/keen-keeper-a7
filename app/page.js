"use client";
import { Plus } from "lucide-react";
import { useData } from "./context/DataContext";
import FriendCard from "./components/FriendCard";

export default function Home() {
  const { friends, interactions, loading } = useData();

  const totalFriends = friends.length;
  const onTrackCount = friends.filter(f => f.status === "on-track").length;
  const needAttentionCount = friends.filter(f => f.status === "overdue" || f.status === "almost due").length;
  
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const interactionsThisMonth = interactions.filter(item => {
    const itemDate = new Date(item.date);
    return itemDate.getMonth() === currentMonth && itemDate.getFullYear() === currentYear;
  }).length;

  const stats = [
    { label: "Total Friends", value: totalFriends },
    { label: "On Track", value: onTrackCount },
    { label: "Need Attention", value: needAttentionCount },
    { label: "Interactions", value: interactionsThisMonth },
  ];

  return (
    <main className="min-h-screen bg-white pb-12 md:pb-20">
      {/* Banner Section */}
      <section className="pt-12 md:pt-20 pb-8 md:pb-12 px-8 md:px-12 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1e293b] tracking-tight mb-4">
            Friends to keep close in your life
          </h1>
          <p className="text-[#64748b] text-sm md:text-base leading-relaxed mb-8 max-w-xl mx-auto">
            Your personal shelf of meaningful connections. Browse, tend, and nurture the 
            relationships that matter most.
          </p>
          <button className="inline-flex items-center gap-2 bg-[#244D37] hover:bg-[#1a3a2a] text-white px-6 py-3 md:px-5 md:py-2.5 rounded-full md:rounded-md text-sm font-medium transition-all shadow-sm active:scale-95">
            <Plus size={18} />
            <span>Add a Friend</span>
          </button>
        </div>
      </section>

      {/* Summary Cards */}
      <section className="container mx-auto px-8 md:px-12 mb-12 md:mb-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-4 md:p-8 rounded-xl border border-gray-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] flex flex-col items-center justify-center text-center transition-transform hover:scale-[1.02]">
              <span className="text-2xl md:text-3xl font-bold text-[#244D37] mb-1 md:mb-2">{stat.value}</span>
              <span className="text-[#64748b] text-[10px] md:text-sm font-medium uppercase md:capitalize tracking-wider md:tracking-normal">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
        <div className="max-w-6xl mx-auto border-b border-gray-100 mt-10 md:mt-12"></div>
      </section>

      {/* Friends Grid */}
      <section className="container mx-auto px-8 md:px-12 max-w-6xl min-h-[300px]">
        <div className="flex flex-row justify-between items-center mb-6 md:mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-[#1e293b]">Your Friends</h2>
          {!loading && (
            <span className="text-[10px] md:text-xs font-semibold text-gray-400 uppercase tracking-widest bg-gray-50 px-3 py-1 rounded-full animate-fade-in-smooth">
              Archive
            </span>
          )}
        </div>

        {loading ? (
          <div className="flex h-48 md:h-64 w-full items-center justify-center bg-white">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-100 border-t-[#244D37]"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in-smooth">
             {friends.map((friend) => (
               <FriendCard key={friend.id} friend={friend} />
             ))}
          </div>
        )}
      </section>
    </main>
  );
}