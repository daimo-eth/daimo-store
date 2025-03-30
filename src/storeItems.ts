import { Color, StoreItem } from "./types";

export const storeItems: StoreItem[] = [
  {
    id: "HT-G1",
    color: Color.Cream,
    title: "Cream Cap",
    subtitle: "Real World Ethereum",
    priceUSD: 40,
    image: {
      src: "/cream-cap.jpg",
      alt: "Cream Real World Ethereum Cap",
      width: 1024,
      height: 1024,
    },
  },
  {
    id: "HT-G2",
    color: Color.LightGreen,
    title: "Light Green Cap",
    subtitle: "Real World Ethereum",
    priceUSD: 40,
    image: {
      src: "/light-green-cap.png",
      alt: "Light green Real World Ethereum Cap",
      width: 1024,
      height: 1536,
    },
  },
  {
    id: "HT-G3",
    color: Color.Forest,
    title: "Forest Cap",
    subtitle: "Daimo OG",
    priceUSD: 40,
    image: {
      src: "/forest-green-cap.webp",
      alt: "Forest green Daimo Cap",
      width: 1024,
      height: 1024,
    },
  },
];
