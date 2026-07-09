import { Link } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  Heart,
  MessageCircle,
  Linkedin,
  Shield,
  Sparkles,
  Crown,
  ShieldCheck,
  BadgeCheck,
  ChevronDown,
  Instagram,
  Twitter,
  X,
  ArrowRight,
  Lock,
  Stethoscope,
  Brain,
  Flower2,
  Play,
  Smartphone,
  Star,
} from "lucide-react";
import logo from "@/assets/zenher-logo.jpeg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "zenher" },
      { name: "description", content: "Zenher is a women healthcare community — a private place to share, ask and connect with verified health experts." },
      { name: "keywords", content: "women's health, women's community, health experts, period tracker, mental health, maternal health" },
      { name: "robots", content: "index,follow" },
      { property: "og:title", content: "zenher" },
      { property: "og:url", content: "https://zenher.in/" },
      { property: "og:description", content: "Join Zenher — a safe, expert-backed community for women's health questions and support." },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "/assets/zenher-logo.jpeg" },
      { name: "twitter:image", content: "/assets/zenher-logo.jpeg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "zenher" },
      { name: "twitter:description", content: "A women healthcare community with verified experts, anonymous posting, and thoughtful privacy." },
    ],
    links: [
      { rel: "canonical", href: "https://zenher.in/" },
      { rel: "icon", href: "/assets/zenher-logo.jpeg" },
      { rel: "shortcut icon", href: "/assets/zenher-logo.jpeg" },
      { rel: "apple-touch-icon", href: "/assets/zenher-logo.jpeg" },
    ],
  }),
  component: Landing,
});

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.07, duration: 0.6, ease: "easeOut" as const } }),
};

type FeatureArt = "answers" | "privacy" | "conversation" | "discovery" | "trust" | "care";

