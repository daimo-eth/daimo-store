'use client'

import Link from "next/link";

export default function Home() {
  const order = {
    items: [
      { id: "HT-G1", title: "Green Hat", subtitle: "Real World Ethereum", quantity: 2, priceUSD: 0.15 },
      { id: "HT-G2", title: "Grey Hat", subtitle: "Real World Ethereum", quantity: 1, priceUSD: 0.20 }
    ]
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-8">
      <main className="flex flex-col items-center gap-8 max-w-md w-full py-12">
        <h1 className="text-3xl font-bold">Hello Daimo Pay</h1>
        <p className="text-gray-600 dark:text-gray-400">edit page.tsx to get started</p>
        
        <Link 
          href={`/checkout?order=${encodeURIComponent(JSON.stringify(order))}`}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          Checkout Example Order
        </Link>
        
        <div className="mt-8 text-sm text-gray-500 dark:text-gray-400">
          This button allows you to send $0.10 USDC on Optimism
        </div>
      </main>
    </div>
  );
}
