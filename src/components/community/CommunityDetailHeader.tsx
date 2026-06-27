import { ArrowLeft, CheckCircle, Bell, MoreHorizontal, Users, FileText, Wifi } from 'lucide-react';
import type { Community } from '../../data/communityData';
import { memberAvatars } from '../../data/communityData';

interface CommunityDetailHeaderProps {
  community: Community;
  onBack: () => void;
  isJoined?: boolean;
  onToggleJoin?: () => void;
}

const CommunityDetailHeader = ({ community, onBack, isJoined, onToggleJoin }: CommunityDetailHeaderProps) => {
  return (
    <div>
      {/* Back link */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm text-gray-600 hover:text-amber-600 font-medium mb-5 transition-colors duration-200 group"
      >
        <ArrowLeft
          size={16}
          className="group-hover:-translate-x-1 transition-transform duration-200"
        />
        Back to Communities
      </button>

      {/* Banner card */}
      <div className="rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
        {/* Banner image */}
        <div className="relative h-36 sm:h-44">
          <img
            src={community.image}
            alt={community.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
        </div>

        {/* Info row */}
        <div className="bg-white px-4 sm:px-6 py-4">
          <div className="flex flex-col sm:flex-row sm:items-start gap-4">
            {/* Icon */}
            <div
              className={`relative z-10 w-14 h-14 rounded-2xl ${community.iconBg} flex items-center justify-center text-2xl shadow-lg shrink-0 -mt-8 border-4 border-white`}
            >
              {community.icon}
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl font-bold text-gray-900 leading-tight">
                  {community.name}
                </h2>
                {community.verified && (
                  <CheckCircle size={18} className="text-emerald-500 shrink-0" />
                )}
              </div>
              <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                {community.aboutText}
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 shrink-0">
              <button 
                onClick={onToggleJoin}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-200 ${
                  isJoined 
                    ? 'bg-emerald-50 border border-emerald-200 text-emerald-700 hover:bg-emerald-100'
                    : 'bg-violet-600 border border-violet-600 text-white hover:bg-violet-700'
                }`}
              >
                {isJoined ? (
                  <>
                    <CheckCircle size={15} />
                    Joined
                  </>
                ) : (
                  <>
                    <Users size={15} />
                    Join Community
                  </>
                )}
              </button>
              <button className="w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center text-gray-500 hover:border-amber-400 hover:text-amber-500 transition-all duration-200">
                <Bell size={16} />
              </button>
              <button className="w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center text-gray-500 hover:border-gray-400 transition-all duration-200">
                <MoreHorizontal size={16} />
              </button>
            </div>
          </div>

          {/* Stats row */}
          <div className="flex items-center gap-6 mt-4 pt-4 border-t border-gray-100 flex-wrap">
            <div className="flex items-center gap-1.5">
              <Users size={14} className="text-gray-400" />
              <span className="text-sm font-bold text-gray-900">{community.members}</span>
              <span className="text-xs text-gray-500">Members</span>
            </div>
            <div className="flex items-center gap-1.5">
              <FileText size={14} className="text-gray-400" />
              <span className="text-sm font-bold text-gray-900">{community.posts}</span>
              <span className="text-xs text-gray-500">Posts</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Wifi size={14} className="text-emerald-500" />
              <span className="text-sm font-bold text-gray-900">{community.online}</span>
              <span className="text-xs text-gray-500">Online</span>
            </div>

            {/* Member avatars */}
            <div className="flex items-center ml-auto">
              <div className="flex -space-x-2">
                {memberAvatars.map((av, i) => (
                  <div
                    key={i}
                    className={`w-7 h-7 rounded-full ${av.color} border-2 border-white flex items-center justify-center text-white text-[10px] font-bold`}
                  >
                    {av.initials}
                  </div>
                ))}
              </div>
              <span className="ml-2 text-xs font-semibold text-gray-500">+25</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityDetailHeader;
