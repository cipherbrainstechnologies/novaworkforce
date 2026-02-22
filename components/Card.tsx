export function Card({ children, className = '', hover = true }: { children: React.ReactNode; className?: string; hover?: boolean }) {
  return (
    <div
      className={`
        rounded-card bg-surface border border-white/[0.08] p-6
        ${hover ? 'transition-all duration-200 hover:-translate-y-1 hover:shadow-hover-lift' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  )
}
