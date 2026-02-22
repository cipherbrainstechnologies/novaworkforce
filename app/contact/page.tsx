'use client'

import { useState } from 'react'
import { Container } from '@/components/Container'
import { Section } from '@/components/Section'

export default function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    const form = e.currentTarget
    const formData = new FormData(form)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(formData)),
      })
      if (res.ok) {
        setStatus('success')
        form.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      <Section className="pt-16 md:pt-24">
        <Container>
          <h1 className="text-4xl md:text-5xl font-bold text-text text-center mb-4">
            Get in touch
          </h1>
          <p className="text-muted text-center max-w-2xl mx-auto">
            Ready to hire in India? We'd love to hear from you.
          </p>
        </Container>
      </Section>

      <Section>
        <Container>
          <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-text mb-2">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="w-full px-4 py-3 rounded-lg bg-surface border border-white/[0.08] text-text placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-text mb-2">Work Email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full px-4 py-3 rounded-lg bg-surface border border-white/[0.08] text-text placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="you@company.com"
              />
            </div>
            <div>
              <label htmlFor="company" className="block text-sm font-medium text-text mb-2">Company</label>
              <input
                id="company"
                name="company"
                type="text"
                className="w-full px-4 py-3 rounded-lg bg-surface border border-white/[0.08] text-text placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Your company"
              />
            </div>
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-text mb-2">Role</label>
              <input
                id="role"
                name="role"
                type="text"
                className="w-full px-4 py-3 rounded-lg bg-surface border border-white/[0.08] text-text placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Founder, CTO, etc."
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-text mb-2">Message</label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                className="w-full px-4 py-3 rounded-lg bg-surface border border-white/[0.08] text-text placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                placeholder="Tell us about your hiring needs..."
              />
            </div>

            {status === 'success' && (
              <div className="p-4 rounded-lg bg-success/20 text-success text-sm">
                Thanks! We'll be in touch soon.
              </div>
            )}
            {status === 'error' && (
              <div className="p-4 rounded-lg bg-accent-pink/20 text-accent-pink text-sm">
                Something went wrong. Please try again.
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full py-3 px-6 rounded-lg bg-primary text-white font-semibold hover:bg-indigo-600 disabled:opacity-50 transition-colors"
            >
              {status === 'loading' ? 'Sending...' : 'Submit'}
            </button>
          </form>
        </Container>
      </Section>
    </>
  )
}
