'use client'

import { StoreItem } from '@/types'
import Image from 'next/image'

export const storeItems: StoreItem[] = [
  {
    id: 'HT-G1',
    title: 'Green Cap',
    subtitle: 'Real World Ethereum',
    priceUSD: 0.10,
    imageUrl: '/hero-cap.jpg'
  },
  {
    id: 'HT-G2',
    title: 'Grey Cap',
    subtitle: 'Real World Ethereum',
    priceUSD: 0.10,
    imageUrl: '/cap-design-2.jpg'
  },
  {
    id: 'HT-G3',
    title: 'Blue Cap',
    subtitle: 'Real World Ethereum',
    priceUSD: 0.15,
    imageUrl: '/cap-design-3.jpg'
  }
]

interface ItemImageProps {
  id: string
  className?: string
}

export function ItemImage({ id, className = '' }: ItemImageProps) {
  const item = storeItems.find(item => item.id === id)
  if (!item) return null

  return (
    <div className="relative h-[500px] w-full">
      <div className="absolute -top-10 -left-10 w-full h-full bg-white/20 backdrop-blur-sm rounded-2xl transform rotate-3"></div>
      <div className="absolute w-full h-full">
        <Image
          src={item.imageUrl}
          alt={item.title}
          fill
          className={`object-cover rounded-2xl shadow-xl transform -rotate-2 ${className}`}
          priority
        />
      </div>
    </div>
  )
}
