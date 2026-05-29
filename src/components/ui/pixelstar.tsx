"use client";

import { motion } from "motion/react";
import PixelStarImg from "@/assets/pixelstar.png";

export default function PixelStar() {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "linear",
      }}
      className="flex items-center justify-center"
      style={{
        width: "38px",
        height: "38px",
        transformOrigin: "center center",
      }}
    >
      <img
        src={PixelStarImg}
        alt="Pixel Star"
        className="w-full h-full object-contain"
      />
    </motion.div>
  );
}