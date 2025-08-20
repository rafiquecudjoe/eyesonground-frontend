
interface ReviewCardProps {
  avatar: string;
  name: string;
  role: string;
  rating: number;
  comment: string;
}

export const ReviewCard = ({
  avatar,
  name,
  role,
  rating,
  comment,
}: ReviewCardProps) => {
  return (
    <div className="bg-gradient-to-br from-[rgba(13,38,75,1)] to-[rgba(42,100,186,1)] h-[320px] flex flex-col overflow-hidden px-6 py-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-[rgba(255,255,255,0.1)]">
      <div className="flex items-center gap-3 font-normal">
        <img
          src={avatar}
          alt={name}
          className="aspect-square object-cover w-[60px] h-[60px] shrink-0 rounded-full border-3 border-white/20 shadow-lg"
        />
        <div className="flex flex-col">
          <div className="text-white text-lg font-bold">{name}</div>
          <div className="text-white/80 text-sm mt-1">{role}</div>
        </div>
      </div>
      <div className="flex items-center gap-4 mt-4">
        <div className="flex gap-0.5">
          {Array(5)
            .fill(null)
            .map((_, i) => (
              <div
                key={i}
                className={`w-5 h-5 rounded-sm ${i < rating ? 'bg-yellow-400' : 'bg-white/30'} transition-colors`}
              />
            ))}
        </div>
        <div className="text-white text-lg font-bold">
          {rating}.0
        </div>
      </div>
      <p className="text-white/90 text-base font-normal leading-relaxed mt-4 flex-1 line-clamp-6">
        {comment}
      </p>
      
      {/* Verified badge */}
      <div className="mt-4 pt-4 border-t border-white/20">
        <div className="flex items-center justify-center gap-2">
          <div className="w-4 h-4 bg-green-400 rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
          <span className="text-white/80 text-xs font-medium">Verified Review</span>
        </div>
      </div>
    </div>
  );
};
