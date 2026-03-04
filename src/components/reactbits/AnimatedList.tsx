import { motion, useInView } from 'motion/react'
import type { ReactNode } from 'react'
import { useRef } from 'react'

interface AnimatedItemProps {
  children: ReactNode
  index: number
  delay?: number
}

const AnimatedItem = ({ children, index, delay = 0 }: AnimatedItemProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount: 0.2, once: true })

  return (
    <motion.div
      ref={ref}
      data-index={index}
      initial={{ y: 12, opacity: 0 }}
      animate={inView ? { y: 0, opacity: 1 } : { y: 12, opacity: 0 }}
      transition={{ duration: 0.3, delay }}
    >
      {children}
    </motion.div>
  )
}

interface AnimatedListProps<T> {
  items: T[]
  className?: string
  itemClassName?: string
  renderItem: (item: T, index: number) => ReactNode
}

const AnimatedList = <T,>({ items, className = '', itemClassName = '', renderItem }: AnimatedListProps<T>) => {
  return (
    <div className={className}>
      {items.map((item, index) => (
        <AnimatedItem key={index} index={index} delay={index * 0.03}>
          <div className={itemClassName}>{renderItem(item, index)}</div>
        </AnimatedItem>
      ))}
    </div>
  )
}

export default AnimatedList
