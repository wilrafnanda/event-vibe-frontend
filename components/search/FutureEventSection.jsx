'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import EventCard from './EventCard';

const DEFAULT_EVENTS = [
  {
    id: '1',
    title: 'HENRY ATE CELEBRATES 30 YEARS OF SLAP IN THE FACE ANNIVERSARY TOUR',
    date: 'Vendredi 13 Novembre',
    location: 'Railways Cafe Irene, Pretoria',
    status: 'En vente dès maintenant',
    image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=800&auto=format&fit=crop',
    category: 'Concert',
    price: '250 ZAR',
  },
  {
    id: '2',
    title: 'NarowBi: Party + Market',
    date: 'samedi 26 septembre',
    location: 'Flame Studios, Constitution Hill, Johannesburg',
    status: 'En vente dès maintenant',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800&auto=format&fit=crop',
    category: 'Festival',
    price: '180 ZAR',
  },
  {
    id: '3',
    title: "Lover's Rock Festival 2027",
    date: 'samedi 13 février 2027',
    location: "Gillooly's Garden, Johannesburg",
    status: 'En vente dès maintenant',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=800&auto=format&fit=crop',
    category: 'Reggae & Soul',
    price: '350 ZAR',
  },
  {
    id: '4',
    title: 'AFRO SOUNDWAVE SUMMER FESTIVAL',
    date: 'vendredi 18 décembre',
    location: 'The Grand Arena, Cape Town',
    status: 'En vente dès maintenant',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop',
    category: 'Live Music',
    price: '300 ZAR',
  },
  {
    id: '5',
    title: 'MIDNIGHT GROOVE & ELECTRONIC NIGHTS',
    date: 'samedi 09 janvier 2027',
    location: 'Altitude Beach Club, Fourways',
    status: 'En vente dès maintenant',
    image: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?q=80&w=800&auto=format&fit=crop',
    category: 'Nightlife',
    price: '220 ZAR',
  },
  {
    id: '6',
    title: 'JAZZ UNDER THE STARS: SYMPHONY EDITION',
    date: 'dimanche 24 janvier 2027',
    location: 'Botanical Gardens, Pretoria',
    status: 'En vente dès maintenant',
    image: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?q=80&w=800&auto=format&fit=crop',
    category: 'Jazz',
    price: '280 ZAR',
  },
];

/**
 * FutureEventSection with Infinite Scrolling Carousel
 * @param {Object} props
 * @param {string} [props.title="Featured events"] - Section title
 * @param {string} [props.subtitle] - Optional subtitle description
 * @param {Array} [props.events] - Custom list of event objects
 * @param {boolean} [props.autoplay=false] - Auto scroll carousel
 * @param {number} [props.autoplaySpeed=4000] - Autoplay interval in milliseconds
 * @param {string} [props.className=""] - Additional section wrapper styling
 */
export default function FutureEventSection({
  title = 'Featured events',
  subtitle,
  events = DEFAULT_EVENTS,
  autoplay = false,
  autoplaySpeed = 6000,
  className = '',
}) {
  const rawEvents = events && events.length > 0 ? events : DEFAULT_EVENTS;
  const count = rawEvents.length;

  // Clone 3 sets for true infinite circular buffer
  const extendedEvents = [...rawEvents, ...rawEvents, ...rawEvents];

  // Start at the beginning of the middle cloned set
  const [currentIndex, setCurrentIndex] = useState(count);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [visibleCards, setVisibleCards] = useState(3);
  const [isPaused, setIsPaused] = useState(false);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);

  // Responsive calculation for number of visible cards
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setVisibleCards(1);
      } else if (width < 1024) {
        setVisibleCards(2);
      } else {
        setVisibleCards(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Slide Next
  const handleNext = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  }, [isTransitioning]);

  // Slide Prev
  const handlePrev = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  }, [isTransitioning]);

  // Seamless jump without animation when reaching buffer limits
  const handleTransitionEnd = () => {
    setIsTransitioning(false);

    // If moved past the middle set forward
    if (currentIndex >= count * 2) {
      setCurrentIndex((prev) => prev - count);
    }
    // If moved past the middle set backward
    else if (currentIndex < count) {
      setCurrentIndex((prev) => prev + count);
    }
  };

  // Optional Autoplay
  useEffect(() => {
    if (!autoplay || isPaused) return;

    const timer = setInterval(() => {
      handleNext();
    }, autoplaySpeed);

    return () => clearInterval(timer);
  }, [autoplay, isPaused, autoplaySpeed, handleNext]);

  // Touch Handlers
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

  // Mouse Drag Handlers
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

  return (
    <section
      className={`w-full py-8 sm:py-6 px-4 sm:px-6 lg:px-8 max-w-[1600px] mx-auto select-none ${className}`}
      aria-label={title}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={handleMouseLeave}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900">
            {title}
          </h2>
        </div>
      </div>

      {/* Carousel Outer Container */}
      <div
        className="relative overflow-hidden cursor-grab active:cursor-grabbing"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        {/* Carousel Track */}
        <div
          className="flex items-stretch -mx-3 sm:-mx-4"
          style={{
            transform: `translateX(-${currentIndex * (100 / visibleCards)}%)`,
            transition: isTransitioning
              ? 'transform 450ms cubic-bezier(0.25, 1, 0.5, 1)'
              : 'none',
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {extendedEvents.map((event, idx) => (
            <div
              key={`${event.id}-${idx}`}
              className="px-3 sm:px-4 shrink-0 flex flex-col"
              style={{
                width: `${100 / visibleCards}%`,
              }}
            >
              <EventCard
                id={event.id}
                title={event.title}
                date={event.date}
                location={event.location}
                image={event.image}
                status={event.status}
                category={event.category}
                price={event.price}
                href={event.href || `#event-${event.id}`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Carousel Navigation Controls (Bottom Right as shown in screenshot) */}
      <div className="mt-6 sm:mt-8 flex items-center justify-end gap-3">
        {/* Previous Button (Soft slate) */}
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous events"
          className="w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center bg-slate-200 hover:bg-slate-300 text-slate-700 transition-all duration-200 active:scale-95 shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 stroke-[2.2]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>

        {/* Next Button (Vibrant Cyan #00b4d8) */}
        <button
          type="button"
          onClick={handleNext}
          aria-label="Next events"
          className="w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center bg-[#00b4d8] hover:bg-[#0096c7] text-white transition-all duration-200 active:scale-95 shadow-md shadow-cyan-500/20 focus:outline-none focus:ring-2 focus:ring-[#00b4d8]/50"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 stroke-[2.2]"
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
    </section>
  );
}
