import Image from "next/image"

export default function NotFound() {
  return (
    <div className="relative flex justify-center items-center h-60 w-full">
      <Image
        src="/internet_404_page_not_found.png"
        alt="Not Found"
        fill
        priority
        className="object-contain"
      />
    </div>
  )
}
