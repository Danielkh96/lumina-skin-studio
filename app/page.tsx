"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useSpring } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import {
  ArrowRight,
  CalendarCheck,
  CheckCircle2,
  ChevronDown,
  Clock,
  Heart,
  Menu,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Star,
  X,
} from "lucide-react";

const WHATSAPP_LINK = "https://wa.me/60123456789?text=Hi%20Lumina%20Skin%20Studio%2C%20I%20want%20to%20book%20a%20facial%20consultation.";

const fadeUp = {
  hidden: { opacity: 0, y: 34 },
  visible: { opacity: 1, y: 0 },
};

const services = [
  {
    title: "Deep Hydration Facial",
    tag: "Dry & dull skin",
    desc: "A moisture-lock ritual with calming massage, barrier support, and dewy post-facial glow.",
    image: "/images/hydration.svg",
  },
  {
    title: "Clear Acne Reset",
    tag: "Congestion & breakouts",
    desc: "Gentle extraction, soothing blue-light inspired care, and a plan for clearer, calmer skin.",
    image: "/images/acne.svg",
  },
  {
    title: "Brightening Glow Therapy",
    tag: "Pigmentation & uneven tone",
    desc: "A radiance-focused treatment designed to soften dullness and reveal a luminous complexion.",
    image: "/images/brightening.svg",
  },
  {
    title: "Age-Defying Lift Facial",
    tag: "Fine lines & firmness",
    desc: "Sculpting touch, peptide-rich care, and a plump finish for skin that looks refreshed.",
    image: "/images/anti-aging.svg",
  },
  {
    title: "Sensitive Repair Ritual",
    tag: "Redness & fragile barrier",
    desc: "Fragrance-conscious comfort care with cooling layers for sensitive, reactive skin.",
    image: "/images/sensitive.svg",
  },
];

const benefits = [
  "Personalized skin mapping before every facial",
  "Soft-touch extraction and sensitive-skin protocols",
  "Treatment plan matched to lifestyle and skin goals",
  "Premium calming ambience with visible glow results",
];

const process = [
  ["01", "Skin Consultation", "We map your skin concerns, routine, lifestyle, and event timeline before choosing a treatment."],
  ["02", "Custom Treatment", "Your esthetician blends cleansing, exfoliation, mask therapy, massage, and targeted care."],
  ["03", "Glow Review", "You leave with aftercare steps and a simple plan to maintain your best skin."],
];

const faqs = [
  ["How do I know which facial is right for me?", "Book a consultation and we will recommend a treatment based on your skin condition, goals, and sensitivity level."],
  ["Is the acne facial painful?", "We use a gentle, controlled approach. Extraction is performed only where suitable and always followed by calming care."],
  ["Can sensitive skin do facials?", "Yes. Our sensitive repair ritual focuses on barrier support, cooling comfort, and low-irritation products."],
  ["How often should I come?", "Most clients visit every 3–4 weeks. For acne or pigmentation goals, we may recommend a short series."],
];

function useReducedMotion() {
  const [reduced, setReduced] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia("(prefers-reduced-motion: reduce)").matches : false,
  );
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

