import { Bookmark, Users, FileText, Wifi } from 'lucide-react';
import type { Community } from '../../data/communityData';

interface CommunityListCardProps {
  community: Community;
  onSelect: (community: Community) => void;
}

const CommunityListCard = ({ community, onSelect }: CommunityListCardProps) => {
  return (
    <div className="group bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
      {/* Cover image */}
      <div className="relative h-44 overflow-hidden">
        <img
          src={community.image}
          alt={community.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        {/* Icon badge */}
        <div
          className={`absolute top-3 left-3 w-10 h-10 rounded-xl ${community.iconBg} flex items-center justify-center text-lg shadow-lg`}
        >
          {community.icon}
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-4">
        {/* Stats row */}
        <div className="flex items-center gap-4 mb-3">
          <span className="flex items-center gap-1 text-xs text-gray-500">
            <Users size={11} className="text-gray-400" />
            {community.members} Members
          </span>
          <span className="flex items-center gap-1 text-xs text-gray-500">
            <FileText size={11} className="text-gray-400" />
            {community.posts} Posts
          </span>
          <span className="flex items-center gap-1 text-xs text-emerald-600 font-medium">
            <Wifi size={11} />
            {community.online} Online
          </span>
        </div>

        {/* Name */}
        <h3 className="font-bold text-gray-900 text-base leading-snug mb-1.5 group-hover:text-amber-600 transition-colors duration-200">
          {community.name}
        </h3>

        {/* Description */}
        <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 flex-1 mb-4">
          {community.description}
        </p>

        {/* CTA row */}
        <div className="flex items-center gap-2 mt-auto">
          <button
            onClick={() => onSelect(community)}
            className="flex-1 py-2 rounded-xl bg-amber-400 hover:bg-amber-500 text-black font-bold text-sm transition-all duration-200 shadow-sm hover:shadow-md hover:shadow-amber-400/30 active:scale-95"
          >
            Join Community
          </button>
          <button className="w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center text-gray-400 hover:border-amber-400 hover:text-amber-500 transition-all duration-200">
            <Bookmark size={15} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommunityListCard;
