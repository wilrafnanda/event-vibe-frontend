'use client';

import React from 'react'
import Link from "next/link";
import { useAuth } from '@/context/AuthContext';

export default function SearchNavBar() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className="w-full bg-white border-b border-slate-200 sticky top-0 z-50">
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* <!-- Left Navigation & Brand --> */}
        <div className="flex items-center gap-8">
        {/* <!-- Logo --> */}
           <Link href="/" className="text-3xl font-bold tracking-tighter">
                    Event<span className="text-primary">Vibe</span>
            </Link>
            {/* <!-- Desktop Nav Links --> */}
            <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-slate-800">
                <Link className="hover:text-[#8b5cf6] transition-colors py-2" href="#">Discover events</Link>
                <button className="inline-flex items-center gap-1.5 hover:text-[#8b5cf6] transition-colors py-2 focus:outline-none" type="button">
                    <span className="">Events by location</span>
                    {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"   data-lucide="chevron-down" aria-hidden="true" className="lucide lucide-chevron-down w-4 h-4 text-slate-600 stroke-[2.2]"><path d="m6 9 6 6 6-6"></path></svg> */}
                </button>
            </nav>
        </div>
        {/* <!-- Center Search Bar --> */}
        <div className="flex-1 max-w-md mx-2 sm:mx-6">
            <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search" aria-hidden="true"><path d="m21 21-4.34-4.34"></path><circle cx="11" cy="11" r="8"></circle></svg>
                    {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="search" aria-hidden="true" className="lucide lucide-search w-4 h-4"><path d="m21 21-4.34-4.34"></path><circle cx="11" cy="11" r="8"></circle></svg> */}
                </div>
            <   input className="w-full pl-10 pr-4 py-2.5 bg-slate-50 hover:bg-slate-100/75 focus:bg-white text-sm text-slate-900 placeholder:text-slate-400 border border-slate-200 rounded-full focus:ring-2 focus:ring-[#8b5cf6] focus:border-transparent outline-none transition-all" placeholder="Rechercher des événements" type="text"/>
            </div>
        </div>
        {/* <!-- Trailing Action Buttons --> */}
            <div className="flex items-center gap-3 shrink-0">
                <Link className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-slate-900 text-slate-900 font-semibold text-xs sm:text-sm hover:bg-slate-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-slate-900" href="#">
                    <span className="">Create events</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-log-in" aria-hidden="true"><path d="M15 3h6v6"></path><path d="M10 14 21 3"></path><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path></svg>
                    {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="external-link" aria-hidden="true" className="lucide lucide-external-link w-3.5 h-3.5 stroke-[2.5]"><path d="M15 3h6v6"></path><path d="M10 14 21 3"></path><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path></svg> */}
                </Link>
                {!isAuthenticated ? (
                  <Link className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-950 hover:bg-[#8b5cf6] text-white font-semibold text-xs sm:text-sm transition-colors duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#8b5cf6]" href="/auth/login">
                      <span className="">Se connecter</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right" aria-hidden="true"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                  </Link>
                ) : (
                  <></>
                )}
            </div>
    </div>
    </header>
  )
}
