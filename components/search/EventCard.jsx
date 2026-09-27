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
  title,
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
  const CardWrapper = href ? Link : 'div';
  const wrapperProps = href ? { href } : {};

  return (
    <div className={`h-full flex flex-col ${className}`} data-event-id={id}>
      <div

        className="group flex flex-col h-full bg-white rounded-1 sm:rounded-1 border border-slate-200/80 shadow-sm  hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-pointer focus:outline-none"
      >
        {/* Event Banner Image */}
        <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] overflow-hidden bg-slate-100">
          <img
            src={image || "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop"}
            alt={title || "Event Image"}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            loading="lazy"
          />
          {category && (
            <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-slate-900 text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
              {category}
            </span>
          )}
          {price && (
            <span className="absolute bottom-3 right-3 bg-slate-950/80 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
              {price}
            </span>
          )}
        </div>

        {/* Card Content */}
        <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between gap-4">
          <div className="space-y-3">
            {/* Event Title */}
            <h3
              className="text-base sm:text-lg font-bold text-slate-900 leading-snug line-clamp-2 uppercase tracking-wide  transition-colors min-h-[2.8rem]"
              title={title}
            >
              {title}
            </h3>

            {/* Event Meta Details */}
            <div className="space-y-2 pt-1">
              {/* Date */}
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-500 font-medium">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 text-slate-400 shrink-0"
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
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-500 font-medium">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 text-slate-400 shrink-0"
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

          {/* Bottom Divider & Status / Action */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs sm:text-sm">
            <span className="text-slate-700 font-medium text-xs sm:text-sm">
              {status}
            </span>
            <span className="text-primary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 font-semibold text-xs flex items-center gap-1">
              Détails
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-3.5 h-3.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
