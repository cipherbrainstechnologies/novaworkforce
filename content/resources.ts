export interface Resource {
  slug: string
  title: string
  excerpt: string
  content: string
}

const resources: Resource[] = [
  {
    slug: 'india-eor-vs-opening-entity',
    title: 'India EOR vs Opening an Entity',
    excerpt: 'When to use an Employer of Record vs setting up your own Indian entity.',
    content: `When expanding to India, you have two main paths: use an Employer of Record (EOR) or open your own entity.

**EOR (Employer of Record)**
- Fast setup: start hiring in weeks
- No capital requirement for entity formation
- Compliance handled by the EOR
- Ideal for: startups, small teams, testing the market

**Opening an Entity**
- Requires incorporation (Private Limited, etc.)
- Higher upfront cost and time (months)
- You manage compliance directly
- Ideal for: large teams, long-term commitment, specific corporate structure needs

For most startups hiring 5-50 people in India, an EOR like Nova Workforce offers the best balance of speed, cost, and compliance.`,
  },
  {
    slug: 'common-mistakes-hiring-in-india',
    title: 'Common Mistakes Hiring in India',
    excerpt: 'Avoid these pitfalls when building your India team.',
    content: `Building a team in India comes with unique challenges. Here are the most common mistakes and how to avoid them.

**1. Underestimating compliance**
Indian labor law is complex. PF, ESI, PT, gratuity, and state-specific rules vary. Work with a partner who knows the landscape.

**2. Opaque pricing**
Hidden fees in EOR or payroll contracts can surprise you. Demand transparent, per-employee pricing.

**3. Slow onboarding**
If your EOR takes weeks to onboard each hire, you lose momentum. Look for startup-speed processes.

**4. Ignoring multi-state complexity**
Employees in different states may need different registrations. Ensure your provider handles this.

**5. Treating India like a single market**
Cultural and operational nuances matter. Partner with India-native teams.`,
  },
  {
    slug: 'eor-pricing-models-explained',
    title: 'EOR Pricing Models Explained',
    excerpt: 'Understanding how EOR pricing works and what to look for.',
    content: `EOR pricing can be confusing. Here's a breakdown of common models.

**Per-employee flat fee**
A fixed monthly fee per employee (e.g., ₹5,000/employee). Simple and predictable. Salary and statutory costs billed separately at actuals.

**Percentage of payroll**
Fee as a % of salary. Can scale with compensation but less predictable for budgeting.

**Tiered pricing**
Different rates for different team sizes. Often favors larger teams.

**What to look for**
- Transparency: no hidden fees
- Clarity on what's included (contracts, payroll, compliance, support)
- How statutory costs (PF, ESI, etc.) are handled
- Exit or offboarding fees

Nova Workforce uses a simple per-employee flat fee. You know exactly what you pay each month.`,
  },
]

export function getResourceBySlug(slug: string): Resource | undefined {
  return resources.find((r) => r.slug === slug)
}

export function getAllResources(): Resource[] {
  return resources
}
