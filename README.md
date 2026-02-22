# Nova Workforce Website

This project builds the official marketing website for **Nova Workforce** — an India‑native Employer of Record (EOR) for global startups.

The website is designed to be:

- High trust
- Founder-friendly
- Conversion focused
- Modern startup aesthetic
- Deployable directly to Vercel

---

# 🧠 PROJECT CONTEXT

Company: Nova Workforce  
Industry: Employer of Record (EOR)  
Positioning:

> India-native EOR for global startups.

Target audience:

- Startup founders
- CTOs
- HR leaders
- Global companies hiring in India

Tone:

- Direct
- Operational
- Startup-friendly
- Not corporate HR

---

# ⚙️ TECH STACK (MANDATORY)

- Next.js (App Router)
- React + TypeScript
- Tailwind CSS
- lucide-react icons
- Optional: shadcn/ui
- Vercel deployment via GitHub

---

# 🎨 DESIGN SYSTEM

## Colors

Background: #0B1220  
Surface: #111827  
Primary: #4F46E5  
Accent Pink: #F05A6E  
Accent Purple: #6D28D9  
Success: #22C55E  
Text: #E5E7EB  
Muted: #9CA3AF  
Border: rgba(255,255,255,0.08)

---

## Typography

Font: Inter (next/font)

- H1: 48–56px bold
- H2: 32–36px semibold
- Body: 16–18px

---

## Layout

- Max width: 1120px
- Section spacing: 80px desktop / 48px mobile
- Card radius: 16px
- Sticky navbar with blur
- Subtle hover lift

---

# 🧭 SITE NAVIGATION

Menu:

- How It Works
- Pricing
- Why Nova
- Case Study
- Resources

Primary CTA:

**Book a Call**

Footer:

- Product links
- Company links
- Legal links
- LinkedIn

---

# 🗂️ ROUTES / PAGES

- /
- /how-it-works
- /pricing
- /why-nova
- /case-study/script-assist
- /resources
- /resources/[slug]
- /about
- /contact
- /privacy
- /terms

---

# 🏠 HOME PAGE

## Hero Section

Headline:

Hire in India without global EOR complexity.

Subtext:

Nova Workforce helps global startups hire and manage employees in India with startup-speed onboarding, compliant payroll, and lean transparent pricing.

Buttons:

- Book a Call
- See Pricing

Right trust card:

- Script Assist
- 33 Employees Managed
- ₹5,000 / employee / month
- Contracts • Payroll • Compliance

Icons:
Briefcase, Users, ShieldCheck

---

## Trust Strip

Text:

Trusted by growing global teams hiring in India.

Logo placeholder:

Script Assist

---

## Problem → Solution

Problems:

- Global EORs are expensive
- Local payroll vendors lack structure
- India compliance is complex

Solution title:

India-native execution. Founder-friendly speed.

---

## 3 Pillars

1. Startup-speed onboarding (Zap)
2. India-native compliance (ShieldCheck)
3. Lean transparent pricing (Receipt)

---

## How It Works (3 Steps)

1. You choose talent
2. We employ in India
3. You run the team

Icons:

UserSearch, FileSignature, Settings

---

## Case Study Teaser

Title:

Case Study: Script Assist

CTA:

Read Case Study

---

## Final CTA

Ready to hire in India with speed and confidence?

Button:

Book a Call

---

# ⚙️ HOW IT WORKS PAGE

Hero:

How Nova Workforce works

Sections:

- Setup
- Onboard
- Run monthly
- Changes & exits

Include table:

You manage vs Nova manages

CTA:

Book a Call

---

# 💰 PRICING PAGE

Hero:

Simple, transparent pricing.

Plan:

Starter — ₹5,000 / employee / month

Includes:

- Employment contracts
- Payroll processing
- Compliance support
- Onboarding checklist
- Employee support
- Monthly reporting

Footnote:

Salary and statutory costs billed at actuals.

FAQ:

- What’s included?
- Onboarding speed?
- Multi-state support?
- Payment process?
- Exit support?

CTA:

Book a Call

---

# ⚡ WHY NOVA PAGE

Hero:

Built for India hiring realities.

Comparison table:

Global EOR vs Local Payroll vs Nova Workforce

Message:

Startups shouldn’t pay enterprise prices to hire in India.

CTA:

See Pricing + Book a Call

---

# 📊 CASE STUDY PAGE

Title:

Script Assist scaled to 33 employees in India.

Sections:

- Challenge
- Solution
- What Nova handled
- Results

CTA:

Book a Call

---

# 📚 RESOURCES PAGE

Seed articles:

1. india-eor-vs-opening-entity
2. common-mistakes-hiring-in-india
3. eor-pricing-models-explained

---

# 👤 ABOUT PAGE

Headline:

Built from operations, not just software.

Values:

- Speed with clarity
- Compliance without complexity
- Founder-friendly execution

---

# 📩 CONTACT PAGE

Form fields:

- Name
- Work Email
- Company
- Role
- Message

Submit:

POST /api/contact

Show success toast.

---

# 🧩 REQUIRED COMPONENTS

Create reusable components:

- Navbar
- Footer
- Container
- Section
- Card
- CTAButton

---

# 🧱 PROJECT STRUCTURE

/app
/components
/lib
/content
/public/brand/logo.svg

---

# 🧾 LOGO

Use logo from:

/public/brand/logo.svg

Navbar logo height:

- 28px desktop
- 24px mobile

Footer:

- 28px

---

# 🚀 DEPLOYMENT

## Local

npm install
npm run dev

## Build

npm run build

## Deploy

1. Push to GitHub
2. Import project in Vercel
3. Deploy

---

# 📈 GOAL

The website must feel:

- Trustworthy
- Fast
- Startup-native
- Operationally strong

This is NOT a corporate HR website.
