import Link from 'next/link'
import { Briefcase, Users, ShieldCheck, Zap, FileSignature, Settings, UserSearch } from 'lucide-react'
import { Container } from '@/components/Container'
import { Section } from '@/components/Section'
import { Card } from '@/components/Card'
import { CTAButton } from '@/components/CTAButton'

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <Section className="pt-16 md:pt-24">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-[56px] font-bold text-text leading-tight">
                Hire in India without global EOR complexity.
              </h1>
              <p className="mt-6 text-lg text-muted max-w-xl">
                Nova Workforce helps global startups hire and manage employees in India with startup-speed onboarding, compliant payroll, and lean transparent pricing.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <CTAButton href="/contact">Book a Call</CTAButton>
                <CTAButton href="/pricing" variant="outline">See Pricing</CTAButton>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <Card className="max-w-sm">
                <div className="space-y-4">
                  <p className="font-semibold text-text">Script Assist</p>
                  <div className="flex items-center gap-2 text-muted text-sm">
                    <Users size={18} />
                    <span>33 Employees Managed</span>
                  </div>
                  <p className="text-primary font-semibold">₹5,000 / employee / month</p>
                  <div className="flex flex-wrap gap-2 text-sm text-muted">
                    <span className="flex items-center gap-1"><Briefcase size={14} /> Contracts</span>
                    <span className="flex items-center gap-1"><FileSignature size={14} /> Payroll</span>
                    <span className="flex items-center gap-1"><ShieldCheck size={14} /> Compliance</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      {/* Trust Strip */}
      <Section className="bg-surface/50">
        <Container>
          <p className="text-center text-muted text-sm">
            Trusted by growing global teams hiring in India.
          </p>
          <div className="mt-6 flex justify-center">
            <div className="px-6 py-3 rounded-lg bg-surface border border-white/[0.08]">
              <span className="font-medium text-text">Script Assist</span>
            </div>
          </div>
        </Container>
      </Section>

      {/* Problem → Solution */}
      <Section>
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-semibold text-text mb-6">
              Problems
            </h2>
            <ul className="space-y-3 text-muted mb-12">
              <li>• Global EORs are expensive</li>
              <li>• Local payroll vendors lack structure</li>
              <li>• India compliance is complex</li>
            </ul>
            <h2 className="text-3xl md:text-4xl font-semibold text-text">
              India-native execution. Founder-friendly speed.
            </h2>
          </div>
        </Container>
      </Section>

      {/* 3 Pillars */}
      <Section className="bg-surface/30">
        <Container>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <Zap className="text-primary mb-4" size={32} />
              <h3 className="font-semibold text-text text-lg mb-2">Startup-speed onboarding</h3>
              <p className="text-muted text-sm">Get your team in India up and running in days, not months.</p>
            </Card>
            <Card>
              <ShieldCheck className="text-primary mb-4" size={32} />
              <h3 className="font-semibold text-text text-lg mb-2">India-native compliance</h3>
              <p className="text-muted text-sm">Full statutory compliance handled by experts who know Indian labor law.</p>
            </Card>
            <Card>
              <FileSignature className="text-primary mb-4" size={32} />
              <h3 className="font-semibold text-text text-lg mb-2">Lean transparent pricing</h3>
              <p className="text-muted text-sm">No hidden fees. Clear per-employee pricing you can plan around.</p>
            </Card>
          </div>
        </Container>
      </Section>

      {/* How It Works (3 Steps) */}
      <Section>
        <Container>
          <h2 className="text-3xl md:text-4xl font-semibold text-text text-center mb-12">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex p-4 rounded-card bg-surface border border-white/[0.08] mb-4">
                <UserSearch className="text-primary" size={32} />
              </div>
              <p className="font-semibold text-text text-lg">1. You choose talent</p>
              <p className="text-muted text-sm mt-2">Hire who you need. We handle the rest.</p>
            </div>
            <div className="text-center">
              <div className="inline-flex p-4 rounded-card bg-surface border border-white/[0.08] mb-4">
                <FileSignature className="text-primary" size={32} />
              </div>
              <p className="font-semibold text-text text-lg">2. We employ in India</p>
              <p className="text-muted text-sm mt-2">Contracts, payroll, compliance — all on us.</p>
            </div>
            <div className="text-center">
              <div className="inline-flex p-4 rounded-card bg-surface border border-white/[0.08] mb-4">
                <Settings className="text-primary" size={32} />
              </div>
              <p className="font-semibold text-text text-lg">3. You run the team</p>
              <p className="text-muted text-sm mt-2">Focus on building. We handle operations.</p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Case Study Teaser */}
      <Section className="bg-surface/30">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-semibold text-text mb-4">
              Case Study: Script Assist
            </h2>
            <p className="text-muted mb-6">
              See how Script Assist scaled to 33 employees in India with Nova Workforce.
            </p>
            <CTAButton href="/case-study/script-assist" variant="outline">
              Read Case Study
            </CTAButton>
          </div>
        </Container>
      </Section>

      {/* Final CTA */}
      <Section>
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-semibold text-text mb-4">
              Ready to hire in India with speed and confidence?
            </h2>
            <CTAButton href="/contact" className="mt-4">
              Book a Call
            </CTAButton>
          </div>
        </Container>
      </Section>
    </>
  )
}
