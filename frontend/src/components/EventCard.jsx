import React from "react";

/**
 * EventCard
 * Props:
 *  - event: a single Google Calendar event object (raw)
 *  - locale (optional): e.g., "en-US"
 *  - timeZone (optional): force a display TZ; if omitted, uses browser TZ
 */
export function EventCard({ event, locale = "en-US", timeZone }) {
  if (!event) return null;

  // Normalize times (Google uses `date` for all-day and `dateTime` for timed)
  const startRaw = event.start || {};
  const endRaw = event.end || {};

  const isAllDay = Boolean(startRaw.date && !startRaw.dateTime);

  const startValue =  startRaw.date || null;
  const endValue =  endRaw.date || null;

  const title = event.title || "(No title)";
  const location = event.location || null;

  function sanitizeHtmlToText(input) {
    if (typeof input !== "string") return null;
    // Convert HTML to plain text and strip tags/attributes like href
    const container = document.createElement("div");
    container.innerHTML = input;
    const text = container.textContent || container.innerText || "";
    return text.trim() || null;
  }

  const description = sanitizeHtmlToText(event.description);

  // Formatters
  const dateFmt = new Intl.DateTimeFormat(locale, {
    timeZone,
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const timeFmt = new Intl.DateTimeFormat(locale, {
    timeZone,
    hour: "numeric",
    minute: "2-digit",
  });

  function renderWhen() {
    if (!startValue) return "No time provided";

    // All‑day events use YYYY‑MM‑DD (no time)
    if (isAllDay) {
      const start = new Date(startValue + "T00:00:00");
      // For all‑day, Google end date is exclusive; show single day if same
      if (endValue) {
        const end = new Date(endValue + "T00:00:00");
        const sameDay = start.toDateString() === new Date(end.getTime() - 1).toDateString();
        return sameDay
          ? dateFmt.format(start)
          : `${dateFmt.format(start)} – ${dateFmt.format(new Date(end.getTime() - 1))}`;
      }
      return dateFmt.format(start);
    }

    // Timed event
    const start = new Date(startValue);
    const end = endValue ? new Date(endValue) : null;

    const sameDay = end ? start.toDateString() === end.toDateString() : true;

    if (!end) {
      return `${dateFmt.format(start)} • ${timeFmt.format(start)}`;
    }

    if (sameDay) {
      return `${dateFmt.format(start)} • ${timeFmt.format(start)} – ${timeFmt.format(end)}`;
    }

    // Spans multiple days
    return `${dateFmt.format(start)} ${timeFmt.format(start)} – ${dateFmt.format(end)} ${timeFmt.format(end)}`;
  }

  return (
    <article
      role="group"
      aria-label={`Event: ${title}`}
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: 12,
        padding: 16,
        maxWidth: 600,
        display: "grid",
        gap: 8,
        boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
      }}
    >
      <header style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <h3 style={{ margin: 0, fontSize: 18, fontWeight: 600 }}>{title}</h3>
        {event.status && (
          <span
            aria-label={`Status: ${event.status}`}
            style={{
              marginLeft: "auto",
              fontSize: 12,
              padding: "2px 8px",
              borderRadius: 999,
              border: "1px solid #e5e7eb",
            }}
          >
            {event.status}
          </span>
        )}
      </header>

      <div style={{ fontSize: 14 }}>
        <strong>When: </strong>
        <span>{renderWhen()}</span>
      </div>

      {location && (
        <div style={{ fontSize: 14 }}>
          <strong>Location: </strong>
          <span>{location}</span>
        </div>
      )}

      {description && (
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.45, whiteSpace: "pre-wrap" }}>
          {description}
        </p>
      )}
    </article>
  );
}

/* --------- Example usage ----------

import { EventCard } from "./EventCard";

export default function Example({ events }) {
  return (
    <div style={{ display: "grid", gap: 12 }}>
      {events.map(ev => (
        <EventCard key={ev.id || ev.iCalUID} event={ev} />
      ))}
    </div>
  );
}

------------------------------------- */
