import { MessageSquare, Eye, BarChart2, Image as ImageIcon, Video } from 'lucide-react';
import type { Discussion } from '../../data/communityData';

interface DiscussionItemProps {
  discussion: Discussion;
  onClick?: () => void;
}

const tagStyleMap: Record<string, string> = {
  Destinations: 'bg-blue-100 text-blue-700',
  Tips:         'bg-green-100 text-green-700',
  Events:       'bg-pink-100 text-pink-700',
  Itinerary:    'bg-yellow-100 text-yellow-700',
};

const avatarColorMap: Record<string, string> = {
  RK: 'bg-orange-400',
  NS: 'bg-purple-500',
  AR: 'bg-blue-500',
  TA: 'bg-teal-500',
  PV: 'bg-pink-500',
  BA: 'bg-indigo-500',
  WP: 'bg-green-500',
  ER: 'bg-red-500',
};

const DiscussionItem = ({ discussion, onClick }: DiscussionItemProps) => {
  const tagStyle = tagStyleMap[discussion.tag] ?? 'bg-gray-100 text-gray-600';
  const avatarColor = avatarColorMap[discussion.authorAvatar] ?? 'bg-gray-400';

  return (
    <div 
      className="flex items-start gap-3 py-3.5 border-b border-gray-100 last:border-0 group cursor-pointer hover:bg-gray-50 -mx-4 px-4 rounded-lg transition-colors duration-200"
      onClick={onClick}
    >
      {/* Avatar */}
      <div
        className={`w-9 h-9 rounded-full ${avatarColor} flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5`}
      >
        {discussion.authorAvatar}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {/* Author + time + views */}
        <div className="flex items-center gap-2 text-xs text-gray-400 mb-1 flex-wrap">
          <span className="font-semibold text-gray-600">{discussion.author}</span>
          <span>·</span>
          <span>{discussion.timeAgo}</span>
          <span>·</span>
          <span className="flex items-center gap-1">
            <Eye size={11} />
            {discussion.views}
          </span>
        </div>

        {/* Title */}
        <p className="text-sm font-semibold text-gray-800 leading-snug group-hover:text-amber-600 transition-colors duration-200 line-clamp-2">
          {discussion.title}
        </p>

        {/* Indicators */}
        {(discussion.poll || discussion.mediaUrl) && (
          <div className="flex items-center gap-2 mt-1.5">
            {discussion.poll && (
              <span className="flex items-center gap-1 text-[10px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">
                <BarChart2 size={10} /> Poll
              </span>
            )}
            {discussion.mediaUrl && (
              <span className="flex items-center gap-1 text-[10px] font-bold text-violet-600 bg-violet-50 px-1.5 py-0.5 rounded">
                {discussion.mediaType === 'video' ? <Video size={10} /> : <ImageIcon size={10} />} 
                {discussion.mediaType === 'video' ? 'Video' : 'Image'}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Tag + replies */}
      <div className="flex flex-col items-end gap-2 shrink-0">
        <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${tagStyle}`}>
          {discussion.tag}
        </span>
        <div className="flex items-center gap-1 text-xs text-gray-400">
          <MessageSquare size={12} />
          <span>{discussion.replies}</span>
        </div>
      </div>
    </div>
  );
};

export default DiscussionItem;
