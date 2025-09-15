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
      <div className="flex-1 flex items-center justify-center px-6 sm:px-8" style={{ marginTop: '-5vh' }}>
        <div className="text-center space-y-6 sm:space-y-8 max-w-9xl mx-auto">
          {/* Main Text */}
          <h1 className="text-white text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight sm:px-4" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
            We design and manage<br />
            e-commerce stores<br />
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

      {/* Second Page - Portfolio Section */}
      <div 
        className={`min-h-screen flex flex-col items-center justify-center px-4 sm:px-8 transition-all duration-1000 ${
          showSecondPage ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
        }`}
        style={{
          background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%)'
        }}
      >
        <div className="max-w-6xl mx-auto text-center space-y-12">
          {/* Section Title */}
          <h2 className="text-white text-4xl sm:text-5xl md:text-6xl font-bold leading-tight" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
            <span 
              style={{
                background: 'linear-gradient(45deg, #60A5FA, #3B82F6, #1D4ED8, #1E40AF)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundSize: '200% 200%',
                animation: 'gradientShift 3s ease infinite'
              }}
            >
              Portfolio
            </span>
          </h2>

          {/* Portfolio Grid - 6 Stores */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Store 1 - wabinu.com */}
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800 hover:border-blue-500/50 transition-all duration-300 hover:transform hover:scale-105">
              {/* Store Number */}
              <div className="flex items-center justify-center mb-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-blue-800 flex items-center justify-center text-white font-bold text-sm">
                  #1
                </div>
              </div>

              {/* Logo */}
              <div className="flex items-center justify-center mb-4">
                <Image
                  src="/wabinulogo.png"
                  alt="wabinu logo"
                  width={120}
                  height={40}
                  className="h-8 w-auto"
                />
              </div>

              {/* Screenshot */}
              <div className="mb-4 rounded-lg overflow-hidden bg-gray-800/50 border border-gray-700">
                <Image
                  src="/wabinu.png"
                  alt="wabinu.com screenshot"
                  width={400}
                  height={225}
                  className="w-full h-auto object-cover"
                />
              </div>

              {/* Store Title */}
              <h3 className="text-xl font-bold text-white mb-3 text-center" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
                wabinu.com
              </h3>

              {/* Store Description */}
              <p className="text-gray-300 text-sm leading-relaxed mb-4 text-center">
                Urban minimalist apparel.<br />
                Subtle canine motifs x Japanese calm.
              </p>

              {/* Social Links */}
              <div className="flex gap-3 mb-4">
                <a 
                  href="https://wabinu.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 text-center px-4 py-2 text-white font-medium rounded-lg transition-all duration-300 hover:scale-105 text-sm"
                  style={{
                    background: 'linear-gradient(45deg, #60A5FA, #3B82F6, #1D4ED8, #1E40AF)',
                    backgroundSize: '200% 200%',
                    animation: 'gradientShift 3s ease infinite'
                  }}
                >
                  Visit Store →
                </a>
                <a 
                  href="https://www.instagram.com/wabinu.shop?igsh=MTdvdnBvdW9hbDFiYQ%3D%3D&utm_source=qr" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="transition-all duration-300 hover:scale-105"
                >
                  <Image
                    src="/Instagram.png"
                    alt="Instagram"
                    width={32}
                    height={32}
                    className="w-8 h-8"
                  />
                </a>
              </div>
            </div>

            {/* Store 2 - Coming Soon */}
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800 hover:border-gray-600/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="flex items-center justify-center mb-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-gray-600 to-gray-700 flex items-center justify-center text-white font-bold text-sm">
                  #2
                </div>
              </div>

              <div className="mb-4 rounded-lg overflow-hidden bg-gray-800/50 border border-gray-700">
                <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-2 bg-gray-700 rounded-lg flex items-center justify-center">
                      <span className="text-2xl"></span>
                    </div>
                    <p className="text-gray-400 text-sm">Coming Soon</p>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-400 mb-3 text-center" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
                Store #2
              </h3>

              <p className="text-gray-500 text-sm leading-relaxed mb-4 text-center">
                Coming Soon
              </p>

              <div className="w-full text-center px-4 py-2 text-gray-500 font-medium rounded-lg bg-gray-800/50 text-sm cursor-not-allowed">
                Coming Soon
              </div>
            </div>

            {/* Store 3 - Coming Soon */}
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800 hover:border-gray-600/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="flex items-center justify-center mb-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-gray-600 to-gray-700 flex items-center justify-center text-white font-bold text-sm">
                  #3
                </div>
              </div>

              <div className="mb-4 rounded-lg overflow-hidden bg-gray-800/50 border border-gray-700">
                <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-2 bg-gray-700 rounded-lg flex items-center justify-center">
                      <span className="text-2xl"></span>
                    </div>
                    <p className="text-gray-400 text-sm">Coming Soon</p>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-400 mb-3 text-center" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
                Store #3
              </h3>

              <p className="text-gray-500 text-sm leading-relaxed mb-4 text-center">
                Coming Soon
              </p>

              <div className="w-full text-center px-4 py-2 text-gray-500 font-medium rounded-lg bg-gray-800/50 text-sm cursor-not-allowed">
                Coming Soon
              </div>
            </div>

            {/* Store 4 - Coming Soon */}
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800 hover:border-gray-600/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="flex items-center justify-center mb-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-gray-600 to-gray-700 flex items-center justify-center text-white font-bold text-sm">
                  #4
                </div>
              </div>

              <div className="mb-4 rounded-lg overflow-hidden bg-gray-800/50 border border-gray-700">
                <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-2 bg-gray-700 rounded-lg flex items-center justify-center">
                      <span className="text-2xl"></span>
                    </div>
                    <p className="text-gray-400 text-sm">Coming Soon</p>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-400 mb-3 text-center" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
                Store #4
              </h3>

              <p className="text-gray-500 text-sm leading-relaxed mb-4 text-center">
                Coming Soon
              </p>

              <div className="w-full text-center px-4 py-2 text-gray-500 font-medium rounded-lg bg-gray-800/50 text-sm cursor-not-allowed">
                Coming Soon
              </div>
            </div>

            {/* Store 5 - Coming Soon */}
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800 hover:border-gray-600/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="flex items-center justify-center mb-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-gray-600 to-gray-700 flex items-center justify-center text-white font-bold text-sm">
                  #5
                </div>
              </div>

              <div className="mb-4 rounded-lg overflow-hidden bg-gray-800/50 border border-gray-700">
                <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-2 bg-gray-700 rounded-lg flex items-center justify-center">
                      <span className="text-2xl"></span>
                    </div>
                    <p className="text-gray-400 text-sm">Coming Soon</p>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-400 mb-3 text-center" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
                Store #5
              </h3>

              <p className="text-gray-500 text-sm leading-relaxed mb-4 text-center">
                Coming Soon
              </p>

              <div className="w-full text-center px-4 py-2 text-gray-500 font-medium rounded-lg bg-gray-800/50 text-sm cursor-not-allowed">
                Coming Soon
              </div>
            </div>

            {/* Infinite Continuation */}
            <div className="flex items-center justify-center">
              <div className="text-6xl text-gray-500 font-bold">
                ...
              </div>
            </div>
          </div>
        </div>
      </div>

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