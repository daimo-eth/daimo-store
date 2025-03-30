"use client";

import { useState } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { Radio, RadioGroup } from "@headlessui/react";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: "400",
  subsets: ["latin"],
});

const product = {
  name: "Daimo Cap ダイモのキャップ",
  price: "$40",
  href: "#",
  breadcrumbs: [],
  images: [
    {
      src: "https://sdmntpreastus2.oaiusercontent.com/files/00000000-95b4-51f6-8c13-e3e58c8bcdbe/raw?se=2025-03-30T18%3A40%3A36Z&sp=r&sv=2024-08-04&sr=b&scid=cb9e8ae4-b573-56d9-9106-b0455eda9d59&skoid=3f3a9132-9530-48ef-96b7-fee5a811733f&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-03-30T01%3A19%3A38Z&ske=2025-03-31T01%3A19%3A38Z&sks=b&skv=2024-08-04&sig=mM2w4RmUbYgdsnHjk6gnQGcm59EZlhj1o0P/Ad5e3MI%3D",
      alt: "Light green Real World Ethereum Cap",
    },
    {
      src: "https://sdmntpreastus2.oaiusercontent.com/files/00000000-54e4-51f6-9748-1779fdb9e4da/raw?se=2025-03-30T18%3A34%3A45Z&sp=r&sv=2024-08-04&sr=b&scid=0b742b34-6d87-5de8-903b-59db5470c052&skoid=3f3a9132-9530-48ef-96b7-fee5a811733f&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-03-30T17%3A22%3A35Z&ske=2025-03-31T17%3A22%3A35Z&sks=b&skv=2024-08-04&sig=X6MfoqhK2hwvs9xnSvWb8a8z8/Sz8FRYFMSu5dc8d80%3D",
      alt: "Dark green Daimo Cap",
    },
    {
      src: "https://sdmntpreastus2.oaiusercontent.com/files/00000000-a184-51f6-8b69-c7f5a7482448/raw?se=2025-03-30T18%3A52%3A55Z&sp=r&sv=2024-08-04&sr=b&scid=c9422a29-14df-5b36-a36f-db4785fc45e4&skoid=3f3a9132-9530-48ef-96b7-fee5a811733f&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-03-30T17%3A36%3A12Z&ske=2025-03-31T17%3A36%3A12Z&sks=b&skv=2024-08-04&sig=fCQ2Vyg3I8AZplPz4NblGk7JsRGKb3DnZ7bQheUcLvk%3D",
      alt: "Cream Real World Ethereum Cap",
    },
    {
      src: "https://sdmntpreastus2.oaiusercontent.com/files/00000000-72ec-51f6-a2ee-10f16fae2e8c/raw?se=2025-03-30T18%3A44%3A37Z&sp=r&sv=2024-08-04&sr=b&scid=ad075027-dc0d-5f5c-9c7f-a9038602793e&skoid=a47cd303-16a2-427e-8efb-2ce406116005&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-03-30T01%3A21%3A46Z&ske=2025-03-31T01%3A21%3A46Z&sks=b&skv=2024-08-04&sig=FEQXYyv6L5VY3unKXq9mvlHHs1f4gpUFbLVHuNsz2AM%3D",
      alt: "Model wearing a classic light green cap with subtle artistic elements.",
    },
  ],
  colors: [
    { name: "Cream", class: "bg-amber-50", selectedClass: "ring-amber-400" },
    {
      name: "Light Green",
      class: "bg-[#75BE9B]",
      selectedClass: "ring-[#75BE9B]",
    },
    {
      name: "Forest",
      class: "bg-[#525d60]",
      selectedClass: "ring-[#525d60]",
    },
  ],
  description: "Use Daimo Pay",
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
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);

  return (
    <div
      className={`bg-stone-50 ${poppins.className} text-stone-800 tracking-wide`}
    >
      <div className="pt-10">
        {/* Image gallery */}
        <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
          <img
            alt={product.images[0].alt}
            src={product.images[0].src}
            className="hidden size-full rounded-lg object-cover lg:block shadow-md transition-transform duration-300 hover:scale-[1.02]"
          />
          <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
            <img
              alt={product.images[1].alt}
              src={product.images[1].src}
              className="aspect-3/2 w-full rounded-lg object-cover shadow-md transition-transform duration-300 hover:scale-[1.02]"
            />
            <img
              alt={product.images[2].alt}
              src={product.images[2].src}
              className="aspect-3/2 w-full rounded-lg object-cover shadow-md transition-transform duration-300 hover:scale-[1.02]"
            />
          </div>
          <img
            alt={product.images[3].alt}
            src={product.images[3].src}
            className="aspect-4/5 size-full object-cover rounded-lg shadow-md lg:aspect-auto transition-transform duration-300 hover:scale-[1.02]"
          />
        </div>

        {/* Product info */}
        <div className="mx-auto max-w-2xl px-4 pt-14 pb-20 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto_auto_1fr] lg:gap-x-12 lg:px-8 lg:pt-20 lg:pb-24">
          <div className="lg:col-span-2 lg:border-r lg:border-stone-200 lg:pr-12">
            <h1 className="text-4xl font-light tracking-tight text-stone-900 mb-3">
              {product.name}
            </h1>
            <div className="flex items-center mb-6">
              <div className="h-px bg-stone-300 w-12 mr-4"></div>
              <p className="text-sm italic text-stone-500">
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
                    onChange={setSelectedColor}
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

              <button
                type="submit"
                className={`mt-8 flex w-full items-center justify-center 
                rounded-full bg-gradient-to-b from-blue-300 via-blue-400 to-blue-500
                px-6 py-3 text-lg tracking-wider 
                text-white shadow-sm 
                hover:shadow-blue-200/50 hover:from-blue-400 hover:to-blue-600
                focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2
                transition-all duration-200 overflow-hidden
                relative`}
              >
                <span className="relative z-10 font-normal tracking-widest">
                  Checkout
                </span>
              </button>
            </form>
          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-stone-200 lg:pt-6 lg:pr-12 lg:pb-16">
            {/* Description and details */}
            <div>
              <div className="mt-4">
                <p className="text-base text-stone-700 leading-relaxed font-light">
                  {product.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
