import { getCabin, getCabins } from "@/app/_lib/data-service";
import Cabin from "@/components/Cabin";
import Reservation from "@/components/Reservation";
import Spinner from "@/components/Spinner";
import TextExpander from "@/components/TextExpander";
import { EyeSlashIcon, MapPinIcon, UsersIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { Suspense } from "react";


export async function generateMetadata({ params }) {
  const cabinDetails = await getCabin(params.cabinid)
  if (cabinDetails) {
    return { title: `Cabin ${cabinDetails.name}` }
  }
  else {
    return { title: 'Cabin' }
  }
}

export async function generateStaticParams() {
  const cabins = await getCabins()

  const ids = cabins.map((cabin) => ({ cabinid: String(cabin.id) }))
  return ids
}

export default async function Page({ params }) {
  const cabin = await getCabin(params.cabinid)
  const { id, name, maxCapacity, regularPrice, discount, image, description } = cabin;

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <Cabin cabin={cabin} />
      <div>
        <h2 className="mb-10 text-accent-400 text-5xl font-semibold text-center">
          Reserve {name} today. Pay on arrival.
        </h2>
        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}
