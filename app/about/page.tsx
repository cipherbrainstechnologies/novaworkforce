import { Container } from '@/components/Container'
import { Section } from '@/components/Section'
import { CTAButton } from '@/components/CTAButton'

const values = [
  { title: 'Speed with clarity', desc: 'Move fast without sacrificing transparency. No black boxes.' },
  { title: 'Compliance without complexity', desc: "We handle the hard parts so you don't have to." },
  { title: 'Founder-friendly execution', desc: 'Built for startups who need to move, not enterprise bureaucracy.' },
]

export default function AboutPage() {
  return (
    <>
      <Section className="pt-16 md:pt-24">
        <Container>
          <h1 className="text-4xl md:text-5xl font-bold text-text text-center mb-4">
            Built from operations, not just software.
          </h1>
          <p className="text-muted text-center max-w-2xl mx-auto text-lg">
            Nova Workforce was built by people who have run India operations for global startups. We know the pain points because we've lived them.
          </p>
        </Container>
      </Section>

      <Section className="bg-surface/30">
        <Container>
          <h2 className="text-2xl font-semibold text-text text-center mb-12">
            Our values
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {values.map((v) => (
              <div key={v.title} className="text-center">
                <h3 className="font-semibold text-text text-lg mb-2">{v.title}</h3>
                <p className="text-muted text-sm">{v.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="text-center">
            <CTAButton href="/contact">Get in touch</CTAButton>
          </div>
        </Container>
      </Section>
    </>
  )
}
