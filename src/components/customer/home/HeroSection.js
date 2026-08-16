import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { config } from '../../../config.js';
import htm from 'htm';

const html = htm.bind(React.createElement);
const PEXELS_API_KEY = config.PEXELS_API_KEY ? config.PEXELS_API_KEY.trim() : '';

export default function HeroSection() {
  const [bgImages, setBgImages] = useState([
    'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'https://images.pexels.com/photos/374870/pexels-photo-374870.jpeg?auto=compress&cs=tinysrgb&w=1600'
  ]);
  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  const [timeLeft, setTimeLeft] = useState({
    days: 3,
    hours: 9,
    minutes: 50,
    seconds: 3
  });

  useEffect(() => {
    async function fetchPexelsPhotos() {
      if (!PEXELS_API_KEY || PEXELS_API_KEY.includes('YOUR_ACTUAL_PEXELS')) return;
      try {
        const response = await fetch(
          'https://api.pexels.com/v1/search?query=person%20wearing%20headphones&per_page=30',
          { headers: { Authorization: PEXELS_API_KEY } }
        );
        if (!response.ok) return;
        const data = await response.json();
        if (data.photos && data.photos.length > 0) {
          const imageUrls = data.photos.map(photo => photo.src.landscape || photo.src.large2x || photo.src.large);
          setBgImages(imageUrls);
        }
      } catch (error) {
        console.error('Error fetching Pexels images:', error);
      }
    }
    fetchPexelsPhotos();
  }, []);

  useEffect(() => {
    if (bgImages.length === 0) return;
    const slideInterval = setInterval(() => {
      setCurrentBgIndex((prevIndex) => (prevIndex + 1) % bgImages.length);
    }, 3000);
    return () => clearInterval(slideInterval);
  }, [bgImages]);

  useEffect(() => {
    const targetTime = new Date().getTime() + (3 * 86400 + 9 * 3600 + 50 * 60 + 3) * 1000;
    const timerInterval = setInterval(() => {
      const now = new Date().getTime();
      const diff = targetTime - now;
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((diff % (1000 * 60)) / 1000)
        });
      } else {
        clearInterval(timerInterval);
      }
    }, 1000);
    return () => clearInterval(timerInterval);
  }, []);

  const formatNumber = (num) => String(num).padStart(2, '0');

  // Debug: log slide keys to help trace React key warnings in dev console
  if (typeof window !== 'undefined' && window?.console?.debug) {
    console.debug('HeroSection slide keys:', bgImages.map((_, i) => `hero-slide-${i}`));
  }

  // Font style constant for SF Pro family
  const sfProFontStyle = {
    fontFamily: '"SF Pro Display", "SF Pro Text", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    WebkitFontSmoothing: 'antialiased'
  };

  return html`
    <!-- SECTION: Full edge-to-edge viewport dimensions -->
    <section 
    style=${sfProFontStyle}
    className="relative w-full h-[500px] lg:h-[750px] rounded-none rounded-b-[40px] sm:rounded-b-[60px] md:rounded-b-[82px] overflow-hidden bg-black select-none flex flex-col justify-between m-0 p-0"
  >
      
      <!-- Slide Track Background -->
      <div className="absolute inset-0 w-full h-full overflow-hidden bg-zinc-900">
        <div 
          className="w-full h-full flex transition-transform duration-700 ease-in-out"
          style=${{ transform: `translateX(-${currentBgIndex * 100}%)` }}
        >
          ${bgImages.map(
            (bgUrl, idx) => html`
              <div
                key=${`hero-slide-${bgUrl}-${idx}`}
                className="w-full h-full flex-shrink-0 bg-cover bg-center"
                style=${{ backgroundImage: `url(${bgUrl})` }}
              />
            `
          )}
        </div>
      </div>

      <!-- Dark Gradient Overlay for text contrast -->
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/40"></div>

      <!-- Content Container -->
      <div className="relative z-10 w-full min-h-screen max-w-7xl mx-auto px-6 sm:px-12 pt-32 pb-82 lg:pb-16 flex flex-col justify-end">        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end">
          
          <div className="animate-bounce-in-left">
            <h1 className="text-white font-extrabold text-xl sm:text-7xl lg:text-8xl tracking-tight leading-[0.88] uppercase">
              NEED<br />
              PREMIUM<br />
              AUDIO GEAR?
            </h1>
          </div>

          <div className="animate-bounce-in-right flex flex-col items-start lg:items-end text-left lg:text-right space-y-4">
            <span className="text-white text-xs sm:text-sm font-extrabold tracking-widest uppercase opacity-90">
              LIMITED-TIME OFFER
            </span>

            <h2 className="text-white text-xl sm:text-5xl font-black uppercase leading-none tracking-tight">
              AUDIO GEAR<br />
              PRICE DROP
            </h2>

            <div className="flex items-center gap-1.5 sm:gap-3 pt-2">
              <div className="flex flex-col items-center justify-center w-10 h-10 sm:w-16 sm:h-16 rounded-full bg-red-600/90 border border-red-500/50 shadow-lg text-white">
                <span className="text-xs sm:text-xl font-black leading-none">${formatNumber(timeLeft.days)}</span>
                <span className="text-[7px] sm:text-[10px] font-bold tracking-tighter uppercase opacity-80 mt-0.5">DAYS</span>
              </div>
              <span className="text-white font-black text-sm sm:text-2xl pb-1">:</span>

              <div className="flex flex-col items-center justify-center w-10 h-10 sm:w-16 sm:h-16 rounded-full bg-red-600/90 border border-red-500/50 shadow-lg text-white">
                <span className="text-xs sm:text-xl font-black leading-none">${formatNumber(timeLeft.hours)}</span>
                <span className="text-[7px] sm:text-[10px] font-bold tracking-tighter uppercase opacity-80 mt-0.5">HRS</span>
              </div>
              <span className="text-white font-black text-sm sm:text-2xl pb-1">:</span>

              <div className="flex flex-col items-center justify-center w-10 h-10 sm:w-16 sm:h-16 rounded-full bg-red-600/90 border border-red-500/50 shadow-lg text-white">
                <span className="text-xs sm:text-xl font-black leading-none">${formatNumber(timeLeft.minutes)}</span>
                <span className="text-[7px] sm:text-[10px] font-bold tracking-tighter uppercase opacity-80 mt-0.5">MIN</span>
              </div>
              <span className="text-white font-black text-sm sm:text-2xl pb-1">:</span>

              <div className="flex flex-col items-center justify-center w-10 h-10 sm:w-16 sm:h-16 rounded-full bg-red-600/90 border border-red-500/50 shadow-lg text-white">
                <span className="text-xs sm:text-xl font-black leading-none">${formatNumber(timeLeft.seconds)}</span>
                <span className="text-[7px] sm:text-[10px] font-bold tracking-tighter uppercase opacity-80 mt-0.5">SEC</span>
              </div>
            </div>

            <div className="pt-3">
              <${Link} 
                to="/shop" 
                className="inline-block px-8 py-3 bg-red-600 hover:bg-red-700 active:scale-95 text-white font-extrabold text-sm tracking-wider uppercase rounded-full shadow-lg shadow-red-900/40 transition-all duration-200"
              >
                SHOP NOW
              <//>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}
