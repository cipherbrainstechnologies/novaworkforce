import { Container } from '@/components/Container'
import { Section } from '@/components/Section'
import { CTAButton } from '@/components/CTAButton'

export default function CaseStudyPage() {
  return (
    <>
      <Section className="pt-16 md:pt-24">
        <Container>
          <h1 className="text-4xl md:text-5xl font-bold text-text text-center mb-4">
            Script Assist scaled to 33 employees in India.
          </h1>
          <p className="text-muted text-center max-w-2xl mx-auto">
            A case study in startup-speed India hiring.
          </p>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="max-w-3xl mx-auto space-y-12">
            <div>
              <h2 className="text-2xl font-semibold text-text mb-4">Challenge</h2>
              <p className="text-muted">
                Script Assist needed to scale their India team quickly while maintaining compliance and keeping costs predictable. Global EORs were too expensive, and local payroll vendors lacked the structure for rapid scaling.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-text mb-4">Solution</h2>
              <p className="text-muted">
                Nova Workforce provided end-to-end employment, payroll, and compliance support at a transparent per-employee price. Script Assist could focus on hiring talent while Nova handled contracts, statutory registrations, and monthly payroll.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-text mb-4">What Nova handled</h2>
              <ul className="list-disc list-inside text-muted space-y-2">
                <li>Employment contracts for all 33 employees</li>
                <li>Payroll processing and statutory compliance (PF, ESI, PT)</li>
                <li>Onboarding and offboarding</li>
                <li>Employee support and HR queries</li>
                <li>Monthly reporting</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-text mb-4">Results</h2>
              <p className="text-muted">
                33 employees managed at ₹5,000 per employee per month. Startup-speed onboarding. Full compliance. No surprises. Script Assist continues to scale with Nova.
              </p>
            </div>
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
