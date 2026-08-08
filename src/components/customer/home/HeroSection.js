import React, { useState, useEffect } from './vendor/react.js';
import { Link } from './vendor/react-router-dom.js';
import htm from 'htm';

const html = htm.bind(React.createElement);

// Sample background image - Replace with your local file path (e.g., './assets/images/hero-bg.jpg')
const sampleHeroBg = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1600&q=80';

export function HeroSection() {
  // Target date set to 3 days, 9 hours, 50 mins from initial load
  const [targetDate] = useState(() => new Date(Date.now() + (3 * 24 * 60 * 60 * 1000) + (9 * 60 * 60 * 1000) + (50 * 60 * 1000)));

  const calculateTimeLeft = () => {
    const difference = +targetDate - +new Date();
    if (difference <= 0) {
      return { days: '00', hours: '00', minutes: '00', seconds: '00' };
    }

    return {
      days: String(Math.floor(difference / (1000 * 60 * 60 * 24))).padStart(2, '0'),
      hours: String(Math.floor((difference / (1000 * 60 * 60)) % 24)).padStart(2, '0'),
      minutes: String(Math.floor((difference / 1000 / 60) % 60)).padStart(2, '0'),
      seconds: String(Math.floor((difference / 1000) % 60)).padStart(2, '0'),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return html`
    <section class="relative w-full min-h-[520px] md:min-h-[620px] lg:min-h-[700px] rounded-3xl overflow-hidden bg-zinc-900 font-['SF_Pro',-apple-system,BlinkMacSystemFont,'Segoe_UI',Roboto,sans-serif] flex items-end p-6 sm:p-10 lg:p-14 select-none">
      
      <!-- Background Image -->
      <img 
        src=${sampleHeroBg} 
        alt="Hero Background" 
        class="absolute inset-0 w-full h-full object-cover object-center"
      />

      <!-- Dark Gradient Overlay for Readability -->
      <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

      <!-- Hero Content Container -->
      <div class="relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
        
        <!-- Left Side: Main Heading -->
        <div class="lg:col-span-7">
          <h1 class="text-5xl sm:text-7xl lg:text-8xl font-black text-white leading-[0.9] tracking-tight uppercase drop-shadow-md">
            NEED<br />
            PREMIUM<br />
            AUDIO GEAR?
          </h1>
        </div>

        <!-- Right Side: Offer & Countdown Timer -->
        <div class="lg:col-span-5 flex flex-col items-start lg:items-end text-left lg:text-right text-white space-y-3 sm:space-y-4">
          
          <span class="text-xs sm:text-sm font-bold tracking-widest text-white uppercase opacity-90">
            LIMITED-TIME OFFER
          </span>

          <h2 class="text-2xl sm:text-4xl font-black uppercase leading-none tracking-wide">
            AUDIO GEAR<br />
            PRICE DROP
          </h2>

          <!-- Countdown Timer -->
          <div class="flex items-center gap-2 pt-2">
            
            <!-- Days -->
            <div class="flex flex-col items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-red-600 bg-red-950/40 backdrop-blur-md">
              <span class="text-sm sm:text-base font-extrabold leading-none text-white">${timeLeft.days}</span>
              <span class="text-[8px] sm:text-[9px] font-bold text-zinc-300 uppercase mt-0.5">DAYS</span>
            </div>

            <span class="text-base sm:text-lg font-bold text-white">:</span>

            <!-- Hours -->
            <div class="flex flex-col items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-red-600 bg-red-950/40 backdrop-blur-md">
              <span class="text-sm sm:text-base font-extrabold leading-none text-white">${timeLeft.hours}</span>
              <span class="text-[8px] sm:text-[9px] font-bold text-zinc-300 uppercase mt-0.5">HRS</span>
            </div>

            <span class="text-base sm:text-lg font-bold text-white">:</span>

            <!-- Minutes -->
            <div class="flex flex-col items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-red-600 bg-red-950/40 backdrop-blur-md">
              <span class="text-sm sm:text-base font-extrabold leading-none text-white">${timeLeft.minutes}</span>
              <span class="text-[8px] sm:text-[9px] font-bold text-zinc-300 uppercase mt-0.5">MIN</span>
            </div>

            <span class="text-base sm:text-lg font-bold text-white">:</span>

            <!-- Seconds -->
            <div class="flex flex-col items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-red-600 bg-red-950/40 backdrop-blur-md">
              <span class="text-sm sm:text-base font-extrabold leading-none text-white">${timeLeft.seconds}</span>
              <span class="text-[8px] sm:text-[9px] font-bold text-zinc-300 uppercase mt-0.5">SEC</span>
            </div>

          </div>

          <!-- Shop Now Button -->
          <div class="pt-3">
            <${Link} 
              to="/shop" 
              class="inline-block px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-extrabold text-sm tracking-wider uppercase rounded-full shadow-lg transition-all hover:scale-105 active:scale-95"
            >
              SHOP NOW
            <//>
          </div>

        </div>

      </div>

    </section>
  `;
}