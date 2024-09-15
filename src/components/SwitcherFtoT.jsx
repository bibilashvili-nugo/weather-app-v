import { useState } from "react";
import { motion } from "framer-motion";

export default function SwitcherFtoT() {
  const [temperature, setTemperature] = useState("C°");

  return (
    <div
      style={{ backgroundColor: "rgba(217, 217, 217, 0.70)" }}
      className="w-[60.541px] flex h-[32px] px-[1px] rounded-[30.651px] relative"
    >
      <motion.div
        className="absolute top-0 left-0 w-[32px] h-[32px]  bg-black rounded-full"
        initial={{ x: temperature === "C°" ? 0 : 32 }}
        animate={{ x: temperature === "C°" ? 0 : 32 }}
        transition={{ type: "spring", stiffness: 300 }}
        style={{ zIndex: 0 }}
      />
      <span
        className={`${
          temperature === "C°" ? "text-white" : "text-black"
        } flex items-center  justify-center cursor-pointer w-[32px] h-[32px] rounded-full z-10 relative`}
        onClick={() => setTemperature("C°")}
      >
        C°
      </span>
      <span
        className={`${
          temperature === "F°" ? "text-white pl-[10px]" : "text-black"
        } flex items-center justify-center cursor-pointer w-[32px] h-[32px] rounded-full z-10 relative`}
        onClick={() => setTemperature("F°")}
      >
        F°
      </span>
    </div>
  );
}
