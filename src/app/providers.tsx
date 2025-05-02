'use client'

import { DaimoPayProvider, getDefaultConfig } from '@daimo/pay'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider, createConfig } from 'wagmi'
import { FarcasterProvider } from '@/contexts/FarcasterContext'

const config = createConfig(
  getDefaultConfig({
    appName: "Daimo Pay Hello World",
    ssr: true,
  })
)

const queryClient = new QueryClient()

const customTheme = {
  "--ck-font-weight": "400",
  "--ck-border-radius": "20px",
  "--ck-overlay-background": "#00000008",
  "--ck-overlay-backdrop-filter": "blur(10px)",

  "--ck-modal-box-shadow": "0 8px 24px rgba(0, 0, 0, 0.08)",
  "--ck-body-background": "rgba(255, 255, 255, 0.45)",
  "--ck-body-background-secondary": "rgba(255, 255, 255, 0.35)",
  "--ck-body-background-tertiary": "rgba(255, 255, 255, 0.25)",
  "--ck-body-color": "#2C3E50",
  "--ck-body-color-muted": "#5E6C84",
  "--ck-body-color-muted-hover": "#111111",

  "--ck-connectbutton-font-size": "15px",
  "--ck-connectbutton-border-radius": "16px",
  "--ck-connectbutton-color": "#2C3E50",
  "--ck-connectbutton-background": "rgba(255, 255, 255, 0.6)",
  "--ck-connectbutton-background-secondary": "rgba(255, 255, 255, 0.5)",
  "--ck-connectbutton-box-shadow": "0 4px 10px rgba(0, 0, 0, 0.05)",
  "--ck-connectbutton-hover-background": "rgba(255, 255, 255, 0.8)",
  "--ck-connectbutton-active-background": "rgba(255, 255, 255, 0.9)",

  "--ck-primary-button-font-weight": "600",
  "--ck-primary-button-border-radius": "16px",
  "--ck-primary-button-color": "#ffffff",
  "--ck-primary-button-background": "#4299e1",
  "--ck-primary-button-box-shadow": "0 2px 6px rgba(0, 0, 0, 0.04)",
  "--ck-primary-button-hover-color": "#ffffff",
  "--ck-primary-button-hover-background": "#3182ce",
  "--ck-primary-button-hover-box-shadow": "0 4px 10px rgba(0, 0, 0, 0.06)",
  "--ck-primary-button-active-color": "#ffffff",
  "--ck-primary-button-active-background": "#2b6cb0",
  "--ck-primary-button-active-box-shadow": "inset 0 0 0 1px #2b6cb0",

  "--ck-secondary-button-color": "#2C3E50",
  "--ck-secondary-button-background": "rgba(255, 255, 255, 0.4)",
  "--ck-secondary-button-hover-background": "rgba(255, 255, 255, 0.6)",
  "--ck-secondary-button-active-background": "rgba(255, 255, 255, 0.75)",

  "--ck-tooltip-background": "rgba(255, 255, 255, 0.9)",
  "--ck-tooltip-color": "#2C3E50",
  "--ck-tooltip-shadow": "0px 2px 10px rgba(0,0,0,0.1)",

  "--ck-body-divider": "rgba(255, 255, 255, 0.3)",
  "--ck-focus-color": "#7DE9FC",
  "--ck-spinner-color": "#7DE9FC",
  "--ck-qr-background": "rgba(255, 255, 255, 0.85)",
  "--ck-qr-dot-color": "#2C3E50",
  "--ck-qr-border-color": "rgba(255, 255, 255, 0.5)"
}



export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <DaimoPayProvider customTheme={customTheme}>
          <FarcasterProvider>{children}</FarcasterProvider>
        </DaimoPayProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
} 