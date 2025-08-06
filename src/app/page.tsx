"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const slides = [
  {
    image: "/1.png",
    caption:
      "รูปคู่เรามีไม่ค่อยเยอะ 📸 ส่วนมากเวลาที่อยู่ด้วยกันเค้าแทบไม่อยากจะเอาโทรศัพท์มาถ่าย 😝",
  },
  {
    image: "/2.png",
    caption:
      "รูปคู่ฮงแด 🏙️ ก่อนบวช 🙏 ขอบคุณที่เป็นเจ้ามือน้าา 💸 ตอนนั้นเค้ายังไม่ได้ทำงาน ลำบากเทออีก 55555 😂",
  },
  { image: "/3.jpg", caption: "ไปอีสสลัคกี้บาร์บีคิวกันน 🍖🔥" },
  {
    image: "/4.jpg",
    caption:
      "เฝ้าไอ้เด็ก 🐶 วันนั้นเราไม่เข้าใจกัน 😔 เค้าก็ยังทำได้แค่อยู่ข้างๆแบบเงียบๆ 🤍",
  },
  {
    image: "/5.png",
    caption: "ไปเที่ยวอควาเรี่ยม 🐠 กินเค๊กกันด้วยชิ้นนึง 🍰 ก่อนเข้าที่พัก 🏠",
  },
  {
    image: "/6.png",
    caption: "ชาบูอีกแล้วว 🍲 เที่ยวทีไรก็มีแต่ชาบู 55555 🤭",
  },
  {
    image: "/7.png",
    caption: "เดี๋ยวนะ 🤔 ตรงนี้เราลงมาทำไม 55555555 😂",
  },
  { image: "/8.png", caption: "ให้ใส่บ่อยมว๊าาก 🧥 กลัวเทอร้อนนี่นา ☀️" },
  {
    image: "/9.png",
    caption: "ปิดท้ายด้วยชาบูอีกแย้ววววว 🍲💞",
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
    | "devMessage"
    | "lastThanks"
    | "gotCooked"
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
      case "gotCooked":
        timeout = setTimeout(() => setScene("showAnniversary"), 3000);
        break;
      case "showAnniversary":
        timeout = setTimeout(() => setScene("askDate"), 3000);
        break;
      case "askDate":
        timeout = setTimeout(() => setScene("tellSorry"), 3000);
        break;
      case "tellSorry":
        timeout = setTimeout(() => setScene("tellJoke"), 7000);
        break;
      case "tellJoke":
        timeout = setTimeout(() => setScene("reviewJourney"), 4000);
        break;
      case "reviewJourney":
        timeout = setTimeout(() => setScene("slideshow"), 7000);
        break;
      case "showDuration":
        timeout = setTimeout(() => setScene("showThanks"), 15000);
        break;
      case "showThanks":
        timeout = setTimeout(() => setScene("devMessage"), 7000);
        break;
      case "devMessage":
        timeout = setTimeout(() => setScene("lastThanks"), 7000);
        break;
      default:
        break;
    }
    return () => clearTimeout(timeout);
  }, [scene]);

  function handleStart() {
    setScene("gotCooked");
  }

  const startDate = new Date(2022, 5, 6);
  const now = new Date();
  const diff = diffYMD(startDate, now);
  function handleBack() {
    const order = [
      "intro",
      "gotCooked",
      "showAnniversary",
      "askDate",
      "tellSorry",
      "tellJoke",
      "reviewJourney",
      "slideshow",
      "showDuration",
      "showThanks",
      "devMessage",
      "lastThanks",
    ];
    const idx = order.indexOf(scene);
    if (idx > 0) {
      setScene(order[idx - 1] as typeof scene);
    }
  }
  function handlePrevSlide() {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }
  function handleNextSlide() {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }
  return (
    <motion.div
      className="font-sans flex flex-col items-center justify-center min-h-screen pb-20 sm:p-20 w-full"
      initial={false}
      animate={{
        background:
          scene === "intro"
            ? "#26A4FF"
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
            <p className="text-3xl">ระบบลาออนไลน์</p>
            <button
              onClick={handleStart}
              className="bg-blue-800 text-white px-4 py-2 mt-4 rounded"
            >
              กดเพื่อยืนยันตัวตนพนักงาน
            </button>
          </motion.div>
        )}
        {scene === "gotCooked" && (
          <motion.div
            key="gotCooked"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center justify-center min-h-screen"
          >
            <p
              className="text-5xl font-bold text-pink-800"
              style={{ fontFamily: "Font_th" }}
            >
              ว้ายย โดนหลอกแล้ว !
            </p>
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
            <div className="flex flex-col gap-10 items-center justify-center">
              <p
                className="text-3xl font-bold text-pink-800"
                style={{ fontFamily: "MyFont" }}
              >
                Happy Anniversary Nakub My Lover
              </p>
              <Image
                className="rounded-full"
                src={"/June.jpg"}
                width={150}
                height={150}
                alt={""}
              />
              <p style={{ fontFamily: "Font_th" }}>ไอ้เด็กจูน</p>{" "}
              <button
                onClick={handleBack}
                className="mt-6 px-4 py-2 bg-pink-200 text-pink-800 rounded-lg border-2 border-pink-400 shadow-[2px_2px_0px_#000] hover:shadow-[4px_4px_0px_#000] transition-all duration-200 font-bold"
              >
                ⬅ ย้อนกลับ
              </button>
            </div>
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
            <button
              onClick={handleBack}
              className="mt-6 px-4 py-2 bg-pink-200 text-pink-800 rounded-lg border-2 border-pink-400 shadow-[2px_2px_0px_#000] hover:shadow-[4px_4px_0px_#000] transition-all duration-200 font-bold"
            >
              ⬅ ย้อนกลับ
            </button>
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
            </p>{" "}
            <button
              onClick={handleBack}
              className="mt-6 px-4 py-2 bg-pink-200 text-pink-800 rounded-lg border-2 border-pink-400 shadow-[2px_2px_0px_#000] hover:shadow-[4px_4px_0px_#000] transition-all duration-200 font-bold"
            >
              ⬅ ย้อนกลับ
            </button>{" "}
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
            <button
              onClick={handleBack}
              className="mt-6 px-4 py-2 bg-pink-200 text-pink-800 rounded-lg border-2 border-pink-400 shadow-[2px_2px_0px_#000] hover:shadow-[4px_4px_0px_#000] transition-all duration-200 font-bold"
            >
              ⬅ ย้อนกลับ
            </button>
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
              ขอบคุณนะคะ 💑
            </p>
            <button
              onClick={handleBack}
              className="mt-6 px-4 py-2 bg-pink-200 text-pink-800 rounded-lg border-2 border-pink-400 shadow-[2px_2px_0px_#000] hover:shadow-[4px_4px_0px_#000] transition-all duration-200 font-bold"
            >
              ⬅ ย้อนกลับ
            </button>
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
                <div className="bg-white shadow-lg p-2 pb-6 rounded-md relative">
                  <img
                    src={slides[currentSlide].image}
                    alt={slides[currentSlide].caption}
                    className="h-70 object-cover rounded-sm"
                  />
                  <p className="absolute bottom-2 left-0 w-full text-center text-sm text-gray-700 font-semibold"></p>
                </div>
                <p className="mt-2 text-center w-45 text-gray-800 font-medium select-none">
                  {slides[currentSlide].caption}
                </p>
              </motion.div>
              <div className="flex items-center gap-5">
                {" "}
                <button
                  onClick={handlePrevSlide}
                  className="mt-6 px-4 py-2 bg-pink-200 text-pink-800 rounded-lg border-2 border-pink-400 shadow-[2px_2px_0px_#000] hover:shadow-[4px_4px_0px_#000] transition-all duration-200 font-bold"
                >
                  ⬅ ย้อนกลับ
                </button>{" "}
                {currentSlide < slides.length - 1 && (
                  <button
                    onClick={handleNextSlide}
                    className="mt-6 px-4 py-2 bg-pink-200 text-pink-800 rounded-lg border-2 border-pink-400 shadow-[2px_2px_0px_#000] hover:shadow-[4px_4px_0px_#000] transition-all duration-200 font-bold"
                  >
                    ➡ ต่อไป
                  </button>
                )}
              </div>
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
            <button
              onClick={handleBack}
              className="mt-6 px-4 py-2 bg-pink-200 text-pink-800 rounded-lg border-2 border-pink-400 shadow-[2px_2px_0px_#000] hover:shadow-[4px_4px_0px_#000] transition-all duration-200 font-bold"
            >
              ⬅ ย้อนกลับ
            </button>
          </motion.div>
        )}

        {scene === "showThanks" && (
          <motion.p className="text-3xl italic text-pink-600 max-w-md leading-relaxed">
            {[
              "สุดท้ายนี้ อยากจะบอกว่า เค้ารักเทอนะ",
              "ไม่คิดจะรักเทอน้อยลงเลย",
              "แม้ว่ารูปแบบการอยู่ด้วยกันของเราจะเปลี่ยนไป เพราะเราโตขึ้น",
              "ต่างคนต่างมีหน้าที่ มีพื้นที่ส่วนตัวที่ต้องอยู่กับตัวเอง",
              "เค้าไม่น้อยใจเลย มีความสุขมากกว่าอีก ที่ทำให้เทอมีพื้นที่ของตัวเอง",
              "เป็นผลงานแรกๆที่คิดว่าจำทำเลย แต่สกิลดันไม่ถึง 555555",
              "แค่อยากทำสิ่งนี้ให้เทอ เพราะเทอเป็นคนสำคัญของเค้า",
              "ขอบคุณนะคะที่เติบโตมาอย่างดี รักที่สุด ❤️",
            ].map((line, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.8, duration: 0.6 }}
                className="block mb-2 text-lg"
              >
                {line}
              </motion.span>
            ))}
            <button
              onClick={handleBack}
              className="mt-6 px-4 py-2 bg-pink-200 text-pink-800 rounded-lg border-2 border-pink-400 shadow-[2px_2px_0px_#000] hover:shadow-[4px_4px_0px_#000] transition-all duration-200 font-bold"
            >
              ⬅ ย้อนกลับ
            </button>
          </motion.p>
        )}
        {scene === "devMessage" && (
          <motion.div
            key="devMessage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center min-h-screen px-8 text-center"
          >
            {/* <motion.img
              src="/dev.png" // ใส่รูป dev หรือโลโก้หัวใจได้
              alt="dev crying"
              className="h-40 mb-6 rounded-full shadow-lg"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
            /> */}
            <motion.p
              className="text-2xl text-pink-700 font-semibold max-w-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Dev ที่พัฒนาแอปนี้ร้องไห้ไปแล้ว 10.254851 รอบ
              <br />
              ระหว่างสร้างมันขึ้นมา
              <br />
              อยากให้รู้ว่า ทุกอย่างทำจากใจ ตั้งใจทำทุกส่วนเลย
              <br />
              หวังว่าเวลามองสิ่งนี้ จะทำให้เทอยิ้มได้.. ❤️
              <br />
              ปล. มันเป็นเวอร์แรก แต่มันจะดีขึ้นทุกๆครั้งที่ถึงวันครบรอบของเรา..
            </motion.p>
            <button
              onClick={handleBack}
              className="mt-6 px-4 py-2 bg-pink-200 text-pink-800 rounded-lg border-2 border-pink-400 shadow-[2px_2px_0px_#000] hover:shadow-[4px_4px_0px_#000] transition-all duration-200 font-bold"
            >
              ⬅ ย้อนกลับ
            </button>
          </motion.div>
        )}
        {scene === "lastThanks" && (
          <motion.div
            key="lastThanks"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center min-h-screen px-8 text-center"
          >
            <p className="text-2xl font-bold text-pink-600">
              สุดท้ายแล้ว... เค้าเชื่อว่าความรักที่แท้จริงคือความเข้าใจ 💖
            </p>
            <p className="mt-4 text-lg text-gray-700">
              เราอาจไม่ได้อยู่ด้วยกันตลอดเวลา แต่ถ้าเรายังเข้าใจกันและกัน
              เค้าคิดว่ามันคือสิ่งที่สำคัญที่สุด
              และอยากให้เรายังเดินไปด้วยกันด้วยความเข้าใจแบบนี้เสมอ..
            </p>

            <button
              onClick={() => setScene("intro")}
              className="mt-6 px-4 py-2 bg-pink-500 text-white rounded"
            >
              เริ่มใหม่อีกครั้ง
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
