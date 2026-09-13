import { useState, useEffect, useRef } from "react";

const COLORS = {
  bg: "#121212",
  bg2: "#1a1a1a",
  accent: "#fd703a",
  accentHover: "#e55a25",
  cream: "#fdf6ee",
  white: "#ffffff",
  gray: "#888888",
  grayLight: "#cccccc",
  card: "#1e1e1e",
  border: "rgba(253,112,58,0.3)",
};

const styles = {
  root: {
    background: COLORS.bg,
    color: COLORS.white,
    fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
    minHeight: "100vh",
    overflowX: "hidden",
  },
  // NAV
  nav: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    background: "rgba(18,18,18,0.95)",
    backdropFilter: "blur(12px)",
    borderBottom: `1px solid rgba(253,112,58,0.15)`,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 2rem",
    height: "64px",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    textDecoration: "none",
  },
  logoText: {
    fontSize: "1.5rem",
    fontWeight: 700,
    color: COLORS.white,
    letterSpacing: "0.02em",
  },
  logoAccent: {
    color: COLORS.accent,
  },
  navLinks: {
    display: "flex",
    gap: "2rem",
    listStyle: "none",
    margin: 0,
    padding: 0,
  },
  navLink: {
    color: COLORS.grayLight,
    textDecoration: "none",
    fontSize: "0.9rem",
    letterSpacing: "0.04em",
    transition: "color 0.2s",
    cursor: "pointer",
  },
  btnPrimary: {
    background: COLORS.accent,
    color: COLORS.white,
    border: "none",
    padding: "0.65rem 1.5rem",
    fontSize: "0.9rem",
    fontWeight: 600,
    letterSpacing: "0.04em",
    cursor: "pointer",
    transition: "background 0.2s, transform 0.15s",
    borderRadius: "2px",
  },
  btnOutline: {
    background: "transparent",
    color: COLORS.accent,
    border: `2px solid ${COLORS.accent}`,
    padding: "0.65rem 1.5rem",
    fontSize: "0.9rem",
    fontWeight: 600,
    letterSpacing: "0.04em",
    cursor: "pointer",
    transition: "background 0.2s, color 0.2s, transform 0.15s",
    borderRadius: "2px",
  },
  // ANNOUNCEMENT BAR
  announceBar: {
    background: "#555555",
    color: COLORS.white,
    textAlign: "center",
    padding: "8px 1rem",
    fontSize: "0.82rem",
    letterSpacing: "0.06em",
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 101,
  },
  // HERO
  hero: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
    paddingTop: "100px",
    paddingBottom: "4rem",
    background: "linear-gradient(135deg, #121212 0%, #1a1a1a 50%, #0d0d0d 100%)",
  },
  heroInner: {
    maxWidth: "900px",
    margin: "0 auto",
    padding: "0 2rem",
    textAlign: "center",
    position: "relative",
    zIndex: 2,
  },
  heroBadge: {
    display: "inline-block",
    background: "rgba(253,112,58,0.15)",
    border: `1px solid rgba(253,112,58,0.4)`,
    color: COLORS.accent,
    padding: "0.35rem 1rem",
    fontSize: "0.78rem",
    letterSpacing: "0.12em",
    fontWeight: 600,
    textTransform: "uppercase",
    marginBottom: "1.5rem",
    borderRadius: "2px",
  },
  heroTitle: {
    fontSize: "clamp(2.2rem, 6vw, 4rem)",
    fontWeight: 800,
    lineHeight: 1.1,
    marginBottom: "1.2rem",
    letterSpacing: "-0.02em",
  },
  heroTitleAccent: {
    color: COLORS.accent,
    display: "block",
  },
  heroSub: {
    fontSize: "clamp(1rem, 2.5vw, 1.2rem)",
    color: COLORS.grayLight,
    maxWidth: "600px",
    margin: "0 auto 2.5rem",
    lineHeight: 1.7,
  },
  heroActions: {
    display: "flex",
    gap: "1rem",
    justifyContent: "center",
    flexWrap: "wrap",
    marginBottom: "3rem",
  },
  heroStats: {
    display: "flex",
    gap: "3rem",
    justifyContent: "center",
    flexWrap: "wrap",
    borderTop: "1px solid rgba(255,255,255,0.08)",
    paddingTop: "2rem",
  },
  statItem: {
    textAlign: "center",
  },
  statNum: {
    fontSize: "2rem",
    fontWeight: 800,
    color: COLORS.accent,
    display: "block",
  },
  statLabel: {
    fontSize: "0.8rem",
    color: COLORS.gray,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
  },
  // FLOATING MUSIC NOTES
  musicNote: {
    position: "absolute",
    fontSize: "1.5rem",
    opacity: 0.06,
    animation: "float 8s ease-in-out infinite",
    userSelect: "none",
    pointerEvents: "none",
  },
  // SECTION
  section: {
    padding: "5rem 2rem",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  sectionTitle: {
    fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
    fontWeight: 800,
    textAlign: "center",
    marginBottom: "0.75rem",
    letterSpacing: "-0.01em",
  },
  sectionSub: {
    textAlign: "center",
    color: COLORS.grayLight,
    fontSize: "1.05rem",
    maxWidth: "560px",
    margin: "0 auto 3.5rem",
    lineHeight: 1.7,
  },
  // HOW IT WORKS
  stepsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "2rem",
  },
  stepCard: {
    background: COLORS.card,
    border: "1px solid rgba(255,255,255,0.06)",
    padding: "2rem 1.5rem",
    textAlign: "center",
    transition: "transform 0.3s, border-color 0.3s",
    cursor: "default",
    borderRadius: "4px",
  },
  stepIcon: {
    fontSize: "2.5rem",
    marginBottom: "1rem",
    display: "block",
  },
  stepNum: {
    display: "inline-block",
    background: COLORS.accent,
    color: COLORS.white,
    width: "28px",
    height: "28px",
    borderRadius: "50%",
    fontSize: "0.8rem",
    fontWeight: 700,
    lineHeight: "28px",
    textAlign: "center",
    marginBottom: "0.75rem",
  },
  stepTitle: {
    fontSize: "1.05rem",
    fontWeight: 700,
    marginBottom: "0.5rem",
  },
  stepDesc: {
    fontSize: "0.88rem",
    color: COLORS.gray,
    lineHeight: 1.6,
  },
  // OCCASIONS
  occasionsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
    gap: "1rem",
  },
  occasionCard: {
    background: COLORS.card,
    border: "1px solid rgba(255,255,255,0.06)",
    padding: "1.5rem 1rem",
    textAlign: "center",
    cursor: "pointer",
    transition: "all 0.25s",
    borderRadius: "4px",
  },
  occasionEmoji: {
    fontSize: "2rem",
    display: "block",
    marginBottom: "0.5rem",
  },
  occasionLabel: {
    fontSize: "0.85rem",
    fontWeight: 600,
    color: COLORS.grayLight,
  },
  // AUDIO PLAYER
  playerWrap: {
    background: "linear-gradient(135deg, #1e1e1e 0%, #252525 100%)",
    border: `1px solid ${COLORS.border}`,
    borderRadius: "8px",
    padding: "2rem",
    maxWidth: "520px",
    margin: "0 auto",
  },
  playerTitle: {
    fontSize: "0.8rem",
    color: COLORS.gray,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    marginBottom: "0.25rem",
  },
  playerSongName: {
    fontSize: "1.1rem",
    fontWeight: 700,
    marginBottom: "0.25rem",
  },
  playerArtist: {
    fontSize: "0.85rem",
    color: COLORS.accent,
    marginBottom: "1.5rem",
  },
  progressBar: {
    height: "4px",
    background: "rgba(255,255,255,0.1)",
    borderRadius: "2px",
    marginBottom: "0.5rem",
    position: "relative",
    cursor: "pointer",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    background: COLORS.accent,
    borderRadius: "2px",
    transition: "width 0.1s linear",
  },
  playerTime: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "0.75rem",
    color: COLORS.gray,
    marginBottom: "1.25rem",
  },
  playerControls: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "1.5rem",
  },
  playBtn: {
    width: "52px",
    height: "52px",
    borderRadius: "50%",
    background: COLORS.accent,
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.2rem",
    transition: "transform 0.15s, background 0.2s",
  },
  ctrlBtn: {
    background: "none",
    border: "none",
    color: COLORS.grayLight,
    fontSize: "1.1rem",
    cursor: "pointer",
    transition: "color 0.2s",
    padding: "0.25rem",
  },
  // PRICING
  pricingGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "2rem",
    maxWidth: "900px",
    margin: "0 auto",
  },
  priceCard: {
    background: COLORS.card,
    border: "1px solid rgba(255,255,255,0.06)",
    padding: "2.5rem 2rem",
    textAlign: "center",
    position: "relative",
    transition: "transform 0.25s, border-color 0.25s",
    borderRadius: "4px",
  },
  priceCardFeatured: {
    border: `2px solid ${COLORS.accent}`,
    transform: "scale(1.03)",
  },
  priceBadge: {
    position: "absolute",
    top: "-12px",
    left: "50%",
    transform: "translateX(-50%)",
    background: COLORS.accent,
    color: COLORS.white,
    fontSize: "0.7rem",
    fontWeight: 700,
    padding: "0.25rem 0.75rem",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    borderRadius: "2px",
    whiteSpace: "nowrap",
  },
  planName: {
    fontSize: "0.85rem",
    fontWeight: 600,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: COLORS.gray,
    marginBottom: "0.75rem",
  },
  planPrice: {
    fontSize: "2.8rem",
    fontWeight: 800,
    color: COLORS.white,
    lineHeight: 1,
    marginBottom: "0.25rem",
  },
  planPriceSup: {
    fontSize: "1.2rem",
    verticalAlign: "super",
    fontWeight: 600,
  },
  planPeriod: {
    fontSize: "0.8rem",
    color: COLORS.gray,
    marginBottom: "1.5rem",
  },
  planFeatures: {
    listStyle: "none",
    padding: 0,
    margin: "0 0 2rem",
    textAlign: "left",
  },
  planFeature: {
    display: "flex",
    alignItems: "flex-start",
    gap: "0.5rem",
    padding: "0.4rem 0",
    fontSize: "0.88rem",
    color: COLORS.grayLight,
    borderBottom: "1px solid rgba(255,255,255,0.04)",
  },
  planFeatureCheck: {
    color: COLORS.accent,
    flexShrink: 0,
    marginTop: "1px",
  },
  // TESTIMONIALS
  testimonialsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "1.5rem",
  },
  testimonialCard: {
    background: COLORS.card,
    border: "1px solid rgba(255,255,255,0.06)",
    padding: "2rem",
    borderRadius: "4px",
  },
  testimonialStars: {
    color: COLORS.accent,
    fontSize: "0.9rem",
    marginBottom: "0.75rem",
  },
  testimonialText: {
    fontSize: "0.9rem",
    color: COLORS.grayLight,
    lineHeight: 1.7,
    fontStyle: "italic",
    marginBottom: "1rem",
  },
  testimonialAuthor: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
  },
  testimonialAvatar: {
    width: "38px",
    height: "38px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #fd703a, #e55a25)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1rem",
    fontWeight: 700,
    color: COLORS.white,
    flexShrink: 0,
  },
  testimonialName: {
    fontSize: "0.88rem",
    fontWeight: 700,
  },
  testimonialMeta: {
    fontSize: "0.76rem",
    color: COLORS.gray,
  },
  // FORM
  formWrap: {
    background: "linear-gradient(135deg, #1a1a1a 0%, #1e1e1e 100%)",
    border: `1px solid ${COLORS.border}`,
    borderRadius: "8px",
    padding: "3rem 2.5rem",
    maxWidth: "640px",
    margin: "0 auto",
  },
  formTitle: {
    fontSize: "1.5rem",
    fontWeight: 800,
    marginBottom: "0.5rem",
    textAlign: "center",
  },
  formSub: {
    fontSize: "0.88rem",
    color: COLORS.gray,
    textAlign: "center",
    marginBottom: "2rem",
    lineHeight: 1.6,
  },
  formGroup: {
    marginBottom: "1.25rem",
  },
  formLabel: {
    display: "block",
    fontSize: "0.82rem",
    fontWeight: 600,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    color: COLORS.grayLight,
    marginBottom: "0.4rem",
  },
  formInput: {
    width: "100%",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: "6px",
    padding: "0.75rem 1rem",
    color: COLORS.white,
    fontSize: "0.95rem",
    outline: "none",
    transition: "border-color 0.2s",
    boxSizing: "border-box",
  },
  formTextarea: {
    width: "100%",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: "6px",
    padding: "0.75rem 1rem",
    color: COLORS.white,
    fontSize: "0.95rem",
    outline: "none",
    transition: "border-color 0.2s",
    resize: "vertical",
    minHeight: "100px",
    fontFamily: "inherit",
    boxSizing: "border-box",
  },
  formSelect: {
    width: "100%",
    background: "#252525",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: "6px",
    padding: "0.75rem 1rem",
    color: COLORS.white,
    fontSize: "0.95rem",
    outline: "none",
    cursor: "pointer",
    boxSizing: "border-box",
  },
  stepIndicator: {
    display: "flex",
    justifyContent: "center",
    gap: "0.5rem",
    marginBottom: "2rem",
  },
  stepDot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    transition: "background 0.3s, transform 0.3s",
  },
  // FAQ
  faqItem: {
    borderBottom: "1px solid rgba(255,255,255,0.07)",
    padding: "1.25rem 0",
    cursor: "pointer",
  },
  faqQuestion: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "1rem",
    fontWeight: 600,
    gap: "1rem",
  },
  faqAnswer: {
    fontSize: "0.9rem",
    color: COLORS.grayLight,
    lineHeight: 1.7,
    marginTop: "0.75rem",
    paddingRight: "2rem",
  },
  // CTA SECTION
  ctaSection: {
    background: `linear-gradient(135deg, rgba(253,112,58,0.12) 0%, rgba(253,112,58,0.05) 100%)`,
    border: `1px solid rgba(253,112,58,0.2)`,
    borderRadius: "8px",
    padding: "4rem 2rem",
    textAlign: "center",
    margin: "0 2rem 5rem",
  },
  ctaTitle: {
    fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
    fontWeight: 800,
    marginBottom: "1rem",
    letterSpacing: "-0.01em",
  },
  ctaSub: {
    fontSize: "1.05rem",
    color: COLORS.grayLight,
    marginBottom: "2rem",
    lineHeight: 1.7,
  },
  // FOOTER
  footer: {
    background: "#0d0d0d",
    borderTop: "1px solid rgba(255,255,255,0.06)",
    padding: "3rem 2rem 1.5rem",
    textAlign: "center",
  },
  footerLogo: {
    fontSize: "1.3rem",
    fontWeight: 800,
    marginBottom: "0.5rem",
  },
  footerLinks: {
    display: "flex",
    justifyContent: "center",
    gap: "2rem",
    flexWrap: "wrap",
    margin: "1.5rem 0",
    listStyle: "none",
    padding: 0,
  },
  footerLink: {
    color: COLORS.gray,
    textDecoration: "none",
    fontSize: "0.85rem",
    transition: "color 0.2s",
    cursor: "pointer",
  },
  footerCopy: {
    fontSize: "0.78rem",
    color: COLORS.gray,
    borderTop: "1px solid rgba(255,255,255,0.05)",
    paddingTop: "1.5rem",
    marginTop: "1.5rem",
  },
  // TRUST BADGES
  trustBar: {
    display: "flex",
    justifyContent: "center",
    gap: "2.5rem",
    flexWrap: "wrap",
    padding: "2rem",
    background: "#0f0f0f",
    borderTop: "1px solid rgba(255,255,255,0.04)",
    borderBottom: "1px solid rgba(255,255,255,0.04)",
  },
  trustItem: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    fontSize: "0.82rem",
    color: COLORS.gray,
  },
  trustIcon: {
    fontSize: "1rem",
    color: COLORS.accent,
  },
};

