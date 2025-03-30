'use client'

import { DaimoPayButton } from "@daimo/pay";

export default function Home() {
  return (
    <div className="flex flex-col items-center min-h-screen p-8">
      <main className="flex flex-col items-center gap-8 max-w-md w-full py-12">
        <h1 className="text-3xl font-bold">Hello Daimo Pay</h1>
        <p className="text-gray-600 dark:text-gray-400">edit page.tsx to get started</p>
        
        <DaimoPayButton
          appId="pay-demo"
          toAddress="0xc60A0A0E8bBc32DAC2E03030989AD6BEe45A874D"
          toChain={10} // Optimism
          toUnits="0.10" // $0.10 USDC
          toToken="0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85" // Optimism USDC
        />
        
        <div className="mt-8 text-sm text-gray-500 dark:text-gray-400">
          This button allows you to send $0.10 USDC on Optimism
        </div>
      </main>
    </div>
  );
}
