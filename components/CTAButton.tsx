import Link from 'next/link'

interface CTAButtonProps {
  href?: string
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'outline'
  className?: string
  onClick?: () => void
}

export function CTAButton({ href, children, variant = 'primary', className = '', onClick }: CTAButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]'
  const variants = {
    primary: 'bg-primary text-white hover:bg-indigo-600',
    secondary: 'bg-accent-pink text-white hover:bg-pink-600',
    outline: 'border border-white/20 text-text hover:bg-white/5 hover:border-white/30',
  }

  const combinedClassName = `${baseStyles} ${variants[variant]} ${className}`

  if (href) {
    return (
      <Link href={href} className={combinedClassName}>
        {children}
      </Link>
    )
  }

  return (
    <button type="button" onClick={onClick} className={combinedClassName}>
      {children}
    </button>
  )
}
