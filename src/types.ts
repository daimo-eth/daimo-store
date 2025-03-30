import { z } from "zod";

export const zOrderItem = z.object({
  id: z.string(),
  title: z.string(),
  subtitle: z.string(),
  quantity: z.number(),
  priceUSD: z.number(),
});

export const zOrder = z.object({
  items: z.array(zOrderItem),
});

export type Order = z.infer<typeof zOrder>;
