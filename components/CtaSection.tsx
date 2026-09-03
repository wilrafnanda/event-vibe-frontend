export default function CtaSection() {
    return (
       <section className="py-40 px-4 bg-ink text-white overflow-hidden">

            
            <div className="max-w-4xl mx-auto text-center relative z-10">
                <span className="text-primary font-black uppercase tracking-[0.5em] text-[10px] mb-8 block">Ready to dive in?</span>
                    <h2 className="text-6xl md:text-8xl font-black tracking-tighter mb-10 uppercase leading-none">
                            Experience<br/>the vibe
                    </h2>
                <p className="text-xl text-muted mb-12 max-w-2xl mx-auto font-medium">Join thousands of creators and fans discovering the most electrifying live experiences on the planet.</p>
                <button className="bg-white text-ink px-12 py-6 rounded-full font-black text-xl hover:bg-primary hover:text-white transition-all transform hover:scale-105 active:scale-95 inline-flex items-center gap-4">
                    Explore All Events
                <i className="fa-solid fa-arrow-right"></i>
                </button>
            </div>
    </section>
    );
}