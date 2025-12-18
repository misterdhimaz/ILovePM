"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useInView } from "framer-motion";
import { 
  Heart, Star, Sparkles, ChevronDown, Camera, 
  MessageCircle, Zap, Sun, Award, Coffee, 
  PartyPopper, Volume2, VolumeX, Ghost
} from "lucide-react";
import Image from "next/image";
import { COMIC_STORY, MEMORIES } from "@/data/script";

// --- HELPER: FIX HYDRATION ERROR ---
// Menghindari error "Server rendered HTML didn't match"
const ClientOnly = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return <>{children}</>;
};

// --- COMPONENT: COMIC SOUND EFFECT ---
const SoundFX = ({ text, className }: { text: string; className: string }) => (
  <motion.div
    initial={{ scale: 0, rotate: -20 }}
    whileInView={{ scale: 1.2, rotate: 10 }}
    className={`absolute z-30 font-black text-4xl italic tracking-tighter drop-shadow-md ${className}`}
  >
    <span className="bg-yellow-400 border-4 border-slate-900 px-4 py-1 rounded-lg">
      {text}!
    </span>
  </motion.div>
);

// --- COMPONENT: DIALOGUE PANEL ---
const ComicStrip = ({ scene, index }: { scene: any; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-100px", once: false });
  const isLeft = scene.speaker === "Saya";

  return (
    <div ref={ref} className={`flex w-full mb-48 items-center gap-4 md:gap-12 ${isLeft ? "flex-row" : "flex-row-reverse"}`}>
      {/* Avatar Section */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -100 : 100 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
        className="relative shrink-0"
      >
        <div className={`w-32 h-32 md:w-56 md:h-56 rounded-[2rem] border-8 border-slate-900 overflow-hidden shadow-[10px_10px_0px_0px_#1e293b] rotate-${isLeft ? "-3" : "3"}`}>
          <Image src={scene.image} alt={scene.speaker} fill className="object-cover" />
        </div>
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-yellow-400 border-4 border-slate-900 px-4 py-1 font-black text-xs uppercase italic z-20">
          {scene.action}
        </div>
      </motion.div>

      {/* Bubble Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 0.3 }}
        className={`relative group p-8 rounded-[3rem] border-4 border-slate-900 shadow-[10px_10px_0px_0px_rgba(244,114,182,1)] max-w-xl
          ${isLeft ? "bg-white text-slate-800 rounded-bl-none" : "bg-pink-500 text-white rounded-br-none"}`}
      >
        <div className={`absolute -top-8 ${isLeft ? "left-0" : "right-0"} flex items-center gap-2`}>
           <span className={`font-black text-sm uppercase tracking-widest p-2 rounded-lg bg-slate-900 text-white`}>
             {scene.speaker}
           </span>
           {scene.mood === "laugh" && <Zap className="text-yellow-400 fill-yellow-400" />}
        </div>
        <p className="text-xl md:text-3xl font-bold leading-snug italic">
          "{scene.text}"
        </p>
      </motion.div>
    </div>
  );
};

export default function ComicFarewell() {
  const [isMuted, setIsMuted] = useState(true);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();
  
  const bgPink = useTransform(scrollYProgress, [0, 1], ["#fff0f3", "#ffe4e6"]);
  const rotateHero = useTransform(scrollYProgress, [0, 0.2], [0, -10]);

  return (
    <motion.main style={{ backgroundColor: bgPink }} className="min-h-screen relative selection:bg-yellow-300 selection:text-slate-900 overflow-x-hidden">
      
      {/* --- FLOATING DECORATIONS (FIXED HYDRATION) --- */}
      <ClientOnly>
        <div className="fixed inset-0 pointer-events-none z-0">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ y: "110vh" }}
              animate={{ y: "-10vh", x: ["0%", "20%", "-20%", "0%"] }}
              transition={{ duration: 10 + i, repeat: Infinity, ease: "linear" }}
              className="absolute text-pink-300 opacity-20"
              style={{ left: `${(i * 7) % 100}%` }}
            >
              <Heart fill="currentColor" size={20 + i} />
            </motion.div>
          ))}
        </div>
      </ClientOnly>

      {/* --- FLOATING UI CONTROLS --- */}
      <div className="fixed top-6 right-6 z-[100] flex gap-4">
        <button 
          onClick={() => setIsMuted(!isMuted)}
          className="p-4 bg-white border-4 border-slate-900 rounded-2xl shadow-[4px_4px_0px_0px_#1e293b] hover:translate-y-1 hover:shadow-none transition-all"
        >
          {isMuted ? <VolumeX className="text-pink-600" /> : <Volume2 className="text-pink-600" />}
        </button>
      </div>

      {/* --- SECTION 1: HERO BOOM --- */}
      <section className="h-screen flex items-center justify-center relative p-6">
        <motion.div style={{ rotate: rotateHero }} className="relative z-10 text-center">
          <motion.div
            initial={{ scale: 0 }} animate={{ scale: 1 }}
            className="inline-block bg-yellow-400 border-8 border-slate-900 p-4 rounded-[2rem] shadow-[15px_15px_0px_0px_rgba(244,114,182,1)] mb-12"
          >
            <h1 className="text-6xl md:text-[10rem] font-black italic text-slate-900 leading-[0.85] uppercase tracking-tighter">
              The <br /> <span className="text-white drop-shadow-[5px_5px_0px_#1e293b]">End Of</span> <br /> <span className="text-pink-600">Era.</span>
            </h1>
          </motion.div>
          
          <div className="flex flex-col items-center gap-6">
            <p className="bg-white border-4 border-slate-900 px-6 py-2 font-black text-xl md:text-2xl rounded-xl rotate-2">
              SEBUAH KARYA PERPISAHAN DARI KAMI BERDUA
            </p>
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity }} className="text-pink-500">
               <ChevronDown size={60} strokeWidth={4} />
            </motion.div>
          </div>
        </motion.div>

        {/* Comic Background Elements */}
        <SoundFX text="ZOOM" className="top-20 right-20 text-rose-500 rotate-12" />
        <SoundFX text="POW" className="bottom-40 left-10 text-pink-500 -rotate-12" />
      </section>

      {/* --- SECTION 2: MEET THE PROTAGONISTS --- */}
      <section className="max-w-7xl mx-auto px-6 py-32 grid md:grid-cols-2 gap-20">
        <div className="relative group">
          <div className="absolute inset-0 bg-pink-500 rounded-[3rem] rotate-3 scale-105 z-0" />
          <div className="relative bg-white border-8 border-slate-900 p-8 rounded-[3rem] z-10">
            <div className="relative aspect-square border-4 border-slate-900 rounded-2xl overflow-hidden mb-8 shadow-inner">
               <Image src="/saya.jpg" alt="A" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
            </div>
            <h2 className="text-4xl font-black text-slate-900 mb-2 italic">SI AMBISI</h2>
            <p className="text-slate-500 font-bold tracking-tight">"Anggota yang paling sering nanya kapan rapat selesai."</p>
          </div>
        </div>

        <div className="relative group md:mt-40">
          <div className="absolute inset-0 bg-yellow-400 rounded-[3rem] -rotate-3 scale-105 z-0" />
          <div className="relative bg-white border-8 border-slate-900 p-8 rounded-[3rem] z-10">
            <div className="relative aspect-square border-4 border-slate-900 rounded-2xl overflow-hidden mb-8 shadow-inner">
               <Image src="/teman.jpg" alt="B" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
            </div>
            <h2 className="text-4xl font-black text-slate-900 mb-2 italic">SI EKSEKUTOR</h2>
            <p className="text-slate-500 font-bold tracking-tight">"Rekan kerja yang kalau nggak ada dia, proker jadi mitos."</p>
          </div>
        </div>
      </section>

      {/* --- SECTION 3: THE DRAMA (COMIC CORE) --- */}
      <section className="max-w-6xl mx-auto px-6 py-40">
        <div className="space-y-64 relative">
          {/* Central Line */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-full bg-slate-200 border-dashed border-4 border-pink-300 -z-10" />
          
          {COMIC_STORY.map((scene, idx) => (
            <ComicStrip key={scene.id} scene={scene} index={idx} />
          ))}

          <SoundFX text="HIKS" className="top-[30%] left-1/4 text-blue-500 opacity-50" />
          <SoundFX text="HEHE" className="top-[60%] right-1/4 text-pink-400 opacity-50" />
        </div>
      </section>

      {/* --- SECTION 4: MEMORY GRID --- */}
      <section className="py-40 bg-slate-900 text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-8 mb-24">
             <Camera size={64} className="text-pink-500" />
             <h2 className="text-6xl md:text-8xl font-black italic tracking-tighter uppercase">Memory <br /> <span className="text-pink-500 italic">Archive.</span></h2>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {MEMORIES.map((m) => (
              <motion.div 
                whileHover={{ y: -20, rotate: 2 }}
                key={m.id} 
                className="bg-white text-slate-900 p-6 rounded-[2.5rem] border-8 border-pink-500 shadow-[10px_10px_0px_0px_white]"
              >
                <div className="relative aspect-video rounded-xl overflow-hidden border-4 border-slate-900 mb-6">
                  <Image src={m.img} alt={m.title} fill className="object-cover" />
                </div>
                <h3 className="text-2xl font-black italic">{m.title}</h3>
                <p className="font-bold text-slate-400 uppercase text-xs tracking-widest">{m.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECTION 5: FINAL LETTER (THE FEELS) --- */}
      <section className="min-h-screen flex items-center justify-center p-6 bg-pink-100">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="max-w-4xl w-full bg-white border-[12px] border-slate-900 p-12 md:p-24 rounded-[4rem] relative shadow-[20px_20px_0px_0px_rgba(244,114,182,1)]"
        >
          {/* Decorative Comic Background */}
          <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 2px, transparent 2px)', backgroundSize: '20px 20px' }} />

          <div className="relative z-10 flex flex-col gap-8">
            <div className="flex justify-between items-start">
               <h2 className="text-5xl md:text-7xl font-black text-slate-900 italic leading-none">DEAR <br /> LEADERS,</h2>
               <Award size={80} className="text-yellow-400 stroke-[3px]" />
            </div>

            <div className="space-y-6 text-xl md:text-3xl font-bold text-slate-700 leading-snug">
              <p>
                Terima kasih sudah menjadi nahkoda yang hebat buat divisi ini. Kami datang sebagai kru yang amatir, tapi kakak bimbing kami jadi tim yang luar biasa.
              </p>
              <p>
                Kesabaran kakak, setiap revisi yang dikasih, dan setiap kepercayaan yang kakak kasih buat kami megang tanggung jawab—itu semua adalah bekal yang paling berharga buat kami ke depan.
              </p>
              <p className="bg-pink-500 text-white p-6 rounded-3xl rotate-[-2deg] border-4 border-slate-900 inline-block shadow-lg">
                "Pemimpin hebat itu bukan yang paling didepan, tapi yang paling peduli. Dan itu adalah KAKAK."
              </p>
              <p>
                Maafin kami berdua kalau selama ini banyak tingkah atau kerjaan yang kurang maksimal. Sukses terus ya kak di langkah selanjutnya!
              </p>
            </div>

            <div className="mt-20 flex flex-col md:flex-row justify-between items-end gap-12 border-t-8 border-slate-900 pt-12">
              <div className="flex -space-x-8">
                <div className="w-24 h-24 rounded-full border-4 border-slate-900 overflow-hidden shadow-lg hover:z-50 transition-all rotate-[-10deg]">
                   <Image src="/saya.jpg" alt="A" fill className="object-cover" />
                </div>
                <div className="w-24 h-24 rounded-full border-4 border-slate-900 overflow-hidden shadow-lg hover:z-50 transition-all rotate-[10deg]">
                   <Image src="/teman.jpg" alt="B" fill className="object-cover" />
                </div>
              </div>
              <div className="text-right">
                <p className="font-black text-sm uppercase tracking-[0.3em] text-slate-400 mb-2">Tertanda dengan penuh hormat,</p>
                <h4 className="text-4xl md:text-5xl font-black text-pink-600 italic tracking-tighter">NAMA KAMI BERDUA</h4>
                <div className="flex justify-end gap-2 mt-2">
                   <PartyPopper className="text-yellow-400" />
                   <Heart className="text-pink-500 fill-pink-500" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-20 text-center bg-slate-900 text-slate-500">
        <p className="font-black text-xs uppercase tracking-[1em]">The Adventure Continues • 2025</p>
        <div className="mt-8 flex justify-center gap-6">
           <Coffee size={20} />
           <Sun size={20} />
           <Sparkles size={20} />
        </div>
      </footer>

      {/* --- GLOBAL STYLES --- */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Archivo+Black&family=Space+Grotesk:wght@300;500;700&display=swap');
        
        body {
          font-family: 'Space Grotesk', sans-serif;
        }
        
        h1, h2, h3, h4, .comic-font {
          font-family: 'Archivo Black', sans-serif;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </motion.main>
  );
}