// Animate on scroll hook
function useScrollReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function AnimatedSection({ children, style }) {
  const [ref, visible] = useScrollReveal();
  return (
    <div
      ref={ref}
      style={{
        ...style,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
      }}
    >
      {children}
    </div>
  );
}

// Simulated audio player
function AudioPlayer() {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [time, setTime] = useState(0);
  const intervalRef = useRef(null);
  const duration = 187;

  const formatTime = (s) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    if (playing) {
      intervalRef.current = setInterval(() => {
        setTime((t) => {
          if (t >= duration) { setPlaying(false); return 0; }
          return t + 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [playing]);

  useEffect(() => {
    setProgress((time / duration) * 100);
  }, [time]);

  const [hoverPlay, setHoverPlay] = useState(false);

  return (
    <div style={styles.playerWrap}>
      <p style={styles.playerTitle}>🎵 Muestra de canción</p>
      <p style={styles.playerSongName}>Para Siempre, Mi Amor</p>
      <p style={styles.playerArtist}>MeloViva — Canción personalizada</p>
      <div
        style={styles.progressBar}
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const pct = (e.clientX - rect.left) / rect.width;
          setTime(Math.floor(pct * duration));
        }}
      >
        <div style={{ ...styles.progressFill, width: `${progress}%` }} />
      </div>
      <div style={styles.playerTime}>
        <span>{formatTime(time)}</span>
        <span>{formatTime(duration)}</span>
      </div>
      <div style={styles.playerControls}>
        <button
          style={{ ...styles.ctrlBtn }}
          onClick={() => setTime(Math.max(0, time - 10))}
          title="Retroceder"
        >⏮</button>
        <button
          style={{
            ...styles.playBtn,
            background: hoverPlay ? COLORS.accentHover : COLORS.accent,
            transform: hoverPlay ? "scale(1.08)" : "scale(1)",
          }}
          onMouseEnter={() => setHoverPlay(true)}
          onMouseLeave={() => setHoverPlay(false)}
          onClick={() => setPlaying((p) => !p)}
          title={playing ? "Pausar" : "Reproducir"}
        >
          <span style={{ color: COLORS.white, lineHeight: 1 }}>
            {playing ? "⏸" : "▶"}
          </span>
        </button>
        <button
          style={styles.ctrlBtn}
          onClick={() => setTime(Math.min(duration, time + 10))}
          title="Adelantar"
        >⏭</button>
      </div>
      <p style={{ textAlign: "center", fontSize: "0.72rem", color: COLORS.gray, marginTop: "1rem", marginBottom: 0 }}>
        * Esto es una demostración. Tu canción será 100% única y personalizada.
      </p>
    </div>
  );
}

// Multi-step form
function OrderForm({ onClose }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    occasion: "",
    recipient: "",
    story: "",
    style: "",
    name: "",
    email: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const update = (field, val) => setForm((f) => ({ ...f, [field]: val }));

  const inputStyle = (field) => ({
    ...styles.formInput,
    borderColor: focusedField === field ? COLORS.accent : "rgba(255,255,255,0.12)",
  });
  const textareaStyle = (field) => ({
    ...styles.formTextarea,
    borderColor: focusedField === field ? COLORS.accent : "rgba(255,255,255,0.12)",
  });

  const handleSubmit = () => {
    // TODO: Enviar datos a la API de generación de canciones
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div style={{ ...styles.formWrap, textAlign: "center" }}>
        <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🎶</div>
        <h3 style={{ ...styles.formTitle, marginBottom: "0.75rem" }}>
          ¡Solicitud Recibida!
        </h3>
        <p style={{ color: COLORS.grayLight, fontSize: "0.95rem", lineHeight: 1.7, marginBottom: "1.5rem" }}>
          Hemos recibido los detalles de tu canción personalizada. Nuestros compositores comenzarán a trabajar en ella. Recibirás un correo en <strong style={{ color: COLORS.accent }}>{form.email || "tu email"}</strong> en las próximas 24-48 horas.
        </p>
        <button
          style={{ ...styles.btnPrimary, fontSize: "1rem", padding: "0.8rem 2rem" }}
          onClick={() => { setSubmitted(false); setStep(1); setForm({ occasion: "", recipient: "", story: "", style: "", name: "", email: "" }); if (onClose) onClose(); }}
        >
          Crear otra canción
        </button>
      </div>
    );
  }

  return (
    <div style={styles.formWrap}>
      <h3 style={styles.formTitle}>Crea tu Canción Única</h3>
      <p style={styles.formSub}>Paso {step} de 3 — Completa los detalles para tu canción perfecta</p>
      <div style={styles.stepIndicator}>
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            style={{
              ...styles.stepDot,
              background: s <= step ? COLORS.accent : "rgba(255,255,255,0.15)",
              transform: s === step ? "scale(1.4)" : "scale(1)",
            }}
          />
        ))}
      </div>

      {step === 1 && (
        <div>
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>¿Para qué ocasión?</label>
            <select
              style={styles.formSelect}
              value={form.occasion}
              onChange={(e) => update("occasion", e.target.value)}
            >
              <option value="">Selecciona una ocasión</option>
              <option value="aniversario">Aniversario</option>
              <option value="cumpleanos">Cumpleaños</option>
              <option value="boda">Boda</option>
              <option value="san-valentin">San Valentín</option>
              <option value="navidad">Navidad</option>
              <option value="graduacion">Graduación</option>
              <option value="otro">Otra ocasión especial</option>
            </select>
          </div>
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>¿Para quién es la canción?</label>
            <input
              style={inputStyle("recipient")}
              type="text"
              placeholder="Ej: Mi pareja, mi mamá, mi mejor amigo..."
              value={form.recipient}
              onChange={(e) => update("recipient", e.target.value)}
              onFocus={() => setFocusedField("recipient")}
              onBlur={() => setFocusedField(null)}
            />
          </div>
          <button
            style={{
              ...styles.btnPrimary,
              width: "100%",
              padding: "0.9rem",
              fontSize: "1rem",
              marginTop: "0.5rem",
              opacity: form.occasion && form.recipient ? 1 : 0.5,
            }}
            disabled={!form.occasion || !form.recipient}
            onClick={() => setStep(2)}
          >
            Siguiente →
          </button>
        </div>
      )}

      {step === 2 && (
        <div>
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Cuéntanos su historia</label>
            <textarea
              style={textareaStyle("story")}
              placeholder="Describe momentos especiales, cómo se conocieron, qué los hace únicos, recuerdos favoritos... Cuanto más detalle, mejor será la canción."
              value={form.story}
              onChange={(e) => update("story", e.target.value)}
              onFocus={() => setFocusedField("story")}
              onBlur={() => setFocusedField(null)}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Estilo musical preferido</label>
            <select
              style={styles.formSelect}
              value={form.style}
              onChange={(e) => update("style", e.target.value)}
            >
              <option value="">Selecciona un estilo</option>
              <option value="pop-romantico">Pop Romántico</option>
              <option value="balada">Balada</option>
              <option value="folk-acustico">Folk / Acústico</option>
              <option value="r-and-b">R&amp;B / Soul</option>
              <option value="jazz">Jazz</option>
              <option value="reggaeton">Reggaetón</option>
              <option value="flamenco">Flamenco / Español</option>
              <option value="sorpresa">Sorpréndeme</option>
            </select>
          </div>
          <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
            <button
              style={{ ...styles.btnOutline, flex: 1, padding: "0.9rem" }}
              onClick={() => setStep(1)}
            >
              ← Atrás
            </button>
            <button
              style={{
                ...styles.btnPrimary,
                flex: 2,
                padding: "0.9rem",
                fontSize: "1rem",
                opacity: form.story && form.style ? 1 : 0.5,
              }}
              disabled={!form.story || !form.style}
              onClick={() => setStep(3)}
            >
              Siguiente →
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Tu nombre</label>
            <input
              style={inputStyle("name")}
              type="text"
              placeholder="¿Cómo te llamas?"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              onFocus={() => setFocusedField("name")}
              onBlur={() => setFocusedField(null)}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Tu correo electrónico</label>
            <input
              style={inputStyle("email")}
              type="email"
              placeholder="para enviarte la canción"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              onFocus={() => setFocusedField("email")}
              onBlur={() => setFocusedField(null)}
            />
          </div>
          <p style={{ fontSize: "0.76rem", color: COLORS.gray, marginBottom: "1.25rem", lineHeight: 1.6 }}>
            🔒 Tu información está segura. Nunca compartiremos tus datos con terceros.
          </p>
          <div style={{ display: "flex", gap: "0.75rem" }}>
            <button
              style={{ ...styles.btnOutline, flex: 1, padding: "0.9rem" }}
              onClick={() => setStep(2)}
            >
              ← Atrás
            </button>
            <button
              style={{
                ...styles.btnPrimary,
                flex: 2,
                padding: "0.9rem",
                fontSize: "1rem",
                opacity: form.name && form.email ? 1 : 0.5,
              }}
              disabled={!form.name || !form.email}
              onClick={handleSubmit}
            >
              Solicitar mi canción 🎶
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [hoverBtnPrimary, setHoverBtnPrimary] = useState(false);
  const [hoverBtnOutline, setHoverBtnOutline] = useState(false);
  const [hoverCtaBtn, setHoverCtaBtn] = useState(false);
  const [hoveredStep, setHoveredStep] = useState(null);
  const [hoveredOccasion, setHoveredOccasion] = useState(null);
  const [hoveredPlan, setHoveredPlan] = useState(null);

  const formRef = useRef(null);

  const scrollToForm = () => {
    setShowForm(true);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 100);
  };

  const steps = [
    { icon: "✍️", title: "Cuéntanos la historia", desc: "Comparte detalles especiales, recuerdos y momentos únicos de tu relación." },
    { icon: "🎸", title: "Elige el estilo", desc: "Selecciona el género musical y el estado de ánimo que mejor refleje tu historia." },
    { icon: "🎧", title: "Recibe tu canción", desc: "En 24-48 horas recibirás una canción única, creada especialmente para ti." },
    { icon: "🎁", title: "Sorprende a quien amas", desc: "Comparte el regalo más especial que alguien pueda recibir: su propia canción." },
  ];

  const occasions = [
    { emoji: "💍", label: "Aniversario" },
    { emoji: "🎂", label: "Cumpleaños" },
    { emoji: "💒", label: "Boda" },
    { emoji: "💝", label: "San Valentín" },
    { emoji: "🎄", label: "Navidad" },
    { emoji: "🎓", label: "Graduación" },
    { emoji: "👶", label: "Baby Shower" },
    { emoji: "🌟", label: "Cualquier momento" },
  ];

  const testimonials = [
    {
      text: "\"Le regalé esta canción a mi esposa en nuestro décimo aniversario. Lloró de emoción. Describieron perfectamente cómo nos conocimos en ese café de Madrid. ¡Alucinante!\"",
      name: "Carlos M.",
      meta: "Madrid, España",
      initial: "C",
    },
    {
      text: "\"Mi mejor regalo de cumpleaños en años. La canción capturó nuestra amistad de 20 años en 3 minutos. El proceso fue súper fácil y el resultado increíble.\"",
      name: "Laura P.",
      meta: "Buenos Aires, Argentina",
      initial: "L",
    },
    {
      text: "\"La usé como primer baile en mi boda. Todos los invitados preguntaron quién la había compuesto. La cara de mi esposa al escucharla... no tiene precio.\"",
      name: "Javier R.",
      meta: "Ciudad de México",
      initial: "J",
    },
  ];

  const plans = [
    {
      name: "Esencial",
      price: "49",
      period: "por canción",
      features: [
        "Canción 100% personalizada",
        "Hasta 3 minutos de duración",
        "Entrega en 72 horas",
        "1 revisión incluida",
        "Archivo MP3 en alta calidad",
      ],
      featured: false,
      badge: null,
    },
    {
      name: "Premium",
      price: "89",
      period: "por canción",
      features: [
        "Canción 100% personalizada",
        "Hasta 5 minutos de duración",
        "Entrega en 24 horas",
        "3 revisiones incluidas",
        "MP3 + WAV sin comprimir",
        "Letra imprimible incluida",
        "Versión instrumental extra",
      ],
      featured: true,
      badge: "Más popular",
    },
    {
      name: "Exclusivo",
      price: "149",
      period: "por canción",
      features: [
        "Todo lo de Premium",
        "Duración sin límite",
        "Entrega en 12 horas",
        "Revisiones ilimitadas",
        "Videoclip lírico animado",
        "Derechos de uso comercial",
        "Soporte prioritario 24/7",
      ],
      featured: false,
      badge: "Completo",
    },
  ];

  const faqs = [
    { q: "¿Cuánto tiempo tarda en estar lista mi canción?", a: "Dependiendo del plan elegido, el tiempo de entrega varía entre 12 y 72 horas. Nuestro equipo de compositores profesionales trabaja para entregar tu canción lo antes posible sin sacrificar calidad." },
    { q: "¿Cómo funciona el proceso de personalización?", a: "Simplemente rellenas nuestro formulario con los detalles de tu historia: la ocasión, las personas involucradas, momentos especiales y el estilo musical que prefieres. Nuestros compositores usarán toda esa información para crear algo único." },
    { q: "¿Puedo pedir cambios en la canción?", a: "Sí. Todos los planes incluyen al menos una revisión. Con el plan Premium tienes 3 revisiones, y con el Exclusivo las revisiones son ilimitadas hasta que quedes completamente satisfecho." },
    { q: "¿En qué idioma puede ser la canción?", a: "Podemos crear canciones en español, inglés, o una mezcla de ambos. Solo indícalo en el formulario y lo adaptaremos a tus preferencias." },
    { q: "¿Qué formato de audio recibiré?", a: "Todos los planes incluyen archivo MP3 de alta calidad. Los planes Premium y Exclusivo también incluyen WAV sin comprimir para la máxima fidelidad sonora." },
  ];

  return (
    <div style={styles.root}>
      {/* Keyframes */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-18px) rotate(5deg); }
          66% { transform: translateY(-10px) rotate(-3deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.06; }
          50% { opacity: 0.12; }
        }
        @keyframes waveform {
          0%, 100% { height: 4px; }
          50% { height: 16px; }
        }
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #121212; }
        ::-webkit-scrollbar-thumb { background: #fd703a; border-radius: 3px; }
      `}</style>

      {/* Announcement Bar */}
      <div style={styles.announceBar}>
        🎵 ¡Oferta especial! 20% de descuento esta semana — Código: <strong>MELO20</strong>
      </div>

      {/* Navbar */}
      <nav style={{ ...styles.nav, top: "34px" }}>
        <a href="#" style={styles.logo}>
          <span style={{ fontSize: "1.4rem" }}>🎵</span>
          <span style={styles.logoText}>
            Melo<span style={styles.logoAccent}>Viva</span>
          </span>
        </a>

        <ul style={{ ...styles.navLinks, display: window.innerWidth > 768 ? "flex" : "none" }}>
          {["Cómo funciona", "Ocasiones", "Planes", "Testimonios", "FAQ"].map((item) => (
            <li key={item}>
              <a
                style={styles.navLink}
                onClick={() => {
                  const id = item.toLowerCase().replace(/\s/g, "-").replace("ó", "o").replace("é", "e");
                  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                {item}
              </a>
            </li>
          ))}
        </ul>

        <button
          style={{
            ...styles.btnPrimary,
            background: hoverBtnPrimary ? COLORS.accentHover : COLORS.accent,
            transform: hoverBtnPrimary ? "scale(1.04)" : "scale(1)",
          }}
          onMouseEnter={() => setHoverBtnPrimary(true)}
          onMouseLeave={() => setHoverBtnPrimary(false)}
          onClick={scrollToForm}
        >
          Más información
        </button>
      </nav>

      {/* HERO */}
      <section style={styles.hero}>
        {/* Floating notes */}
        {["♪", "♫", "♩", "🎵", "♬", "🎶"].map((note, i) => (
          <span
            key={i}
            style={{
              ...styles.musicNote,
              left: `${10 + i * 16}%`,
              top: `${15 + (i % 3) * 25}%`,
              animationDelay: `${i * 1.3}s`,
              fontSize: `${1.2 + (i % 3) * 0.5}rem`,
            }}
          >
            {note}
          </span>
        ))}

        {/* Glow orb */}
        <div style={{
          position: "absolute",
          width: "600px",
          height: "600px",
          background: "radial-gradient(circle, rgba(253,112,58,0.08) 0%, transparent 70%)",
          borderRadius: "50%",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
          animation: "pulse 4s ease-in-out infinite",
        }} />

        <div style={styles.heroInner}>
          <div style={styles.heroBadge}>🎵 Cada historia merece su propia canción</div>
          <h1 style={styles.heroTitle}>
            Sorprende a quien amas con
            <span style={styles.heroTitleAccent}>una canción única e irrepetible</span>
          </h1>
          <p style={styles.heroSub}>
            Convierte tus momentos más especiales en música. Nuestros compositores crean canciones personalizadas que capturan tu historia, tu amor y tus recuerdos para siempre.
          </p>
          <div style={styles.heroActions}>
            <button
              style={{
                ...styles.btnPrimary,
                padding: "0.9rem 2.2rem",
                fontSize: "1rem",
                background: hoverCtaBtn ? COLORS.accentHover : COLORS.accent,
                transform: hoverCtaBtn ? "scale(1.04)" : "scale(1)",
              }}
              onMouseEnter={() => setHoverCtaBtn(true)}
              onMouseLeave={() => setHoverCtaBtn(false)}
              onClick={scrollToForm}
            >
              🎶 Crear mi canción ahora
            </button>
            <button
              style={{
                ...styles.btnOutline,
                padding: "0.9rem 2.2rem",
                fontSize: "1rem",
                background: hoverBtnOutline ? "rgba(253,112,58,0.1)" : "transparent",
              }}
              onMouseEnter={() => setHoverBtnOutline(true)}
              onMouseLeave={() => setHoverBtnOutline(false)}
              onClick={() => document.getElementById("demo")?.scrollIntoView({ behavior: "smooth" })}
            >
              ▶ Escuchar demo
            </button>
          </div>
          <div style={styles.heroStats}>
            {[
              { num: "+5.000", label: "Canciones creadas" },
              { num: "98%", label: "Clientes satisfechos" },
              { num: "24h", label: "Entrega rápida" },
              { num: "50+", label: "Estilos musicales" },
            ].map((stat) => (
              <div key={stat.label} style={styles.statItem}>
                <span style={styles.statNum}>{stat.num}</span>
                <span style={styles.statLabel}>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <div style={styles.trustBar}>
        {[
          { icon: "🔒", text: "Pago 100% seguro" },
          { icon: "✅", text: "Satisfacción garantizada" },
          { icon: "🎧", text: "Compositores profesionales" },
          { icon: "⚡", text: "Entrega en 24h" },
          { icon: "🌍", text: "Enviado a todo el mundo" },
        ].map((t) => (
          <div key={t.text} style={styles.trustItem}>
            <span style={styles.trustIcon}>{t.icon}</span>
            {t.text}
          </div>
        ))}
      </div>

      {/* HOW IT WORKS */}
      <section id="como-funciona" style={{ background: "#111111", padding: "5rem 0" }}>
        <AnimatedSection style={styles.section}>
          <h2 style={styles.sectionTitle}>
            ¿Cómo funciona <span style={{ color: COLORS.accent }}>MeloViva</span>?
          </h2>
          <p style={styles.sectionSub}>
            En 4 pasos sencillos tendrás la canción más especial que alguien pueda recibir jamás.
          </p>
          <div style={styles.stepsGrid}>
            {steps.map((step, i) => (
              <div
                key={i}
                style={{
                  ...styles.stepCard,
                  borderColor: hoveredStep === i ? COLORS.border : "rgba(255,255,255,0.06)",
                  transform: hoveredStep === i ? "translateY(-6px)" : "translateY(0)",
                }}
                onMouseEnter={() => setHoveredStep(i)}
                onMouseLeave={() => setHoveredStep(null)}
              >
                <span style={styles.stepNum}>{i + 1}</span>
                <span style={styles.stepIcon}>{step.icon}</span>
                <h3 style={styles.stepTitle}>{step.title}</h3>
                <p style={styles.stepDesc}>{step.desc}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </section>

      {/* DEMO PLAYER */}
      <section id="demo" style={{ padding: "5rem 2rem", background: COLORS.bg }}>
        <AnimatedSection>
          <h2 style={{ ...styles.sectionTitle, marginBottom: "0.75rem" }}>
            Escucha una <span style={{ color: COLORS.accent }}>muestra</span>
          </h2>
          <p style={{ ...styles.sectionSub, marginBottom: "2.5rem" }}>
            Así suena el amor hecho música. Tu canción será completamente diferente y única.
          </p>
          <AudioPlayer />
        </AnimatedSection>
      </section>

      {/* OCCASIONS */}
      <section id="ocasiones" style={{ background: "#0f0f0f", padding: "5rem 0" }}>
        <AnimatedSection style={styles.section}>
          <h2 style={styles.sectionTitle}>
            Para cada <span style={{ color: COLORS.accent }}>momento especial</span>
          </h2>
          <p style={styles.sectionSub}>
            Sin importar la ocasión, hay una historia que merece ser cantada.
          </p>
          <div style={styles.occasionsGrid}>
            {occasions.map((occ, i) => (
              <div
                key={i}
                style={{
                  ...styles.occasionCard,
                  borderColor: hoveredOccasion === i ? COLORS.border : "rgba(255,255,255,0.06)",
                  background: hoveredOccasion === i ? "rgba(253,112,58,0.08)" : COLORS.card,
                  transform: hoveredOccasion === i ? "scale(1.05)" : "scale(1)",
                }}
                onMouseEnter={() => setHoveredOccasion(i)}
                onMouseLeave={() => setHoveredOccasion(null)}
                onClick={scrollToForm}
              >
                <span style={styles.occasionEmoji}>{occ.emoji}</span>
                <span style={styles.occasionLabel}>{occ.label}</span>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </section>

      {/* PRICING */}
      <section id="planes" style={{ padding: "5rem 2rem", background: COLORS.bg }}>
        <AnimatedSection>
          <h2 style={{ ...styles.sectionTitle, marginBottom: "0.75rem" }}>
            Elige tu <span style={{ color: COLORS.accent }}>plan</span>
          </h2>
          <p style={{ ...styles.sectionSub, marginBottom: "3.5rem" }}>
            Inversión única para un regalo que durará toda la vida.
          </p>
          <div style={styles.pricingGrid}>
            {plans.map((plan, i) => (
              <div
                key={i}
                style={{
                  ...styles.priceCard,
                  ...(plan.featured ? styles.priceCardFeatured : {}),
                  borderColor: hoveredPlan === i && !plan.featured ? COLORS.border : plan.featured ? COLORS.accent : "rgba(255,255,255,0.06)",
                  transform: plan.featured ? "scale(1.03)" : hoveredPlan === i ? "translateY(-4px)" : "translateY(0)",
                  transition: "all 0.25s",
                }}
                onMouseEnter={() => setHoveredPlan(i)}
                onMouseLeave={() => setHoveredPlan(null)}
              >
                {plan.badge && <div style={styles.priceBadge}>{plan.badge}</div>}
                <p style={styles.planName}>{plan.name}</p>
                <p style={styles.planPrice}>
                  <span style={styles.planPriceSup}>€</span>
                  {plan.price}
                </p>
                <p style={styles.planPeriod}>{plan.period}</p>
                <ul style={styles.planFeatures}>
                  {plan.features.map((feat, j) => (
                    <li key={j} style={styles.planFeature}>
                      <span style={styles.planFeatureCheck}>✓</span>
                      {feat}
                    </li>
                  ))}
                </ul>
                <button
                  style={{
                    ...(plan.featured ? styles.btnPrimary : styles.btnOutline),
                    width: "100%",
                    padding: "0.85rem",
                    fontSize: "0.95rem",
                  }}
                  onClick={scrollToForm}
                >
                  {plan.featured ? "Comenzar ahora" : "Elegir este plan"}
                </button>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonios" style={{ background: "#0f0f0f", padding: "5rem 0" }}>
        <AnimatedSection style={styles.section}>
          <h2 style={styles.sectionTitle}>
            Lo que dicen nuestros <span style={{ color: COLORS.accent }}>clientes</span>
          </h2>
          <p style={styles.sectionSub}>
            Más de 5.000 historias convertidas en música. Aquí algunas de ellas.
          </p>
          <div style={styles.testimonialsGrid}>
            {testimonials.map((t, i) => (
              <div key={i} style={styles.testimonialCard}>
                <div style={styles.testimonialStars}>★★★★★</div>
                <p style={styles.testimonialText}>{t.text}</p>
                <div style={styles.testimonialAuthor}>
                  <div style={styles.testimonialAvatar}>{t.initial}</div>
                  <div>
                    <p style={{ ...styles.testimonialName, margin: 0 }}>{t.name}</p>
                    <p style={{ ...styles.testimonialMeta, margin: 0 }}>{t.meta}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </section>

      {/* FORM */}
      <section ref={formRef} id="formulario" style={{ padding: "5rem 2rem", background: COLORS.bg }}>
        <AnimatedSection>
          <h2 style={{ ...styles.sectionTitle, marginBottom: "0.75rem" }}>
            Crea tu canción <span style={{ color: COLORS.accent }}>ahora</span>
          </h2>
          <p style={{ ...styles.sectionSub, marginBottom: "3rem" }}>
            Completa el formulario y nuestros compositores comenzarán a trabajar en tu historia.
          </p>
          {showForm ? (
            <OrderForm onClose={() => setShowForm(false)} />
          ) : (
            <div style={{ textAlign: "center" }}>
              <div style={{
                ...styles.formWrap,
                textAlign: "center",
                padding: "3rem 2rem",
                cursor: "pointer",
              }}
                onClick={scrollToForm}
              >
                <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🎵</div>
                <h3 style={{ ...styles.formTitle, marginBottom: "0.75rem" }}>
                  ¿Listo para crear algo especial?
                </h3>
                <p style={{ color: COLORS.grayLight, fontSize: "0.95rem", lineHeight: 1.7, marginBottom: "2rem" }}>
                  Haz clic para comenzar el proceso de personalización de tu canción única.
                </p>
                <button
                  style={{
                    ...styles.btnPrimary,
                    padding: "1rem 2.5rem",
                    fontSize: "1.05rem",
                  }}
                  onClick={(e) => { e.stopPropagation(); setShowForm(true); }}
                >
                  🎶 Comenzar ahora
                </button>
              </div>
            </div>
          )}
        </AnimatedSection>
      </section>

      {/* FAQ */}
      <section id="faq" style={{ background: "#0f0f0f", padding: "5rem 0" }}>
        <AnimatedSection style={{ ...styles.section, maxWidth: "760px" }}>
          <h2 style={styles.sectionTitle}>
            Preguntas <span style={{ color: COLORS.accent }}>frecuentes</span>
          </h2>
          <p style={{ ...styles.sectionSub, marginBottom: "3rem" }}>
            Resolvemos tus dudas para que puedas crear con total confianza.
          </p>
          <div>
            {faqs.map((faq, i) => (
              <div
                key={i}
                style={styles.faqItem}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <div style={styles.faqQuestion}>
                  <span>{faq.q}</span>
                  <span style={{
                    color: COLORS.accent,
                    fontSize: "1.2rem",
                    transform: openFaq === i ? "rotate(45deg)" : "rotate(0)",
                    transition: "transform 0.25s",
                    flexShrink: 0,
                  }}>+</span>
                </div>
                {openFaq === i && (
                  <p style={styles.faqAnswer}>{faq.a}</p>
                )}
              </div>
            ))}
          </div>
        </AnimatedSection>
      </section>

      {/* CTA FINAL */}
      <AnimatedSection>
        <div style={styles.ctaSection}>
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🎶</div>
          <h2 style={styles.ctaTitle}>
            Cada historia merece<br />
            <span style={{ color: COLORS.accent }}>su propia canción</span>
          </h2>
          <p style={styles.ctaSub}>
            No dejes que ese momento especial pase sin la banda sonora perfecta.<br />
            Crea algo que se recordará para siempre.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <button
              style={{
                ...styles.btnPrimary,
                padding: "1rem 2.5rem",
                fontSize: "1.05rem",
              }}
              onClick={scrollToForm}
            >
              🎵 Crear mi canción ahora
            </button>
            <button
              style={{
                ...styles.btnOutline,
                padding: "1rem 2.5rem",
                fontSize: "1.05rem",
              }}
              onClick={() => document.getElementById("planes")?.scrollIntoView({ behavior: "smooth" })}
            >
              Ver planes y precios
            </button>
          </div>
          <p style={{ fontSize: "0.78rem", color: COLORS.gray, marginTop: "1.5rem" }}>
            🔒 Garantía de satisfacción completa · Entrega garantizada · Soporte en español
          </p>
        </div>
      </AnimatedSection>

      {/* FOOTER */}
      <footer style={styles.footer}>
        <div style={{ ...styles.footerLogo }}>
          <span style={{ color: COLORS.white }}>Melo</span>
          <span style={{ color: COLORS.accent }}>Viva</span>
        </div>
        <p style={{ color: COLORS.gray, fontSize: "0.85rem", margin: "0.5rem 0" }}>
          Cada historia merece su propia canción.
        </p>
        <ul style={styles.footerLinks}>
          {["Sobre nosotros", "Cómo funciona", "Planes", "Preguntas frecuentes", "Privacidad", "Términos"].map((link) => (
            <li key={link}>
              <a style={styles.footerLink} href="#">{link}</a>
            </li>
          ))}
        </ul>
        <div style={{ display: "flex", justifyContent: "center", gap: "1rem", marginBottom: "1rem" }}>
          {["📧", "📱", "🎵"].map((icon, i) => (
            <span
              key={i}
              style={{
                width: "38px",
                height: "38px",
                borderRadius: "50%",
                background: "rgba(253,112,58,0.1)",
                border: "1px solid rgba(253,112,58,0.2)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                fontSize: "1rem",
              }}
            >
              {icon}
            </span>
          ))}
        </div>
        <p style={styles.footerCopy}>
          © 2025 MeloViva. Todos los derechos reservados.
          {/* TODO: Añadir links reales a redes sociales y páginas legales */}
        </p>
      </footer>
    </div>
  );
}