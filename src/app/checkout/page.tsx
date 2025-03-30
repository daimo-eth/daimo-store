import { zOrder } from "@/types";
import CheckoutPage from "./CheckoutPage";

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
