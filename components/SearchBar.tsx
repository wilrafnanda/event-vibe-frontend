import Button from "@/components/ui/Button";

interface SearchFieldProps {
  label: string;
  icon: string;
  placeholder: string;
  type?: string;
  isLast?: boolean;
}

function SearchField({
  label,
  icon,
  placeholder,
  type = "text",
  isLast = false,
}: SearchFieldProps) {
  return (
    <div
      className={`flex-1 w-full px-8 py-4 ${
        !isLast ? "border-b md:border-b-0 md:border-r border-border" : ""
      }`}
    >
      <label className="block text-[10px] font-black uppercase tracking-widest text-muted mb-1">
        {label}
      </label>
      <div className="flex items-center gap-3">
        <i className={`${icon} text-xs text-muted`} />
        <input
          type={type}
          placeholder={placeholder}
          className="w-full bg-transparent outline-none text-ink font-bold placeholder:text-muted/40 text-sm"
        />
      </div>
    </div>
  );
}

export default function SearchBar() {
  return (
    <div
      className="relative z-20 w-[90%] max-w-5xl bg-white p-2 rounded-3xl flex flex-col md:flex-row items-center shadow-2xl border border-border xl:mb-20"
      id="search-bar"
    >
      <SearchField
        label="What"
        icon="fa-solid fa-magnifying-glass"
        placeholder="Find events"
      />
      <SearchField
        label="Where"
        icon="fa-solid fa-location-dot"
        placeholder="City or venue"
      />
      <SearchField
        label="When"
        icon="fa-solid fa-calendar-day"
        placeholder="Select dates"
        type="date"
        isLast
      />

      <Button
        type="button"
        size="lg"
        fullWidth={false}
        className="w-full md:w-auto px-10 py-5 rounded-2xl font-black text-sm"
      >
        Get Started
      </Button>
    </div>
  );
}