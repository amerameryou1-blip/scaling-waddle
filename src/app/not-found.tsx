import Link from "next/link";
import { ArrowIcon } from "@/components/icons";

export default function NotFound() {
  return (
    <div className="relative flex min-h-[80vh] flex-col items-center justify-center px-5 pt-28 text-center">
      <p className="font-display text-[clamp(5rem,18vw,12rem)] font-semibold leading-none text-prism">
        404
      </p>
      <h1 className="mt-2 font-display text-2xl font-semibold text-mist">
        This page shattered
      </h1>
      <p className="mt-3 max-w-md text-mist-dim">
        The page you're looking for broke into pieces. Let's get you back to the
        light.
      </p>
      <Link
        href="/"
        className="group mt-7 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-ink transition-transform hover:scale-[1.03]"
      >
        Back to home
        <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </Link>
    </div>
  );
}
