'use client'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import Tilt from '../components/Tilt'
import Reveal from '../components/Reveal'
import { profile, skills, projects, certifications, education, extras } from '../data/portfolio'

const Scene = dynamic(() => import('../components/Scene'), { ssr: false })

function Typed({ words }) {
  const [i, setI] = useState(0)
  const [n, setN] = useState(0)
  const [del, setDel] = useState(false)
  useEffect(() => {
    const w = words[i % words.length]
    const t = setTimeout(() => {
      if (!del && n < w.length) setN(n + 1)
      else if (!del) setDel(true)
      else if (n > 0) setN(n - 1)
      else { setDel(false); setI(i + 1) }
    }, !del && n === w.length ? 1400 : del ? 28 : 55)
    return () => clearTimeout(t)
  }, [n, del, i, words])
  return <span className="typed">{words[i % words.length].slice(0, n)}<i /></span>
}

export default function Home() {
  const [bar, setBar] = useState(0)
  useEffect(() => {
    const f = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight
      setBar(h > 0 ? window.scrollY / h : 0)
    }
    const m = (e) => {
      document.documentElement.style.setProperty('--cx', e.clientX + 'px')
      document.documentElement.style.setProperty('--cy', e.clientY + 'px')
    }
    window.addEventListener('scroll', f, { passive: true })
    window.addEventListener('pointermove', m)
    return () => { window.removeEventListener('scroll', f); window.removeEventListener('pointermove', m) }
  }, [])

  const first = profile.name.split(' ')[0]
  const last = profile.name.split(' ').slice(1).join(' ')

  return (
    <>
      <Scene />
      <div className="glow" aria-hidden="true" />
      <div className="progress" style={{ transform: `scaleX(${bar})` }} aria-hidden="true" />

      <nav className="nav">
        <a href="#top" className="logo">{first[0]}{last[0]}</a>
        <div>
          <a href="#work">Projects</a>
          <a href="#skills">Skills</a>
          <a href="#path">Education</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <main id="top">
        <header className="hero">
          <div className="hero-text">
            <p className="hello">Hi, I am</p>
            <h1><span>{first}</span><span>{last}</span></h1>
            <p className="lead">A {profile.role.toLowerCase()} who <Typed words={profile.typedRoles} /></p>
            <p className="sum">{profile.summary}</p>
            <div className="cta">
              <a className="btn primary" href="#work">See my projects</a>
              <a className="btn" href={profile.resume} target="_blank" rel="noreferrer">Open resume</a>
            </div>
          </div>
          <Tilt className="portrait" max={10}>
            <img src={profile.photo} alt={profile.name} />
            <span className="corner tl" /><span className="corner tr" /><span className="corner bl" /><span className="corner br" />
            <span className="conf">{profile.role.toLowerCase()} 0.98</span>
          </Tilt>
        </header>

        <Reveal id="work">
          <h2>Projects</h2>
          <div className="grid2">
            {projects.map((p) => (
              <Tilt key={p.title} className="card project">
                <span className="chip solid">{p.tag}</span>
                <h3>{p.title}</h3>
                <ul>{p.points.map((x) => <li key={x}>{x}</li>)}</ul>
                <div className="chips">{p.stack.map((s) => <span className="chip" key={s}>{s}</span>)}</div>
                <div className="links">
                  {p.live && <a href={p.live} target="_blank" rel="noreferrer">Live demo</a>}
                  {p.code && <a href={p.code} target="_blank" rel="noreferrer">Source code</a>}
                </div>
              </Tilt>
            ))}
          </div>
        </Reveal>

        <Reveal id="skills">
          <h2>Skills</h2>
          <div className="grid4">
            {skills.map((g) => (
              <Tilt key={g.group} className="card">
                <h3>{g.group}</h3>
                <div className="chips">{g.items.map((s) => <span className="chip" key={s}>{s}</span>)}</div>
              </Tilt>
            ))}
          </div>
        </Reveal>

        <Reveal id="path">
          <h2>Education and certifications</h2>
          <div className="cols">
            <ol className="timeline">
              {education.map((e) => (
                <li key={e.school}>
                  <b>{e.degree}</b>
                  <span>{e.school}</span>
                  <em>{e.years} · {e.score}</em>
                </li>
              ))}
            </ol>
            <div className="certs">
              {certifications.map((c) => {
                const Wrap = c.link ? 'a' : 'div'
                return (
                  <Wrap key={c.title} className="cert" {...(c.link ? { href: c.link, target: '_blank', rel: 'noreferrer' } : {})}>
                    <b>{c.title}</b>
                    <span>{c.issuer}{c.year ? `, ${c.year}` : ''}</span>
                  </Wrap>
                )
              })}
              {extras.map((x) => (
                <div className="cert" key={x.title}><b>{x.title}</b><span>{x.text}{x.year ? `, ${x.year}` : ''}</span></div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal id="contact" className="contact">
          <h2>Let us build something.</h2>
          <p className="sum">Open to software developer roles and internships. The fastest way to reach me is email.</p>
          <a className="mail" href={`mailto:${profile.email}`}>{profile.email}</a>
          <div className="cta center">
            <a className="btn" href={`tel:${profile.phone.replace(/[^+\d]/g, '')}`}>{profile.phone}</a>
            <a className="btn" href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
            <a className="btn" href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
            <a className="btn" href={profile.leetcode} target="_blank" rel="noreferrer">LeetCode</a>
          </div>
          <p className="foot">{profile.location}</p>
        </Reveal>
      </main>
    </>
  )
}
