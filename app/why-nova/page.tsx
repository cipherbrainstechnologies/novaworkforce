import { Container } from '@/components/Container'
import { Section } from '@/components/Section'
import { CTAButton } from '@/components/CTAButton'

const comparison = [
  { feature: 'Pricing', global: 'Enterprise pricing', local: 'Variable, opaque', nova: '₹5,000/emp, transparent' },
  { feature: 'Onboarding', global: 'Weeks to months', local: 'Varies', nova: '1-2 weeks' },
  { feature: 'Compliance', global: 'Generic', local: 'Local knowledge', nova: 'India-native expertise' },
  { feature: 'Support', global: 'Ticket-based', local: 'Often reactive', nova: 'Founder-friendly, responsive' },
]

export default function WhyNovaPage() {
  return (
    <>
      <Section className="pt-16 md:pt-24">
        <Container>
          <h1 className="text-4xl md:text-5xl font-bold text-text text-center mb-4">
            Built for India hiring realities.
          </h1>
          <p className="text-muted text-center max-w-2xl mx-auto">
            Startups shouldn&apos;t pay enterprise prices to hire in India.
          </p>
        </Container>
      </Section>

      <Section>
        <Container>
          <h2 className="text-2xl font-semibold text-text mb-6 text-center">
            Global EOR vs Local Payroll vs Nova Workforce
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border border-white/[0.08] rounded-card overflow-hidden">
              <thead>
                <tr className="bg-surface">
                  <th className="text-left p-4 font-semibold text-text">Feature</th>
                  <th className="text-left p-4 font-semibold text-text">Global EOR</th>
                  <th className="text-left p-4 font-semibold text-text">Local Payroll</th>
                  <th className="text-left p-4 font-semibold text-primary">Nova Workforce</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row) => (
                  <tr key={row.feature} className="border-t border-white/[0.08]">
                    <td className="p-4 text-text font-medium">{row.feature}</td>
                    <td className="p-4 text-muted">{row.global}</td>
                    <td className="p-4 text-muted">{row.local}</td>
                    <td className="p-4 text-primary font-medium">{row.nova}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </Section>

      <Section className="bg-surface/30">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-lg text-text mb-6">
              Startups shouldn&apos;t pay enterprise prices to hire in India.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <CTAButton href="/pricing">See Pricing</CTAButton>
              <CTAButton href="/contact" variant="outline">Book a Call</CTAButton>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
