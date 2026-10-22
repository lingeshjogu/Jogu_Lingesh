'use client'
import { useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'

const LABELS = ['developer 0.98', 'python 0.97', 'flask 0.95', 'sql 0.94', 'yolo 0.93', 'hire 0.99']

function Rig() {
  const group = useRef()
  const box = useRef()
  const label = useRef()
  const sat = useRef([])
  const scroll = useRef(0)
  const last = useRef(-1)

  useEffect(() => {
    const f = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight
      scroll.current = h > 0 ? window.scrollY / h : 0
    }
    f()
    window.addEventListener('scroll', f, { passive: true })
    return () => window.removeEventListener('scroll', f)
  }, [])

  const { points, edges, orbit } = useMemo(() => {
    const knot = new THREE.TorusKnotGeometry(1.25, 0.38, 420, 22, 2, 3)
    const pos = knot.attributes.position.array
    const cols = new Float32Array(pos.length)
    const a = new THREE.Color('#2ee6c5'), b = new THREE.Color('#ffb703'), c = new THREE.Color()
    for (let i = 0; i < pos.length; i += 3) {
      c.copy(a).lerp(b, (Math.sin(pos[i] * 1.4 + pos[i + 1]) + 1) / 2)
      cols.set([c.r, c.g, c.b], i)
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    g.setAttribute('color', new THREE.BufferAttribute(cols, 3))
    const e = new THREE.EdgesGeometry(new THREE.BoxGeometry(3.9, 3.9, 3.9))
    const o = Array.from({ length: 7 }, (_, i) => ({ r: 3.2 + (i % 3) * 0.55, s: 0.25 + i * 0.07, p: i * 0.9, y: (i - 3) * 0.45 }))
    return { points: g, edges: e, orbit: o }
  }, [])

  const dust = useMemo(() => {
    const n = 900, arr = new Float32Array(n * 3)
    for (let i = 0; i < n; i++) {
      const r = 6 + Math.random() * 10, t = Math.random() * 6.283, p = Math.acos(2 * Math.random() - 1)
      arr.set([r * Math.sin(p) * Math.cos(t), r * Math.cos(p), r * Math.sin(p) * Math.sin(t)], i * 3)
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(arr, 3))
    return g
  }, [])

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime, s = scroll.current, m = state.pointer
    const g = group.current
    const narrow = state.size.width < 800
    g.rotation.y += dt * 0.25
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, m.y * 0.35 + s * 1.2, 0.05)
    const tx = narrow ? 0 : Math.sin(s * Math.PI * 2) * 2.4 + 1.6 - s * 0.4
    g.position.x = THREE.MathUtils.lerp(g.position.x, tx, 0.04)
    g.position.y = THREE.MathUtils.lerp(g.position.y, (narrow ? 1.4 : 0) - s * 0.8 + Math.sin(t) * 0.08, 0.05)
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, (narrow ? 13 : 9.5) - s * 2.5, 0.04)
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, m.x * 0.6, 0.04)
    state.camera.lookAt(0, 0, 0)
    // the box starts large, then locks onto the object
    box.current.scale.setScalar(1 + Math.max(0, 0.6 - t * 0.3) + Math.sin(t * 2) * 0.01)
    sat.current.forEach((el, i) => {
      if (!el) return
      const o = orbit[i], a = t * o.s + o.p
      el.position.set(Math.cos(a) * o.r, o.y + Math.sin(a * 1.7) * 0.3, Math.sin(a) * o.r)
      el.rotation.set(a, a * 0.7, 0)
    })
    const idx = Math.min(LABELS.length - 1, Math.floor(s * LABELS.length))
    if (idx !== last.current && label.current) { last.current = idx; label.current.textContent = LABELS[idx] }
  })

  return (
    <>
      <points geometry={dust}><pointsMaterial size={0.025} color="#c9d4ff" transparent opacity={0.55} sizeAttenuation /></points>
      <group ref={group}>
        <points geometry={points}><pointsMaterial size={0.045} vertexColors sizeAttenuation transparent opacity={0.95} /></points>
        <lineSegments ref={box} geometry={edges}><lineBasicMaterial color="#ffb703" transparent opacity={0.9} /></lineSegments>
        <Html position={[-1.95, 2.1, 1.95]} style={{ pointerEvents: 'none' }}>
          <div className="detect-tag"><span ref={label}>{LABELS[0]}</span></div>
        </Html>
        {orbit.map((_, i) => (
          <mesh key={i} ref={(el) => (sat.current[i] = el)}>
            <octahedronGeometry args={[0.12, 0]} />
            <meshBasicMaterial color={i % 2 ? '#2ee6c5' : '#ffb703'} wireframe />
          </mesh>
        ))}
      </group>
    </>
  )
}

export default function Scene() {
  return (
    <div className="scene" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 9.5], fov: 45 }} dpr={[1, 1.75]} gl={{ antialias: true, alpha: true }}>
        <Rig />
      </Canvas>
    </div>
  )
}
