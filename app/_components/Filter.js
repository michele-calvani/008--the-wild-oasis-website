"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";

function Filter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const active = searchParams.get("capacity") ?? "all";

  function handleFilter(filter) {
    const params = new URLSearchParams(searchParams);
    params.set("capacity", filter);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  const Btn = ({ value, children }) => (
    <button
      onClick={() => handleFilter(value)}
      aria-pressed={active === value}
      className={`px-5 py-2 hover:bg-primary-700 ${
        active === value ? "bg-primary-700 text-primary-100" : ""
      }`}
    >
      {children}
    </button>
  );

  return (
    <div className="border border-primary-800 flex">
      <Btn value="all">All cabins</Btn>
      <Btn value="small">1—3 guests</Btn>
      <Btn value="medium">4—7 guests</Btn>
      <Btn value="large">8—12 guests</Btn>
    </div>
  );
}

export default Filter;
