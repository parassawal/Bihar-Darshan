import { motion } from "framer-motion";
import { ThumbsUp, ThumbsDown, Share2, Clock } from "lucide-react";
import type { PostData } from "../../types/community";

interface PostCardProps {
  post: PostData;
  index: number;
  currentUser: any;
  onLike: (post: PostData) => void;
  onDislike: (post: PostData) => void;
  onShare: (post: PostData) => void;
  showCommunityBadge?: boolean;
}

const PostCard = ({
  post,
  index,
  currentUser,
  onLike,
  onDislike,
  onShare,
  showCommunityBadge = false,
}: PostCardProps) => {
  const formatTime = (ts: { seconds: number } | null) => {
    if (!ts) return "just now";
    const diff = Math.floor(Date.now() / 1000 - ts.seconds);
    if (diff < 60) return "just now";
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
    return new Date(ts.seconds * 1000).toLocaleDateString();
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="bg-white rounded-[1.5rem] overflow-hidden shadow-[0_4px_20px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-300 border border-gray-100"
    >
      {/* Post Header */}
      <div className="flex items-center gap-3 px-6 pt-6 pb-4">
        <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden shrink-0 border border-gray-200">
          {post.authorPhoto ? (
            <img src={post.authorPhoto} alt="" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-brand-gold/20 to-brand-gold/5 flex items-center justify-center">
              <span className="text-sm font-bold text-brand-gold">{post.authorName[0]}</span>
            </div>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="text-[15px] font-bold text-gray-900 truncate">{post.authorName}</p>
            {showCommunityBadge && (
              <>
                <span className="text-gray-300">•</span>
                <span className="text-xs font-bold text-brand-gold bg-brand-gold/10 px-2 py-0.5 rounded-full border border-brand-gold/20">
                  c/{post.communityName}
                </span>
              </>
            )}
          </div>
          <p className="text-xs text-gray-400 flex items-center gap-1 font-medium mt-0.5">
            <Clock size={11} />
            {formatTime(post.createdAt)}
          </p>
        </div>
      </div>

      {/* Post Content */}
      <div className="px-6 pb-4">
        <h2 className="text-[19px] font-bold text-brand-dark mb-2.5 leading-snug">{post.title}</h2>
        {post.body && (
          <p className="text-gray-600 text-[15px] leading-relaxed whitespace-pre-wrap">
            {post.body.split(/Read more at:/i)[0].trim()}
          </p>
        )}
      </div>

      {/* Post Image */}
      {post.imageUrl && (
        <div className="px-6 pb-4">
          <img
            src={post.imageUrl}
            alt=""
            className="w-full max-h-[500px] object-cover rounded-2xl border border-gray-100"
          />
        </div>
      )}

      {/* Post Actions */}
      <div className="flex items-center gap-1 px-5 pb-4 pt-1">
        {/* Like */}
        <button
          onClick={() => onLike(post)}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
            currentUser && post.likedBy.includes(currentUser.uid)
              ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20"
              : "bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-brand-dark/80 border border-transparent"
          }`}
        >
          <ThumbsUp size={16} />
          {post.likes > 0 && post.likes}
        </button>

        {/* Dislike */}
        <button
          onClick={() => onDislike(post)}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
            currentUser && post.dislikedBy.includes(currentUser.uid)
              ? "bg-red-500/15 text-red-400 border border-red-500/20"
              : "bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-brand-dark/80 border border-transparent"
          }`}
        >
          <ThumbsDown size={16} />
          {post.dislikes > 0 && post.dislikes}
        </button>

        {/* Share */}
        <button
          onClick={() => onShare(post)}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-semibold bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-brand-dark/80 transition-all ml-auto"
        >
          <Share2 size={16} />
          {post.shares > 0 && post.shares}
          <span className="hidden sm:inline">Share</span>
        </button>
      </div>
    </motion.article>
  );
};

export default PostCard;
