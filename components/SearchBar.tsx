export default function SearchBar() {
    return (
        <div className="relative z-20 w-[90%] max-w-5xl bg-white p-2 rounded-3xl flex flex-col md:flex-row items-center shadow-2xl border border-border xl:mb-20" id="iuocd">
        <div className="flex-1 w-full px-8 py-4 border-b md:border-b-0 md:border-r border-border">
          <label className="block text-[10px] font-black uppercase tracking-widest text-muted mb-1">What</label>
          <div className="flex items-center gap-3">
            <i className="fa-solid fa-magnifying-glass text-xs text-muted"></i>
            <input type="text" placeholder="Find events," className="w-full bg-transparent outline-none text-ink font-bold placeholder:text-muted/40"/>
          </div>
        </div>
        <div className="flex-1 w-full px-8 py-4 border-b md:border-b-0 md:border-r border-border">
          <label className="block text-[10px] font-black uppercase tracking-widest text-muted mb-1">Where</label>
          <div className="flex items-center gap-3">
            <i className="fa-solid fa-location-dot text-xs text-muted"></i>
            <input type="text" placeholder="City or venue" className="w-full bg-transparent outline-none text-ink font-bold placeholder:text-muted/40"/>
          </div>
        </div>
        <div className="flex-1 w-full px-8 py-4">
          <label className="block text-[10px] font-black uppercase tracking-widest text-muted mb-1">When</label>
          <div className="flex items-center gap-3">
            <i className="fa-solid fa-calendar-day text-xs text-muted"></i>
            <input type="date" placeholder="Select dates" className="w-full bg-transparent outline-none text-ink font-bold placeholder:text-muted/40"/>
          </div>
        </div>
        <button className="w-full md:w-auto bg-primary hover:bg-[#a333ff] text-white px-10 py-5 rounded-2xl font-black transition-all duration-300 shadow-lg shadow-primary/20">
          Get Started
        </button>
      </div>
  
    );
}