"use client";

import { Order } from "@/types";
import { DaimoPayButton } from "@daimo/pay";
import { optimismUSDC, PaymentCompletedEvent } from "@daimo/pay-common";
import { useMemo, useState } from "react";
import { getAddress } from "viem";

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
  city: string;
  country: string;
  postalCode: string;
}

export function CheckoutForm({
  onPaymentCompleted,
  totalUSD,
  order,
}: {
  onPaymentCompleted?: (event: PaymentCompletedEvent) => void;
  totalUSD: number;
  order: Order;
}) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    country: "",
    postalCode: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const [errors, setErrors] = useState({ email: false });
  const hasErrors = Object.values(errors).some(Boolean);

  const { firstName, lastName, email, address, city, country, postalCode } =
    formData;
  const hasMissing = [
    firstName,
    lastName,
    email,
    address,
    city,
    country,
    postalCode,
  ].includes("");
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
    }),
    [order, formData]
  );

  return (
    <DaimoPayButton.Custom
      intent="Checkout"
      appId={appId}
      toChain={destCoin.chainId}
      toToken={getAddress(destCoin.token)}
      toUnits={totalUSD.toFixed(2)}
      toAddress={destAddr}
      onPaymentCompleted={onPaymentCompleted}
      metadata={metadata}
      closeOnSuccess
    >
      {({ show }) => (
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
            <Input
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              onBlur={validate}
              error={errors.email ? "invalid email address" : undefined}
            />
            <Input
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
            />
            <Input
              label="City"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
            />
            <Input
              label="Country"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
            />
            <Input
              label="Postal Code"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleInputChange}
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
      )}
    </DaimoPayButton.Custom>
  );
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
