import { CalendarDays, Users, FileText, Wifi, CheckCircle, Trophy, ExternalLink } from 'lucide-react';
import type { Community, Contributor } from '../../data/communityData';
import { communityGuidelines } from '../../data/communityData';

interface CommunitySidebarProps {
  community: Community;
  contributors: Contributor[];
  onCreatePost?: () => void;
  isJoined?: boolean;
  onJoinClick?: () => void;
}

const medalColors = ['text-yellow-500', 'text-gray-400', 'text-amber-600'];

const CommunitySidebar = ({ community, contributors, onCreatePost, isJoined, onJoinClick }: CommunitySidebarProps) => {
  return (
    <aside className="flex flex-col gap-4">
      {/* About */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
        <h3 className="font-bold text-gray-800 text-sm mb-2">About this Community</h3>
        <p className="text-xs text-gray-500 leading-relaxed mb-3">
          {community.aboutText}
        </p>
        {community.createdOn && (
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <CalendarDays size={13} />
            Created on {community.createdOn}
          </div>
        )}

        <button 
          onClick={isJoined ? onCreatePost : onJoinClick}
          className={`w-full mt-4 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 shadow-sm hover:shadow-md active:scale-95 ${
            isJoined 
              ? 'bg-violet-600 hover:bg-violet-700 text-white hover:shadow-violet-500/30'
              : 'bg-amber-100 text-amber-700 hover:bg-amber-200 border border-amber-200'
          }`}
        >
          {isJoined ? 'Create New Post' : 'Join to Create Post'}
        </button>
      </div>

      {/* Community Stats */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
        <h3 className="font-bold text-gray-800 text-sm mb-3">Community Stats</h3>
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Users size={14} className="text-gray-400" />
              Total Members
            </div>
            <span className="font-bold text-sm text-gray-900">{community.members}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <FileText size={14} className="text-gray-400" />
              Total Posts
            </div>
            <span className="font-bold text-sm text-gray-900">{community.posts}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Wifi size={14} className="text-emerald-500" />
              Online Now
            </div>
            <span className="font-bold text-sm text-emerald-600">{community.online}</span>
          </div>
        </div>
      </div>

      {/* Top Contributors */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-gray-800 text-sm flex items-center gap-1.5">
            <Trophy size={14} className="text-amber-500" />
            Top Contributors
          </h3>
        </div>
        <div className="space-y-3">
          {contributors.map((c, i) => (
            <div key={c.id} className="flex items-center gap-3">
              {/* Rank medal */}
              <span className={`text-xs font-black w-4 text-center ${medalColors[i] ?? 'text-gray-400'}`}>
                {i < 3 ? ['🥇', '🥈', '🥉'][i] : `#${i + 1}`}
              </span>
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-full ${c.color} flex items-center justify-center text-white text-xs font-bold shrink-0`}
              >
                {c.avatar}
              </div>
              {/* Name + points */}
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-gray-800 truncate">{c.name}</p>
              </div>
              <span className="text-xs font-bold text-amber-600 shrink-0">
                {c.points.toLocaleString()} pts
              </span>
            </div>
          ))}
        </div>
        <button className="w-full mt-3 pt-3 border-t border-gray-100 text-xs font-semibold text-violet-600 hover:text-violet-700 flex items-center justify-center gap-1 transition-colors duration-200">
          View Leaderboard
          <ExternalLink size={11} />
        </button>
      </div>

      {/* Community Guidelines */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
        <h3 className="font-bold text-gray-800 text-sm mb-3">Community Guidelines</h3>
        <ul className="space-y-2">
          {communityGuidelines.map((guideline) => (
            <li key={guideline} className="flex items-start gap-2 text-xs text-gray-600">
              <CheckCircle size={13} className="text-emerald-500 shrink-0 mt-0.5" />
              {guideline}
            </li>
          ))}
        </ul>
        <button className="w-full mt-3 pt-3 border-t border-gray-100 text-xs font-semibold text-violet-600 hover:text-violet-700 flex items-center justify-center gap-1 transition-colors duration-200">
          View All Guidelines
          <ExternalLink size={11} />
        </button>
      </div>
    </aside>
  );
};

export default CommunitySidebar;
