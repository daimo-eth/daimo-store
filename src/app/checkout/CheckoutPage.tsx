"use client";

import { Order } from "@/types";
import { assertNotNull, PaymentCompletedEvent } from "@daimo/pay-common";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ItemImage } from "../item";
import { CheckoutForm } from "./CheckoutForm";
import { storeItems } from "@/storeItems";

export default function CheckoutPage({ order }: { order: Order }) {
  const [paymentCompleted, setPaymentCompleted] =
    useState<PaymentCompletedEvent>();

  const rows = order.items.map((item) => ({
    item,
    storeItem: assertNotNull(storeItems.find((s) => s.id === item.id)),
  }));

  const totalUSD = rows.reduce(
    (sum, row) => sum + row.item.quantity * row.storeItem.priceUSD,
    0
  );

  return (
    <div className="relative min-h-screen">
      {/* Cloud Background - Single image is enough */}
      <div className="fixed inset-0 w-full h-full">
        <div className="relative h-full w-full">
          <Image
            src="/anime-clouds.jpg"
            alt=""
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 relative">
        <div className="max-w-3xl mx-auto pb-8">
          {/* Header */}
          <div className="text-center mb-12 bg-white/10 backdrop-blur-sm p-8 rounded-2xl">
            <h1 className="text-4xl font-serif text-[#2c5282] mb-4">
              Complete Your Journey
            </h1>
            <p className="text-lg text-[#2d3748]">
              Your Real World Ethereum cap awaits its new home
            </p>
          </div>

          {/* Cart Summary */}
          <div className="mb-8 bg-white/30 backdrop-blur-md p-8 rounded-2xl shadow-xl">
            <h2 className="text-2xl font-serif text-[#2c5282] mb-6">
              Order Summary
            </h2>
            <div className="space-y-4">
              {rows.map((row) => (
                <div
                  key={row.item.id}
                  className="flex items-center gap-6 bg-white/20 p-4 rounded-xl"
                >
                  <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                    <ItemImage id={row.item.id} />
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-[#2c5282] text-lg font-medium mb-1">
                      {row.storeItem.title}
                    </h3>
                    <p className="text-[#2d3748]">
                      Quantity: {row.item.quantity}
                    </p>
                  </div>
                  <div className="flex-shrink-0 text-right">
                    <p className="text-[#2c5282] text-lg font-medium">
                      ${row.storeItem.priceUSD.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}

              <div className="border-t border-[#4299e1]/20 pt-4 mt-6">
                <div className="flex justify-between items-center text-[#2c5282] font-serif text-xl">
                  <span>Total</span>
                  <span>${totalUSD.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Checkout Form Container */}
          <div className="bg-white/30 backdrop-blur-md p-8 rounded-2xl shadow-xl">
            {paymentCompleted ? (
              <CheckoutCompleted payment={paymentCompleted} />
            ) : (
              <CheckoutForm
                totalUSD={totalUSD}
                order={order}
                onPaymentCompleted={setPaymentCompleted}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function CheckoutCompleted({ payment }: { payment: PaymentCompletedEvent }) {
  return (
    <div className="text-center py-8">
      <div className="mb-6">
        <svg
          className="w-16 h-16 text-green-500 mx-auto"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 13l4 4L19 7"
          ></path>
        </svg>
      </div>
      <h2 className="text-2xl font-serif text-[#2c5282] mb-4">
        payment complete!
      </h2>
      <p className="text-[#2d3748] mb-6">
        your magical cap is on its way to you
      </p>
      <div className="bg-white/20 p-4 rounded-xl text-left mb-6">
        <Link
          href={`https://optimism.etherscan.io/tx/${payment.txHash}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-[#2c5282] hover:text-[#1a365d] underline font-medium"
        >
          view transaction
        </Link>
      </div>
      <Link
        href="/"
        className="inline-block bg-[#2c5282] text-white px-6 py-2 rounded-lg hover:bg-[#1a365d] transition-colors"
      >
        return to store
      </Link>
    </div>
  );
}
