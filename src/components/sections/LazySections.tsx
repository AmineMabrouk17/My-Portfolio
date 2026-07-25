"use client";

import dynamic from "next/dynamic";

export const Experience = dynamic(() => import("@/components/sections/Experience"), { ssr: false });
export const Projects = dynamic(() => import("@/components/sections/Projects"), { ssr: false });
export const Education = dynamic(() => import("@/components/sections/Education"), { ssr: false });
export const Languages = dynamic(() => import("@/components/sections/Languages"), { ssr: false });
export const Contact = dynamic(() => import("@/components/sections/Contact"), { ssr: false });
