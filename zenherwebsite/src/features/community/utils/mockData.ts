import { Post } from "../types";

export const MOCK_POSTS: Post[] = [
  {
    id: "1",
    title: "Understanding Hormonal Imbalances: Symptoms and Steps",
    content: "Lately, I've been feeling unusually fatigued despite sleeping 8 hours a night. After speaking with a verified expert here, I learned about tracking cortisol and thyroid levels. Here is a summary of the common warning signs to watch out for...",
    category: "Hormones",
    author: "Ananya M.",
    createdAt: new Date("2026-06-20T09:30:00Z"),
    updatedAt: new Date("2026-06-20T09:30:00Z")
  },
  {
    id: "2",
    title: "Navigating Postpartum Anxiety: You are Not Alone",
    content: "The fourth trimester is rarely discussed with the raw honesty it requires. Dealing with constant worry can be incredibly isolating. Sharing my journey here to open up the floor for anyone else experiencing intrusive thoughts after childbirth.",
    category: "Maternal Health",
    author: "Dr. Priya Sharma",
    createdAt: new Date("2026-06-24T14:15:00Z"),
    updatedAt: new Date("2026-06-24T14:15:00Z")
  },
  {
    id: "3",
    title: "A Beginner's Guide to Tracking Menstrual Cycles Accurately",
    content: "Cycle tracking is more than just knowing when your period arrives. Understanding your follicular and luteal phases can help map out your energy levels, dietary needs, and workout routines. Let's look at what data points matter most.",
    category: "Period Tracker",
    author: "Rhea Kapoor",
    createdAt: new Date("2026-06-25T08:00:00Z"),
    updatedAt: new Date("2026-06-25T08:00:00Z")
  },
  {
    id: "4",
    title: "Managing Stress and Cortisol: Mindfulness Practices That Work",
    content: "Chronic stress physically alters your biological cycles. In this post, I am mapping out three actionable mindfulness techniques that take less than 5 minutes a day but significantly downregulate nervous system hyperarousal.",
    category: "Mental Health",
    author: "Sneha Reddy",
    createdAt: new Date("2026-06-25T18:45:00Z"),
    updatedAt: new Date("2026-06-25T18:45:00Z")
  },
  {
    id: "5",
    title: "The Impact of Nutrition on PCOS Symptom Management",
    content: "Dietary adjustments are often the first line of support for PCOS management. Focusing on low-glycemic anti-inflammatory whole foods completely changed my relationship with my body's metabolic rhythm. Here is what worked for me.",
    category: "Nutrition",
    author: "Meera Das",
    createdAt: new Date("2026-06-25T22:30:00Z"),
    updatedAt: new Date("2026-06-25T22:30:00Z")
  }
];

export const MOCK_CATEGORIES = [
  "All",
  "Hormones",
  "Maternal Health",
  "Period Tracker",
  "Mental Health",
  "Nutrition"
];