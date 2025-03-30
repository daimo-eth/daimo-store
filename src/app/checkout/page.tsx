"use client";

import { Order, zOrder } from "@/types";
import { useState } from "react";
import { CheckoutForm } from "./CheckoutForm";
import Image from 'next/image';

const cartItems = [
  {
    id: 1,
    name: "Daimo Cap - Forest",
    price: 35.00,
    image: "/cap-design-3.jpg"
  },
  {
    id: 2,
    name: "Real World Ethereum Cap - Cream",
    price: 35.00,
    image: "/hero-cap.jpg"
  },
  {
    id: 3,
    name: "Real World Ethereum Cap - Light Green",
    price: 35.00,
    image: "/cap-design-2.jpg"
  }

];

export default function CheckoutPage({
  searchParams,
}: {
  searchParams: { order?: string };
}) {
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Parse and validate order from URL
  if (searchParams.order && !order && !error) {
    try {
      const parsed = JSON.parse(decodeURIComponent(searchParams.order));
      const validated = zOrder.parse(parsed);
      setOrder(validated);
    } catch {
      setError("invalid order format");
    }
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Error</h1>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="max-w-md mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Loading...</h1>
      </div>
    );
  }

  const totalUSD = order.items.reduce(
    (sum, item) => sum + item.quantity * item.priceUSD,
    0
  );

  const handlePaymentCompleted = () => {
    setPaymentCompleted(true);
  };

  return (
    <div className="relative min-h-screen">
      {/* Cloud Background - Repeated */}
      <div className="absolute inset-0 w-full h-full">
        <div className="relative h-full w-full">
          <Image
            src="/anime-clouds.jpg"
            alt=""
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative h-full w-full">
          <Image
            src="/anime-clouds.jpg"
            alt=""
            fill
            className="object-cover"
            style={{ transform: 'scaleY(-1)' }} // Flip the second image
            priority
          />
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8 relative">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 bg-white/10 backdrop-blur-sm p-8 rounded-2xl">
            <h1 className="text-4xl font-serif text-[#2c5282] mb-4">
              Complete Your Journey
            </h1>
            <p className="text-lg text-[#2d3748]">
              Your magical cap awaits its new home
            </p>
          </div>

          {/* Cart Summary */}
          <div className="mb-8 bg-white/30 backdrop-blur-md p-8 rounded-2xl shadow-xl">
            <h2 className="text-2xl font-serif text-[#2c5282] mb-6">Order Summary</h2>
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center space-x-4 bg-white/20 p-4 rounded-xl">
                  <div className="relative h-20 w-20 flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-[#2c5282] font-medium">{item.name}</h3>
                    <p className="text-[#2d3748]">${item.price.toFixed(2)}</p>
                  </div>
                </div>
              ))}
              
              <div className="border-t border-[#4299e1]/20 pt-4 mt-4">
                <div className="flex justify-between text-[#2c5282] font-serif">
                  <span>Total</span>
                  <span>${cartItems.reduce((sum, item) => sum + item.price, 0).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Checkout Form Container */}
          <div className="bg-white/30 backdrop-blur-md p-8 rounded-2xl shadow-xl">
            <CheckoutForm
              totalUSD={totalUSD}
              order={order}
              onPaymentCompleted={handlePaymentCompleted}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
