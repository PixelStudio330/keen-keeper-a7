import Link from "next/link";

const FriendCard = ({ friend }) => {
  // 1. Safety Check: If friend is missing, don't crash the app
  if (!friend) return null;

  const statusStyles = {
    "on-track": "bg-[#244D37] text-white",
    "almost due": "bg-[#FDBA74] text-white",
    "overdue": "bg-[#EF4444] text-white",
  };

  return (
    // 2. Ensure the ID exists before creating the link
    <Link href={`/friend/${friend.id || "#"}`}>
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center text-center group cursor-pointer hover:-translate-y-1 h-full">
        
        {/* Profile Picture */}
        <div className="w-20 h-20 rounded-full overflow-hidden mb-4 border-2 border-gray-50 shadow-inner bg-gray-100">
          {friend.picture ? (
            <img
              src={friend.picture}
              alt={friend.name || "Friend"}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              No Image
            </div>
          )}
        </div>

        {/* Info */}
        <h3 className="text-lg font-bold text-[#1e293b] mb-0.5">
          {friend.name || "Unknown Friend"}
        </h3>
        <p className="text-[10px] font-medium text-[#64748b] mb-3 uppercase tracking-wider">
          {friend.days_since_contact ?? "?"}d ago
        </p>

        {/* Tags Grid */}
        <div className="flex flex-wrap justify-center gap-1.5 mb-4">
          {friend.tags?.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-0.5 bg-[#D1FAE5] text-[#065F46] text-[9px] font-bold uppercase rounded-full"
            >
              {tag}
            </span>
          )) || <span className="h-4" />}
        </div>

        {/* Status Badge */}
        <span
          className={`px-5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wide shadow-sm mt-auto ${
            statusStyles[friend.status] || "bg-gray-100 text-gray-600"
          }`}
        >
          {friend.status || "No Status"}
        </span>
      </div>
    </Link>
  );
};

export default FriendCard;