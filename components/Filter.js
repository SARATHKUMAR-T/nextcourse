"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"

export default function Filter() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const actieFilter = searchParams.get('capacity') ?? 'all'

  function handleFilter(filter) {
    const params = new URLSearchParams(searchParams)
    params.set('capacity', filter)
    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
  }
  return (
    <div className="border-primary-800 border flex ">
      <Button filter="all" actieFilter={actieFilter} handleFilter={handleFilter}>
        All cabins
      </Button>
      <Button filter="small" actieFilter={actieFilter} handleFilter={handleFilter}>
        1&mdash;3 guests
      </Button>
      <Button filter="medium" actieFilter={actieFilter} handleFilter={handleFilter}>
        4&mdash;7 guests
      </Button>
      <Button filter="large" actieFilter={actieFilter} handleFilter={handleFilter}>
        8&mdash;12 guests
      </Button>
    </div >
  )
}


function Button({ filter, handleFilter, actieFilter, children }) {
  return (
    <button className={`px-5 py-2 hover:bg-primary-700 ${filter === actieFilter ? 'bg-primary-700 text-primary-50' : ''}`} onClick={() => handleFilter(filter)}>{children}</button>
  )

}