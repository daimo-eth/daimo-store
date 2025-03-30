"use client";

import { useState } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { Radio, RadioGroup } from "@headlessui/react";
import Link from "next/link";
import Image from "next/image";
import { Color, Order, StoreItem } from "@/types";
import { storeItems } from "@/storeItems";
import { assertNotNull } from "@daimo/pay-common";

const itemColorIcon = {
  [Color.Cream]: {
    class: "bg-amber-50",
    selectedClass: "ring-amber-400",
  },
  [Color.LightGreen]: {
    class: "bg-[#75BE9B]",
    selectedClass: "ring-[#75BE9B]",
  },
  [Color.Forest]: {
    class: "bg-[#525d60]",
    selectedClass: "ring-[#525d60]",
  },
} as const;

const getStoreItem = (color: Color) =>
  assertNotNull(storeItems.find((item) => item.color === color));
const demoImages = {
  [Color.LightGreen]: getStoreItem(Color.LightGreen).heroImage,
  [Color.Cream]: getStoreItem(Color.Cream).heroImage,
  [Color.Forest]: getStoreItem(Color.Forest).heroImage,
} as const;

const modelImages = {
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
} as const;

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Product() {
  // Default to first color
  const [selectedItem, setSelectedItem] = useState(storeItems[0]);
  const [order, setOrder] = useState<Order>({
    items: [
      {
        id: selectedItem.id,
        quantity: 1,
      },
    ],
  });

  const handleItemChange = (item: StoreItem) => {
    setSelectedItem(item);
    setOrder({
      items: [
        {
          id: item.id,
          quantity: 1,
        },
      ],
    });
  };

  return (
    <div className={`bg-sky-50 tracking-wide`}>
      <div className="pt-10">
        {/* Image gallery */}
        <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
          <Image
            alt={demoImages[Color.LightGreen].alt}
            src={demoImages[Color.LightGreen].src}
            width={demoImages[Color.LightGreen].width}
            height={demoImages[Color.LightGreen].height}
            className="hidden size-full rounded-lg object-cover lg:block shadow-md transition-transform duration-300 hover:scale-[1.02]"
          />
          <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
            <Image
              alt={demoImages[Color.Cream].alt}
              src={demoImages[Color.Cream].src}
              width={demoImages[Color.Cream].width}
              height={demoImages[Color.Cream].height}
              className="aspect-3/2 w-full rounded-lg object-cover shadow-md transition-transform duration-300 hover:scale-[1.02]"
            />
            <Image
              alt={demoImages[Color.Forest].alt}
              src={demoImages[Color.Forest].src}
              width={demoImages[Color.Forest].width}
              height={demoImages[Color.Forest].height}
              className="aspect-3/2 w-full rounded-lg object-cover shadow-md transition-transform duration-300 hover:scale-[1.02]"
            />
          </div>
          <Image
            alt={modelImages[selectedItem.color].alt}
            src={modelImages[selectedItem.color].src}
            width={modelImages[selectedItem.color].width}
            height={modelImages[selectedItem.color].height}
            className="aspect-4/5 size-full object-cover rounded-lg shadow-md lg:aspect-auto transition-transform duration-300 hover:scale-[1.02]"
          />
        </div>

        {/* Product info */}
        <div className="mx-auto max-w-2xl px-4 pt-14 pb-20 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto_auto_1fr] lg:gap-x-12 lg:px-8 lg:pt-20 lg:pb-24">
          <div className="lg:col-span-2 lg:border-r lg:border-stone-200 lg:pr-12">
            <h1 className="text-4xl sm:text-7xl font-light tracking-tight text-stone-900 mb-3">
              <span>ダイモのキャップ</span>
              <span>Daimo Cap</span>
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
                ${selectedItem.priceUSD.toFixed(2).replace(".00", "")}
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
                      className="text-amber-500 size-4 shrink-0"
                    />
                  ))}
                </div>
                <p className="sr-only">5 out of 5 stars</p>
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
                    value={selectedItem}
                    onChange={handleItemChange}
                    className="flex items-center gap-x-4"
                  >
                    {storeItems.map((item) => (
                      <div key={item.id} className="flex flex-col items-center">
                        <Radio
                          value={item}
                          aria-label={item.color}
                          className={classNames(
                            itemColorIcon[item.color].selectedClass,
                            "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-hidden data-checked:ring-2 data-focus:data-checked:ring-3 data-focus:data-checked:ring-offset-1"
                          )}
                        >
                          <span
                            aria-hidden="true"
                            className={classNames(
                              itemColorIcon[item.color].class,
                              "size-8 rounded-full border border-stone-300"
                            )}
                          />
                        </Radio>
                        <span className="mt-2 text-xs text-stone-600">
                          {item.color}
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
