import SearchNavBar from '@/components/search/SearchNavBar';
import FutureEventSection from '@/components/search/FutureEventSection';
import React from 'react';

export default function SearchPage() {
  return (
    <div className="text-slate-900 min-h-screen flex flex-col antialiased selection:bg-purple-200 selection:text-purple-900">
      <SearchNavBar />
      <main className="flex-1 py-6">
        <FutureEventSection />
        
      </main>
    </div>
  );
}

