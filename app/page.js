"use client";
import { Plus } from "lucide-react";
import { useData } from "./context/DataContext";
import FriendCard from "./components/FriendCard";

export default function Home() {
  const { friends, interactions } = useData();

  // Dynamic Stats calculations
  const totalFriends = friends.length;
  const onTrackCount = friends.filter(f => f.status === "on-track").length;
  const needAttentionCount = friends.filter(f => f.status === "overdue" || f.status === "almost due").length;
  
  // Counts interactions from the current month
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
    { label: "Interactions This Month", value: interactionsThisMonth },
  ];

  return (
    <main className="min-h-screen bg-white pb-20">
      {/* Banner Section */}
      <section className="pt-20 pb-12 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#1e293b] tracking-tight mb-4">
            Friends to keep close in your life
          </h1>
          <p className="text-[#64748b] text-sm md:text-base leading-relaxed mb-8 max-w-xl mx-auto">
            Your personal shelf of meaningful connections. Browse, tend, and nurture the 
            relationships that matter most.
          </p>
          <button className="inline-flex items-center gap-2 bg-[#244D37] hover:bg-[#1a3a2a] text-white px-5 py-2.5 rounded-md text-sm font-medium transition-colors shadow-sm">
            <Plus size={18} />
            <span>Add a Friend</span>
          </button>
        </div>
      </section>

      {/* Summary Cards */}
      <section className="container mx-auto px-6 mb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-8 rounded-xl border border-gray-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] flex flex-col items-center justify-center text-center">
              <span className="text-3xl font-bold text-[#244D37] mb-2">{stat.value}</span>
              <span className="text-[#64748b] text-sm font-medium">{stat.label}</span>
            </div>
          ))}
        </div>
        <div className="max-w-6xl mx-auto border-b border-gray-100 mt-12"></div>
      </section>

      {/* Friends Grid */}
      <section className="container mx-auto px-6 max-w-6xl">
        <h2 className="text-2xl font-bold text-[#1e293b] mb-8">Your Friends</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
           {friends.map((friend) => (
             <FriendCard key={friend.id} friend={friend} />
           ))}
        </div>
      </section>
    </main>
  );
}