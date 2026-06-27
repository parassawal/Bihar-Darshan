import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export type CategoryOption =
  | 'All Categories'
  | 'Travel'
  | 'Culture'
  | 'Food'
  | 'Events'
  | 'Photography'
  | 'History';

const primaryCategories: { label: CategoryOption; emoji: string }[] = [
  { label: 'All Categories', emoji: '' },
  { label: 'Travel',         emoji: '✈️' },
  { label: 'Culture',        emoji: '🎭' },
  { label: 'Food',           emoji: '🍛' },
  { label: 'Events',         emoji: '📅' },
  { label: 'Photography',    emoji: '📷' },
  { label: 'History',        emoji: '🏺' },
];

const moreCategories = ['Agriculture', 'Tribes', 'Students', 'Sports'];

interface CategoryFilterProps {
  active: CategoryOption;
  onChange: (cat: CategoryOption) => void;
}

const CategoryFilter = ({ active, onChange }: CategoryFilterProps) => {
  const [moreOpen, setMoreOpen] = useState(false);

  return (
    <div className="flex items-center gap-2 flex-wrap relative">
      {primaryCategories.map(({ label, emoji }) => {
        const isActive = active === label;
        return (
          <button
            key={label}
            onClick={() => onChange(label)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
              isActive
                ? 'bg-amber-400 text-black shadow-md shadow-amber-400/30'
                : 'bg-white border border-gray-200 text-gray-600 hover:border-amber-400 hover:text-amber-600'
            }`}
          >
            {emoji && <span className="text-sm">{emoji}</span>}
            {label}
          </button>
        );
      })}

      {/* More dropdown */}
      <div className="relative">
        <button
          onClick={() => setMoreOpen(!moreOpen)}
          className="flex items-center gap-1 px-4 py-2 rounded-full text-sm font-semibold border border-gray-200 bg-white text-gray-600 hover:border-amber-400 hover:text-amber-600 transition-all duration-200"
        >
          More
          <ChevronDown
            size={14}
            className={`transition-transform duration-200 ${moreOpen ? 'rotate-180' : ''}`}
          />
        </button>

        {moreOpen && (
          <div className="absolute top-full mt-2 left-0 z-50 bg-white border border-gray-100 rounded-xl shadow-xl overflow-hidden min-w-[140px]">
            {moreCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setMoreOpen(false);
                }}
                className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-700 transition-colors"
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryFilter;
