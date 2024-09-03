import Image from "next/image";

export default function Logo() {
  return (
    <a href="/" className="flex items-center gap-4 z-10 ">
      <Image src='/logo.png' height={60} width={60} alt="the wild oasis logo" />
      <span className="text-xl font-semibold text-primary-100">The Wild Oasis</span>
    </a>
  )
}