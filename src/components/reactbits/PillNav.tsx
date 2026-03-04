export type PillNavItem = {
  label: string
  href: string
  ariaLabel?: string
}

interface PillNavProps {
  items: PillNavItem[]
  activeHref?: string
  className?: string
}

const PillNav = ({ items, activeHref, className = '' }: PillNavProps) => {
  return (
    <nav aria-label="Quick navigation" className={className}>
      <ul className="inline-flex items-center rounded-full border border-border/70 bg-muted/30 p-1">
        {items.map((item) => {
          const active = activeHref === item.href

          return (
            <li key={item.href}>
              <a
                href={item.href}
                aria-label={item.ariaLabel ?? item.label}
                aria-current={active ? 'page' : undefined}
                className={`inline-flex min-w-[7.5rem] items-center justify-center rounded-full px-4 py-2 text-xs sm:text-sm font-sans font-semibold uppercase tracking-[0.04em] transition-all duration-300 ${
                  active ? 'bg-foreground text-background' : 'text-foreground hover:bg-foreground/10'
                }`}
              >
                {item.label}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default PillNav
