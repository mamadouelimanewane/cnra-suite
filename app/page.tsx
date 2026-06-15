"use client"

import Link from "next/link"
import { useState, useEffect } from "react"

const APPS = [
  {
    id: "electrowatch",
    port: 3005,
    emoji: "🗳️",
    name: "ElectroWatch",
    tagline: "Surveillance électorale",
    desc: "Suivez en temps réel les résultats électoraux, détectez les anomalies et garantissez la transparence du processus démocratique.",
    color: "#ef4444",
    glow: "rgba(239,68,68,0.15)",
    border: "rgba(239,68,68,0.25)",
    tag: "Démocratie",
    github: "https://github.com/mamadouelimanewane/cnra-electrowatch",
    local: "https://cnra-electrowatch.vercel.app/login",
    delay: "0.1s",
  },
  {
    id: "citoyen",
    port: 3006,
    emoji: "🏛️",
    name: "Citoyen",
    tagline: "Participation citoyenne",
    desc: "Signalez les infractions audiovisuelles, participez aux consultations publiques et suivez les décisions du CNRA.",
    color: "#3b82f6",
    glow: "rgba(59,130,246,0.15)",
    border: "rgba(59,130,246,0.25)",
    tag: "Civic Tech",
    github: "https://github.com/mamadouelimanewane/cnra-citoyen",
    local: "https://cnra-citoyen.vercel.app/accueil",
    delay: "0.2s",
  },
  {
    id: "mediabase",
    port: 3007,
    emoji: "📡",
    name: "MediaBase",
    tagline: "Registre des médias",
    desc: "Consultez le registre officiel de tous les médias audiovisuels agréés au Sénégal, leurs journalistes et leurs programmes.",
    color: "#C9A84C",
    glow: "rgba(201,168,76,0.15)",
    border: "rgba(201,168,76,0.25)",
    tag: "Officiel",
    github: "https://github.com/mamadouelimanewane/cnra-mediabase",
    local: "https://cnra-mediabase.vercel.app/dashboard",
    delay: "0.3s",
  },
  {
    id: "mediawatch",
    port: 3008,
    emoji: "📊",
    name: "MediaWatch",
    tagline: "Monitoring & temps de parole",
    desc: "Analysez l'équilibre du temps de parole politique sur les antennes, détectez les biais médiatiques et suivez les alertes.",
    color: "#f97316",
    glow: "rgba(249,115,22,0.15)",
    border: "rgba(249,115,22,0.25)",
    tag: "Pluralisme",
    github: "https://github.com/mamadouelimanewane/cnra-mediawatch",
    local: "https://cnra-mediawatch.vercel.app/dashboard",
    delay: "0.4s",
  },
  {
    id: "antideep",
    port: 3009,
    emoji: "🛡️",
    name: "AntiDeep",
    tagline: "Détection de deepfakes",
    desc: "Identifiez et signalez les contenus audiovisuels falsifiés, les deepfakes et les campagnes de désinformation qui menacent la société.",
    color: "#a855f7",
    glow: "rgba(168,85,247,0.15)",
    border: "rgba(168,85,247,0.25)",
    tag: "IA & Vérité",
    github: "https://github.com/mamadouelimanewane/cnra-antideep",
    local: "https://cnra-antideep.vercel.app/dashboard",
    delay: "0.5s",
  },
  {
    id: "edumedia",
    port: 3010,
    emoji: "🎓",
    name: "EduMedia",
    tagline: "Éducation aux médias",
    desc: "Formez-vous à la littératie médiatique, accédez aux ressources pédagogiques et obtenez votre certificat de compétences numériques.",
    color: "#10b981",
    glow: "rgba(16,185,129,0.15)",
    border: "rgba(16,185,129,0.25)",
    tag: "Formation",
    github: "https://github.com/mamadouelimanewane/cnra-edumedia",
    local: "https://cnra-edumedia.vercel.app/dashboard",
    delay: "0.6s",
  },
]

function Particles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 60 }).map((_, i) => (
        <div key={i} style={{
          position: "absolute",
          width: Math.random() > 0.8 ? "2px" : "1px",
          height: Math.random() > 0.8 ? "2px" : "1px",
          borderRadius: "50%",
          background: Math.random() > 0.7 ? "#C9A84C" : "rgba(255,255,255,0.4)",
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animation: `twinkle ${2 + Math.random() * 4}s ${Math.random() * 3}s infinite`,
          opacity: Math.random() * 0.8 + 0.2,
        }} />
      ))}
    </div>
  )
}

function GridLines() {
  return (
    <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.04 }}>
      <div style={{
        width: "100%", height: "100%",
        backgroundImage: `
          linear-gradient(rgba(201,168,76,0.6) 1px, transparent 1px),
          linear-gradient(90deg, rgba(201,168,76,0.6) 1px, transparent 1px)
        `,
        backgroundSize: "80px 80px",
      }} />
    </div>
  )
}

