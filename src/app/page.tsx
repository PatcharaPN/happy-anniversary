"use client";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Icon } from "@iconify/react";

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
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
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
  function fadeIn(audio: HTMLAudioElement, duration = 2000) {
    audio.volume = 0;
    audio.play();
    const step = 0.05;
    const intervalTime = (duration * step) / 1;
    let volume = 0;

    const fadeInterval = setInterval(() => {
      volume += step;
      if (volume >= 1) {
        audio.volume = 1;
        clearInterval(fadeInterval);
      } else {
        audio.volume = volume;
      }
    }, intervalTime);
  }
  function fadeOut(audio: HTMLAudioElement, duration = 2000) {
    const step = 0.05;
    const intervalTime = (duration * step) / 1;
    let volume = audio.volume;

    const fadeInterval = setInterval(() => {
      volume -= step;
      if (volume <= 0) {
        audio.volume = 0;
        audio.pause();
        audio.currentTime = 0;
        clearInterval(fadeInterval);
      } else {
        audio.volume = volume;
      }
    }, intervalTime);
  }
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (scene === "showAnniversary") {
      if (audio.paused) {
        fadeIn(audio, 3000);
      }
      setIsPlaying(true);
    }

    if (scene === "lastThanks") {
      fadeOut(audio, 3000);
    }
  }, [scene]);
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

  useEffect(() => {
    if (slideRounds >= 1) {
      setScene("showDuration");
    }
  }, [slideRounds]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    switch (scene) {
      case "gotCooked":
        timeout = setTimeout(() => setScene("askDate"), 3000);
        break;

      case "askDate":
        timeout = setTimeout(() => setScene("tellSorry"), 3000);
        break;

      case "tellSorry":
        timeout = setTimeout(() => setScene("tellJoke"), 7000);
        break;

      case "tellJoke":
        timeout = setTimeout(() => setScene("showAnniversary"), 4000);
        break;

      case "showAnniversary":
        timeout = setTimeout(() => setScene("reviewJourney"), 3000);
        break;

      // ... (rest ตามเดิม)
      case "reviewJourney":
        timeout = setTimeout(() => setScene("slideshow"), 10000);
        break;
      case "showDuration":
        timeout = setTimeout(() => setScene("showThanks"), 10000);
        break;
      case "showThanks":
        timeout = setTimeout(() => setScene("devMessage"), 15000);
        break;
      case "devMessage":
        timeout = setTimeout(() => setScene("lastThanks"), 10000);
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
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
    };
  }, []);
  return (
    <motion.div
      className="font-sans flex flex-col items-center justify-center min-h-screen pb-20 sm:p-20 w-full"
      initial={false}
      animate={{
        background:
          scene === "intro"
            ? "#26A4FF"
            : `url('/background.jpg') no-repeat center center / auto`,
        color: scene === "intro" ? "#ffffff" : "#000000",
      }}
      transition={{ duration: 1 }}
    >
      <audio ref={audioRef} src="/LoveStory.mp3" preload="auto" />
      <AnimatePresence mode="wait">
        {scene === "intro" && (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col gap-4 items-center min-h-screen justify-center px-8"
          >
            <p className="text-3xl text-center w-50">
              แบบสอบถามเรื่องการ Training พนักงาน
            </p>
            <button
              onClick={handleStart}
              className="bg-blue-800 text-white px-4 py-2 mt-4 rounded"
            >
              เริ่มทำแบบทดสอบ
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
              <p className="text-4xl" style={{ fontFamily: "Font_th" }}>
                ไอ้เด็กจูน
              </p>{" "}
              <button
                onClick={handleBack}
                className="flex items-center gap-5 mt-6 px-4 py-2  rounded-lg border-2 border-pink-400 shadow-[2px_2px_0px_#000] hover:shadow-[4px_4px_0px_#000] transition-all duration-200 font-bold"
                style={{
                  backgroundColor: "#FFCAC9",
                  color: "#9F5857",
                  borderWidth: "2px",
                  borderStyle: "solid",
                  borderColor: "#9F5857",
                }}
              >
                <Icon icon="mdi:arrow-left" width="20" />
                <span>ย้อนกลับ</span>
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
              className="flex items-center gap-5 mt-6 px-4 py-2 rounded-lg border-2 border-pink-400 shadow-[2px_2px_0px_#000] hover:shadow-[4px_4px_0px_#000] transition-all duration-200 font-bold"
              style={{
                backgroundColor: "#FFCAC9",
                color: "#9F5857",
                borderWidth: "2px",
                borderStyle: "solid",
                borderColor: "#9F5857",
              }}
            >
              <Icon icon="mdi:arrow-left" width="20" />
              <span>ย้อนกลับ</span>
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
              className="flex items-center gap-5 mt-6 px-4 py-2 rounded-lg border-2 border-pink-400 shadow-[2px_2px_0px_#000] hover:shadow-[4px_4px_0px_#000] transition-all duration-200 font-bold"
              style={{
                backgroundColor: "#FFCAC9",
                color: "#9F5857",
                borderWidth: "2px",
                borderStyle: "solid",
                borderColor: "#9F5857",
              }}
            >
              <Icon icon="mdi:arrow-left" width="20" />
              <span>ย้อนกลับ</span>
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
              className="flex items-center gap-5 mt-6 px-4 py-2 rounded-lg border-2 border-pink-400 shadow-[2px_2px_0px_#000] hover:shadow-[4px_4px_0px_#000] transition-all duration-200 font-bold"
              style={{
                backgroundColor: "#FFCAC9",
                color: "#9F5857",
                borderWidth: "2px",
                borderStyle: "solid",
                borderColor: "#9F5857",
              }}
            >
              <Icon icon="mdi:arrow-left" width="20" />
              <span>ย้อนกลับ</span>
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
              className="flex items-center gap-5 mt-6 px-4 py-2 rounded-lg border-2 border-pink-400 shadow-[2px_2px_0px_#000] hover:shadow-[4px_4px_0px_#000] transition-all duration-200 font-bold"
              style={{
                backgroundColor: "#FFCAC9",
                color: "#9F5857",
                borderWidth: "2px",
                borderStyle: "solid",
                borderColor: "#9F5857",
              }}
            >
              <Icon icon="mdi:arrow-left" width="20" />
              <span>ย้อนกลับ</span>
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
                  className="flex items-center gap-5 mt-6 px-4 py-2 rounded-lg border-2 border-pink-400 shadow-[2px_2px_0px_#000] hover:shadow-[4px_4px_0px_#000] transition-all duration-200 font-bold"
                  style={{
                    backgroundColor: "#FFCAC9",
                    color: "#9F5857",
                    borderWidth: "2px",
                    borderStyle: "solid",
                    borderColor: "#9F5857",
                  }}
                >
                  <Icon icon="mdi:arrow-left" width="20" />
                  <span>ย้อนกลับ</span>
                </button>{" "}
                {currentSlide < slides.length - 1 && (
                  <button
                    onClick={handleNextSlide}
                    className="flex items-center gap-5 mt-6 px-4 py-2 rounded-lg border-2 border-pink-400 shadow-[2px_2px_0px_#000] hover:shadow-[4px_4px_0px_#000] transition-all duration-200 font-bold"
                    style={{
                      backgroundColor: "#FFCAC9",
                      color: "#9F5857",
                      borderWidth: "2px",
                      borderStyle: "solid",
                      borderColor: "#9F5857",
                    }}
                  >
                    <span>ต่อไป</span>
                    <Icon icon="mdi:arrow-right" width="20" />
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
              className="flex items-center gap-5 mt-6 px-4 py-2 rounded-lg border-2 border-pink-400 shadow-[2px_2px_0px_#000] hover:shadow-[4px_4px_0px_#000] transition-all duration-200 font-bold"
              style={{
                backgroundColor: "#FFCAC9",
                color: "#9F5857",
                borderWidth: "2px",
                borderStyle: "solid",
                borderColor: "#9F5857",
              }}
            >
              <Icon icon="mdi:arrow-left" width="20" />
              <span>ย้อนกลับ</span>
            </button>
          </motion.div>
        )}

        {scene === "showThanks" && (
          <div className="flex flex-col justify-center items-center">
            <motion.p className="text-3xl italic text-pink-600 max-w-md leading-relaxed text-center">
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
            </motion.p>
            <button
              onClick={handleBack}
              className="flex items-center gap-5 mt-6 px-4 py-2 rounded-lg border-2 border-pink-400 shadow-[2px_2px_0px_#000] hover:shadow-[4px_4px_0px_#000] transition-all duration-200 font-bold mx-auto"
              style={{
                backgroundColor: "#FFCAC9",
                color: "#9F5857",
                borderWidth: "2px",
                borderStyle: "solid",
                borderColor: "#9F5857",
              }}
            >
              <Icon icon="mdi:arrow-left" width="20" />
              <span>ย้อนกลับ</span>
            </button>
          </div>
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
              className="flex items-center gap-5 mt-6 px-4 py-2  rounded-lg border-2 border-pink-400 shadow-[2px_2px_0px_#000] hover:shadow-[4px_4px_0px_#000] transition-all duration-200 font-bold"
              style={{
                backgroundColor: "#FFCAC9",
                color: "#9F5857",
                borderWidth: "2px",
                borderStyle: "solid",
                borderColor: "#9F5857",
              }}
            >
              <Icon icon="mdi:arrow-left" width="20" />
              <span>ย้อนกลับ</span>
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
              อาจจะไม่เข้าใจกันไปบ้าง หรือทำตัวไม่ดีไปบ้าง(มาก)
              แต่ตอนนี้เค้าพยายามเปลี่ยนแปลงตัวเองจริง ๆ
              เพื่อให้เราทั้งคู่มีทางเดินที่ดีขึ้น ไม่ว่าจะอยู่ในรูปแบบไหนก็ตาม
            </p>

            <button
              onClick={() => setScene("intro")}
              className="flex items-center gap-5 mt-6 px-4 py-2 rounded"
              style={{
                backgroundColor: "#FFCAC9",
                color: "#9F5857",
                borderWidth: "2px",
                borderStyle: "solid",
                borderColor: "#9F5857",
              }}
            >
              <Icon icon="mdi:restart" width="20" />
              <span>เริ่มใหม่อีกครั้ง</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>{" "}
      {isPlaying && (
        <div
          className="
    fixed bottom-30 left-1/2 transform -translate-x-1/2
    border-2 border-pink-900 backdrop-blur-md
    text-pink-900 rounded-full shadow-lg
    px-5 py-2 flex items-center gap-3 z-50
  "
        >
          <button
            onClick={() => {
              if (!audioRef.current) return;
              audioRef.current.currentTime = 0;
              audioRef.current.play();
            }}
            className="
      w-10 h-10 rounded-full bg-white shadow-md
      hover:bg-pink-100 flex items-center justify-center
      transition-colors duration-200
    "
          >
            <Icon icon="mdi:skip-previous" width="24" />
          </button>

          <button
            onClick={() => {
              if (!audioRef.current) return;
              isPlaying ? audioRef.current.pause() : audioRef.current.play();
            }}
            className="
      w-12 h-12 rounded-full bg-white shadow-md
      hover:bg-pink-100 flex items-center justify-center
      transition-colors duration-200
    "
          >
            <Icon icon={isPlaying ? "mdi:pause" : "mdi:play"} width="28" />
          </button>

          <button
            onClick={() =>
              audioRef.current && (audioRef.current.currentTime += 10)
            }
            className="
      w-10 h-10 rounded-full bg-white shadow-md
      hover:bg-pink-100 flex items-center justify-center
      transition-colors duration-200
    "
          >
            <Icon icon="mdi:skip-next" width="24" />
          </button>

          <span className="ml-3 text-sm font-medium select-none">
            Playing : Love Story
          </span>
        </div>
      )}
    </motion.div>
  );
}
