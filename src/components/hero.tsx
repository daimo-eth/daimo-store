"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [autoSwitch, setAutoSwitch] = useState(true);
  const touchStartX = useRef<number | null>(null);

  const images = [
    "/cream-cap.jpg",
    "/light-green-cap.png",
    "/forest-green-cap.webp",
  ];

  useEffect(() => {
    if (!autoSwitch) return;

    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, [images.length, autoSwitch]);

  const handleUserInteraction = () => {
    setAutoSwitch(false);
  };

  const nextImage = () => {
    handleUserInteraction();
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartX.current) return;

    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (Math.abs(diff) > 50) {
      // minimum swipe distance
      handleUserInteraction();
      if (diff > 0) {
        // swipe left
        setCurrentImageIndex((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
      } else {
        // swipe right
        setCurrentImageIndex((prevIndex) =>
          prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
      }
    }
  };

  const scrollToBottom = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative min-h-[80vh]">
      <div
        className="relative min-h-[80vh]"
        style={{
          backgroundImage: 'url("/anime-clouds.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Text Content */}
            <div className="space-y-8 bg-white/10 backdrop-blur-sm p-8 rounded-2xl">
              <h1 className="text-4xl sm:text-5xl font-serif text-[#2c5282] leading-tight">
                Real World Ethereum
              </h1>
              <h2 className="block text-2xl sm:text-3xl font-serif text-[#2d3748] leading-tight">
                Buy a cap with Ethereum
              </h2>
              <p className="text-lg text-[#2d3748] max-w-2xl font-light">
                Select one of our 3 unique caps design and buy it from any token
                on any chain.
              </p>
              <button
                onClick={scrollToBottom}
                className="flex py-3 px-6 items-center justify-center 
    rounded-full bg-gradient-to-b from-blue-500/70 to-blue-700/70
    text-sm font-medium 
    text-white cursor-pointer
    hover:from-blue-500/80 hover:to-blue-700/80"
              >
                Buy now
              </button>
            </div>

            {/* Right Column - Image Carousel */}
            <div
              className="relative w-64 h-64 lg:w-[400px] lg:h-[400px] mx-auto cursor-pointer"
              onClick={nextImage}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <div className="absolute -top-10 -left-10 w-full h-full bg-white/20 backdrop-blur-sm rounded-2xl transform rotate-3"></div>
              {images.map((image, index) => (
                <div
                  key={index}
                  className={`absolute w-full h-full transition-opacity duration-1000 ease-in-out
                    ${
                      currentImageIndex === index ? "opacity-100" : "opacity-0"
                    }`}
                >
                  <Image
                    src={image}
                    alt={`Cap design ${index + 1}`}
                    fill
                    className="object-cover rounded-2xl shadow-xl transform -rotate-2"
                    priority={index === 0}
                  />
                </div>
              ))}

              {/* Slide Indicators */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
                {images.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 
                      ${
                        currentImageIndex === index
                          ? "bg-white w-4"
                          : "bg-white/50"
                      }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUserInteraction();
                      setCurrentImageIndex(index);
                    }}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
