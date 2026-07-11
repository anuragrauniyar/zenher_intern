import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient, Category } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const posts = [
  { title: "Understanding PCOS", content: "Polycystic ovary syndrome symptoms often include irregular cycles and fatigue.", author: "Dr. Smith", category: Category.Hormones },
  { title: "Postpartum Mental Health", content: "Dealing with emotional changes, depression, and mood shifts after childbirth is crucial.", author: "Nurse Kelly", category: Category.Maternal_Health },
  { title: "Menstrual Nutrition Guide", content: "Dietary habits and iron-rich foods that support your cycle and reduce cramps.", author: "Dietitian Anna", category: Category.Nutrition },
  { title: "Insomnia and Hormonal Shifts", content: "How estrogen and progesterone drops can severely impact your sleep quality.", author: "Sleep Clinic", category: Category.General },
  { title: "Managing Endometriosis", content: "Severe pelvic cramps and heavy bleeding require medical attention and care.", author: "Dr. Patel", category: Category.Period_Health },
  { title: "The Impact of Stress on Ovulation", content: "High cortisol levels can delay or completely halt your ovulation window.", author: "Wellness Coach", category: Category.Mental_Health },
  { title: "Navigating Menopause Symptoms", content: "Hot flashes, night sweats, and severe fatigue are common indicators.", author: "Women's Health Org", category: Category.Hormones },
  { title: "Pregnancy and Iron Deficiency", content: "Why exhaustion is common and what supplements you should consider.", author: "Dr. Lee", category: Category.Maternal_Health },
  { title: "Cycle Syncing Your Workouts", content: "Adjusting physical activity based on the four phases of your menstrual cycle.", author: "Fitness Pro", category: Category.General },
  { title: "Understanding Fibroids", content: "Non-cancerous growths that can cause prolonged cycles and significant discomfort.", author: "Clinic Team", category: Category.Period_Health },
  { title: "Caffeine and Period Cramps", content: "Why drinking coffee might exacerbate your dysmenorrhea and pelvic tension.", author: "Dietitian Anna", category: Category.Nutrition },
  { title: "Post-Pregnancy Recovery Timeline", content: "What to expect physically in the first six weeks following delivery.", author: "Nurse Kelly", category: Category.Maternal_Health },
  { title: "Thyroid Issues and Irregularity", content: "Hypothyroidism is often a hidden cause of unpredictable bleeding.", author: "Dr. Smith", category: Category.Hormones },
  { title: "Meditation for Premenstrual Syndrome", content: "Breathing techniques to stabilize mood swings and irritability before bleeding starts.", author: "Therapist Jane", category: Category.Mental_Health },
  { title: "Hydration Benefits", content: "Drinking enough water is essential for reducing bloating and retaining focus.", author: "Wellness Coach", category: Category.Nutrition }
];

async function main() {
  console.log('Injecting baseline data...');
  for (const post of posts) {
    await prisma.post.create({ data: post });
  }
  console.log('Database seeded successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });