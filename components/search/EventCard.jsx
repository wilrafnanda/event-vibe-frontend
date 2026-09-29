import React from 'react';
import Link from 'next/link';

/**
 * Reusable EventCard component
 * @param {Object} props
 * @param {string} props.id - Unique identifier for the event
 * @param {string} props.title - Event title
 * @param {string} props.date - Event date string (e.g. "samedi 26 septembre")
 * @param {string} props.location - Event venue and city (e.g. "Flame Studios, Constitution Hill, Johannesburg")
 * @param {string} props.image - Event banner image URL
 * @param {string} [props.status="En vente dès maintenant"] - Status or ticket availability text
 * @param {string} [props.href="#"] - Navigation link URL
 * @param {string} [props.category] - Optional category badge
 * @param {string} [props.price] - Optional price display
 * @param {Function} [props.onClick] - Optional click handler
 * @param {string} [props.className] - Additional wrapper class names
 */
export default function EventCard({
  id,
  eventName,
  date,
  location,
  image,
  status = "Free",
  href = "#",
  category,
  price,
  onClick,
  className = "",
}) {
  const handleClick = (e) => {
    console.log('Event Card Clicked:', { id, eventName });
    if (onClick) {
      onClick(e, { id, eventName });
    }
  };

  return (
    <div
      className={`h-full flex flex-col ${className}`}
      data-event-id={id}
      onClick={handleClick}
    >
      <div className="group flex flex-col h-full bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer focus:outline-none">
        {/* Event Banner Image */}
        <div className="relative w-full aspect-[16/8.5] overflow-hidden bg-slate-100">
          <img
            src={image || "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop"}
            alt={eventName || "Event Image"}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            loading="lazy"
          />
          {category && (
            <span className="absolute top-2.5 left-2.5 bg-white/95 backdrop-blur-md text-slate-900 text-[11px] font-semibold px-2.5 py-0.5 rounded-full shadow-sm">
              {category}
            </span>
          )}
          {price && (
            <span className="absolute bottom-2.5 right-2.5 bg-slate-950/85 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-sm">
              {price}
            </span>
          )}
        </div>

        {/* Card Content */}
        <div className="p-4 sm:p-4.5 flex flex-col flex-1 justify-between gap-3">
          <div className="space-y-2">
            {/* Event Title */}
            <h3
              className="text-sm sm:text-base lg:text-lg font-extrabold text-slate-900 leading-snug line-clamp-2 uppercase tracking-wide transition-colors min-h-[2.4rem] sm:min-h-[2.7rem]"
              title={eventName}
            >
              {eventName}
            </h3>

            {/* Event Meta Details */}
            <div className="space-y-1.5 pt-0.5">
              {/* Date */}
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 font-medium">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-500 shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                  <line x1="16" x2="16" y1="2" y2="6" />
                  <line x1="8" x2="8" y1="2" y2="6" />
                  <line x1="3" x2="21" y1="10" y2="10" />
                </svg>
                <span className="truncate">{date}</span>
              </div>

              {/* Location */}
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 font-medium">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-500 shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span className="truncate" title={location}>{location}</span>
              </div>
            </div>
          </div>

          {/* Bottom Status */}
          <div className="pt-1.5 flex items-center justify-between text-xs sm:text-sm">
            <span className="text-slate-900 font-bold tracking-tight">
              {status || "En vente dès maintenant"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
