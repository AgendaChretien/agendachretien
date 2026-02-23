import { motion, useScroll, useTransform } from "motion/react";

export function Halo() {
  const { scrollY } = useScroll();

  const haloScale = useTransform(() => (scrollY.get() > 100 ? "scale(0.7, 0.3)" : "scale(1, 1)"));

  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 300 300"
      className="fixed top-0 left-1/2 -z-10 h-[80vh] w-[150vw] max-w-none -translate-1/2 fill-[#8C2BBC] opacity-40 blur-[150px] transition-transform duration-[2s] dark:opacity-20"
      style={{ transform: haloScale }}
      preserveAspectRatio="none"
    >
      <circle cx="150" cy="150" r="150" />
    </motion.svg>
  );
}
