"use client";
import { motion } from "framer-motion";

export default function SpeechBubble({ text, position }: { text: string; position: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, x: position === "left" ? -50 : 50 }}
      whileInView={{ opacity: 1, scale: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, type: "spring" }}
      className={`relative p-5 rounded-3xl shadow-lg border-2 border-pink-100 max-w-[85%] md:max-w-md 
        ${position === "left" ? "bg-white text-pink-700 self-start rounded-bl-none" : "bg-pink-500 text-white self-end rounded-br-none"}`}
    >
      <p className="text-lg font-medium tracking-tight leading-relaxed">{text}</p>
    </motion.div>
  );
}