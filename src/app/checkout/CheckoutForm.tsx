"use client";

import { Order } from "@/types";
import { DaimoPayButton } from "@daimo/pay";
import { optimismUSDC } from "@daimo/pay-common";
import { DaimoPayEvent } from "@daimo/pay";
import { useMemo, useState, useEffect } from "react";
import { getAddress } from "viem";
import Autocomplete from "react-google-autocomplete";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

function Input({ label, error, className = "", ...props }: InputProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        {...props}
        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          error ? "border-red-500" : ""
        } ${className}`}
        autoComplete="off"
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}

export interface CheckoutFormData {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
}

export function CheckoutForm({
  onPaymentCompleted,
  totalUSD,
  order,
}: {
  onPaymentCompleted?: (event: DaimoPayEvent) => void;
  totalUSD: number;
  order: Order;
}) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
  });
  const [isFarcaster, setIsFarcaster] = useState(false);

  useEffect(() => {
    const checkFarcaster = async () => {
      try {
        const { sdk } = await import('@farcaster/frame-sdk');
        const context = await sdk.context;
        // If we can get the context and there's a user FID, we're in a Farcaster mini app
        setIsFarcaster(!!context?.user?.fid);
        await sdk.actions.ready();
      } catch (e) {
        console.error('Failed to initialize Farcaster:', e);
        setIsFarcaster(false);
      }
    };
    checkFarcaster();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const [errors, setErrors] = useState({ email: false });
  const hasErrors = Object.values(errors).some(Boolean);

  const { firstName, lastName, email, address } = formData;
  const hasMissing = isFarcaster 
    ? email === ""
    : [firstName, lastName, email, address].includes("");
  const isFormValid = !hasErrors && !hasMissing;

  const validate = () => {
    setErrors({
      email: formData.email !== "" && !isValidEmail(formData.email),
    });
  };

  const appId = "pay-demo";
  const destCoin = optimismUSDC;
  const destAddr = "0xEEee8B1371f1664b7C2A8c111D6062b6576fA6f0";
  const metadata = useMemo(
    () => ({
      orderJSON: JSON.stringify(order),
      ...formData,
      ...(isFarcaster ? { email: "gianluca+farcon@daimo.com" } : {}),
    }),
    [order, formData, isFarcaster]
  );

  return (
    <DaimoPayButton.Custom
      intent="Checkout"
      appId={appId}
      toChain={destCoin.chainId}
      toToken={getAddress(destCoin.token)}
      toUnits={totalUSD.toFixed(2)}
      paymentOptions={isFarcaster ? [] : undefined}
      toAddress={destAddr}
      onPaymentCompleted={onPaymentCompleted}
      metadata={metadata}
      closeOnSuccess
    >
      {({ show }) => (
        isFarcaster ? (
          <button
            type="button"
            onClick={show}
            className="w-full px-4 py-2 text-white rounded-md bg-blue-500"
          >
            Pay ${totalUSD.toFixed(2)}
          </button>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              show();
            }}
            className="space-y-6"
          >
            <p className="text-gray-600">
              Checkout instantly from any currency, any chain.
            </p>
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Input
                  label="First name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
                <Input
                  label="Last name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <Autocomplete
                  apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
                  options={{
                    types: ["address"],
                    componentRestrictions: { country: ["us", "ca"] },
                  }}
                  onPlaceSelected={(place) => {
                    if (place.formatted_address) {
                      setFormData(prev => ({ ...prev, address: place.formatted_address }));
                    }
                  }}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your address"
                  data-1p-ignore
                />
              </div>
              <Input
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                onBlur={validate}
                error={errors.email ? "invalid email address" : undefined}
              />
              <button
                type="submit"
                disabled={!isFormValid}
                className="w-full px-4 py-2 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed bg-blue-500"
              >
                Pay ${totalUSD.toFixed(2)}
              </button>
            </div>
          </form>
        )
      )}
    </DaimoPayButton.Custom>
  );
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
