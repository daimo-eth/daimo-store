'use client'

import Hero from "@/components/hero";

export default function Home() {
  const order = {
    items: [
      { id: "HT-G1", title: "Green Hat", subtitle: "Real World Ethereum", quantity: 2, priceUSD: 0.15 },
      { id: "HT-G2", title: "Grey Hat", subtitle: "Real World Ethereum", quantity: 1, priceUSD: 0.20 }
    ]
  };

  return (
    <div>
      <Hero />
    </div>
  );
}
