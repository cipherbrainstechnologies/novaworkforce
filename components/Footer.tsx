import Link from 'next/link'
import Image from 'next/image'

const productLinks = [
  { href: '/how-it-works', label: 'How It Works' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/why-nova', label: 'Why Nova' },
]

const companyLinks = [
  { href: '/about', label: 'About' },
  { href: '/case-study/script-assist', label: 'Case Study' },
  { href: '/resources', label: 'Resources' },
]

const legalLinks = [
  { href: '/privacy', label: 'Privacy' },
  { href: '/terms', label: 'Terms' },
]

export function Footer() {
  return (
    <footer className="border-t border-white/[0.08] bg-surface">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-block">
              <Image
                src="/brand/logo.svg"
                alt="Nova Workforce"
                width={140}
                height={28}
                className="h-7 w-auto"
              />
            </Link>
            <p className="mt-4 text-sm text-muted">
              India-native EOR for global startups.
            </p>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex text-muted hover:text-text transition-colors text-sm"
            >
              LinkedIn →
            </a>
          </div>

          <div>
            <h4 className="font-semibold text-text mb-4">Product</h4>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-muted hover:text-text transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-text mb-4">Company</h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-muted hover:text-text transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-text mb-4">Legal</h4>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-muted hover:text-text transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/[0.08] text-center text-sm text-muted">
          © {new Date().getFullYear()} Nova Workforce. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
