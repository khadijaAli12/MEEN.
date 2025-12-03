import React, { useState, useEffect } from 'react';

export default function Loader({ onLoadingComplete }) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Start fade out after 2.5 seconds
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 2500);

    // Complete loading after 3 seconds (after fade animation)
    const completeTimer = setTimeout(() => {
      onLoadingComplete();
    }, 3000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onLoadingComplete]);

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-gradient-to-br from-[#3E2723] via-[#4E342E] to-[#3E2723] flex items-center justify-center transition-opacity duration-500 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="text-center">
        {/* Logo Animation */}
        <div className="relative">
          {/* Animated circles */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 border-2 border-[#A1887F]/30 rounded-full animate-ping-slow" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 border-2 border-[#8D6E63]/40 rounded-full animate-pulse-slow" />
          </div>

          {/* Main Logo */}
          <div className="relative z-10 animate-fadeInScale">
            <h1 className="text-7xl sm:text-8xl font-extralight text-[#EFEBE9] tracking-[0.3em] mb-4">
              meen
            </h1>
            <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-[#A1887F] to-transparent mx-auto animate-expandWidth" />
            <p className="text-xs tracking-[0.4em] text-[#BCAAA4] font-light uppercase mt-4 animate-fadeIn">
              Parfumerie
            </p>
          </div>
        </div>

        {/* Loading dots */}
        <div className="flex gap-2 justify-center mt-12 animate-fadeIn">
          <div className="w-2 h-2 bg-[#A1887F] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-2 h-2 bg-[#A1887F] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-2 h-2 bg-[#A1887F] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInScale {
          0% {
            opacity: 0;
            transform: scale(0.8);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes expandWidth {
          0% {
            width: 0;
          }
          100% {
            width: 8rem;
          }
        }

        @keyframes fadeIn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        @keyframes ping-slow {
          0% {
            transform: scale(1);
            opacity: 0.8;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.4;
          }
          100% {
            transform: scale(1);
            opacity: 0.8;
          }
        }

        @keyframes pulse-slow {
          0%, 100% {
            transform: scale(1);
            opacity: 0.6;
          }
          50% {
            transform: scale(1.15);
            opacity: 0.3;
          }
        }

        .animate-fadeInScale {
          animation: fadeInScale 0.8s ease-out;
        }

        .animate-expandWidth {
          animation: expandWidth 1s ease-out 0.3s both;
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out 0.8s both;
        }

        .animate-ping-slow {
          animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
}
