"use client";

import { useState } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { Radio, RadioGroup } from "@headlessui/react";
import Link from "next/link";
import Image from "next/image";
import { Color, Order } from "@/types";

const colorToId = {
  [Color.LightGreen]: "HT-G1",
  [Color.Forest]: "HT-G2",
  [Color.Cream]: "HT-G3",
};

const product = {
  name: "ダイモのキャップ\nDaimo Cap",
  price: "$40",
  href: "#",
  breadcrumbs: [],
  images: [
    {
      src: "/light-green-cap.png",
      alt: "Light green Real World Ethereum Cap",
      width: 1024,
      height: 1536,
    },
    {
      src: "/forest-green-cap.webp",
      alt: "Forest green Daimo Cap",
      width: 1024,
      height: 1024,
    },
    {
      src: "/cream-cap.jpg",
      alt: "Cream Real World Ethereum Cap",
      width: 1024,
      height: 1024,
    },
  ],
  modelImages: {
    [Color.LightGreen]: {
      src: "/maddox-light-green-cap.png",
      alt: "Model wearing a classic light green cap with subtle artistic elements.",
      width: 1024,
      height: 1536,
    },
    [Color.Cream]: {
      src: "/maddox-cream-cap.png",
      alt: "Model wearing a classic cream cap with subtle artistic elements.",
      width: 1024,
      height: 1536,
    },
    [Color.Forest]: {
      src: "/maddox-forest-green-cap.png",
      alt: "Model wearing a classic forest green cap with subtle artistic elements.",
      width: 1024,
      height: 1536,
    },
  } as const,
  colors: [
    {
      color: Color.Cream,
      name: "Cream",
      class: "bg-amber-50",
      selectedClass: "ring-amber-400",
    },
    {
      color: Color.LightGreen,
      name: "Light Green",
      class: "bg-[#75BE9B]",
      selectedClass: "ring-[#75BE9B]",
    },
    {
      color: Color.Forest,
      name: "Forest",
      class: "bg-[#525d60]",
      selectedClass: "ring-[#525d60]",
    },
  ],
  description: "Use Daimo Pay ",
  details:
    "Our caps begin as raw organic cotton, carefully selected from small-scale farms that practice sustainable agriculture. Each piece is hand-cut and assembled in our studio, then dyed using natural pigments derived from plants and minerals. The signature embroidery is added by our skilled artisans, with designs inspired by local landscapes and traditions. Due to the handmade nature of these caps, slight variations in color and pattern make each one truly one-of-a-kind.",
  sustainablity:
    "By choosing our Artisan Cap, you're supporting ethical manufacturing practices and helping to preserve traditional craftsmanship. We pay our artisans fair wages and ensure safe working conditions. All packaging is plastic-free and biodegradable.",
  materials:
    "100% GOTS-certified organic cotton outer, recycled cotton lining, brass adjusters",
};
const reviews = { href: "#", average: 4.8 };

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Product() {
  // Default to first color
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [order, setOrder] = useState<Order>({
    items: [
      {
        id: colorToId[selectedColor.color],
        quantity: 1,
      },
    ],
  });

  const handleColorChange = (color: {
    color: Color;
    name: string;
    class: string;
    selectedClass: string;
  }) => {
    setSelectedColor(color);
    setOrder({
      items: [
        {
          id: colorToId[color.color],
          quantity: 1,
        },
      ],
    });
  };

  return (
    <div className={`bg-stone-50 text-stone-800 tracking-wide`}>
      <div className="pt-10">
        {/* Image gallery */}
        <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
          <Image
            alt={product.images[0].alt}
            src={product.images[0].src}
            width={product.images[0].width}
            height={product.images[0].height}
            className="hidden size-full rounded-lg object-cover lg:block shadow-md transition-transform duration-300 hover:scale-[1.02]"
          />
          <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
            <Image
              alt={product.images[1].alt}
              src={product.images[1].src}
              width={product.images[1].width}
              height={product.images[1].height}
              className="aspect-3/2 w-full rounded-lg object-cover shadow-md transition-transform duration-300 hover:scale-[1.02]"
            />
            <Image
              alt={product.images[2].alt}
              src={product.images[2].src}
              width={product.images[2].width}
              height={product.images[2].height}
              className="aspect-3/2 w-full rounded-lg object-cover shadow-md transition-transform duration-300 hover:scale-[1.02]"
            />
          </div>
          <Image
            alt={product.modelImages[selectedColor.color].alt}
            src={product.modelImages[selectedColor.color].src}
            width={product.modelImages[selectedColor.color].width}
            height={product.modelImages[selectedColor.color].height}
            className="aspect-4/5 size-full object-cover rounded-lg shadow-md lg:aspect-auto transition-transform duration-300 hover:scale-[1.02]"
          />
        </div>

        {/* Product info */}
        <div className="mx-auto max-w-2xl px-4 pt-14 pb-20 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto_auto_1fr] lg:gap-x-12 lg:px-8 lg:pt-20 lg:pb-24">
          <div className="lg:col-span-2 lg:border-r lg:border-stone-200 lg:pr-12">
            <h1 className="text-4xl sm:text-7xl font-light tracking-tight text-stone-900 mb-3">
              {product.name}
            </h1>
            <div className="flex items-center mb-6">
              <div className="h-px bg-stone-300 w-12 mr-4"></div>
              <p className="text-base sm:text-xl italic text-stone-500">
                Real World Ethereum Caps
              </p>
            </div>
          </div>

          {/* Options */}
          <div className="mt-4 lg:row-span-3 lg:mt-0 lg:pl-6">
            <h2 className="sr-only">Product information</h2>
            <div className="flex items-end">
              <p className="text-3xl tracking-tight text-stone-900 font-light">
                {product.price}
              </p>
              <p className="ml-3 text-sm text-stone-500 mb-1">USD</p>
            </div>

            {/* Reviews */}
            <div className="mb-10 border-b border-stone-200 py-4">
              <div className="flex items-center">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      aria-hidden="true"
                      className={classNames(
                        reviews.average > rating
                          ? "text-amber-500"
                          : "text-stone-300",
                        "size-4 shrink-0"
                      )}
                    />
                  ))}
                </div>
                <p className="sr-only">{reviews.average} out of 5 stars</p>
              </div>
            </div>

            <form className="mt-10">
              {/* Colors */}
              <div>
                <h3 className="text-sm uppercase tracking-wider font-medium text-stone-700">
                  Color
                </h3>

                <fieldset aria-label="Choose a color" className="mt-4 mb-8">
                  <RadioGroup
                    value={selectedColor}
                    onChange={handleColorChange}
                    className="flex items-center gap-x-4"
                  >
                    {product.colors.map((color) => (
                      <div
                        key={color.name}
                        className="flex flex-col items-center"
                      >
                        <Radio
                          value={color}
                          aria-label={color.name}
                          className={classNames(
                            color.selectedClass,
                            "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-hidden data-checked:ring-2 data-focus:data-checked:ring-3 data-focus:data-checked:ring-offset-1"
                          )}
                        >
                          <span
                            aria-hidden="true"
                            className={classNames(
                              color.class,
                              "size-8 rounded-full border border-stone-300"
                            )}
                          />
                        </Radio>
                        <span className="mt-2 text-xs text-stone-600">
                          {color.name}
                        </span>
                      </div>
                    ))}
                  </RadioGroup>
                </fieldset>
              </div>

              <Link
                href={`/checkout?order=${encodeURIComponent(
                  JSON.stringify(order)
                )}`}
                className="flex w-full items-center justify-center 
    rounded-full bg-gradient-to-b from-blue-500/70 to-blue-700/70
    px-8 py-4 text-base font-medium 
    text-white
    hover:from-blue-500/80 hover:to-blue-700/80 "
              >
                Checkout
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
