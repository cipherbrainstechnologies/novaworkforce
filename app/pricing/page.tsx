import { Check } from 'lucide-react'
import { Container } from '@/components/Container'
import { Section } from '@/components/Section'
import { Card } from '@/components/Card'
import { CTAButton } from '@/components/CTAButton'

const includes = [
  'Employment contracts',
  'Payroll processing',
  'Compliance support',
  'Onboarding checklist',
  'Employee support',
  'Monthly reporting',
]

const faqs = [
  { q: "What's included?", a: 'Contracts, payroll, compliance, onboarding, employee support, and monthly reporting. Salary and statutory costs are billed at actuals.' },
  { q: 'Onboarding speed?', a: 'Most employees are onboarded within 1-2 weeks from contract signing.' },
  { q: 'Multi-state support?', a: 'Yes. We support employees across Indian states with appropriate statutory registrations.' },
  { q: 'Payment process?', a: 'We invoice monthly. You pay by the due date. We disburse salaries and statutory payments.' },
  { q: 'Exit support?', a: 'Full offboarding support including F&F settlement and statutory closures.' },
]

export default function PricingPage() {
  return (
    <>
      <Section className="pt-16 md:pt-24">
        <Container>
          <h1 className="text-4xl md:text-5xl font-bold text-text text-center mb-4">
            Simple, transparent pricing.
          </h1>
          <p className="text-muted text-center max-w-2xl mx-auto">
            One plan. No surprises. Scale as you grow.
          </p>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="max-w-lg mx-auto">
            <Card>
              <h2 className="text-2xl font-semibold text-text mb-2">Starter</h2>
              <p className="text-3xl font-bold text-primary mb-6">₹5,000 <span className="text-lg font-normal text-muted">/ employee / month</span></p>
              <ul className="space-y-3 mb-6">
                {includes.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-muted">
                    <Check className="text-success flex-shrink-0" size={20} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-sm text-muted">
                Salary and statutory costs billed at actuals.
              </p>
              <div className="mt-8">
                <CTAButton href="/contact" className="w-full justify-center">
                  Book a Call
                </CTAButton>
              </div>
            </Card>
          </div>
        </Container>
      </Section>

      <Section className="bg-surface/30">
        <Container>
          <h2 className="text-2xl font-semibold text-text text-center mb-8">
            FAQ
          </h2>
          <div className="max-w-2xl mx-auto space-y-6">
            {faqs.map((faq) => (
              <Card key={faq.q} hover={false}>
                <h3 className="font-semibold text-text mb-2">{faq.q}</h3>
                <p className="text-muted text-sm">{faq.a}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="text-center">
            <CTAButton href="/contact">Book a Call</CTAButton>
          </div>
        </Container>
      </Section>
    </>
  )
}
