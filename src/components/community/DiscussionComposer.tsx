import { useState } from 'react';
import { Type, Image, BarChart2, Video, X } from 'lucide-react';
import type { Discussion } from '../../data/communityData';

const composerTabs = [
  { label: 'Text',  icon: <Type size={13} />       },
  { label: 'Image', icon: <Image size={13} />      },
  { label: 'Poll',  icon: <BarChart2 size={13} />  },
  { label: 'Video', icon: <Video size={13} />      },
];

interface DiscussionComposerProps {
  onPost?: (post: Omit<Discussion, 'id' | 'author' | 'authorAvatar' | 'timeAgo' | 'views' | 'replies' | 'communityId'>) => void;
  isJoined?: boolean;
  onJoinClick?: () => void;
}

const DiscussionComposer = ({ onPost, isJoined, onJoinClick }: DiscussionComposerProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [title, setTitle] = useState('');
  const [tag, setTag] = useState<Discussion['tag']>('Tips');

  const handlePost = () => {
    if (!title.trim()) return;
    onPost?.({ title, tag, tagColor: 'bg-green-100 text-green-700' });
    setTitle('');
    setIsExpanded(false);
  };

  if (!isJoined) {
    return (
      <div className="bg-white rounded-xl border border-gray-100 p-8 shadow-sm flex flex-col items-center justify-center text-center">
        <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-3">
          <Type size={20} className="text-gray-400" />
        </div>
        <h3 className="font-bold text-gray-800 mb-1">Join the conversation</h3>
        <p className="text-sm text-gray-500 mb-4">You must join this community to create posts and participate in discussions.</p>
        <button 
          onClick={onJoinClick}
          className="px-6 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-bold text-sm transition-all duration-200 shadow-sm"
        >
          Join Community
        </button>
      </div>
    );
  }

  if (isExpanded) {
    return (
      <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm animate-in fade-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-gray-800">Create a New Post</h3>
          <button onClick={() => setIsExpanded(false)} className="text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </div>
        
        <input
          type="text"
          placeholder="Title of your discussion..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors duration-200 mb-3 font-semibold"
          autoFocus
        />

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-gray-500">Tag:</span>
            <select
              value={tag}
              onChange={(e) => setTag(e.target.value as Discussion['tag'])}
              className="bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 text-xs font-semibold text-gray-700 focus:outline-none focus:border-amber-400"
            >
              <option value="Destinations">Destinations</option>
              <option value="Tips">Tips</option>
              <option value="Events">Events</option>
              <option value="Itinerary">Itinerary</option>
            </select>
          </div>
          <button 
            onClick={handlePost}
            disabled={!title.trim()}
            className="px-6 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-bold text-sm transition-all duration-200 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Post
          </button>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm cursor-pointer hover:border-amber-200 transition-colors"
      onClick={() => setIsExpanded(true)}
    >
      {/* Input row */}
      <div className="flex items-center gap-3 mb-3">
        <div className="w-9 h-9 rounded-full bg-amber-400 flex items-center justify-center text-black font-bold text-sm shrink-0">
          You
        </div>
        <div className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-400 transition-colors duration-200">
          What do you want to discuss today?
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          {composerTabs.map(({ label, icon }) => (
            <div
              key={label}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-gray-500"
            >
              {icon}
              {label}
            </div>
          ))}
        </div>
        <button className="px-5 py-2 rounded-xl bg-violet-600 text-white font-bold text-sm shadow-sm pointer-events-none">
          Post
        </button>
      </div>
    </div>
  );
};

export default DiscussionComposer;
