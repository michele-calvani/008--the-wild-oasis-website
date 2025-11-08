import Spinner from "../_components/Spinner";

export default function LoadingCabins() {
  return (
    <div className="grid place-items-center gap-4 py-16 min-h-[40vh]">
      <Spinner />
      <p className="text-xl text-primary-200">Loading cabin data...</p>
    </div>
  );
}
