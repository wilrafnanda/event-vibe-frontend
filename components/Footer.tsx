export default function Footer() {
    return (
         <footer className="bg-ghost border-t border-border pt-24 pb-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 mb-24">
          <div className="lg:col-span-2">
            <a href="#" className="text-2xl font-bold tracking-tighter mb-8 inline-block">Event<span className="text-primary">Vibe</span></a>
            <p className="text-muted max-w-sm font-medium leading-relaxed">Your gateway to unforgettable live experiences. Discover, connect, and immerse yourself in the moments that matter.</p>
            <div className="flex gap-6 mt-10">
              <a href="#" className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:bg-white hover:border-primary hover:text-primary transition-all shadow-sm"><i className="fa-brands fa-twitter"></i></a>
              <a href="#" className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:bg-white hover:border-primary hover:text-primary transition-all shadow-sm"><i className="fa-brands fa-instagram"></i></a>
              <a href="#" className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:bg-white hover:border-primary hover:text-primary transition-all shadow-sm"><i className="fa-brands fa-linkedin-in"></i></a>
            </div>
          </div>
          <div>
            <h5 className="font-black text-xs uppercase tracking-widest mb-8">Platform</h5>
            <ul className="space-y-4 text-sm font-bold text-muted">
              <li><a href="#" className="hover:text-primary transition-colors">Browse Events</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Create Event</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Pricing</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-black text-xs uppercase tracking-widest mb-8">Company</h5>
            <ul className="space-y-4 text-sm font-bold text-muted">
              <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Press</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-black text-xs uppercase tracking-widest mb-8">Support</h5>
            <ul className="space-y-4 text-sm font-bold text-muted">
              <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-6">
            <input type="email" placeholder="Join our newsletter" className="bg-white border border-border rounded-xl px-6 py-3 outline-none w-64 focus:border-primary transition-all font-medium text-sm"/>
            <button className="bg-ink text-white p-3 rounded-xl hover:bg-primary transition-all"><i className="fa-solid fa-arrow-right"></i></button>
          </div>
          <p className="text-muted text-xs font-bold uppercase tracking-widest">© 2024 EventVibe Ticketing Ltd. All rights reserved.</p>
        </div>
      </div>
    </footer>
  
    );
}