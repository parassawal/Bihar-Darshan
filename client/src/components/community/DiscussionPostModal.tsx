import { X, MessageSquare, Heart, Share2, MoreHorizontal } from 'lucide-react';
import type { Discussion } from '../../data/communityData';
import { useState } from 'react';

interface DiscussionPostModalProps {
  post: Discussion;
  onClose: () => void;
  isJoined?: boolean;
}

const avatarColorMap: Record<string, string> = {
  RK: 'bg-orange-400',
  NS: 'bg-purple-500',
  AR: 'bg-blue-500',
  TA: 'bg-teal-500',
  PV: 'bg-pink-500',
  BA: 'bg-indigo-500',
  WP: 'bg-green-500',
  ER: 'bg-red-500',
  YOU: 'bg-brand-gold',
};

const DiscussionPostModal = ({ post, onClose, isJoined }: DiscussionPostModalProps) => {
  const [comment, setComment] = useState('');
  const [pollVotes, setPollVotes] = useState<Record<string, number>>(
    post.poll ? Object.fromEntries(post.poll.options.map(o => [o.id, o.votes])) : {}
  );
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [mockComments, setMockComments] = useState([
    { id: 1, author: 'Priya Verma', avatar: 'PV', text: 'This is super helpful! I was planning to visit next month.', time: '1h ago' },
    { id: 2, author: 'Amit Singh', avatar: 'AS', text: 'Great points. Make sure to try the local food near the temple.', time: '3h ago' }
  ]);

  const avatarColor = avatarColorMap[post.authorAvatar] ?? 'bg-gray-400';

  const handleComment = () => {
    if (!comment.trim()) return;
    setMockComments([...mockComments, {
      id: Date.now(),
      author: 'You',
      avatar: 'YOU',
      text: comment,
      time: 'Just now'
    }]);
    setComment('');
  };

  const handleVote = (optionId: string) => {
    if (selectedOption || !isJoined) return;
    setSelectedOption(optionId);
    setPollVotes(prev => ({ ...prev, [optionId]: prev[optionId] + 1 }));
  };

  const totalVotes = Object.values(pollVotes).reduce((a, b) => a + b, 0);

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <h2 className="font-bold text-gray-800">Discussion</h2>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Content (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-gray-200">
          {/* Author Info */}
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-10 h-10 rounded-full ${avatarColor} flex items-center justify-center text-white text-sm font-bold shrink-0`}>
              {post.authorAvatar}
            </div>
            <div>
              <p className="font-bold text-gray-800 text-sm leading-none mb-1">{post.author}</p>
              <p className="text-xs text-gray-500">{post.timeAgo} · {post.views}</p>
            </div>
          </div>

          {/* Post Body */}
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">{post.title}</h1>
          <div className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6 space-y-3 whitespace-pre-line">
            {post.content || (
              <>
                <p>
                  I wanted to start a discussion about this topic. I've heard a lot of great things and wanted to gather some insights from the community.
                </p>
                <p>
                  What are your experiences and recommendations? Would love to hear your thoughts below!
                </p>
              </>
            )}
          </div>

          {/* Media Rendering */}
          {post.mediaUrl && (
            <div className="mb-6 rounded-2xl overflow-hidden border border-gray-100 bg-gray-50">
              {post.mediaType === 'video' ? (
                <video src={post.mediaUrl} controls className="w-full max-h-[400px] object-contain" />
              ) : (
                <img src={post.mediaUrl} alt="Post media" className="w-full max-h-[400px] object-contain" />
              )}
            </div>
          )}

          {/* Poll Rendering */}
          {post.poll && (
            <div className="mb-6 bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-100 text-accent-brown flex items-center justify-center text-xs">📊</span>
                {post.poll.question}
              </h3>
              <div className="space-y-3">
                {post.poll.options.map(option => {
                  const votes = pollVotes[option.id] || 0;
                  const percentage = totalVotes > 0 ? Math.round((votes / totalVotes) * 100) : 0;
                  const isSelected = selectedOption === option.id;

                  return (
                    <div 
                      key={option.id}
                      onClick={() => handleVote(option.id)}
                      className={`relative overflow-hidden border rounded-xl p-3 cursor-pointer transition-all ${
                        selectedOption 
                          ? isSelected ? 'border-brand-gold bg-brand-gray' : 'border-gray-100 bg-gray-50 opacity-80'
                          : 'border-gray-200 hover:border-amber-300 hover:bg-gray-50'
                      }`}
                    >
                      {/* Progress bar background */}
                      {selectedOption && (
                        <div 
                          className="absolute left-0 top-0 bottom-0 bg-amber-100/50 transition-all duration-500 ease-out" 
                          style={{ width: `${percentage}%` }}
                        />
                      )}
                      <div className="relative flex items-center justify-between z-10">
                        <span className={`text-sm font-semibold ${isSelected ? 'text-amber-800' : 'text-gray-700'}`}>
                          {option.text}
                        </span>
                        {selectedOption && (
                          <span className="text-xs font-bold text-gray-500 ml-4 shrink-0">
                            {percentage}% ({votes})
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-4 text-xs text-gray-400 font-medium">
                {totalVotes} total votes
              </div>
            </div>
          )}

          {/* Action Bar */}
          <div className="flex items-center justify-between py-3 border-y border-gray-100 mb-6">
            <div className="flex gap-4">
              <button className="flex items-center gap-1.5 text-gray-500 hover:text-accent-brown transition-colors text-sm font-medium">
                <Heart size={18} /> Like
              </button>
              <button className="flex items-center gap-1.5 text-gray-500 hover:text-accent-brown transition-colors text-sm font-medium">
                <MessageSquare size={18} /> {post.replies + mockComments.length}
              </button>
            </div>
            <div className="flex gap-2">
              <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                <Share2 size={18} />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                <MoreHorizontal size={18} />
              </button>
            </div>
          </div>

          {/* Comments Section */}
          <h3 className="font-bold text-gray-800 mb-4">Replies</h3>
          <div className="space-y-5 mb-6">
            {mockComments.map(c => (
              <div key={c.id} className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-full ${avatarColorMap[c.avatar] || 'bg-gray-400'} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                  {c.avatar}
                </div>
                <div className="flex-1 bg-gray-50 rounded-xl rounded-tl-none p-3 border border-gray-100">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="font-bold text-gray-800 text-sm">{c.author}</span>
                    <span className="text-[10px] text-gray-400">{c.time}</span>
                  </div>
                  <p className="text-sm text-gray-600">{c.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Comment Input */}
        <div className="p-4 border-t border-gray-100 bg-gray-50/50 rounded-b-2xl">
          {isJoined ? (
            <div className="flex gap-3">
              <input 
                type="text" 
                placeholder="Write a reply..."
                value={comment}
                onChange={e => setComment(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleComment()}
                className="flex-1 bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-colors"
              />
              <button 
                onClick={handleComment}
                disabled={!comment.trim()}
                className="px-5 py-2.5 bg-violet-600 hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-sm rounded-xl transition-all shadow-sm"
              >
                Reply
              </button>
            </div>
          ) : (
            <div className="text-center py-2">
              <p className="text-sm font-semibold text-gray-500">You must join the community to reply.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DiscussionPostModal;
