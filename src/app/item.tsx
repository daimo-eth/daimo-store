"use client";

import { StoreItem } from "@/types";
import Image from "next/image";

export const storeItems: StoreItem[] = [
  {
    id: "HT-G1",
    title: "Cream Cap",
    subtitle: "Real World Ethereum",
    priceUSD: 40,
    imageUrl: "/cream-cap.jpg",
  },
  {
    id: "HT-G2",
    title: "Light Green Cap",
    subtitle: "Real World Ethereum",
    priceUSD: 40,
    imageUrl: "/light-green-cap.png",
  },
  {
    id: "HT-G3",
    title: "Forest Cap",
    subtitle: "Daimo OG",
    priceUSD: 40,
    imageUrl: "/forest-green-cap.webp",
  },
];

interface ItemImageProps {
  id: string;
}

export function ItemImage({ id }: ItemImageProps) {
  const item = storeItems.find((item) => item.id === id);
  if (!item) return null;

  return (
    <Image
      src={item.imageUrl}
      alt={item.title}
      fill
      className="object-cover"
      priority
    />
  );
}
