import React, { useState, useEffect } from 'react';
import htm from 'htm';

const html = htm.bind(React.createElement);

// Reusable FilledButton Component
export function FilledButton({ children, onClick, class: customClass = '' }) {
  return html`
    <button
      type="button"
      onClick=${onClick}
      className="px-12 py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-extrabold text-base tracking-wider uppercase rounded-full shadow-lg active:scale-95 transition-all cursor-pointer focus:outline-none ${customClass}"
    >
      ${children}
    </button>
  `;
}

export default function PromotionalSection({ onShopNow }) {
  // Set initial countdown target: 3 days, 9 hours, 50 minutes, 3 seconds from now
  const [targetTime] = useState(() => {
    const target = new Date();
    target.setDate(target.getDate() + 3);
    target.setHours(target.getHours() + 9);
    target.setMinutes(target.getMinutes() + 50);
    target.setSeconds(target.getSeconds() + 3);
    return target.getTime();
  });

  const [timeLeft, setTimeLeft] = useState({
    days: 3,
    hours: 9,
    minutes: 50,
    seconds: 3
  });

  // Dynamic live countdown tick
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetTime - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);

    return () => clearInterval(timer);
  }, [targetTime]);

  const formatDigit = (num) => String(num).padStart(2, '0');

  const timeUnits = [
    { label: 'DAYS', value: formatDigit(timeLeft.days) },
    { label: 'HOURS', value: formatDigit(timeLeft.hours) },
    { label: 'MINUTES', value: formatDigit(timeLeft.minutes) },
    { label: 'SECONDS', value: formatDigit(timeLeft.seconds) }
  ];

  return html`
    <section className="w-full bg-[#121214] text-white py-16 px-4 font-['SF_Pro_Display',-apple-system,BlinkMacSystemFont,sans-serif]">
      <div className="max-w-6xl mx-auto text-center space-y-8">

        <!-- Header Section -->
        <div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-wide text-white uppercase mb-2">
            LIMITED-TIME AUDIO GEAR DROP
          </h2>
          <p className="text-2xl sm:text-4xl font-light text-zinc-200">
            Upgrade Now!
          </p>
        </div>

        <!-- Countdown Header -->
        <h3 className="text-2xl sm:text-3xl font-extrabold text-white pt-2">
          Time Remaining on Deals:
        </h3>

       <!-- Countdown Timer Display -->
<div className="flex items-center justify-center gap-1.5 sm:gap-3 lg:gap-5 py-6 w-full max-w-full px-2">
  ${timeUnits.flatMap((item, idx) => {
    const isLast = idx === timeUnits.length - 1;

    const timerBox = html`
      <div 
        key=${item.label} 
        className="flex flex-col items-center justify-center w-20 h-20 sm:w-36 sm:h-36 md:w-48 md:h-48 xl:w-[240px] xl:h-[240px] bg-[#141416] border-2 sm:border-[3px] border-[#FF3B00] rounded-2xl sm:rounded-[24px] xl:rounded-[32px] shadow-2xl flex-shrink-0"
      >
        <!-- Digits: Scales from 3xl on phone to 125px on desktop -->
        <span className="text-3xl sm:text-6xl md:text-8xl xl:text-[125px] font-black text-white leading-none tracking-tight -mb-1 xl:-mb-2 font-['SF_Pro_Display',-apple-system,sans-serif]">
          ${item.value}
        </span>
        <!-- Labels: Scales from 10px on phone to 36px on desktop -->
        <span className="text-[10px] sm:text-lg md:text-2xl xl:text-[36px] font-semibold text-white tracking-wide uppercase font-['SF_Pro_Display',-apple-system,sans-serif]">
          ${item.label}
        </span>
      </div>
    `;

    if (isLast) return [timerBox];

    const separator = html`
      <div 
        key=${`sep-${idx}`} 
        className="flex flex-col gap-1.5 sm:gap-3 xl:gap-4 justify-center items-center h-20 sm:h-36 md:h-48 xl:h-[240px] flex-shrink-0 px-0.5 sm:px-1"
      >
        <span className="w-1.5 h-1.5 sm:w-3 sm:h-3 xl:w-5 xl:h-5 bg-white rounded-full"></span>
        <span className="w-1.5 h-1.5 sm:w-3 sm:h-3 xl:w-5 xl:h-5 bg-white rounded-full"></span>
      </div>
    `;

    return [timerBox, separator];
  })}
</div>

        <!-- Subtext -->
        <p className="text-zinc-300 text-lg max-w-xl mx-auto font-normal leading-relaxed pt-2">
          Special pricing on Heady microphones, boom arms, and pop filters.
        </p>

        <!-- Bottom Center CTA Button -->
        <div className="pt-4">
          <${FilledButton} onClick=${onShopNow || (() => { window.location.hash = '/shop'; })}>
            SHOP NOW
          <//>
        </div>

      </div>
    </section>
  `;
}
