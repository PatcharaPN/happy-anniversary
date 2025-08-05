"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  { image: "/images/pic1.png", caption: "คำบรรยายภาพที่ 1" },
  { image: "/images/pic2.png", caption: "คำบรรยายภาพที่ 2" },
  { image: "/images/pic3.png", caption: "คำบรรยายภาพที่ 3" },
  { image: "/images/pic4.png", caption: "คำบรรยายภาพที่ 4" },
];

function diffYMD(start: Date, end: Date) {
  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();
  let days = end.getDate() - start.getDate();

  if (days < 0) {
    months--;
    days += new Date(end.getFullYear(), end.getMonth(), 0).getDate();
  }
  if (months < 0) {
    years--;
    months += 12;
  }

  return { years, months, days };
}

export default function Home() {
  const [scene, setScene] = useState<
    "intro" | "showAnniversary" | "slideshow" | "showDuration" | "showThanks"
  >("intro");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideRounds, setSlideRounds] = useState(0); // นับจำนวนรอบสไลด์

  useEffect(() => {
    if (scene !== "slideshow") return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => {
        if (prev === slides.length - 1) {
          setSlideRounds((r) => r + 1);
        }
        return (prev + 1) % slides.length;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [scene]);

  useEffect(() => {
    if (slideRounds >= 1) {
      setScene("showDuration");
    }
  }, [slideRounds]);

  // หลังจากแสดงเราคบกันกี่ปี ไปแสดงข้อความซึ้งๆ 5 วิ แล้วสไลด์ไปหน้าอื่น
  useEffect(() => {
    if (scene === "showDuration") {
      const timeout = setTimeout(() => {
        setScene("showThanks");
      }, 5000);
      return () => clearTimeout(timeout);
    }
  }, [scene]);

  function handleStart() {
    setScene("showAnniversary");
    setTimeout(() => {
      setScene("slideshow");
    }, 3000);
  }

  const startDate = new Date(2022, 5, 6);
  const now = new Date();
  const diff = diffYMD(startDate, now);

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
              onClick={handleStart}
              className="bg-gray-800 text-white px-4 py-2 mt-4 rounded"
            >
              กดเพื่อยืนยันตัวตนพนักงาน
            </button>
          </motion.div>
        )}

        {scene === "showAnniversary" && (
          <motion.div
            key="showAnniversary"
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

        {scene === "slideshow" && (
          <motion.div
            key="slideshow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center min-h-screen"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center"
              >
                <img
                  src={slides[currentSlide].image}
                  alt={slides[currentSlide].caption}
                  className="h-48 object-contain select-none"
                  draggable={false}
                />
                <p className="mt-2 text-center text-gray-800 font-medium select-none">
                  {slides[currentSlide].caption}
                </p>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}

        {scene === "showDuration" && (
          <motion.div
            key="showDuration"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center min-h-screen px-8 text-center"
          >
            <p className="text-4xl font-semibold text-pink-700">
              เราคบกันมาแล้ว {diff.years} ปี {diff.months} เดือน {diff.days} วัน
            </p>
            <p className="mt-4 text-lg text-gray-600">06/06/2022</p>
          </motion.div>
        )}

        {scene === "showThanks" && (
          <motion.div
            key="showThanks"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center min-h-screen px-8 text-center"
          >
            <p className="text-3xl italic text-pink-600 max-w-md">
              ขอบคุณที่อยู่เคียงข้างกันเสมอ... <br />
              รักและหวังดีตลอดไป
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