export default function Home() {
  const [hovered, setHovered] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  return (
    <>
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.5); }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes glow-pulse {
          0%, 100% { box-shadow: 0 0 20px rgba(201,168,76,0.1); }
          50%       { box-shadow: 0 0 40px rgba(201,168,76,0.25); }
        }
        @keyframes badge-glow {
          0%, 100% { opacity: 0.6; }
          50%       { opacity: 1; }
        }
        @keyframes scan-line {
          0%   { top: -2px; }
          100% { top: 100%; }
        }
        .card-hover { transition: all 0.35s cubic-bezier(0.4,0,0.2,1); }
        .card-hover:hover { transform: translateY(-6px); }
        .animate-up-1 { animation: fadeSlideUp 0.7s 0.1s both; }
        .animate-up-2 { animation: fadeSlideUp 0.7s 0.25s both; }
        .animate-up-3 { animation: fadeSlideUp 0.7s 0.4s both; }
        .animate-up-4 { animation: fadeSlideUp 0.7s 0.55s both; }
        .stat-card { animation: fadeSlideUp 0.7s 0.7s both; }
        .grid-card-0 { animation: fadeSlideUp 0.6s 0.8s both; }
        .grid-card-1 { animation: fadeSlideUp 0.6s 0.9s both; }
        .grid-card-2 { animation: fadeSlideUp 0.6s 1.0s both; }
        .grid-card-3 { animation: fadeSlideUp 0.6s 1.1s both; }
        .grid-card-4 { animation: fadeSlideUp 0.6s 1.2s both; }
        .grid-card-5 { animation: fadeSlideUp 0.6s 1.3s both; }
        .logo-glow { animation: glow-pulse 3s ease-in-out infinite; }
        .scan { animation: scan-line 3s linear infinite; }
      `}</style>

      <div style={{ minHeight: "100vh", background: "#060e1f", color: "#fff", position: "relative" }}>

        {/* ─── Arrière-plan ─── */}
        {mounted && <Particles />}
        <GridLines />
        <div style={{
          position: "fixed", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse 70% 50% at 50% -5%, rgba(26,58,107,0.7), transparent)",
        }} />
        <div style={{
          position: "fixed", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse 40% 40% at 80% 80%, rgba(201,168,76,0.04), transparent)",
        }} />

        {/* ─── Header ─── */}
        <header style={{
          position: "sticky", top: 0, zIndex: 50,
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          background: "rgba(6,14,31,0.85)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}>
          <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2rem", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div className="logo-glow" style={{
                width: 36, height: 36, borderRadius: 10,
                background: "linear-gradient(135deg, #1A3A6B, #0d2447)",
                border: "1px solid rgba(201,168,76,0.4)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 18,
              }}>🏛️</div>
              <div>
                <p style={{ fontSize: 13, fontWeight: 700, color: "#fff", letterSpacing: "0.05em" }}>CNRA</p>
                <p style={{ fontSize: 9, color: "#C9A84C", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase" }}>République du Sénégal</p>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#10b981", animation: "badge-glow 2s infinite" }} />
              <span style={{ fontSize: 11, color: "#10b981", fontWeight: 600, letterSpacing: "0.08em" }}>SYSTÈME EN LIGNE</span>
            </div>
          </div>
        </header>

        {/* ─── Hero ─── */}
        <section style={{ maxWidth: 1280, margin: "0 auto", padding: "5rem 2rem 4rem", textAlign: "center", position: "relative" }}>

          {/* Badge officiel */}
          <div className="animate-up-1" style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: "2rem" }}>
            <div style={{
              display: "flex", alignItems: "center", gap: 6,
              background: "rgba(201,168,76,0.08)",
              border: "1px solid rgba(201,168,76,0.3)",
              borderRadius: 100, padding: "6px 16px",
            }}>
              <span style={{ fontSize: 12 }}>🇸🇳</span>
              <span style={{ fontSize: 11, color: "#C9A84C", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                Conseil National de Régulation de l&apos;Audiovisuel
              </span>
            </div>
          </div>

          {/* Titre principal */}
          <div className="animate-up-2" style={{ marginBottom: "1.5rem" }}>
            <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.75rem)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.02em" }}>
              <span style={{ display: "block", color: "rgba(255,255,255,0.55)", fontSize: "0.45em", fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.6rem" }}>
                Le Nouveau
              </span>
              <span style={{
                background: "linear-gradient(135deg, #ffffff 0%, #e2e8f0 40%, #C9A84C 70%, #f0d080 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              }}>
                Système d&apos;Information
              </span>
              <span style={{ display: "block", color: "#C9A84C", fontSize: "0.7em", fontWeight: 700, marginTop: "0.3rem" }}>
                du CNRA
              </span>
            </h1>
          </div>

          {/* Sous-titre */}
          <p className="animate-up-3" style={{
            fontSize: "clamp(1rem, 2vw, 1.2rem)", color: "rgba(255,255,255,0.5)",
            maxWidth: 620, margin: "0 auto 2.5rem", lineHeight: 1.75,
          }}>
            Une plateforme intégrée de <strong style={{ color: "rgba(255,255,255,0.8)" }}>6 modules gouvernementaux</strong> pour
            surveiller, réguler et éduquer dans le paysage audiovisuel sénégalais.
          </p>

          {/* CTA */}
          <div className="animate-up-4" style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="#modules" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "linear-gradient(135deg, #1A3A6B, #2a5298)",
              border: "1px solid rgba(201,168,76,0.4)",
              color: "#fff", padding: "12px 28px", borderRadius: 12,
              fontSize: 14, fontWeight: 600, textDecoration: "none",
              transition: "all 0.2s",
            }}>
              Découvrir les modules <span>↓</span>
            </a>
            <a href="https://github.com/mamadouelimanewane/cnra-suite" target="_blank" rel="noopener noreferrer" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.12)",
              color: "rgba(255,255,255,0.7)", padding: "12px 28px", borderRadius: 12,
              fontSize: 14, fontWeight: 500, textDecoration: "none",
            }}>
              <span>⟨/⟩</span> Code source
            </a>
          </div>

          {/* Stats */}
          <div className="stat-card" style={{
            display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 1,
            maxWidth: 700, margin: "4rem auto 0",
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 16, overflow: "hidden",
          }}>
            {[
              { n: "6", l: "Modules applicatifs" },
              { n: "30+", l: "Tables de données" },
              { n: "50+", l: "Écrans & pages" },
              { n: "1", l: "Base Supabase unifiée" },
            ].map((s, i) => (
              <div key={i} style={{
                padding: "1.25rem 1rem", textAlign: "center",
                borderRight: i < 3 ? "1px solid rgba(255,255,255,0.06)" : "none",
              }}>
                <p style={{ fontSize: 26, fontWeight: 800, color: "#C9A84C", lineHeight: 1 }}>{s.n}</p>
                <p style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 6, lineHeight: 1.4 }}>{s.l}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Ligne décorative ─── */}
        <div style={{ position: "relative", maxWidth: 1280, margin: "0 auto", padding: "0 2rem" }}>
          <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.3), transparent)" }} />
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", background: "#060e1f", padding: "0 12px" }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#C9A84C", margin: "0 auto" }} />
          </div>
        </div>

        {/* ─── Grille des modules ─── */}
        <section id="modules" style={{ maxWidth: 1280, margin: "0 auto", padding: "4rem 2rem 2rem" }}>
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <p style={{ fontSize: 11, color: "#C9A84C", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 8 }}>
              — Portail d&apos;accès —
            </p>
            <h2 style={{ fontSize: 28, fontWeight: 700, color: "#fff" }}>Choisissez votre module</h2>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", marginTop: 8 }}>
              Cliquez sur une application pour y accéder directement
            </p>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
            gap: 16,
          }}>
            {APPS.map((app, i) => (
              <a
                key={app.id}
                href={app.local}
                target="_blank"
                rel="noopener noreferrer"
                className={`card-hover grid-card-${i}`}
                onMouseEnter={() => setHovered(app.id)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  textDecoration: "none", display: "block",
                  background: hovered === app.id
                    ? `linear-gradient(135deg, rgba(255,255,255,0.06) 0%, ${app.glow} 100%)`
                    : "rgba(255,255,255,0.025)",
                  border: `1px solid ${hovered === app.id ? app.border : "rgba(255,255,255,0.07)"}`,
                  borderRadius: 20, padding: "1.75rem",
                  position: "relative", overflow: "hidden",
                  boxShadow: hovered === app.id ? `0 20px 60px ${app.glow}, 0 0 0 1px ${app.border}` : "none",
                }}
              >
                {/* Barre colorée top */}
                <div style={{
                  position: "absolute", top: 0, left: 0, right: 0, height: 2,
                  background: `linear-gradient(90deg, ${app.color}, transparent)`,
                  opacity: hovered === app.id ? 1 : 0.4,
                  transition: "opacity 0.3s",
                }} />

                {/* Scan line animé au hover */}
                {hovered === app.id && (
                  <div style={{
                    position: "absolute", left: 0, right: 0, height: 60,
                    background: `linear-gradient(180deg, transparent, ${app.glow}, transparent)`,
                    pointerEvents: "none",
                  }} className="scan" />
                )}

                <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
                  {/* Icône */}
                  <div style={{
                    width: 52, height: 52, borderRadius: 14, flexShrink: 0,
                    background: `linear-gradient(135deg, ${app.glow}, rgba(255,255,255,0.03))`,
                    border: `1px solid ${app.border}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 24, transition: "transform 0.3s",
                    transform: hovered === app.id ? "scale(1.1) rotate(-5deg)" : "scale(1)",
                  }}>
                    {app.emoji}
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 4 }}>
                      <h3 style={{ fontSize: 18, fontWeight: 700, color: "#fff" }}>{app.name}</h3>
                      <span style={{
                        fontSize: 10, fontWeight: 600, padding: "2px 8px",
                        borderRadius: 6, color: app.color,
                        background: app.glow, border: `1px solid ${app.border}`,
                        letterSpacing: "0.05em",
                      }}>{app.tag}</span>
                    </div>
                    <p style={{ fontSize: 12, color: app.color, fontWeight: 500, marginBottom: 8, opacity: 0.8 }}>
                      {app.tagline}
                    </p>
                    <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.65 }}>
                      {app.desc}
                    </p>
                  </div>
                </div>

                {/* Footer carte */}
                <div style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  marginTop: 20, paddingTop: 16,
                  borderTop: "1px solid rgba(255,255,255,0.06)",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <div style={{
                      width: 6, height: 6, borderRadius: "50%", background: app.color,
                      animation: "badge-glow 2s infinite",
                    }} />
                    <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", fontFamily: "monospace" }}>
                      cnra-{app.id}.vercel.app
                    </span>
                  </div>
                  <div style={{
                    display: "flex", alignItems: "center", gap: 6,
                    fontSize: 13, fontWeight: 600,
                    color: hovered === app.id ? app.color : "rgba(255,255,255,0.3)",
                    transition: "color 0.3s",
                  }}>
                    Accéder <span style={{ fontSize: 16 }}>→</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* ─── Section mission ─── */}
        <section style={{ maxWidth: 1280, margin: "3rem auto", padding: "0 2rem" }}>
          <div style={{
            background: "linear-gradient(135deg, rgba(26,58,107,0.3) 0%, rgba(201,168,76,0.05) 100%)",
            border: "1px solid rgba(201,168,76,0.15)",
            borderRadius: 24, padding: "3rem",
            position: "relative", overflow: "hidden",
          }}>
            <div style={{
              position: "absolute", right: -40, top: -40,
              width: 200, height: 200, borderRadius: "50%",
              background: "radial-gradient(circle, rgba(201,168,76,0.08), transparent)",
              pointerEvents: "none",
            }} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "2rem", alignItems: "center" }}>
              <div>
                <p style={{ fontSize: 11, color: "#C9A84C", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 10 }}>
                  Notre mission
                </p>
                <h2 style={{ fontSize: 22, fontWeight: 700, color: "#fff", marginBottom: 12, lineHeight: 1.3 }}>
                  Réguler, Protéger, Éduquer
                </h2>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.8, maxWidth: 520 }}>
                  Le CNRA veille au respect du pluralisme, à la protection des auditeurs et téléspectateurs,
                  et à la qualité de l&apos;information diffusée sur les ondes sénégalaises.
                  Ce système numérique place ces missions au cœur de la gouvernance moderne.
                </p>
              </div>
              <div style={{ textAlign: "center", padding: "1rem 2rem" }}>
                <p style={{ fontSize: 48, fontWeight: 800, color: "#C9A84C", lineHeight: 1 }}>2025</p>
                <p style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 4, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                  Mise en service
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Footer ─── */}
        <footer style={{
          borderTop: "1px solid rgba(255,255,255,0.06)",
          padding: "2rem",
          marginTop: "2rem",
        }}>
          <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 20 }}>🇸🇳</span>
              <div>
                <p style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.6)" }}>
                  République du Sénégal
                </p>
                <p style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>
                  Conseil National de Régulation de l&apos;Audiovisuel
                </p>
              </div>
            </div>
            <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
              {APPS.map(app => (
                <a key={app.id} href={app.github} target="_blank" rel="noopener noreferrer"
                  style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", textDecoration: "none", transition: "color 0.2s" }}
                  onMouseEnter={e => (e.currentTarget.style.color = app.color)}
                  onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.3)")}>
                  {app.name}
                </a>
              ))}
            </div>
            <p style={{ fontSize: 11, color: "rgba(255,255,255,0.2)" }}>
              Développé par <span style={{ color: "rgba(255,255,255,0.4)", fontWeight: 600 }}>Processingenierie</span>
            </p>
          </div>
        </footer>

      </div>
    </>
  )
}
