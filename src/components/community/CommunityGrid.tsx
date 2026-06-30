import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import CommunityListCard from './CommunityListCard';
import type { Community } from '../../data/communityData';

interface CommunityGridProps {
  communities: Community[];
  onSelect: (community: Community) => void;
}

const CommunityGrid = ({ communities, onSelect }: CommunityGridProps) => {
  const [visibleCount, setVisibleCount] = useState(9);

  const visible = communities.slice(0, visibleCount);
  const hasMore = visibleCount < communities.length;

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {visible.map((community) => (
          <CommunityListCard
            key={community.id}
            community={community}
            onSelect={onSelect}
          />
        ))}
      </div>

      {/* Load More */}
      {hasMore && (
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setVisibleCount((c) => c + 6)}
            className="flex items-center gap-2 px-6 py-3 rounded-xl border border-gray-200 text-gray-700 font-semibold text-sm hover:border-amber-400 hover:text-amber-600 hover:bg-amber-50 transition-all duration-200"
          >
            Load More Communities
            <ChevronDown size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default CommunityGrid;
