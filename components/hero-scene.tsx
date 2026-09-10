"use client";

import { useEffect, useMemo, useRef, useState } from "react";

/*
  Interactive hero backdrop: a lookout with binoculars scanning a dotted map of
  Canada and Nigeria. One requestAnimationFrame loop drives everything and writes
  straight to SVG transform attributes (no per-frame React render). The scan beam
  dwells on each territory and traverses between them; when it lingers on one,
  that territory locks (reticle) and pings. The sentry's head tracks the beam. On
  load the scene boots in — graticule, then the map wipes in, the link draws, the
  figure fades, the beam powers on. Honors prefers-reduced-motion.
*/

const VB = { w: 1200, h: 800 };
const EYE = { x: 1004, y: 304 }; // the binoculars — scan-beam origin
const HEAD = { x: 1004, y: 299 };
const CA = { x: 590, y: 150 };
const NG = { x: 812, y: 476 };
const CA_ANG = 200.5; // beam angle (deg) from EYE toward Canada
const NG_ANG = 138.1; // …toward Nigeria
const MID_ANG = (CA_ANG + NG_ANG) / 2;
const ARC = `M${CA.x},${CA.y} Q${CA.x - 96},${(CA.y + NG.y) / 2 + 24} ${NG.x},${NG.y}`;

const MARKERS = [
  { id: "CANADA", label: "CANADA", code: "56°N · 106°W", p: CA, ang: CA_ANG },
  { id: "NIGERIA", label: "NIGERIA", code: "9°N · 8°E", p: NG, ang: NG_ANG },
] as const;

const round = (n: number, p = 100) => Math.round(n * p) / p;
const clamp01 = (n: number) => (n < 0 ? 0 : n > 1 ? 1 : n);
const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2);
const approach = (cur: number, tgt: number, k: number) => cur + (tgt - cur) * (k > 1 ? 1 : k);

