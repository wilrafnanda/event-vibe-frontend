'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query'
import EventCard from './EventCard';

export default function FutureEventSection({
  title = 'Featured events',
  subtitle,
  autoplay = true,
  autoplaySpeed = 3000,
  className = '',
}) {
  // 1. State to store the events from the backend
  const [featuredEvents, setFeaturedEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // 2. Carousel index & responsive visible cards
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);
  const [isPaused, setIsPaused] = useState(false);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);


  const { isPending, isError, data, error } = useQuery({
    queryKey: ['featuredEvents'],
    staleTime:1000 * 60 * 60 * 24,
    refetchInterval: 1000 * 60 * 60 * 24,
    queryFn: async () => {
      const result = await fetch('http://localhost:5000/api/events/public');
      const json = await result.json();
      return Array.isArray(json) ? json : json.data || json.events || [];
    },
  })

  useEffect(() => {
  if (data) {
    setFeaturedEvents(data);
  }
}, [data]);
  
  


  // 3. Fetch public events from API on mount
  // useEffect(() => {
  //   const fetchEvents = async () => {
  //     try {
  //       setIsLoading(true);
  //       const res = await fetch('http://localhost:5000/api/events/public');
  //       if (!res.ok) {
  //         throw new Error(`HTTP error! status: ${res.status}`);
  //       }
  //       const json = await res.json();
  //       // The API returns { success: true, data: [...] } or array directly
  //       const eventsArray = Array.isArray(json)
  //         ? json
  //         : json.data || json.events || [];

  //       setFeaturedEvents(eventsArray);
  //     } catch (err) {
  //       console.error('Failed to fetch public events:', err);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchEvents();
  // }, []);

  // Format date helper (handles ISO string startDate from MongoDB)
  const formatDate = (dateVal, startDateVal) => {
    const raw = dateVal || startDateVal;
    if (!raw) return 'Date TBA';
    try {
      const d = new Date(raw);
      if (isNaN(d.getTime())) return raw;
      return d.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return raw;
    }
  };

  // Format price helper
  const formatPrice = (priceVal) => {
    if (priceVal === 0 || priceVal === '0' || priceVal === 'Free' || priceVal === 'free') return 'Free';
    if (!priceVal) return 'Free';
    return !isNaN(Number(priceVal)) ? `$${priceVal}` : priceVal;
  };

  // 4. Responsive calculation for number of visible cards
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setVisibleCards(1.05);
      } else if (width < 1024) {
        setVisibleCards(1.8);
      } else {
        setVisibleCards(2.6);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 5. Calculate maximum scroll index
  const totalEvents = featuredEvents.length;
  const maxIndex = Math.max(0, Math.ceil(totalEvents - visibleCards));

  // Keep currentIndex in bounds if visibleCards or events change
  useEffect(() => {
    setCurrentIndex((prev) => Math.min(prev, maxIndex));
  }, [maxIndex]);

  // 6. Slide Navigation Handlers (Simple Next / Prev)
  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  // 7. Autoplay (optional)
  useEffect(() => {
    if (!autoplay || isPaused || totalEvents <= visibleCards) return;

    const timer = setInterval(() => {
      handleNext();
    }, autoplaySpeed);

    return () => clearInterval(timer);
  }, [autoplay, isPaused, autoplaySpeed, handleNext, totalEvents, visibleCards]);

  // 8. Touch & Drag Handlers for swipe support
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
  };

  const handleMouseDown = (e) => {
    isDragging.current = true;
    dragStartX.current = e.clientX;
  };

  const handleMouseUp = (e) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const diff = dragStartX.current - e.clientX;
    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
  };

  const handleMouseLeave = () => {
    isDragging.current = false;
    setIsPaused(false);
  };

  // If loading or no events, display graceful states
  if (isPending) {
    return (
      <section className={`w-full py-8 px-4 sm:px-6 lg:px-8 max-w-[1700px] mx-auto ${className}`}>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-6">{title}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-80 bg-slate-200 animate-pulse rounded-2xl" />
          ))}
        </div>
      </section>
    );
  }

  if (totalEvents === 0) {
    return (
      <section className={`w-full py-12 px-4 sm:px-6 lg:px-8 max-w-[1700px] mx-auto ${className}`}>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-6">{title}</h2>
        <div className="flex flex-col items-center justify-center py-12 px-4 text-center border border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
          <div className="w-16 h-16 mb-4 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8 stroke-[1.5]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
              <line x1="16" x2="16" y1="2" y2="6" />
              <line x1="8" x2="8" y1="2" y2="6" />
              <line x1="3" x2="21" y1="10" y2="10" />
              <line x1="10" x2="14" y1="14" y2="18" />
              <line x1="14" x2="10" y1="14" y2="18" />
            </svg>
          </div>
          <h3 className="text-base font-semibold text-slate-800 mb-1">No Featured Events</h3>
          <p className="text-sm text-slate-500 max-w-sm">
            There are no featured events scheduled at the moment. Please check back soon!
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      className={`w-full pt-1 sm:pt-2 pb-6 px-4 sm:px-6 lg:px-8 max-w-[1700px] mx-auto select-none ${className}`}
      aria-label={title}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={handleMouseLeave}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-3.5 sm:mb-4">
        <div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900">
            {title}
          </h2>
          {subtitle && <p className="text-slate-500 mt-0.5 text-sm sm:text-base">{subtitle}</p>}
        </div>
      </div>

      {/* Carousel Container */}
      <div
        className="relative overflow-hidden cursor-grab active:cursor-grabbing py-3 -my-2"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        {/* Carousel Track */}
        <div
          className="flex items-stretch -mx-3 sm:-mx-3.5 transition-transform duration-500 ease-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / visibleCards)}%)`,
          }}
        >
          {featuredEvents.map((event, idx) => (
            <div
              key={event._id || event.id || idx}
              className="px-3 sm:px-3.5 shrink-0 flex flex-col"
              style={{
                width: `${100 / visibleCards}%`,
              }}
            >
              <EventCard
                id={event._id || event.id}
                eventName={event.eventName || event.title || 'Untitled Event'}
                date={formatDate(event.date, event.startDate)}
                location={event.location || event.venue || 'Location TBA'}
                image={event.image || event.bannerImage || event.imageUrl}
                status={event.status || 'En vente dès maintenant'}
                category={event.category}
                price={formatPrice(event.price)}
                href={event.href || `/events/${event._id || event.id}`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Carousel Navigation Controls (Bottom Right as in image) */}
      {totalEvents > visibleCards && (
        <div className="mt-4 flex items-center justify-end gap-2.5">
          {/* Previous Button (Grey Circle) */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous events"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center bg-slate-300 hover:bg-slate-400 text-slate-700 transition-all duration-200 active:scale-95 shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 stroke-[2.4]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>

          {/* Next Button (Cyan Circle) */}
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next events"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center bg-[#00c8e6] hover:bg-[#00b4d8] text-white transition-all duration-200 active:scale-95 shadow-md shadow-cyan-500/25 focus:outline-none focus:ring-2 focus:ring-[#00c8e6]/50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 stroke-[2.4]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>
      )}
    </section>
  );
}
