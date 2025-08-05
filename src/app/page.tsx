"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    image: "/1.png",
    caption:
      "รูปคู่เรามีไม่ค่อยเยอะ ส่วนมากเวลาที่อยู่ด้วยกันเค้าแทบไม่อยากจะเอาโทรศัพท์มาถ่าย",
  },
  {
    image: "/2.png",
    caption: "เค้ารู้สึกว่ามันมีค่ามากๆ รู้สึกอยากกอด แล้วหลับไปไกล้ๆเทอ",
  },
  { image: "/3.jpg", caption: "ระหว่างที่เราเดินทางด้วยกัน หรือว่าไปไหนมาไหน" },
  { image: "/4.jpg", caption: "เค้ามักจะหยิบโทรศัพท์มาถ่าย" },
  { image: "/5.png", caption: "แม้มันเป็นด้านหลัง" },
  { image: "/6.png", caption: "ใช่ เค้าอยากอยู่ในเบื้องหลัง" },
  {
    image: "/7.png",
    caption: "อยากเป็นเบื้องหลังความสุข หริออะไรก็ได้ที่ทำให้เทอยิ้ม",
  },
  { image: "/8.png", caption: "หรือความสำเร็จบางอย่างในชีวิตเทอ" },
  {
    image: "/9.png",
    caption:
      "ความรักของคนเรามันไม่เหมือนกันหรอก แต่เค้าคิดว่า นี้เป็นความรักในรูปแบบของเค้า",
  },
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
    | "intro"
    | "showAnniversary"
    | "askDate"
    | "tellSorry"
    | "tellJoke"
    | "reviewJourney"
    | "slideshow"
    | "showDuration"
    | "showThanks"
  >("intro");

  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideRounds, setSlideRounds] = useState(0);

  // Handle slideshow slide change every 3 seconds
  useEffect(() => {
    if (scene !== "slideshow") return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => {
        if (prev === slides.length - 1) {
          setSlideRounds((r) => r + 1);
        }
        return (prev + 1) % slides.length;
      });
    }, 6000);

    return () => clearInterval(interval);
  }, [scene]);

  // After 1 full slideshow round, go to showDuration
  useEffect(() => {
    if (slideRounds >= 1) {
      setScene("showDuration");
    }
  }, [slideRounds]);

  // Chain scene changes with timeouts
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    switch (scene) {
      case "showAnniversary":
        timeout = setTimeout(() => setScene("askDate"), 3000);
        break;
      case "askDate":
        timeout = setTimeout(() => setScene("tellSorry"), 3000);
        break;
      case "tellSorry":
        timeout = setTimeout(() => setScene("tellJoke"), 3000);
        break;
      case "tellJoke":
        timeout = setTimeout(() => setScene("reviewJourney"), 4000);
        break;
      case "reviewJourney":
        timeout = setTimeout(() => setScene("slideshow"), 4000);
        break;
      case "showDuration":
        timeout = setTimeout(() => setScene("showThanks"), 4000);
        break;
      default:
        break;
    }
    return () => clearTimeout(timeout);
  }, [scene]);

  function handleStart() {
    setScene("showAnniversary");
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

        {scene === "askDate" && (
          <motion.div
            key="askDate"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center min-h-screen px-8 text-center"
          >
            <p className="text-3xl text-pink-700 font-semibold">
              วันนี้วันอะไร...จำได้มั้ย? 🩷
            </p>
          </motion.div>
        )}

        {scene === "tellSorry" && (
          <motion.div
            key="tellSorry"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center min-h-screen px-8 text-center"
          >
            <p className="text-2xl text-gray-800 text-center">
              เทอจำได้อยู่แล้ว จำได้มาตลอด
              <br />
              มีแต่ผู้ชายห่วยๆคนนี้ที่จำไม่ได้เลย ขอโทษนะ..
              <br />
              ขอโทษที่ไม่เคยทำอะไรเล็กๆน้อยๆให้เทอแบบนี้มาก่อนเลย
            </p>
          </motion.div>
        )}

        {scene === "tellJoke" && (
          <motion.div
            key="tellJoke"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center min-h-screen px-8 text-center"
          >
            <p className="text-2xl text-gray-800">
              วันนี้คือ วันพุธ แฮร่ 5555555
            </p>
          </motion.div>
        )}

        {scene === "reviewJourney" && (
          <motion.div
            key="reviewJourney"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center min-h-screen px-8 text-center"
          >
            <p className="text-3xl font-bold text-pink-700 mb-4">
              มาดูกันว่าเราผ่านอะไรมาบ้าง 🥰
            </p>
            <p className="text-xl text-gray-700 max-w-md">
              จากวันแรกที่คุยกัน ไม่คิดเลยว่าเราจะมาไกลขนาดนี้
              <br />
              ผ่านเรื่องราวทั้งดีและร้ายมากมาย แต่ก็ยังมีกันอยู่ตรงนี้
              <br />
              ต่อจากนี้... ลองมองย้อนกลับไปด้วยกันนะ 💑
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
                  className="h-48 object-contain select-none rounded-xl border-4 border-pink-200 shadow-lg"
                  draggable={false}
                />
                <p className="mt-2 text-center w-45 text-center text-gray-800 font-medium select-none">
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
              เรารู้ว่าบางครั้งชีวิตมันก็เหนื่อย
              <br />
              และบางครั้งเธอก็อาจจะมีเรื่องหนักใจ
              <br />
              แต่เราอยากให้เธอรู้ว่า เราพร้อมจะอยู่ข้างๆ เป็นที่พักใจให้เสมอ
              <br />
              รับฟังและเข้าใจในทุกอย่างที่เธอเป็น
              <br />
              ไม่ว่าอะไรจะเกิดขึ้น ที่นี่จะเป็นพื้นที่ปลอดภัยของเรา
              <br />
              ที่ที่เราจะเติบโตไปด้วยกัน
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
