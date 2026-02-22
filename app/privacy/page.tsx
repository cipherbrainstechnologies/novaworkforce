import { Container } from '@/components/Container'
import { Section } from '@/components/Section'

export default function PrivacyPage() {
  return (
    <>
      <Section className="pt-16 md:pt-24">
        <Container>
          <h1 className="text-4xl font-bold text-text mb-8">Privacy Policy</h1>
          <div className="max-w-3xl text-muted space-y-6">
            <p>Last updated: {new Date().toLocaleDateString()}</p>
            <p>
              Nova Workforce (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) respects your privacy. This policy describes how we collect, use, and protect your information when you use our website or services.
            </p>
            <h2 className="text-xl font-semibold text-text">Information we collect</h2>
            <p>We may collect information you provide directly, such as name, email, company, and message when you contact us or book a call.</p>
            <h2 className="text-xl font-semibold text-text">How we use it</h2>
            <p>We use your information to respond to inquiries, provide services, and improve our offerings.</p>
            <h2 className="text-xl font-semibold text-text">Contact</h2>
            <p>For privacy-related questions, contact us through our website.</p>
          </div>
        </Container>
      </Section>
    </>
  )
}
