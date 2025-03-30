import { z } from "zod";

export enum Color {
  LightGreen = "Light Green",
  Cream = "Cream",
  Forest = "Forest",
}

export interface StoreItem {
  id: string;
  title: string;
  subtitle: string;
  priceUSD: number;
  imageUrl: string;
}

export const zOrderItem = z.object({
  id: z.string(),
  quantity: z.number(),
});

export const zOrder = z.object({
  items: z.array(zOrderItem),
});

export type Order = z.infer<typeof zOrder>;
