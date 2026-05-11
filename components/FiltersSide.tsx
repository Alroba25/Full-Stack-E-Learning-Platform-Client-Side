import { Checkbox } from "@/components/ui/checkbox";
import {
  FilterX,
  LayoutGrid,
  Star,
  SlidersHorizontal,
  BarChart,
} from "lucide-react";
import type { IFilter } from "@/Interfaces";
export const FiltersSide = ({
  filter,
  handleCategoryChange,
  handleRatingChange,
  handleLevelChange,
  clearFilters,
}: {
  filter: IFilter;
  handleCategoryChange: (category: string) => void;
  handleRatingChange: (rating: number | null) => void;
  handleLevelChange: (level: string) => void;
  clearFilters: () => void;
}) => {
  return (
    <aside className="hidden lg:flex flex-col gap-12 sticky top-24 h-fit pb-12 w-full lg:w-[250px] shrink-0">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold flex items-center gap-3">
          <SlidersHorizontal className="size-5 text-white/60" />
          Filters
        </h2>
        {(filter.category.length > 0 ||
          filter.rating ||
          filter.level.length > 0) && (
          <button
            onClick={clearFilters}
            className="text-xs text-[#888] hover:text-white transition-colors flex items-center gap-1 bg-white/5 px-2 py-1 rounded-md border border-white/5"
          >
            <FilterX className="size-3" />
            Reset
          </button>
        )}
      </div>

      <div className="space-y-10">
        {/* Category Filter */}
        <div className="filter-group">
          <h3 className="text-sm font-bold uppercase tracking-widest text-white/40 mb-6 flex items-center gap-2">
            <LayoutGrid className="size-4" />
            Categories
          </h3>
          <div className="flex flex-col gap-4">
            {["Programming", "Data Science", "Design", "Business", "Marketing"] .map((cat) => (
              <label
                key={cat}
                className="flex items-center gap-3 group cursor-pointer"
              >
                <Checkbox
                  id={cat}
                  checked={filter.category.includes(cat)}
                  onCheckedChange={() => handleCategoryChange(cat)}
                  className="border-white/10 data-[state=checked]:bg-white data-[state=checked]:text-black"
                />
                <span className="text-[#888] text-[0.95rem] group-hover:text-white transition-colors">
                  {cat}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Rating Filter */}
        <div className="filter-group">
          <h3 className="text-sm font-bold uppercase tracking-widest text-white/40 mb-6 flex items-center gap-2">
            <Star className="size-4" />
            Min. Rating
          </h3>
          <div className="flex flex-col gap-4">
            {[4.5, 4.0, 3.5, 3.0].map((rating) => (
              <label
                key={rating}
                className="flex items-center gap-3 group cursor-pointer"
              >
                <Checkbox
                  id={rating.toString()}
                  checked={filter.rating === rating}
                  onCheckedChange={() => handleRatingChange(rating)}
                  className="border-white/10 data-[state=checked]:bg-white data-[state=checked]:text-black"
                />
                <div className="flex items-center gap-2">
                  <span className="text-[#888] text-[0.95rem] group-hover:text-white transition-colors">
                    {rating} & up
                  </span>
                  <div className="flex text-[#ffb800] text-[0.7rem]">
                    {"★".repeat(Math.floor(rating))}
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Level Filter */}
        <div className="filter-group">
          <h3 className="text-sm font-bold uppercase tracking-widest text-white/40 mb-6 flex items-center gap-2">
            <BarChart className="size-4" />
            Experience Level
          </h3>
          <div className="flex flex-col gap-4">
            {["Beginner", "Intermediate", "Advanced"].map(
              (level) => (
                <label
                  key={level}
                  className="flex items-center gap-3 group cursor-pointer"
                >
                  <Checkbox
                    id={level}
                    checked={filter.level.includes(level)}
                    onCheckedChange={() => handleLevelChange(level)}
                    className="border-white/10 data-[state=checked]:bg-white data-[state=checked]:text-black"
                  />
                  <span className="text-[#888] text-[0.95rem] group-hover:text-white transition-colors">
                    {level}
                  </span>
                </label>
              ),
            )}
          </div>
        </div>
      </div>
    </aside>
  );
};
