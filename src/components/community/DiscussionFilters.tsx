import { ChevronDown } from 'lucide-react';

export type DiscussionFilter = 'All Posts' | 'Questions' | 'Tips' | 'Itineraries';

const filterOptions: DiscussionFilter[] = ['All Posts', 'Questions', 'Tips', 'Itineraries'];

interface DiscussionFiltersProps {
  active: DiscussionFilter;
  onChange: (filter: DiscussionFilter) => void;
}

const DiscussionFilters = ({ active, onChange }: DiscussionFiltersProps) => {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      {filterOptions.map((label) => {
        const isActive = active === label;
        return (
          <button
            key={label}
            onClick={() => onChange(label)}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 ${
              isActive
                ? 'bg-amber-400 text-black'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            {label}
          </button>
        );
      })}

      {/* Latest sort */}
      <button className="flex items-center gap-1 ml-auto px-3 py-1.5 text-sm font-semibold text-gray-600 hover:text-gray-900 rounded-full hover:bg-gray-100 transition-all duration-200">
        Latest
        <ChevronDown size={13} />
      </button>
    </div>
  );
};

export default DiscussionFilters;
