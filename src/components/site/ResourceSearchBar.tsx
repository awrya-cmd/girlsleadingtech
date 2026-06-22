import { Search, X } from "lucide-react";

export function ResourceSearchBar({
  value,
  onChange,
  placeholder = "Search...",
  className = "",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  className?: string;
}) {
  return (
    <div className={`relative mx-auto mb-8 w-full max-w-2xl ${className}`}>
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#d955a4] pointer-events-none">
        <Search className="h-4 w-4" />
      </div>
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-full border-2 border-black bg-[#fffdf9] py-3 pl-11 pr-11 text-sm font-medium text-gray-900 placeholder:text-gray-400 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] outline-none transition-all focus:shadow-[6px_6px_0px_0px_#d955a4] focus:-translate-y-0.5"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Clear search"
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-gray-500 hover:text-[#d955a4]"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}

export function filterBySearch<T extends Record<string, any>>(
  items: T[],
  query: string,
  fields: (keyof T | string)[],
): T[] {
  const q = query.trim().toLowerCase();
  if (!q) return items;
  return items.filter((item) =>
    fields.some((f) => {
      const v = (item as any)[f as string];
      if (v == null) return false;
      if (Array.isArray(v)) return v.some((x) => String(x).toLowerCase().includes(q));
      return String(v).toLowerCase().includes(q);
    }),
  );
}
