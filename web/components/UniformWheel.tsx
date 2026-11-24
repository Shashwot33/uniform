"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
const garments = [
  { id: "shirt", name: "School shirt", icon: "◒", angle: -90 },
  { id: "trouser", name: "Trousers", icon: "║", angle: -38 },
  { id: "skirt", name: "Skirt", icon: "△", angle: 18 },
  { id: "blazer", name: "Blazer", icon: "▣", angle: 70 },
  { id: "sweater", name: "Sweater", icon: "◇", angle: 122 },
  { id: "sports", name: "Sportswear", icon: "◉", angle: 174 },
  { id: "tie", name: "Tie & accessories", icon: "│", angle: 226 }
];
const colours = ["#102c51", "#ffffff", "#7b2639", "#6e8f63", "#c69a36"];
export function UniformWheel() { const [selected, setSelected] = useState(garments[0]); const [colour, setColour] = useState(colours[0]); const position = useMemo(() => (item: typeof garments[number]) => ({ transform: `translate(-50%, -50%) rotate(${item.angle}deg) translateY(-188px) rotate(${-item.angle}deg)` }), []); return <section className="wheel-section"><div className="wheel-copy"><span className="eyebrow" style={{ color: "#53738f" }}>Illustrative uniform customiser</span><h1>Choose a piece.<br/>Build the identity.</h1><p>Select a garment around the wheel, then explore its school colour direction. The visual is illustrative; our manufacturing team confirms final fabrics, colours and construction during sampling.</p><div className="swatches">{colours.map((value) => <button aria-label={`Choose ${value}`} className={colour === value ? "swatch active" : "swatch"} key={value} style={{ background: value }} onClick={() => setColour(value)}/>)}</div><p className="selected-name">Selected: <strong>{selected.name}</strong></p><Link className="button" href={`/customize?garment=${encodeURIComponent(selected.name)}&colour=${encodeURIComponent(colour)}`}>Continue to manufacturing brief →</Link></div><div className="wheel-stage"><div className="wheel"><div className="wheel-ring"/>{garments.map((item) => <button aria-label={`Select ${item.name}`} className={selected.id === item.id ? "wheel-item active" : "wheel-item"} key={item.id} style={position(item)} onClick={() => setSelected(item)}><i>{item.icon}</i><span>{item.name}</span></button>)}<div className="uniform-preview"><div className={`garment-shape ${selected.id}`} style={{ backgroundColor: colour }}><i/></div><p>{selected.name}</p></div></div></div></section>; }
