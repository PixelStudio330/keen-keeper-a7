import Link from "next/link";

const FriendCard = ({ friend }) => {
  const statusStyles = {
    "on-track": "bg-[#244D37] text-white",
    "almost due": "bg-[#EFAD44] text-white",
    "overdue": "bg-[#EF4444] text-white",
  };

  return (
    <Link href={`/friend/${friend.id}`}>
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center group cursor-pointer">
        {/* Profile Picture */}
        <div className="w-20 h-20 rounded-full overflow-hidden mb-4 border-2 border-gray-50">
          <img
            src={friend.picture}
            alt={friend.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        </div>

        {/* Name */}
        <h3 className="text-lg font-bold text-[#1e293b] mb-1">{friend.name}</h3>

        {/* Days Since Contact */}
        <p className="text-xs text-[#64748b] mb-3">{friend.days_since_contact}d ago</p>

        {/* Tags */}
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {friend.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-[#D1FAE5] text-[#065F46] text-[10px] font-bold uppercase rounded-full tracking-wider"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Status Badge */}
        <span
          className={`px-4 py-1.5 rounded-full text-[10px] font-bold capitalize ${
            statusStyles[friend.status] || "bg-gray-100"
          }`}
        >
          {friend.status}
        </span>
      </div>
    </Link>
  );
};

export default FriendCard;