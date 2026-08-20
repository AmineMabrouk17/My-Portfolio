"use client";

import dynamic from "next/dynamic";
import { Loader } from "@/components/motion/loader";

function SectionLoader() {
  return (
    <div className="flex justify-center py-20">
      <Loader variant="dots" size={28} className="text-[var(--color-accent)]" />
    </div>
  );
}

export const Experience = dynamic(() => import("@/components/sections/Experience"), {
  ssr: false,
  loading: SectionLoader,
});
export const Projects = dynamic(() => import("@/components/sections/Projects"), {
  ssr: false,
  loading: SectionLoader,
});
export const Education = dynamic(() => import("@/components/sections/Education"), {
  ssr: false,
  loading: SectionLoader,
});
export const Contact = dynamic(() => import("@/components/sections/Contact"), {
  ssr: false,
  loading: SectionLoader,
});
