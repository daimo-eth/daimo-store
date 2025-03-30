"use client";

import { Order, zOrder } from "@/types";
import { useState } from "react";
import { CheckoutForm } from "./CheckoutForm";

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
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-8">Checkout</h1>

      {paymentCompleted ? (
        <div className="text-center p-8 bg-green-50 rounded-lg">
          <h2 className="text-xl font-semibold text-green-700 mb-2">
            Thank you for your order!
          </h2>
          <p className="text-green-600">
            Your payment has been processed successfully.
          </p>
        </div>
      ) : (
        <>
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Order Details</h2>
            {order.items.map((item) => (
              <div key={item.id} className="flex justify-between py-2">
                <div>
                  <div className="font-medium">{item.title}</div>
                  <div className="text-sm text-gray-600">{item.subtitle}</div>
                  <div className="text-sm text-gray-500">
                    Quantity: {item.quantity}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">
                    ${(item.quantity * item.priceUSD).toFixed(2)}
                  </div>
                  <div className="text-sm text-gray-500">
                    ${item.priceUSD.toFixed(2)} each
                  </div>
                </div>
              </div>
            ))}
            <div className="flex justify-between py-2 font-semibold">
              <div>Total</div>
              <div>${totalUSD.toFixed(2)}</div>
            </div>
          </div>

          <CheckoutForm
            totalUSD={totalUSD}
            order={order}
            onPaymentCompleted={handlePaymentCompleted}
          />
        </>
      )}
    </div>
  );
}
