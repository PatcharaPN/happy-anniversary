"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [scene, setScene] = useState<"intro" | "anniversary">("intro");

  return (
    <motion.div
      className="font-sans flex flex-col items-center justify-center min-h-screen pb-20 sm:p-20 w-full"
      initial={false}
      animate={{
        background:
          scene === "intro"
            ? "#000000"
            : "linear-gradient(180deg, #fbc7d4 0%, #fce8e9 50%, #fef5f1 100%)",
        color: scene === "intro" ? "#ffffff" : "#000000",
      }}
      transition={{ duration: 1 }}
    >
      <AnimatePresence mode="wait">
        {scene === "intro" && (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col gap-4 items-center min-h-screen justify-center px-8"
          >
            <p className="text-3xl">Weather App</p>
            <button
              onClick={() => setScene("anniversary")}
              className="bg-gray-800 text-white px-4 py-2 mt-4 rounded"
            >
              กดเพื่อยืนยันตัวตนพนักงาน
            </button>
          </motion.div>
        )}

        {scene === "anniversary" && (
          <motion.div
            key="anniversary"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center justify-center min-h-screen"
          >
            <p
              className="text-5xl font-bold text-pink-800"
              style={{ fontFamily: "MyFont" }}
            >
              Happy Anniversary
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
