import { Color, StoreItem } from "./types";

const mult = process.env.NODE_ENV === "production" ? 0.1 : 0.01;

export const storeItems: StoreItem[] = [
  {
    id: "HT-G1",
    color: Color.Cream,
    title: "Cream Cap",
    subtitle: "Real World Ethereum",
    priceUSD: 30 * mult,
    heroImage: {
      src: "/cream-cap.jpg",
      alt: "Cream Real World Ethereum Cap",
      width: 1024,
      height: 1024,
    },
    image: {
      src: "/cream-cap.jpg",
      alt: "Cream Real World Ethereum Cap",
      width: 256,
      height: 256,
    },
  },
  {
    id: "HT-G2",
    color: Color.LightGreen,
    title: "Light Green Cap",
    subtitle: "Real World Ethereum",
    priceUSD: 3500 * mult,
    heroImage: {
      src: "/light-green-cap.png",
      alt: "Light Green Real World Ethereum Cap",
      width: 1024,
      height: 1536,
    },
    image: {
      src: "/light-green-cap-small.png",
      alt: "Light Green Real World Ethereum Cap",
      width: 256,
      height: 256,
    },
  },
  {
    id: "HT-G3",
    color: Color.Forest,
    title: "Forest Cap",
    subtitle: "Daimo OG",
    priceUSD: 30 * mult,
    heroImage: {
      src: "/forest-green-cap.webp",
      alt: "Forest Daimo Cap",
      width: 1024,
      height: 1024,
    },
    image: {
      src: "/forest-green-cap.webp",
      alt: "Forest Daimo Cap",
      width: 256,
      height: 256,
    },
  },
];