function SectionTitle({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="mx-auto mb-12 max-w-3xl text-center"
    >
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.35em] text-[#b88a5a]">{eyebrow}</p>
      <h2 className="font-serif text-4xl leading-tight text-[#2f2420] md:text-6xl">{title}</h2>
      {subtitle && <p className="mt-5 text-base leading-8 text-[#6d5b53] md:text-lg">{subtitle}</p>}
    </motion.div>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="overflow-hidden rounded-3xl border border-[#ead8ca] bg-white/75 shadow-sm backdrop-blur">
      <button onClick={() => setOpen(!open)} className="flex w-full items-center justify-between gap-6 p-6 text-left">
        <span className="font-serif text-xl text-[#3a2b25]">{q}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }} className="rounded-full bg-[#f7e8df] p-2 text-[#9f7048]">
          <ChevronDown size={18} />
        </motion.span>
      </button>
      <motion.div initial={false} animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }} className="px-6">
        <p className="border-t border-[#f1dfd3] py-5 leading-7 text-[#6d5b53]">{a}</p>
      </motion.div>
    </div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const reducedMotion = useReducedMotion();
  const heroRef = useRef<HTMLDivElement>(null);
  const showcaseRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });

  useEffect(() => {
    if (reducedMotion) return;
    const lenis = new Lenis({ duration: 1.12, smoothWheel: true, wheelMultiplier: 0.85 });
    let rafId = 0;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [reducedMotion]);

  useEffect(() => {
    if (reducedMotion) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.to(".parallax-soft", {
        yPercent: -12,
        ease: "none",
        scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(".showcase-orb", {
        rotate: 14,
        scale: 1.08,
        ease: "none",
        scrollTrigger: { trigger: showcaseRef.current, start: "top bottom", end: "bottom top", scrub: true },
      });
      gsap.utils.toArray<HTMLElement>(".gsap-reveal").forEach((el) => {
        gsap.fromTo(el, { opacity: 0, y: 42 }, { opacity: 1, y: 0, duration: 0.85, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 84%" } });
      });
    });
    return () => ctx.revert();
  }, [reducedMotion]);

  useEffect(() => {
    const handler = (event: MouseEvent) => setMouse({ x: event.clientX, y: event.clientY });
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  return (
    <main className="min-h-screen overflow-hidden bg-[#fffaf6] text-[#3f3029]">
      <motion.div className="fixed left-0 top-0 z-[80] h-1 origin-left bg-gradient-to-r from-[#d8a56c] via-[#e9c8b8] to-[#9f7048]" style={{ scaleX }} />
      <div
        className="pointer-events-none fixed z-[60] hidden h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#e5b9a8]/25 blur-3xl md:block"
        style={{ left: mouse.x, top: mouse.y }}
      />

      <header className="fixed left-0 right-0 top-3 z-50 px-4">
        <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/70 bg-white/70 px-5 py-3 shadow-[0_18px_60px_rgba(105,76,58,0.12)] backdrop-blur-2xl">
          <a href="#top" className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-[#d7a66c] to-[#f1d6c8] text-white shadow-lg"><Sparkles size={19} /></span>
            <span className="font-serif text-xl tracking-wide text-[#3a2b25]">Lumina Skin Studio</span>
          </a>
          <div className="hidden items-center gap-7 text-sm font-medium text-[#604f47] md:flex">
            {['Services','Results','Process','FAQ'].map((item) => <a key={item} href={`#${item.toLowerCase()}`} className="transition hover:text-[#a86f42]">{item}</a>)}
          </div>
          <a href={WHATSAPP_LINK} className="hidden rounded-full bg-[#3d2b24] px-5 py-3 text-sm font-semibold text-white shadow-xl shadow-[#a87a5a]/20 transition hover:-translate-y-0.5 hover:bg-[#8e633f] md:inline-flex">Book WhatsApp</a>
          <button aria-label="Toggle menu" onClick={() => setMenuOpen(!menuOpen)} className="rounded-full bg-[#f4e4da] p-3 md:hidden">{menuOpen ? <X /> : <Menu />}</button>
        </nav>
        {menuOpen && (
          <div className="mx-auto mt-3 max-w-7xl rounded-3xl border border-white/70 bg-white/90 p-5 shadow-xl backdrop-blur md:hidden">
            {['Services','Results','Process','FAQ'].map((item) => <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)} className="block rounded-2xl px-4 py-3 text-[#604f47]">{item}</a>)}
            <a href={WHATSAPP_LINK} className="mt-3 flex justify-center rounded-full bg-[#3d2b24] px-5 py-3 font-semibold text-white">Book WhatsApp</a>
          </div>
        )}
      </header>

      <section id="top" ref={heroRef} className="relative min-h-screen overflow-hidden px-5 pb-20 pt-32 md:px-8 md:pt-44">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,#f7d9cb_0,transparent_32%),radial-gradient(circle_at_82%_18%,#f4e1bb_0,transparent_26%),linear-gradient(135deg,#fffaf6_0%,#f7e8df_48%,#fff_100%)]" />
        <div className="absolute left-[-10%] top-32 h-72 w-72 rounded-full bg-[#ead0c4]/50 blur-3xl" />
        <div className="absolute bottom-20 right-[-8%] h-96 w-96 rounded-full bg-[#e1b579]/25 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div>
            <motion.div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#ead3c7] bg-white/60 px-4 py-2 text-sm font-semibold text-[#9f7048] shadow-sm backdrop-blur">
              <Heart size={16} /> Personalized facial skincare studio
            </motion.div>
            <motion.h1 className="font-serif text-5xl leading-[0.95] tracking-[-0.04em] text-[#2f2420] md:text-7xl lg:text-8xl">
              Skin that feels calm, luminous, and confidently yours.
            </motion.h1>
            <motion.p className="mt-7 max-w-2xl text-lg leading-8 text-[#6d5b53] md:text-xl">
              Premium customized facial treatments for hydration, acne, brightening, anti-aging, and sensitive repair — designed for visible glow and gentle confidence.
            </motion.p>
            <motion.div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <motion.a whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} href={WHATSAPP_LINK} className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#3d2b24] px-7 py-4 font-bold text-white shadow-2xl shadow-[#b88a5a]/30">
                Book Your Skin Consultation <ArrowRight className="transition group-hover:translate-x-1" size={19} />
              </motion.a>
              <a href="#services" className="inline-flex items-center justify-center gap-3 rounded-full border border-[#d8c0b4] bg-white/60 px-7 py-4 font-bold text-[#3d2b24] backdrop-blur">Explore Treatments</a>
            </motion.div>
            <motion.div className="mt-10 grid max-w-xl grid-cols-3 gap-4">
              {[['4.9★','Client rating'],['35 min','Glow consult'],['5','Skin goals']].map(([n,l]) => <div key={l} className="rounded-3xl border border-white/80 bg-white/55 p-4 shadow-sm backdrop-blur"><p className="font-serif text-3xl text-[#9f7048]">{n}</p><p className="mt-1 text-xs uppercase tracking-widest text-[#7a6a62]">{l}</p></div>)}
            </motion.div>
          </motion.div>

          <motion.div className="parallax-soft relative">
            <div className="absolute -inset-5 rounded-[3rem] bg-gradient-to-br from-[#e7bf8c]/40 via-[#f6ddd3]/40 to-white blur-2xl" />
            <div className="relative overflow-hidden rounded-[3rem] border border-white/80 bg-white/55 p-4 shadow-[0_30px_100px_rgba(126,83,53,0.22)] backdrop-blur-xl">
              <Image src="/images/hero-bg.svg" alt="Elegant facial skincare treatment room" width={920} height={1080} priority className="h-[560px] w-full rounded-[2.35rem] object-cover" />
              <div className="absolute bottom-8 left-8 right-8 rounded-[2rem] border border-white/70 bg-white/72 p-5 shadow-xl backdrop-blur-2xl">
                <div className="flex items-center justify-between gap-5">
                  <div>
                    <p className="font-serif text-2xl text-[#342720]">Glow Plan Ready</p>
                    <p className="mt-1 text-sm text-[#6d5b53]">Hydrate • Repair • Brighten</p>
                  </div>
                  <span className="grid h-14 w-14 place-items-center rounded-full bg-[#f1dccd] text-[#9f7048]"><CalendarCheck /></span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="relative overflow-hidden border-y border-[#ead8ca] bg-[#3d2b24] py-4 text-white">
        <motion.div animate={reducedMotion ? {} : { x: [0, -640] }} transition={{ duration: 22, repeat: Infinity, ease: "linear" }} className="flex w-max gap-10 whitespace-nowrap text-sm font-semibold uppercase tracking-[0.32em] text-[#f7dfcf]">
          {Array.from({ length: 10 }).map((_, i) => <span key={i}>Customized Facials ✦ Visible Glow ✦ Sensitive-Safe Care ✦ WhatsApp Booking ✦</span>)}
        </motion.div>
      </div>

      <section id="about" className="px-5 py-24 md:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          <motion.div variants={fadeUp} whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.7 }} className="relative">
            <div className="absolute -inset-4 rounded-[3rem] bg-[#efd8cd] blur-2xl" />
            <Image src="/images/about-visual.svg" alt="Personalized skincare consultation" width={900} height={700} className="relative rounded-[3rem] border border-white shadow-2xl" />
          </motion.div>
          <div className="gsap-reveal">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.35em] text-[#b88a5a]">About the studio</p>
            <h2 className="font-serif text-4xl leading-tight text-[#2f2420] md:text-6xl">A calmer way to transform your skin.</h2>
            <p className="mt-6 text-lg leading-8 text-[#6d5b53]">Lumina Skin Studio blends premium facial rituals with practical skin planning. Every session starts with a mini consultation so your treatment is never random — it is matched to your barrier, breakouts, pigmentation, and glow goals.</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {benefits.map((benefit) => <div key={benefit} className="flex gap-3 rounded-3xl border border-[#ead8ca] bg-white/70 p-5 shadow-sm"><CheckCircle2 className="mt-1 shrink-0 text-[#b88a5a]" size={20}/><p className="font-medium leading-7 text-[#514138]">{benefit}</p></div>)}
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="relative px-5 py-24 md:px-8">
        <div className="absolute inset-0 bg-[#f7ebe4]" />
        <div className="relative mx-auto max-w-7xl">
          <SectionTitle eyebrow="Signature treatments" title="Five facial paths, one personalized glow." subtitle="Choose a goal — hydration, acne, brightening, anti-aging, or sensitive repair — and we customize the steps to your skin on the day." />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-5">
            {services.map((service, index) => (
              <motion.article key={service.title} variants={fadeUp} whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.6, delay: index * 0.05 }} whileHover={{ y: -10 }} className="group rounded-[2rem] border border-white/80 bg-white/72 p-4 shadow-[0_18px_60px_rgba(104,72,50,0.08)] backdrop-blur">
                <Image src={service.image} alt={service.title} width={360} height={260} className="h-44 w-full rounded-[1.5rem] object-cover" />
                <div className="p-2 pt-5">
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#b88a5a]">{service.tag}</p>
                  <h3 className="mt-3 font-serif text-2xl text-[#342720]">{service.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#6d5b53]">{service.desc}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section ref={showcaseRef} id="results" className="px-5 py-24 md:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle eyebrow="Visible confidence" title="Before & after style results without unrealistic promises." subtitle="We focus on healthier-looking skin: calmer redness, softer texture, brighter tone, and stronger barrier comfort." />
          <div className="grid items-center gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="showcase-orb relative rounded-[3rem] border border-[#ead8ca] bg-white p-4 shadow-2xl">
              <Image src="/images/results-visual.svg" alt="Before and after skincare glow results" width={900} height={760} className="rounded-[2.35rem]" />
            </div>
            <div className="grid gap-5">
              {[['Hydration','Skin looks plumper and makeup sits smoother.'],['Acne calm','Congestion plan with less angry-looking breakouts.'],['Bright glow','Dull tone appears fresher and more luminous.'],['Barrier repair','Sensitive skin feels comforted, not stripped.']].map(([title, desc]) => <div key={title} className="gsap-reveal rounded-[2rem] border border-[#ead8ca] bg-white/70 p-6 shadow-sm"><h3 className="font-serif text-3xl text-[#3a2b25]">{title}</h3><p className="mt-2 leading-7 text-[#6d5b53]">{desc}</p></div>)}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#3d2b24] px-5 py-24 text-white md:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mx-auto mb-12 max-w-3xl text-center"
          >
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.35em] text-[#f1cda5]">Why clients return</p>
            <h2 className="font-serif text-4xl leading-tight text-white md:text-6xl">A premium facial experience designed for conversion and care.</h2>
            <p className="mt-5 text-base leading-8 text-[#ecd9cc] md:text-lg">From booking to aftercare, every touchpoint feels polished, reassuring, and easy.</p>
          </motion.div>
          <div className="grid gap-5 md:grid-cols-3">
            {[['Gentle expertise', ShieldCheck], ['Easy booking', MessageCircle], ['Glow timing', Clock]].map(([title, Icon], index) => {
              const TypedIcon = Icon as typeof ShieldCheck;
              return <motion.div key={title as string} variants={fadeUp} whileInView="visible" viewport={{ once: true }} transition={{ delay: index * 0.08 }} className="rounded-[2rem] border border-white/10 bg-white/8 p-7 backdrop-blur"><TypedIcon className="text-[#f1cda5]"/><h3 className="mt-7 font-serif text-3xl">{title as string}</h3><p className="mt-3 leading-7 text-[#ecd9cc]">Premium service flow, transparent recommendations, and a booking CTA always within reach.</p></motion.div>;
            })}
          </div>
        </div>
      </section>

      <section id="process" className="px-5 py-24 md:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle eyebrow="Treatment journey" title="Three steps to a customized glow plan." />
          <div className="grid gap-5 md:grid-cols-3">
            {process.map(([num, title, desc], index) => <motion.div key={num} variants={fadeUp} whileInView="visible" viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="rounded-[2.25rem] border border-[#ead8ca] bg-white/75 p-8 shadow-sm"><span className="font-serif text-6xl text-[#d4aa7b]">{num}</span><h3 className="mt-8 font-serif text-3xl text-[#342720]">{title}</h3><p className="mt-4 leading-7 text-[#6d5b53]">{desc}</p></motion.div>)}
          </div>
        </div>
      </section>

      <section className="px-5 py-24 md:px-8">
        <div className="mx-auto max-w-7xl rounded-[3rem] bg-gradient-to-br from-[#f7e4da] via-white to-[#f4ddc1] p-6 shadow-[0_30px_100px_rgba(120,79,49,0.16)] md:p-12">
          <SectionTitle eyebrow="Client love" title="Soft skin, softer confidence." />
          <div className="grid gap-5 md:grid-cols-3">
            {['My skin felt calm immediately. The consultation made the treatment feel truly personal.','The acne facial was gentle but effective. I finally have a plan that makes sense.','Beautiful salon, easy WhatsApp booking, and my skin looked amazing for my event.'].map((quote) => <motion.blockquote key={quote} whileHover={{ y: -8 }} className="rounded-[2rem] bg-white/80 p-7 shadow-sm"><div className="mb-5 flex gap-1 text-[#d7a66c]">{Array.from({length:5}).map((_,i)=><Star key={i} size={17} fill="currentColor" />)}</div><p className="leading-8 text-[#5e4d45]">“{quote}”</p><p className="mt-6 font-semibold text-[#3a2b25]">— Lumina client</p></motion.blockquote>)}
          </div>
        </div>
      </section>

      <section id="faq" className="px-5 py-24 md:px-8">
        <div className="mx-auto max-w-4xl">
          <SectionTitle eyebrow="FAQ" title="Questions before your glow appointment?" />
          <div className="grid gap-4">{faqs.map(([q, a]) => <FaqItem key={q} q={q} a={a} />)}</div>
        </div>
      </section>

      <section id="contact" className="px-5 pb-10 pt-12 md:px-8">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[3rem] bg-[#2f2420] p-8 text-white shadow-2xl md:p-16">
          <Image src="/images/cta-bg.svg" alt="Soft luxury skincare background" width={1200} height={700} className="absolute inset-0 h-full w-full object-cover opacity-30" />
          <div className="relative max-w-3xl">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.35em] text-[#f1cda5]">Book now</p>
            <h2 className="font-serif text-4xl leading-tight md:text-7xl">Ready for your most luminous skin season?</h2>
            <p className="mt-6 text-lg leading-8 text-[#ecd9cc]">Message us on WhatsApp to reserve a consultation. We will recommend the right facial based on your current skin condition and goals.</p>
            <a href={WHATSAPP_LINK} className="mt-9 inline-flex items-center gap-3 rounded-full bg-white px-7 py-4 font-bold text-[#2f2420] shadow-xl transition hover:-translate-y-1 hover:bg-[#f7e4da]"><MessageCircle /> Book via WhatsApp</a>
          </div>
        </div>
      </section>

      <footer className="px-5 pb-28 pt-8 text-center text-sm text-[#7a6a62] md:px-8">
        <p className="font-serif text-2xl text-[#3a2b25]">Lumina Skin Studio</p>
        <p className="mt-3">Premium personalized facial skincare • Hydration • Acne • Brightening • Anti-aging • Sensitive repair</p>
      </footer>

      <motion.a href={WHATSAPP_LINK} className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-3 rounded-full bg-[#25D366] px-5 py-4 font-bold text-white shadow-2xl shadow-green-900/20 md:bottom-8 md:right-8">
        <MessageCircle size={20} /> <span className="hidden sm:inline">WhatsApp Booking</span>
      </motion.a>
    </main>
  );
}
