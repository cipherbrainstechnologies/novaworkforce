import { Container } from '@/components/Container'
import { Section } from '@/components/Section'

export default function TermsPage() {
  return (
    <>
      <Section className="pt-16 md:pt-24">
        <Container>
          <h1 className="text-4xl font-bold text-text mb-8">Terms of Service</h1>
          <div className="max-w-3xl text-muted space-y-6">
            <p>Last updated: {new Date().toLocaleDateString()}</p>
            <p>
              By using the Nova Workforce website and services, you agree to these terms. Please read them carefully.
            </p>
            <h2 className="text-xl font-semibold text-text">Services</h2>
            <p>Nova Workforce provides Employer of Record (EOR) services for hiring and managing employees in India. Specific terms for services are outlined in separate agreements.</p>
            <h2 className="text-xl font-semibold text-text">Contact</h2>
            <p>For questions about these terms, contact us through our website.</p>
          </div>
        </Container>
      </Section>
    </>
  )
}