function Hero() {
  return (
    <section id="join" className="relative overflow-hidden px-4 pt-20 pb-20 sm:px-6 sm:pt-24 sm:pb-28">
      <div className="absolute inset-0 grid-pattern opacity-50 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-3xl sm:h-[640px] sm:w-[640px]" />

      <div className="relative mx-auto flex max-w-5xl flex-col items-center text-center">
        <motion.div initial="hidden" animate="show" variants={fadeUp}>
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-white/70 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-primary shadow-soft backdrop-blur sm:px-4 sm:text-xs sm:tracking-[0.25em]">
            <Sparkles className="h-3.5 w-3.5" /> Welcome to Zenher
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mt-7 flex flex-col items-center gap-4 [perspective:1200px] sm:mt-8 sm:gap-5"
        >
          <motion.div
            animate={{ rotateY: [0, 12, -12, 0], y: [0, -6, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="relative [transform-style:preserve-3d]"
          >
            <div className="absolute -inset-5 rounded-full bg-gradient-primary opacity-40 blur-2xl sm:-inset-6" />
            <img
              src={logo}
              alt="Zenher logo"
              className="relative h-20 w-20 rounded-full object-cover ring-4 ring-white shadow-glow sm:h-28 sm:w-28"
            />
          </motion.div>
          <h1 className="font-display text-4xl font-medium leading-tight tracking-[-0.06em] text-slate-950 sm:text-5xl md:text-7xl">
            Zenher
          </h1>
          <p className="max-w-xl text-sm font-medium uppercase tracking-[0.18em] text-primary sm:text-base sm:tracking-[0.28em]">
            A women healthcare community
          </p>
        </motion.div>

        <motion.p
          initial="hidden"
          animate="show"
          custom={2}
          variants={fadeUp}
          className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-lg md:text-xl"
        >
          A safe space to share your thoughts, ask the questions you've always wondered,
          and connect with women and verified health experts who truly understand.
        </motion.p>

        <motion.div
          initial="hidden"
          animate="show"
          custom={3}
          variants={fadeUp}
          className="mt-8 flex w-full flex-col items-stretch justify-center gap-3 sm:w-auto sm:flex-row sm:items-center"
        >
          <Link to="/community" className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-primary px-7 py-3.5 font-medium text-primary-foreground shadow-glow transition hover:scale-[1.02]">
            Join our Community <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </Link>
          <a href="#expert" className="inline-flex items-center justify-center gap-2 rounded-full border border-primary/30 bg-white/80 px-7 py-3.5 font-medium text-primary shadow-soft backdrop-blur transition hover:bg-white">
            <Stethoscope className="h-4 w-4" /> Join as Expert
          </a>
        </motion.div>

        {/* Social icons removed from hero as requested */}
      </div>
    </section>
  );
}

const features = [
  {
    icon: Crown,
    art: "answers" as FeatureArt,
    label: "Premium access",
    title: "Expert-backed answers",
    desc: "Clear guidance from verified professionals, with every answer framed for real-life decisions.",
  },
  {
    icon: ShieldCheck,
    art: "privacy" as FeatureArt,
    label: "Trusted privacy",
    title: "Private by design",
    desc: "Anonymous posting, careful moderation, and a community built to protect your space.",
  },
  {
    icon: MessageCircle,
    art: "conversation" as FeatureArt,
    label: "Human conversations",
    title: "Conversations that feel human",
    desc: "Less noise, more signal. A calmer environment for questions, support, and shared experience.",
  },
  {
    icon: Sparkles,
    art: "discovery" as FeatureArt,
    label: "Curated discovery",
    title: "Curated discovery",
    desc: "See what matters now with thoughtfully organized prompts, circles, and expert-led topics.",
  },
  {
    icon: Shield,
    art: "trust" as FeatureArt,
    label: "Community trust",
    title: "Safety and trust",
    desc: "Community rules and verification standards that keep the experience reliable.",
  },
  {
    icon: Heart,
    art: "care" as FeatureArt,
    label: "Care-first culture",
    title: "Care-first culture",
    desc: "Built to feel supportive, respectful, and steady from the first interaction onward.",
  },
];

function FeatureIllustration({ art, icon: Icon }: { art: FeatureArt; icon: typeof Crown }) {
  return (
    <div className="relative overflow-hidden rounded-[1.5rem] border border-violet-100 bg-gradient-to-br from-violet-50 via-white to-fuchsia-50 p-4">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(168,85,247,0.16),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(244,114,182,0.14),transparent_32%)]" />
      <svg viewBox="0 0 320 180" className="relative h-40 w-full">
        {art === "answers" ? (
          <>
            <rect x="56" y="38" width="114" height="86" rx="20" fill="white" stroke="#e9d5ff" strokeWidth="2" />
            <rect x="78" y="58" width="70" height="8" rx="4" fill="#c4b5fd" />
            <rect x="78" y="78" width="94" height="8" rx="4" fill="#ede9fe" />
            <rect x="78" y="98" width="60" height="8" rx="4" fill="#ede9fe" />
            <circle cx="226" cy="65" r="26" fill="#7c3aed" opacity="0.12" />
            <circle cx="252" cy="108" r="18" fill="#ec4899" opacity="0.12" />
          </>
        ) : art === "privacy" ? (
          <>
            <path d="M160 38l48 18v28c0 30-18 50-48 66-30-16-48-36-48-66V56l48-18Z" fill="white" stroke="#ddd6fe" strokeWidth="2" />
            <path d="M160 66c-10 0-18 8-18 18v10h36V84c0-10-8-18-18-18Z" fill="#c4b5fd" />
            <rect x="144" y="92" width="32" height="22" rx="11" fill="#7c3aed" opacity="0.14" />
            <circle cx="98" cy="112" r="16" fill="#7c3aed" opacity="0.12" />
            <circle cx="224" cy="56" r="20" fill="#ec4899" opacity="0.12" />
          </>
        ) : art === "conversation" ? (
          <>
            <path d="M74 54h88c12 0 22 10 22 22v18c0 12-10 22-22 22H124l-24 18v-18H74c-12 0-22-10-22-22V76c0-12 10-22 22-22Z" fill="white" stroke="#ddd6fe" strokeWidth="2" />
            <path d="M168 78h78c12 0 22 10 22 22v12c0 12-10 22-22 22h-22v14l-18-14h-38c-12 0-22-10-22-22v-12c0-12 10-22 22-22Z" fill="#f5f3ff" stroke="#e9d5ff" strokeWidth="2" />
            <rect x="68" y="76" width="70" height="8" rx="4" fill="#c4b5fd" />
            <rect x="68" y="94" width="54" height="8" rx="4" fill="#ede9fe" />
            <rect x="178" y="100" width="58" height="8" rx="4" fill="#c4b5fd" />
          </>
        ) : art === "discovery" ? (
          <>
            <rect x="58" y="44" width="84" height="94" rx="20" fill="white" stroke="#ddd6fe" strokeWidth="2" transform="rotate(-8 58 44)" />
            <rect x="126" y="36" width="104" height="108" rx="24" fill="#f5f3ff" stroke="#e9d5ff" strokeWidth="2" />
            <rect x="148" y="62" width="48" height="8" rx="4" fill="#c4b5fd" />
            <rect x="148" y="82" width="70" height="8" rx="4" fill="#ede9fe" />
            <rect x="148" y="102" width="56" height="8" rx="4" fill="#ede9fe" />
            <circle cx="244" cy="58" r="20" fill="#7c3aed" opacity="0.14" />
          </>
        ) : art === "trust" ? (
          <>
            <circle cx="160" cy="90" r="52" fill="white" stroke="#ddd6fe" strokeWidth="2" />
            <path d="M160 54l28 11v20c0 20-11 35-28 46-17-11-28-26-28-46V65l28-11Z" fill="#f5f3ff" stroke="#c4b5fd" strokeWidth="2" />
            <path d="M148 89l9 9 18-22" fill="none" stroke="#7c3aed" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="86" cy="58" r="16" fill="#7c3aed" opacity="0.12" />
            <circle cx="236" cy="116" r="20" fill="#ec4899" opacity="0.12" />
          </>
        ) : (
          <>
            <path d="M160 128c-26-18-56-36-56-64 0-16 12-28 28-28 12 0 22 7 28 18 6-11 16-18 28-18 16 0 28 12 28 28 0 28-30 46-56 64Z" fill="white" stroke="#ddd6fe" strokeWidth="2" />
            <path d="M122 114c11-8 24-12 38-12s27 4 38 12" fill="none" stroke="#c4b5fd" strokeWidth="4" strokeLinecap="round" />
            <path d="M112 78c10-6 22-9 36-9" fill="none" stroke="#ede9fe" strokeWidth="4" strokeLinecap="round" />
            <path d="M172 69c14 0 26 3 36 9" fill="none" stroke="#ede9fe" strokeWidth="4" strokeLinecap="round" />
            <circle cx="238" cy="56" r="18" fill="#7c3aed" opacity="0.12" />
          </>
        )}
      </svg>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="grid h-14 w-14 place-items-center rounded-2xl bg-white/85 text-violet-600 shadow-soft ring-1 ring-black/5 backdrop-blur">
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
}

function Features() {
  return (
    <section id="community" className="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-28">
      <div className="absolute inset-x-0 top-0 -z-10 h-72 bg-[radial-gradient(circle_at_top,rgba(124,58,237,0.18),transparent_60%)]" />
      <div className="absolute left-1/2 top-24 -z-10 h-64 w-64 -translate-x-1/2 rounded-full bg-fuchsia-400/10 blur-3xl" />

      <div className="mx-auto max-w-6xl">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-normal uppercase tracking-[0.3em] text-violet-600/90">What makes Zenher different</p>
          <h2 className="mt-3 font-display text-3xl font-medium tracking-[-0.05em] text-slate-950 sm:text-4xl md:text-5xl">
            Premium features, designed to feel calm, polished, and human.
          </h2>
          <p className="mt-4 text-sm font-normal leading-7 text-slate-600 sm:text-base">
            A refined community experience with quiet confidence, thoughtful privacy, and expert-backed support.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              custom={i}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeUp}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.99 }}
              className="group overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white shadow-sm transition hover:shadow-lg"
            >
              <FeatureIllustration art={f.art} icon={f.icon} />
              <div className="space-y-4 p-6">
                <p className="text-[11px] font-normal uppercase tracking-[0.24em] text-violet-600/90">{f.label}</p>
                <h3 className="font-display text-xl font-medium tracking-[-0.04em] text-slate-950">{f.title}</h3>
                <p className="text-sm font-normal leading-7 text-slate-600">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Roadmap() {
  const steps = [
    {
      step: "01",
      title: "Join the community",
      desc: "Create your account and step into a space designed for women’s health conversations.",
      icon: Heart,
    },
    {
      step: "02",
      title: "Login securely",
      desc: "Access your private feed, saved conversations, and personalized circles anytime.",
      icon: Lock,
    },
    {
      step: "03",
      title: "Ask your question",
      desc: "Post anonymously or openly, depending on what feels right for you.",
      icon: MessageCircle,
    },
    {
      step: "04",
      title: "Connect with experts",
      desc: "Get trusted replies and guidance from verified health professionals.",
      icon: BadgeCheck,
    },
  ];

  return (
    <section className="px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-6xl rounded-[2rem] border border-primary/10 bg-card/80 p-6 shadow-soft backdrop-blur sm:p-8 md:p-12">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-[0.25em] text-primary">Roadmap</p>
            <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl">How you can start your health journey with Zenher.</h2>
          </div>
         
        </motion.div>

        <div className="relative mt-10">
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-primary/35 via-primary/15 to-transparent md:block" />
          <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-primary/30 via-primary/10 to-transparent md:hidden" />

          <div className="relative space-y-6 md:space-y-10">
            {steps.map((step, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={step.title}
                  custom={i}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className="grid items-center gap-4 md:grid-cols-2"
                >
                  <div className={`relative ${isLeft ? "md:pr-10" : "md:col-start-2 md:pl-10"}`}>
                    <div className="absolute -left-[1.4rem] top-8 flex h-8 w-8 items-center justify-center rounded-full border border-primary/15 bg-background shadow-soft md:left-1/2 md:-translate-x-1/2">
                      <div className="h-3 w-3 rounded-full bg-gradient-primary shadow-glow" />
                    </div>

                    <div className={`relative overflow-hidden rounded-[1.75rem] border border-primary/10 bg-white/70 p-5 shadow-soft backdrop-blur sm:p-6 ${isLeft ? "md:ml-auto md:max-w-xl" : "md:max-w-xl"}`}>
                      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-primary/40 to-transparent" />
                      <div className="flex items-start gap-4">
                        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-glow">
                          <step.icon className="h-5 w-5" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">{step.step}</p>
                          <h3 className="mt-1 text-2xl leading-tight">{step.title}</h3>
                          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={`hidden md:block ${isLeft ? "" : "md:col-start-1 md:row-start-1"}`} />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function ExpertJoin() {
  const perks = [
    "Verified expert badge on every reply",
    "Lead AMAs and dedicated circles",
    "Reach women actively seeking guidance",
    "Flexible — answer when you can",
  ];

  return (
    <section id="expert" className="px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-10 overflow-hidden rounded-[2.5rem] bg-gradient-purple p-6 text-primary-foreground shadow-glow sm:p-10 md:grid-cols-2 md:p-16">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
          <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur">
            <Stethoscope className="h-3.5 w-3.5" /> For health experts
          </span>
          <h2 className="mt-5 text-3xl text-primary-foreground sm:text-4xl md:text-5xl">
            Are you a health expert? <span className="italic opacity-90">Join Zenher.</span>
          </h2>
          <p className="mt-4 max-w-md text-primary-foreground/85">
            Doctors, therapists, nutritionists, midwives, coaches — bring your expertise
            to a community of women who are ready to listen and learn.
          </p>
          <ul className="mt-6 space-y-2.5">
            {perks.map((p) => (
              <li key={p} className="flex items-center gap-3 text-sm text-primary-foreground/90">
                <BadgeCheck className="h-4 w-4 shrink-0" /> {p}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="https://community.zenher.in/apply-as-expert" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 font-medium text-primary shadow-soft transition hover:scale-[1.03]">
              Apply as Expert <ArrowRight className="h-4 w-4" />
            </a>
       
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative hidden h-[420px] [perspective:1200px] md:block"
        >
          <motion.div
            animate={{ rotateX: [6, -4, 6], rotateY: [-8, 8, -8] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 [transform-style:preserve-3d]"
          >
            <div
              className="absolute left-1/2 top-1/2 w-72 -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white p-6 text-foreground shadow-glow"
              style={{ transform: "translateZ(80px) translate(-50%,-50%)" }}
            >
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-full bg-gradient-primary text-primary-foreground">
                  <Stethoscope className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Expert profile</p>
                  <p className="flex items-center gap-1 text-xs text-primary"><BadgeCheck className="h-3 w-3" /> Verified by Zenher</p>
                </div>
              </div>
              <div className="mt-5 space-y-2">
                <div className="h-2 w-3/4 rounded-full bg-primary/15" />
                <div className="h-2 w-full rounded-full bg-primary/10" />
                <div className="h-2 w-2/3 rounded-full bg-primary/10" />
              </div>
              <div className="mt-5 flex items-center justify-between rounded-2xl bg-secondary p-3 text-xs">
                <span className="font-medium text-secondary-foreground">Hosting an AMA</span>
                <Sparkles className="h-4 w-4 text-primary" />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function DownloadApp() {
  return (
    <section id="download" className="px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2 md:gap-14">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative order-2 flex justify-center md:order-1"
        >
          <div className="absolute inset-0 -z-10 bg-gradient-primary opacity-20 blur-3xl" />
          <motion.div
            animate={{ y: [0, -10, 0], rotate: [-2, 2, -2] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="relative h-[460px] w-[230px] rounded-[2.5rem] border-8 border-foreground/90 bg-foreground p-2 shadow-glow sm:h-[520px] sm:w-[260px]"
          >
            <div className="relative h-full w-full overflow-hidden rounded-[2.3rem] bg-gradient-to-b from-secondary to-white">
              <div className="absolute left-1/2 top-2 h-5 w-24 -translate-x-1/2 rounded-full bg-foreground" />
              <div className="px-4 pt-12">
                <div className="flex items-center gap-2">
                  <img src={logo} alt="Zenher" className="h-8 w-8 rounded-full ring-2 ring-primary/30" />
                  <p className="text-sm font-semibold">Zenher</p>
                </div>
                <p className="mt-5 font-display text-xl leading-tight sm:text-2xl">Good morning, her ✨</p>

                <div className="mt-4 space-y-3">
                  {[
                    { icon: Flower2, t: "Cycle & Hormones", s: "New post from Dr. M." },
                    { icon: Brain, t: "Mind & Emotions", s: "AMA starting in 1h" },
                    { icon: Heart, t: "Daily check-in", s: "How are you today?" },
                  ].map((c) => (
                    <div key={c.t} className="flex items-center gap-3 rounded-2xl bg-white/90 p-3 shadow-soft backdrop-blur">
                      <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-primary text-primary-foreground">
                        <c.icon className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold">{c.t}</p>
                        <p className="text-[10px] text-muted-foreground">{c.s}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          className="order-1 md:order-2"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
            <Smartphone className="h-3.5 w-3.5" /> Zenher app
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl">
            Download the Zenher <span className="text-gradient italic">period tracker app.</span>
          </h2>
          <p className="mt-4 max-w-md text-muted-foreground">
            Join circles, ask experts, and check in on yourself — wherever you are.
            Download Zenher and step inside your safe space.
          </p>

          <div className="mt-6 flex items-center gap-1.5 text-sm text-muted-foreground">
            {[0, 1, 2, 3, 4].map((i) => <Star key={i} className="h-4 w-4 fill-primary text-primary" />)}
            <span className="ml-2">Loved by her, everywhere.</span>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href="https://play.google.com/store/apps/details?id=com.zenher.app"
              className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-foreground px-5 py-3 text-background transition hover:scale-[1.03]"
              target="_blank"
              rel="noreferrer"
            >
              <Play className="h-6 w-6 fill-current" />
              <div className="text-left">
                <p className="text-[10px] uppercase tracking-wider opacity-70">Get it on</p>
                <p className="text-base font-semibold leading-tight">Google Play</p>
              </div>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

const faqs = [
  { q: "What is Zenher?", a: "Zenher is a women healthcare community — a private space to share your thoughts, ask questions and connect with verified health experts." },
  { q: "Is it free to join?", a: "Yes. The community is completely free. We've just launched and we're focused on building a kind, supportive space first." },
  { q: "Can I post anonymously?", a: "Absolutely. Every post and comment supports anonymous mode — only you ever see who you really are." },
  { q: "How are health experts verified?", a: "Every expert applies, shares their credentials, and is reviewed by the Zenher team before receiving a verified badge." },
  { q: "Is my data private?", a: "Threads stay inside the community. We don't sell your data and we don't use your words to train external models." },
];

function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-3xl">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="text-center">
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-primary">FAQ</p>
          <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl">Questions, <span className="text-gradient">answered.</span></h2>
        </motion.div>
        <div className="mt-12 space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={f.q}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUp}
                className="rounded-2xl bg-card shadow-soft"
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="font-medium">{f.q}</span>
                  <ChevronDown className={`h-5 w-5 text-primary transition ${isOpen ? "rotate-180" : ""}`} />
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-5 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative overflow-hidden bg-gradient-purple px-4 pt-16 pb-10 text-primary-foreground sm:px-6 sm:pt-20">
      <div className="absolute -top-24 left-1/2 h-72 w-[80%] -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />
      <div className="relative mx-auto max-w-6xl">
        <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between md:items-center">
          <div className="flex items-center gap-4">
            <img src={logo} alt="Zenher" className="h-10 w-10 rounded-full object-cover" />
            <span className="font-display text-lg sm:text-2xl">Zenher</span>
          </div>

          <div className="flex items-center gap-4">
            {[
              { Icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/company/zenher/" },
              { Icon: MessageCircle, label: "WhatsApp", href: "https://wa.me/" },
              { Icon: X, label: "X", href: "https://x.com/zenherhealth" },
              { Icon: Instagram, label: "Instagram", href: "https://www.instagram.com/zenher.in" },
            ].map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  title={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-primary-foreground transition hover:-translate-y-0.5 hover:bg-white/20"
                >
                  <Icon className={label === "WhatsApp" ? "h-5 w-5" : "h-4 w-4"} />
                </a>
            ))}
          </div>

          <div className="text-sm text-primary-foreground/90">
            <a href="mailto:info@zenher.in" className="hover:underline">info@zenher.in</a>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-white/15 pt-6 text-xs text-primary-foreground/70 md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Zenher. All rights reserved.</p>
          <p>Made with care for every her.</p>
        </div>
      </div>
    </footer>
  );
}

function Landing() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Features />
          <ExpertJoin />
      <Roadmap />
      <DownloadApp />
      <Faq />
      
      <Footer />
    </main>
  );
}