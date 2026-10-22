'use client'
import { useRef } from 'react'

export default function Tilt({ children, className = '', max = 8 }) {
  const r = useRef(null)
  const move = (e) => {
    const el = r.current, b = el.getBoundingClientRect()
    const x = (e.clientX - b.left) / b.width, y = (e.clientY - b.top) / b.height
    el.style.transform = `perspective(900px) rotateY(${(x - 0.5) * max * 2}deg) rotateX(${(0.5 - y) * max * 2}deg)`
    el.style.setProperty('--mx', x * 100 + '%')
    el.style.setProperty('--my', y * 100 + '%')
  }
  return (
    <div ref={r} className={'tilt ' + className} onMouseMove={move} onMouseLeave={() => (r.current.style.transform = '')}>
      {children}
    </div>
  )
}