function rand(i: number) {
  const x = Math.sin(i * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}

/** Deterministic dotted blob so SSR and client render identically. */
function blob(cx: number, cy: number, rx: number, ry: number, step: number, seed: number) {
  const out: { x: number; y: number; o: number; r: number }[] = [];
  let i = seed;
  for (let gx = -rx; gx <= rx; gx += step) {
    for (let gy = -ry; gy <= ry; gy += step) {
      i += 1;
      const edge = (gx / rx) ** 2 + (gy / ry) ** 2;
      if (edge > 1 || rand(i) < 0.16 + edge * 0.4) continue;
      out.push({
        x: round(cx + gx + (rand(i * 1.7) - 0.5) * step * 0.55),
        y: round(cy + gy + (rand(i * 2.3) - 0.5) * step * 0.55),
        o: round(0.16 + (1 - edge) * 0.42, 1000),
        r: rand(i * 3.1) > 0.86 ? 2.2 : 1.5,
      });
    }
  }
  return out;
}

export function HeroScene() {
  const wrap = useRef<HTMLDivElement>(null);
  const [reduced, setReduced] = useState(false);
  const [pings, setPings] = useState<Record<string, number>>({ CANADA: 0, NIGERIA: 0 });

  const caDots = useMemo(() => blob(CA.x, CA.y, 224, 108, 15, 10), []);
  const ngDots = useMemo(() => blob(NG.x, NG.y, 94, 76, 13, 900), []);
  const dotsCA = useMemo(
    () => caDots.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r={p.r} fillOpacity={p.o} />),
    [caDots],
  );
  const dotsNG = useMemo(
    () => ngDots.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r={p.r} fillOpacity={p.o} />),
    [ngDots],
  );

  const gGrat = useRef<SVGGElement>(null);
  const clip = useRef<SVGRectElement>(null);
  const bar = useRef<SVGRectElement>(null);
  const gMap = useRef<SVGGElement>(null);
  const gArc = useRef<SVGGElement>(null);
  const gCone = useRef<SVGGElement>(null);
  const gEcho = useRef<SVGGElement>(null);
  const gWake = useRef<SVGGElement>(null);
  const gEdge = useRef<SVGGElement>(null);
  const gFig = useRef<SVGGElement>(null);
  const gHead = useRef<SVGGElement>(null);
  const gRet = useRef<SVGGElement>(null);

  const st = useRef({
    t: 0,
    boot: 0,
    mode: 0, // 0 dwell-NG · 1 →CA · 2 dwell-CA · 3 →NG
    modeT: 0,
    beam: MID_ANG,
    echo: MID_ANG,
    wake: MID_ANG,
    head: 0,
    ptrAng: MID_ANG,
    ptrInf: 0,
    idle: 9,
    pxT: 0,
    pyT: 0,
    px: 0,
    py: 0,
    retX: NG.x,
    retY: NG.y,
    retOp: 0,
    locked: "NIGERIA",
    edgeFlash: -9,
    hit: { CANADA: -9, NIGERIA: -9 } as Record<string, number>,
    linger: { CANADA: 0, NIGERIA: 0 } as Record<string, number>,
  });

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => setReduced(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  // Pointer → beam target + parallax (writes to the ref, never to React state).
  useEffect(() => {
    if (reduced) return;
    const el = wrap.current;
    if (!el) return;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const r = el.getBoundingClientRect();
        if (!r.width) return;
        const scale = Math.max(r.width / VB.w, r.height / VB.h);
        const ox = (r.width - VB.w * scale) / 2;
        const oy = (r.height - VB.h * scale) / 2;
        const px = (e.clientX - r.left - ox) / scale;
        const py = (e.clientY - r.top - oy) / scale;
        if (px < -160 || px > VB.w + 160 || py < -160 || py > VB.h + 160) return;
        let a = (Math.atan2(py - EYE.y, px - EYE.x) * 180) / Math.PI;
        if (a < 0) a += 360;
        const s = st.current;
        s.ptrAng = Math.max(116, Math.min(234, a));
        s.idle = 0;
        s.pxT = ((VB.w / 2 - px) / VB.w) * 26;
        s.pyT = ((VB.h / 2 - py) / VB.h) * 18;
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  // Main animation loop.
  useEffect(() => {
    const s = st.current;
    const rot = (el: SVGGElement | null, a: number, cx: number, cy: number) =>
      el?.setAttribute("transform", `rotate(${round(a, 1000)} ${cx} ${cy})`);

    if (reduced) {
      s.boot = 1;
      if (gGrat.current) gGrat.current.style.opacity = "1";
      clip.current?.setAttribute("width", String(VB.w));
      if (bar.current) bar.current.style.opacity = "0";
      if (gArc.current) gArc.current.style.opacity = "1";
      gMap.current?.setAttribute("transform", "translate(0 0)");
      if (gFig.current) {
        gFig.current.style.opacity = "1";
        gFig.current.setAttribute("transform", "translate(0 0)");
      }
      rot(gCone.current, MID_ANG, EYE.x, EYE.y);
      if (gCone.current) gCone.current.style.opacity = "0.78";
      if (gEcho.current) gEcho.current.style.opacity = "0";
      if (gWake.current) gWake.current.style.opacity = "0";
      if (gEdge.current) gEdge.current.style.opacity = "0.5";
      if (gRet.current) {
        gRet.current.setAttribute("transform", `translate(${NG.x} ${NG.y})`);
        gRet.current.style.opacity = "0.7";
      }
      return;
    }

    const DWELL = 1.5;
    const TRAV = 1.15;
    let last = performance.now();
    const raf = { id: 0 };

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      s.t += dt;
      s.boot = Math.min(1, s.boot + dt / 1.5);

      // --- auto sweep: dwell / traverse ---
      s.modeT += dt;
      const dur = s.mode === 1 || s.mode === 3 ? TRAV : DWELL;
      if (s.modeT >= dur) {
        s.modeT -= dur;
        s.mode = (s.mode + 1) % 4;
      }
      const jit = Math.sin(s.t * 1.7) * 1.1 + Math.sin(s.t * 0.9) * 0.5;
      let autoA: number;
      if (s.mode === 0) autoA = NG_ANG + jit;
      else if (s.mode === 2) autoA = CA_ANG + jit;
      else {
        const p = easeInOut(clamp01(s.modeT / TRAV));
        const from = s.mode === 1 ? NG_ANG : CA_ANG;
        const to = s.mode === 1 ? CA_ANG : NG_ANG;
        autoA = from + (to - from) * p + Math.sin(p * Math.PI) * 3 * (to > from ? 1 : -1);
      }

      // --- pointer influence (continuous blend) ---
      s.idle += dt;
      const engaged = s.idle < 1.8;
      s.ptrInf = approach(s.ptrInf, engaged ? 1 : 0, dt / (engaged ? 0.28 : 0.8));
      const targetA = autoA + (s.ptrAng - autoA) * s.ptrInf;

      s.beam = approach(s.beam, targetA, dt / 0.1);
      s.echo = approach(s.echo, s.beam, dt / 0.13);
      s.wake = approach(s.wake, s.beam, dt / 0.22);
      s.head = approach(s.head, (s.beam - MID_ANG) * 0.16, dt / 0.22);

      // --- detection: the beam lingering on a territory locks it ---
      for (const m of MARKERS) {
        const near = Math.abs(s.beam - m.ang) < 3.6;
        s.linger[m.id] = near ? s.linger[m.id] + dt : 0;
        if (s.linger[m.id] > 0.32 && s.t - s.hit[m.id] > 1.5) {
          s.hit[m.id] = s.t;
          s.locked = m.id;
          s.edgeFlash = s.t;
          setPings((prev) => ({ ...prev, [m.id]: prev[m.id] + 1 }));
        }
      }
      const lp = s.locked === "CANADA" ? CA : NG;
      s.retX = approach(s.retX, lp.x, dt / 0.14);
      s.retY = approach(s.retY, lp.y, dt / 0.14);
      const fresh = s.t - s.hit[s.locked] < 2.6;
      s.retOp = approach(s.retOp, fresh ? 0.9 : 0, dt / (fresh ? 0.18 : 0.6));

      // --- parallax: slow idle drift + pointer ---
      s.px = approach(s.px, engaged ? s.pxT : 0, dt / 0.55);
      s.py = approach(s.py, engaged ? s.pyT : 0, dt / 0.55);
      const parX = Math.sin(s.t * 0.16) * 6 + s.px;
      const parY = Math.cos(s.t * 0.12) * 4 + s.py;

      // --- boot staging ---
      const bGrat = clamp01(s.boot / 0.22);
      const bDots = clamp01((s.boot - 0.12) / 0.4);
      const bArc = clamp01((s.boot - 0.36) / 0.3);
      const bFig = clamp01((s.boot - 0.5) / 0.32);
      const bCone = clamp01((s.boot - 0.72) / 0.28);
      const flash = Math.max(0, 1 - (s.t - s.edgeFlash) / 0.45);

      // --- write DOM ---
      if (gGrat.current) gGrat.current.style.opacity = String(round(bGrat, 1000));
      if (clip.current) {
        const w = round(VB.w * easeInOut(bDots));
        clip.current.setAttribute("width", String(w));
        if (bar.current) {
          bar.current.setAttribute("x", String(w));
          bar.current.style.opacity = String(bDots > 0.001 && bDots < 0.999 ? 0.7 : 0);
        }
      }
      if (gArc.current) gArc.current.style.opacity = String(round(bArc, 1000));
      if (gFig.current) {
        gFig.current.style.opacity = String(round(bFig, 1000));
        gFig.current.setAttribute("transform", `translate(0 ${round((1 - bFig) * 14)})`);
      }
      rot(gHead.current, s.head, HEAD.x, HEAD.y);
      gMap.current?.setAttribute("transform", `translate(${round(parX)} ${round(parY)})`);

      rot(gCone.current, s.beam, EYE.x, EYE.y);
      rot(gEcho.current, s.echo, EYE.x, EYE.y);
      rot(gWake.current, s.wake, EYE.x, EYE.y);
      if (gCone.current) gCone.current.style.opacity = String(round(bCone * (0.82 + flash * 0.18), 1000));
      if (gEdge.current) gEdge.current.style.opacity = String(round(bCone * (0.6 + flash * 0.4), 1000));
      if (gEcho.current) gEcho.current.style.opacity = String(round(bCone * 0.36, 1000));
      if (gWake.current) gWake.current.style.opacity = String(round(bCone * 0.2, 1000));

      if (gRet.current) {
        gRet.current.setAttribute("transform", `translate(${round(s.retX)} ${round(s.retY)})`);
        gRet.current.style.opacity = String(round(s.retOp, 1000));
      }

      raf.id = requestAnimationFrame(tick);
    };
    raf.id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.id);
  }, [reduced]);

  const CONE = `M${EYE.x},${EYE.y} L${EYE.x + 660},${EYE.y - 106} L${EYE.x + 660},${EYE.y + 106} Z`;
  const WAKE = `M${EYE.x},${EYE.y} L${EYE.x + 660},${EYE.y - 150} L${EYE.x + 660},${EYE.y + 150} Z`;
  const initRot = `rotate(${MID_ANG} ${EYE.x} ${EYE.y})`;

  return (
    <div ref={wrap} aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <svg viewBox={`0 0 ${VB.w} ${VB.h}`} preserveAspectRatio="xMidYMid slice" className="h-full w-full opacity-90">
        <defs>
          <radialGradient id="hs-cone" cx="0%" cy="50%" r="120%">
            <stop offset="0%" stopColor="#38d6e6" stopOpacity="0.42" />
            <stop offset="42%" stopColor="#38d6e6" stopOpacity="0.13" />
            <stop offset="100%" stopColor="#38d6e6" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="hs-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#38d6e6" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#38d6e6" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="hs-arc" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2f68f0" />
            <stop offset="100%" stopColor="#38d6e6" />
          </linearGradient>
          <linearGradient id="hs-edge" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#8ef4ff" stopOpacity="0.95" />
            <stop offset="70%" stopColor="#38d6e6" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#38d6e6" stopOpacity="0" />
          </linearGradient>
          <clipPath id="hs-dotclip">
            <rect ref={clip} x="0" y="0" width={VB.w} height={VB.h} />
          </clipPath>
        </defs>

        <g ref={gGrat} stroke="#ffffff" strokeOpacity="0.05" fill="none">
          {Array.from({ length: 9 }, (_, r) => (
            <path key={`h${r}`} d={`M0,${40 + r * 95} Q600,${8 + r * 95} 1200,${40 + r * 95}`} />
          ))}
          {Array.from({ length: 13 }, (_, c) => (
            <line key={`v${c}`} x1={c * 100} y1="0" x2={c * 100} y2="800" />
          ))}
        </g>

        {/* map + markers (parallax) */}
        <g ref={gMap} transform="translate(0 0)">
          <g clipPath="url(#hs-dotclip)">
            <g fill="#7ea9d8">{dotsCA}</g>
            <g fill="#5fd6e6">{dotsNG}</g>
          </g>
          <rect ref={bar} x="0" y="0" width="2.5" height={VB.h} fill="#8ef4ff" opacity="0" />

          <g ref={gArc} style={{ opacity: 0 }}>
            <path d={ARC} fill="none" stroke="url(#hs-arc)" strokeOpacity="0.5" strokeWidth="1.5" strokeDasharray="2 6" id="hs-arcpath" />
            <circle r="3.2" fill="#eaf2ff" className="hs-fade">
              <animateMotion dur="5s" repeatCount="indefinite" calcMode="linear">
                <mpath href="#hs-arcpath" />
              </animateMotion>
            </circle>
          </g>

          {MARKERS.map((m) => (
            <g key={m.id}>
              <circle cx={m.p.x} cy={m.p.y} r="32" fill="url(#hs-glow)" />
              <circle cx={m.p.x} cy={m.p.y} r="13" fill="none" stroke="#eaf2ff" strokeOpacity="0.5" strokeWidth="1" />
              <circle cx={m.p.x} cy={m.p.y} r="5.5" fill="#eaf2ff" />
              {pings[m.id] > 0 && (
                <circle key={pings[m.id]} cx={m.p.x} cy={m.p.y} fill="none" stroke="#38d6e6" strokeWidth="1.5">
                  <animate attributeName="r" from="7" to="42" dur="1.1s" fill="freeze" />
                  <animate attributeName="opacity" from="0.85" to="0" dur="1.1s" fill="freeze" />
                </circle>
              )}
              <text x={m.p.x + 24} y={m.p.y - 15} className="hs-label" fill="#d6e4f4">
                {m.label}
              </text>
              <text x={m.p.x + 24} y={m.p.y + 2} className="hs-code" fill="#8fb2d6">
                {m.code}
              </text>
            </g>
          ))}

          {/* lock-on reticle (driven by the loop) */}
          <g ref={gRet} transform={`translate(${NG.x} ${NG.y})`} style={{ opacity: 0 }} stroke="#38d6e6" strokeWidth="1.5" fill="none">
            <circle r="18" />
            <path d="M-28,0 h15 M13,0 h15 M0,-28 v15 M0,13 v15" />
          </g>
        </g>

        {/* scan beam: wake (trail) · echo · cone + bright leading edge */}
        <g ref={gWake} transform={initRot} style={{ opacity: 0 }}>
          <path d={WAKE} fill="url(#hs-cone)" />
        </g>
        <g ref={gEcho} transform={initRot} style={{ opacity: 0 }}>
          <path d={CONE} fill="url(#hs-cone)" />
        </g>
        <g ref={gCone} transform={initRot} style={{ opacity: 0 }}>
          <path d={CONE} fill="url(#hs-cone)" />
          <path d={`M${EYE.x},${EYE.y - 106} L${EYE.x + 660},${EYE.y - 106}`} stroke="#38d6e6" strokeOpacity="0.28" strokeWidth="1" fill="none" />
          <path d={`M${EYE.x},${EYE.y + 106} L${EYE.x + 660},${EYE.y + 106}`} stroke="#38d6e6" strokeOpacity="0.28" strokeWidth="1" fill="none" />
          {Array.from({ length: 5 }, (_, i) => {
            const x = EYE.x + 150 + i * 120;
            return <line key={i} x1={x} y1={EYE.y - 5} x2={x} y2={EYE.y + 5} stroke="#38d6e6" strokeOpacity="0.28" strokeWidth="1" />;
          })}
          <g ref={gEdge} style={{ opacity: 0 }}>
            <path d={`M${EYE.x},${EYE.y} L${EYE.x + 690},${EYE.y}`} stroke="url(#hs-edge)" strokeWidth="6" strokeLinecap="round" fill="none" />
            <path d={`M${EYE.x},${EYE.y} L${EYE.x + 690},${EYE.y}`} stroke="#c9fbff" strokeWidth="1.6" strokeLinecap="round" fill="none" />
          </g>
        </g>

        {/* sentry figure */}
        <g ref={gFig} transform="translate(0 0)" style={{ opacity: 0 }}>
          <g fill="#0c1b2b" stroke="#38d6e6" strokeOpacity="0.24" strokeWidth="1.5">
            <path d="M974,356 C950,382 942,456 936,564 L936,800 L1128,800 L1128,564 C1124,456 1108,380 1076,356 Z" />
            <path d="M982,364 L1000,314 L1017,320 L1001,370 Z" />
            <path d="M1066,362 L1044,314 L1028,320 L1052,368 Z" />
          </g>
          <g ref={gHead} transform={`rotate(0 ${HEAD.x} ${HEAD.y})`}>
            <g fill="#0c1b2b" stroke="#38d6e6" strokeOpacity="0.24" strokeWidth="1.5">
              <circle cx="1004" cy="298" r="30" />
              <path d="M980,290 Q1010,258 1041,290 Q1010,273 981,292 Z" />
              <path d="M983,291 L952,298 L986,302 Z" />
            </g>
            <rect x="981" y="284" width="21" height="27" rx="6" fill="#12283b" stroke="#38d6e6" strokeOpacity="0.55" strokeWidth="1.5" />
            <rect x="1006" y="284" width="21" height="27" rx="6" fill="#12283b" stroke="#38d6e6" strokeOpacity="0.55" strokeWidth="1.5" />
            <rect x="1000" y="290" width="8" height="9" fill="#12283b" />
            <circle cx="987" cy="298" r="9" fill="url(#hs-glow)" />
            <circle cx="1021" cy="298" r="9" fill="url(#hs-glow)" />
          </g>
        </g>

        <text x="590" y="756" className="hs-code" fill="#5f7f9c">
          CONTINUOUS SCAN · NORTH AMERICA + SUB-SAHARAN AFRICA
        </text>
      </svg>
    </div>
  );
}
