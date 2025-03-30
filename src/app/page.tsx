import Hero from "@/components/hero";
import Product from "@/components/product";
import { Metadata } from "next";
import { metaOpenGraph } from "./meta";

export const generateMetadata = (): Metadata => {
  return metaOpenGraph;
};

export default function Home() {
  return (
    <div>
      <Hero />
      <Product />
    </div>
  );
}
