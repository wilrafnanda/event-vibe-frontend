function HeroSection() {
    return (
    <>
      <div className="absolute inset-0 z-0">
            <img className="w-full h-full object-cover" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_286c070383_e2523a4534d4901e.png"
          alt="cinematic wide shot of a massive concert crowd with hands raised under dramatic stage lights, moody "/>
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/80 to-white"></div>
      </div>
        
        <div className="relative text-center px-4 mt-40 mb-10 xl:mt-40">
            <span className="text-primary font-black uppercase tracking-[0.3em] text-xs mb-6 block">The Future of Ticketing</span>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-none uppercase">
            Feel the beat,<br/><span className="text-primary">Own the night</span>
            </h1>
            <p className="text-muted text-lg max-w-xl mx-auto font-medium">Discover, book, and experience the most exclusive events in your city with seamless digital ticketing.</p>
        </div>
    </>

    );
}

export default HeroSection;