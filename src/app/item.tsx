'use client'

import { StoreItem } from '@/types'
import Image from 'next/image'

export const storeItems: StoreItem[] = [
  {
    id: 'HT-G1',
    title: 'Cream Cap',
    subtitle: 'Real World Ethereum',
    priceUSD: 20,
    imageUrl: '/hero-cap.jpg'
  },
  {
    id: 'HT-G2',
    title: 'Light Green Cap',
    subtitle: 'Real World Ethereum',
    priceUSD: 20,
    imageUrl: '/cap-design-2.jpg'
  },
  {
    id: 'HT-G3',
    title: 'Forest Cap',
    subtitle: 'Daimo OG',
    priceUSD: 20,
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
    <Image
      src={item.imageUrl}
      alt={item.title}
      fill
      className="object-cover"
      priority
    />
  )
}
