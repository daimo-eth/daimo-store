import Image from "next/image";
import { useEffect, useState } from "react";

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    "/cream-cap.jpg",
    "/light-green-cap.png",
    "/forest-green-cap.webp",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, [images.length]);

  const scrollToBottom = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative min-h-[80vh]">
      {/* Cloud Background */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/anime-clouds.jpg"
          alt=""
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-8 bg-white/10 backdrop-blur-sm p-8 rounded-2xl">
            <h1 className="text-4xl sm:text-5xl font-serif text-[#2c5282] leading-tight">
              Real World Ethereum
            </h1>
            <h2 className="block text-2xl sm:text-3xl font-serif text-[#2d3748] leading-tight">
              Buy a cap with Ethereum
            </h2>
            <p className="text-lg text-[#2d3748] max-w-2xl font-light">
              Select one of our 3 unique caps design and buy it from any chains
              any tokens.
            </p>
            <div className="flex gap-4">
              <button
                onClick={scrollToBottom}
                className="flex py-3 px-6 items-center justify-center 
    rounded-full bg-gradient-to-b from-blue-500/70 to-blue-700/70
    text-sm font-medium 
    text-white
    hover:from-blue-500/80 hover:to-blue-700/80"
              >
                Buy now
              </button>
            </div>
          </div>

          {/* Right Column - Image Carousel */}
          <div className="relative h-[500px] w-full">
            <div className="absolute -top-10 -left-10 w-full h-full bg-white/20 backdrop-blur-sm rounded-2xl transform rotate-3"></div>
            {images.map((image, index) => (
              <div
                key={index}
                className={`absolute w-full h-full transition-opacity duration-1000 ease-in-out
                  ${currentImageIndex === index ? "opacity-100" : "opacity-0"}`}
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
                  onClick={() => setCurrentImageIndex(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
