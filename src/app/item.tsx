"use client";

import { storeItems } from "@/storeItems";
import Image from "next/image";

interface ItemImageProps {
  id: string;
}

export function ItemImage({ id }: ItemImageProps) {
  const item = storeItems.find((item) => item.id === id);
  if (!item) return null;

  return (
    <Image
      src={item.image.src}
      alt={item.image.alt}
      width={item.image.width}
      height={item.image.height}
      className="object-cover"
      priority
    />
  );
}
