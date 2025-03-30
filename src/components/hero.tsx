import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    '/hero-cap.jpg',
    '/cap-design-2.jpg',
    '/cap-design-3.jpg'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(timer);
  }, []);

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
             Prove Ethereum is Real
              <span className="block text-[#2d3748] italic">Buy a cap with Ethereum</span>
            </h1>
            <p className="text-lg text-[#2d3748] max-w-2xl font-light">
                Select one of our 3 unique caps design and buy it from any chains any tokens. 
            </p>
            <div className="flex gap-4">
              <Link 
                href="/shop"
                className="inline-flex items-center px-6 py-3 rounded-full bg-[#4299e1] text-white font-medium hover:bg-[#3182ce] transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Buy now
              </Link>
            </div>
          </div>

          {/* Right Column - Image Carousel */}
          <div className="relative h-[500px] w-full">
            <div className="absolute -top-10 -left-10 w-full h-full bg-white/20 backdrop-blur-sm rounded-2xl transform rotate-3"></div>
            {images.map((image, index) => (
              <div
                key={index}
                className={`absolute w-full h-full transition-opacity duration-1000 ease-in-out
                  ${currentImageIndex === index ? 'opacity-100' : 'opacity-0'}`}
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
                    ${currentImageIndex === index 
                      ? 'bg-white w-4' 
                      : 'bg-white/50'}`}
                  onClick={() => setCurrentImageIndex(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="flex items-center space-x-4 bg-white/30 backdrop-blur-md p-6 rounded-xl hover:bg-white/40 transition-colors shadow-lg"
            >
              <div className="flex-shrink-0">
                {feature.icon}
              </div>
              <div>
                <h3 className="font-serif text-[#2c5282]">{feature.title}</h3>
                <p className="text-[#2d3748]">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Features data
const features = [
  {
    icon: (
      <svg className="w-8 h-8 text-[#4299e1]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
    title: "Sky-High Delivery",
    description: "Free shipping on orders over $50",
  },
  {
    icon: (
      <svg className="w-8 h-8 text-[#4299e1]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Cloud-Soft Quality",
    description: "Comfort beyond imagination",
  },
  {
    icon: (
      <svg className="w-8 h-8 text-[#4299e1]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
    title: "Gentle Returns",
    description: "30-day peaceful returns",
  },
];

export default Hero;
