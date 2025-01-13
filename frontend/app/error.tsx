"use client"

import Image from "next/image"

export default function Error() {
  return (
    <div className="relative flex justify-center items-center h-60 w-full">
      <Image
        src="/money_coin_reiwa_500_new.png"
        alt="Not Found"
        fill
        priority
        className="object-contain"
      />
    </div>
  )
}
