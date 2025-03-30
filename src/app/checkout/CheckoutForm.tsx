'use client'

import { Button } from "@/src/shared/tailwind-catalyst/button"
import { Field, FieldGroup, Fieldset, Label } from "@/src/shared/tailwind-catalyst/fieldset"
import { Input } from "@/src/shared/tailwind-catalyst/input"
import { Text } from "@/src/shared/tailwind-catalyst/text"
import { useState } from "react"
import { DaimoPayButton } from "@daimo/pay"
import { optimismUSDC, PaymentCompletedEvent } from "@daimo/pay-common"
import { getAddress } from "viem"
import { isValidEmail } from "../../utils/validation"
import { AddressInput } from "../build/address-input"

export interface CheckoutFormData {
  firstName: string
  lastName: string
  email: string
  address: string
}

export function CheckoutForm({
  onPaymentCompleted,
  themeColor,
  amountUSD,
}: {
  onPaymentCompleted?: (event: PaymentCompletedEvent) => void
  themeColor: string
  amountUSD: number
}) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const [errors, setErrors] = useState({ email: false })
  const hasErrors = Object.values(errors).some(Boolean)

  const { firstName, lastName, email, address } = formData
  const hasMissing = [firstName, lastName, email, address].includes("")
  const isFormValid = !hasErrors && !hasMissing

  const validate = () => {
    setErrors({
      email: formData.email !== "" && !isValidEmail(formData.email),
    })
  }

  const appId = "daimopay-growsf"
  const destCoin = optimismUSDC
  const destAddr = "0x555d5b5213b5782ddf5314f17d112fa118899f80"

  return (
    <Fieldset>
      <Text>Instant transfer from any coin, any chain.</Text>
      <FieldGroup>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-4">
          <Field>
            <Label>First name</Label>
            <Input
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              themeColor={themeColor}
            />
          </Field>
          <Field>
            <Label>Last name</Label>
            <Input
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              themeColor={themeColor}
            />
          </Field>
        </div>
        <Field>
          <Label>Email</Label>
          <Input
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            onBlur={validate}
            invalid={errors.email}
            themeColor={themeColor}
          />
        </Field>
        <AddressInput
          address={formData.address}
          onChange={(address: string) =>
            setFormData((formData) => ({ ...formData, address }))
          }
        />
        <Field>
          <DaimoPayButton.Custom
            intent="Checkout"
            appId={appId}
            toChain={destCoin.chainId}
            toToken={getAddress(destCoin.token)}
            toAddress={destAddr}
            onPaymentCompleted={onPaymentCompleted}
            metadata={formData}
          >
            {({ show }) => (
              <Button
                onClick={show}
                disabled={!isFormValid}
                color="blue"
                className="w-full"
                themeColor={themeColor}
              >
                Pay ${amountUSD}
              </Button>
            )}
          </DaimoPayButton.Custom>
        </Field>
      </FieldGroup>
    </Fieldset>
  )
} 