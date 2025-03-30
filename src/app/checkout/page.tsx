import { zOrder } from "@/types";
import { Metadata } from "next";
import CheckoutPage from "./CheckoutPage";
import { metaOpenGraph } from "../meta";

export const generateMetadata = (): Metadata => {
  return metaOpenGraph;
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ order?: string }>;
}) {
  const { order } = await searchParams;
  try {
    const parsedOrder = zOrder.parse(JSON.parse(order ?? "{}"));
    return <CheckoutPage order={parsedOrder} />;
  } catch {
    return <div>Invalid order</div>;
  }
}
