import Link from "next/link";
import { Footer } from "../components/Footer";
import { GarmentStudio } from "../components/designer/GarmentStudio";
import { Nav } from "../components/Nav";
import { QuoteForm } from "../components/QuoteForm";
import styles from "./home.module.css";

const families = [
  ["01", "Daily uniform", "Shirts, trousers, skirts and layers made for the everyday school routine."],
  ["02", "Formal identity", "Blazers, ties and knitwear that make every school instantly recognisable."],
  ["03", "Active programme", "Sports kits, house colours and staffwear designed for movement and repeat wear."],
];
const process = [
  ["01", "Listen", "We map the school, season, quantity and visual brief."],
  ["02", "Sample", "You approve fabric, fit, colour and logo placement."],
  ["03", "Produce", "We manufacture and check every batch against the approved sample."],
  ["04", "Deliver", "Clear packing and scheduled delivery for your uniform calendar."],
];

export default function Home() {
  return <><Nav /><main className={`${styles.theme} home`}>
    <section className="home-hero">
      <div className="home-hero-copy">
            <p className="eyebrow">Institutional uniform manufacturing · Nepal</p>
            <h1>Made for every<br /><em>working day.</em></h1>
            <p className="hero-lede">Distinctive uniforms for schools, colleges and healthcare teams—from first sketch and sample through to every delivery.</p>
        <div className="hero-actions"><Link className="button" href="/quote">Start a uniform brief <span>↗</span></Link><a className="home-link" href="#designer">Build a look in 3D <span>↓</span></a></div>
        <div className="hero-caption"><span>Built for</span><strong>Learning, care<br />and belonging.</strong></div>
      </div>
      <div className="home-hero-visual">
        <div className="hero-arch" /><div className="hero-image-wrap"><img src="/images/uniform-world-sectors.png" alt="School, doctor and nurse uniforms" /></div>
        <p className="hero-stamp">UN · 01<br />INSTITUTIONAL<br />UNIFORM</p>
        <div className="hero-note"><span>Every colour</span><span>Every crest</span><span>Every routine</span></div>
      </div>
    </section>
    <section className="home-intro-strip" aria-label="Uniform Nepal strengths"><p>Uniforms are not stock. They are your school, made tangible.</p><div><span>Custom colours</span><span>Approved samples</span><span>Institutional quantities</span></div></section>
    <section className="home-families">
      <div className="section-heading"><p className="eyebrow">One partner, every layer</p><h2>Build a complete<br />uniform system.</h2></div>
      <div className="family-list">{families.map(([number, title, copy]) => <article key={number} className="family-card"><span>{number}</span><h3>{title}</h3><p>{copy}</p><Link href="/products">Explore uniforms <b>↗</b></Link></article>)}</div>
    </section>
    <section className="home-designer-intro"><div><p className="eyebrow">Try a direction before the sample</p><h2>See the school<br /><em>take shape.</em></h2></div><p>Choose the garment, establish a colour direction and preview logo placement. Then take the preferred direction into sampling with our team.</p></section>
    <div id="designer"><GarmentStudio /></div>
    <section className="home-process">
      <div className="section-heading"><p className="eyebrow">A clear route to uniform</p><h2>From school brief<br />to school gate.</h2></div>
      <div className="process-list">{process.map(([number, title, copy]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p></article>)}</div>
      <Link className="home-link process-link" href="/process">See the full process <span>↗</span></Link>
    </section>
    <section className="home-quote"><div><p className="eyebrow">A uniform programme starts here</p><h2>Tell us what your<br /><em>school needs.</em></h2><p>Share the essential details. We will help shape the next practical step.</p></div><QuoteForm /></section>
  </main><Footer /></>;
}
