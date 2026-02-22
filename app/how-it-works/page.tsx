import { Container } from '@/components/Container'
import { Section } from '@/components/Section'
import { CTAButton } from '@/components/CTAButton'

const steps = [
  { title: 'Setup', desc: 'Share your hiring needs. We configure your account and compliance setup.' },
  { title: 'Onboard', desc: 'Add employees. We handle contracts, statutory registrations, and payroll setup.' },
  { title: 'Run monthly', desc: 'Submit timesheets or salary data. We process payroll and compliance.' },
  { title: 'Changes & exits', desc: 'Raises, role changes, or offboarding — we handle it all.' },
]

const comparison = [
  { area: 'Hiring & talent', you: 'Choose candidates, set compensation', nova: 'Employment contracts, onboarding' },
  { area: 'Payroll', you: 'Submit salary data / timesheets', nova: 'Process payroll, statutory deductions' },
  { area: 'Compliance', you: '—', nova: 'PF, ESI, PT, labor law compliance' },
  { area: 'Support', you: '—', nova: 'Employee queries, HR support' },
]

export default function HowItWorksPage() {
  return (
    <>
      <Section className="pt-16 md:pt-24">
        <Container>
          <h1 className="text-4xl md:text-5xl font-bold text-text text-center mb-4">
            How Nova Workforce works
          </h1>
          <p className="text-muted text-center max-w-2xl mx-auto">
            A simple, transparent process to hire and manage employees in India.
          </p>
        </Container>
      </Section>

      <Section className="bg-surface/30">
        <Container>
          <div className="space-y-12">
            {steps.map((step, i) => (
              <div key={step.title} className="flex gap-6">
                <span className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/20 text-primary font-semibold flex items-center justify-center">
                  {i + 1}
                </span>
                <div>
                  <h2 className="text-xl font-semibold text-text mb-2">{step.title}</h2>
                  <p className="text-muted">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <h2 className="text-2xl font-semibold text-text mb-6 text-center">
            You manage vs Nova manages
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full max-w-3xl mx-auto border border-white/[0.08] rounded-card overflow-hidden">
              <thead>
                <tr className="bg-surface">
                  <th className="text-left p-4 font-semibold text-text">Area</th>
                  <th className="text-left p-4 font-semibold text-text">You manage</th>
                  <th className="text-left p-4 font-semibold text-text">Nova manages</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row) => (
                  <tr key={row.area} className="border-t border-white/[0.08]">
                    <td className="p-4 text-text font-medium">{row.area}</td>
                    <td className="p-4 text-muted">{row.you}</td>
                    <td className="p-4 text-muted">{row.nova}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </Section>

      <Section className="bg-surface/30">
        <Container>
          <div className="text-center">
            <CTAButton href="/contact">Book a Call</CTAButton>
          </div>
        </Container>
      </Section>
    </>
  )
}
