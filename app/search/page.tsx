import SearchNavBar from '@/components/search/SearchNavBar';
import FutureEventSection from '@/components/search/FutureEventSection';
import React from 'react';
import Footer from '@/components/Footer';

export default function SearchPage() {
  return (
    <div className="text-slate-900 min-h-screen flex flex-col antialiased selection:bg-purple-200 selection:text-purple-900">
      <SearchNavBar />
      <main className="flex-1 pt-2 pb-6">
        <FutureEventSection title="Featured events" subtitle="Discover the best events happening near you" className='rounded-sm' />
      </main>
      <Footer/>
    </div>
  );
}

