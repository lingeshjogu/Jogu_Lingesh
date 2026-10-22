'use client'
import { useEffect, useRef } from 'react'

export default function Reveal({ children, className = '', id }) {
  const r = useRef(null)
  useEffect(() => {
    const el = r.current
    if (!el) return
    if (!('IntersectionObserver' in window)) { el.classList.add('in'); return }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add('in'); io.disconnect() } }, { threshold: 0.1 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return <section id={id} ref={r} className={'reveal ' + className}>{children}</section>
}
