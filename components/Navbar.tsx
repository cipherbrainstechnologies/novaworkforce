'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { CTAButton } from './CTAButton'

const navLinks = [
  { href: '/how-it-works', label: 'How It Works' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/why-nova', label: 'Why Nova' },
  { href: '/case-study/script-assist', label: 'Case Study' },
  { href: '/resources', label: 'Resources' },
]

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.08] bg-background/80 backdrop-blur-md">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image
              src="/brand/logo.svg"
              alt="Nova Workforce"
              width={140}
              height={28}
              className="h-6 md:h-7 w-auto"
            />
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-muted hover:text-text transition-colors text-sm font-medium"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:block">
            <CTAButton href="/contact">Book a Call</CTAButton>
          </div>

          <button
            type="button"
            className="md:hidden p-2 text-text"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden py-4 border-t border-white/[0.08]">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-muted hover:text-text transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <CTAButton href="/contact" className="w-full justify-center">
                Book a Call
              </CTAButton>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
