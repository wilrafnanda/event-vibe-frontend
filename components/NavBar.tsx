'use client';

import Link from "next/link";


 
export default function NavBar() {

    return (
    <nav
      className=" fixed top-6 left-1/2 -translate-x-1/2 z-1000 0 w-[90%] max-w-7xl bg-white/80 backdrop-blur-md rounded-4xl px-8 py-4 flex justify-between items-center border border-border shadow-xl"
    >
      <div className="flex items-center gap-8">
        <Link href="/" className="text-3xl font-bold tracking-tighter">
          Event<span className="text-primary">Vibe</span>
        </Link>
        <div className="hidden md:flex gap-6 text-sm font-medium">
         
          <Link href="/search/" className="relative nav-link-underline pb-1 font-semibold">
            Event Search
          </Link>
         
        </div>
      </div>
      <div className=" flex items-center gap-4">
        <button className=" hidden text-sm font-semibold text-primary border py-3 px-5 border-primary border-2 rounded-full font-medium hover:text-primary transition-colors md:flex ">
          Create tickets
        </button>
        <Link
          href="/auth/login"
          className="bg-primary hover:bg-[#a333ff] text-white px-8 py-3 rounded-full text-sm font-semibold transition-all duration-300 transform hover:scale-105 shadow-md inline-block text-center"
        >
          Sign up
        </Link>
    
      </div>
      
  
    </nav>
    );
}

