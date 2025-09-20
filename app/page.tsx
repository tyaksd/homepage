'use client'

import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function Home() {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [isBlinking, setIsBlinking] = useState(false);
  const [showSecondPage, setShowSecondPage] = useState(false);
  
  const fullText = 'with AI and quantitative methods';
  
  const handleContactClick = () => {
    window.location.href = 'mailto:jack@godship.io';
  };

  useEffect(() => {
    let typingTimer: NodeJS.Timeout;

    if (isTyping) {
      if (displayText.length < fullText.length) {
        typingTimer = setTimeout(() => {
          setDisplayText(fullText.slice(0, displayText.length + 1));
        }, 80);
      } else {
        // タイピング完了後、少し待ってから点滅開始
        setTimeout(() => {
          setIsTyping(false);
          setIsBlinking(true);
        }, 200);
      }
    } else if (isBlinking) {
      // 点滅アニメーション（2回点滅）
      let blinkCount = 0;
      const blinkInterval = setInterval(() => {
        blinkCount++;
        if (blinkCount >= 4) { // 2回点滅（表示・非表示）
          clearInterval(blinkInterval);
          setIsBlinking(false);
          setDisplayText('');
          setIsTyping(true);
        }
      }, 150);
    }

    return () => {
      if (typingTimer) clearTimeout(typingTimer);
    };
  }, [displayText, isTyping, isBlinking, fullText]);

  // Scroll detection for second page
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Show second page when scrolled down 50% of viewport height
      if (scrollPosition > windowHeight * 0.5) {
        setShowSecondPage(true);
      } else {
        setShowSecondPage(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="min-h-screen flex flex-col relative" style={{
      background: '#000000'
    }}>
      {/* First Page - Hero Section */}
      <div className="min-h-screen flex flex-col relative">
      {/* Header with Logo */}
      <header className="p-4 sm:p-8">
        <div className="relative">
          <Image
            src="/godship-logo.png"
            alt="GODSHIP"
            width={200}
            height={60}
            className="h-6 sm:h-6 w-auto"
            priority
          />
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-3 sm:px-8" style={{ marginTop: '-5vh' }}>
        <div className="text-center space-y-6 sm:space-y-8 max-w-9xl mx-auto">
          {/* Main Text */}
          <h1 className="text-white text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight sm:px-4" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
            We decode<br />
            e-commerce market<br />
            <span 
              className={isBlinking ? 'animate-pulse' : ''}
              style={{
                background: 'linear-gradient(45deg, #60A5FA, #3B82F6, #1D4ED8, #1E40AF)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundSize: '200% 200%',
                animation: isBlinking ? 'pulse 0.15s ease-in-out infinite' : 'gradientShift 3s ease infinite'
              }}
            >
              {displayText}
              {isTyping && displayText.length < fullText.length && (
                <span className="animate-pulse">|</span>
              )}
            </span>
          </h1>

          {/* Contact Button */}
          <button 
            onClick={handleContactClick}
            className="px-6 sm:px-8 py-3 sm:py-4 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg text-sm sm:text-base cursor-pointer"
            style={{
              background: 'linear-gradient(45deg, #000000, #333333, #666666, #999999, #333333, #000000)',
              backgroundSize: '300% 300%',
              animation: 'buttonGradientShift 3s ease infinite'
            }}
          >
            Contact Us
          </button>
        </div>
      </div>

        {/* Copyright */}
        <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6">
          <p className="text-gray-400 text-xs sm:text-sm">
            © 2025 Godship, Inc.
          </p>
        </div>
      </div>

      {/* Second Page - Portfolio Section - Commented out */}

      <style jsx>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes buttonGradientShift {
          0% { background-position: 0% 50%; }
          25% { background-position: 100% 50%; }
          50% { background-position: 100% 100%; }
          75% { background-position: 0% 100%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </main>
  );
}