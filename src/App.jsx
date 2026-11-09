import { lazy, Suspense, useEffect, useState } from 'react';
import { Link, NavLink, Routes, Route, useLocation } from 'react-router-dom';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, BookOpen, ExternalLink, Github, GraduationCap, Layers3, Linkedin, Menu, MoveUpRight, Network, Sparkles, X, Compass, Building2, FlaskConical, Globe2, HeartHandshake, Award, CheckCircle2, ArrowUp, MapPin, ChevronDown, Quote, MousePointer2 } from 'lucide-react';
const GlassEcosystem = lazy(() => import('./GlassEcosystem.jsx'));

const PROFILES = {
  scholar: 'https://scholar.google.com/citations?hl=id&user=h7iSvjMAAAAJ&view_op=list_works&sortby=pubdate',
  scopus: 'https://www.scopus.com/authid/detail.uri?authorId=57213221087',
  orcid: 'https://orcid.org/0000-0001-5508-0763',
  sinta: 'https://sinta.kemdiktisaintek.go.id/authors/profile/6118877',
  linkedin: 'https://www.linkedin.com/in/jefrijunifer',
  github: 'https://github.com/jefrijunifer'
};
const AVATAR = 'https://avatars.githubusercontent.com/u/109671988?v=4&size=800';
const PILLARS = [
  {num:'01',title:'Students',icon:GraduationCap,description:'Helping future professionals build the character, confidence, and capabilities to lead.'},
  {num:'02',title:'Research',icon:FlaskConical,description:'Connecting rigorous inquiry with practical ideas and new possibilities.'},
  {num:'03',title:'Industry',icon:Building2,description:'Bridging the classroom with the evolving realities of professional practice.'},
  {num:'04',title:'Society',icon:HeartHandshake,description:'Looking beyond campus to understand and respond to the needs of communities.'}
];
const PUBLICATIONS = [
  {year:'2026',tag:'Digital Transformation',title:'Penerapan Digital Marketing dan IoT pada Arjuna Farm untuk Peningkatan Penjualan dan Presisi Ternak',venue:'Jurnal Malikussaleh Mengabdi',description:'Applying digital marketing and connected technologies to an agricultural business context.',url:'https://doi.org/10.29103/jmm.v5i1.23033'},
  {year:'2025',tag:'AI & Data',title:'Dynamic Sentiment Analysis on the Emergence of Pre-Trained Generative Model-Based Applications in Indonesia',venue:'International Journal of Advanced Computer Science and Applications, 16(12)',description:'Investigating how generative AI applications are discussed and perceived in Indonesia.',url:'https://doi.org/10.14569/IJACSA.2025.01612111'},
  {year:'2025',tag:'AI & Education',title:'Generative AI for Students Courses: Evaluating the Impact on Fresh Graduate Performance',venue:'16th International Conference on e-Education, e-Business, e-Management and e-Learning',description:'Exploring generative AI learning and its relationship to graduate readiness.',url:'https://doi.org/10.1109/IC4e65071.2025.11075401'},
  {year:'2025',tag:'Digital Transformation',title:'Digitalisasi Operasional UMKM Indekos: Implementasi Aplikasi Manajemen Penghuni, Pembayaran, dan Keluhan di Kota Medan',venue:'ABDIKAN, 4(4)',description:'Digitization of everyday business operations for a local small enterprise in Medan.',url:'https://doi.org/10.55123/abdikan.v4i4.6655'}
];
const JOURNEY = [
  {years:'2026 — Present',eyebrow:'Academic leadership',role:'Head of Information Systems Department',place:'BINUS University · Medan',detail:'Guiding program development with a focus on future-ready graduates and meaningful connections across the academic ecosystem.'},
  {years:'2025 — Present',eyebrow:'Teaching & research',role:'Faculty Member & Researcher',place:'BINUS University',detail:'Continuing academic inquiry and student development in Information Systems.'},
  {years:'2025',eyebrow:'Department leadership',role:'Head of Information Systems Department',place:'Universitas Pelita Harapan · Medan',detail:'Leading the academic program and supporting curriculum, faculty, and student development.'},
  {years:'2022 — 2024',eyebrow:'Academic quality',role:'Quality Officer',place:'Universitas Pelita Harapan · Medan',detail:'Contributing to academic quality assurance and continuous improvement.'},
  {years:'2020 — 2021',eyebrow:'International industry',role:'Web Designer',place:'Souraku Co., Ltd. · Osaka, Japan',detail:'Applying design and digital experience in an international professional setting.'},
  {years:'2019 — 2020',eyebrow:'International industry',role:'IT Support',place:'Alpha Plus Co., Ltd. · Osaka, Japan',detail:'Hands-on experience in systems, devices, networks, and technology support.'},
  {years:'2016 — 2025',eyebrow:'Academic development',role:'Lecturer & Researcher',place:'Universitas Pelita Harapan · Medan',detail:'A multi-stage academic journey across full-time and part-time appointments, teaching, research, and mentoring.'},
  {years:'2011 — 2015',eyebrow:'The beginning',role:'Part-time Lecturer',place:'STMIK Mikroskil · Medan',detail:'The start of a journey devoted to sharing knowledge and preparing young people for what comes next.'}
];
const CERTIFICATIONS = [
  {title:'Agile Scrum Fundamentals',year:'2025',category:'Management & Business'},
  {title:'Microsoft Certified: Azure AI Fundamentals',year:'2025',category:'AI & Technology'},
  {title:'Business Intelligence Associate',year:'2025',category:'Management & Business'},
  {title:'PMI Project Management Ready',year:'2025',category:'Management & Business'},
  {title:'IT Specialist — Python',year:'2024',category:'AI & Technology'},
  {title:'IT Specialist — Artificial Intelligence',year:'2024',category:'AI & Technology'},
  {title:'Microsoft Office Specialist — Word Associate',year:'2024',category:'Education & Productivity'},
  {title:'IT Specialist — Computational Thinking',year:'2023',category:'AI & Technology'},
  {title:'Microsoft Office Specialist — Excel Associate',year:'2023',category:'Education & Productivity'},
  {title:'Microsoft Certified Educator',year:'2023',category:'Education & Productivity'},
  {title:'Certified in Risk Management',year:'2022',category:'Management & Business'},
  {title:'National Lecturer Certification',year:'2020',category:'Education & Productivity'}
];

function Eyebrow({children,dark=false}) {return <div className={'eyebrow'+(dark?' eyebrow--dark':'')}><span className="eyebrow__mark"/>{children}</div>}
function External({href,children,className=''}) {return <a href={href} target="_blank" rel="noopener noreferrer" className={className}>{children}<ArrowUpRight aria-hidden="true" size={16}/></a>}
function SectionTop({number,label}) {return <div className="section-top"><span>{number}</span><span>{label}</span><span className="section-top__line"/></div>}
function Portrait({className=''}) {
  const [ok,setOk]=useState(true);
  return <div className={'portrait '+className}>{ok?<img src={AVATAR} alt="Jefri Junifer Pangaribuan — GitHub profile portrait" loading="lazy" onError={()=>setOk(false)} />:<div className="portrait__fallback"><span>JJP.</span><small>PERSONAL PORTRAIT</small></div>}<div className="portrait__label"><span className="live-dot"/> JEFRI JUNIFER PANGARIBUAN</div></div>;
}
function ButtonLink({to,children,outline=false}) {return <Link to={to} className={'button-link '+(outline?'button-link--outline':'')}>{children}<ArrowUpRight size={17} strokeWidth={1.8}/></Link>}
function BackHome(){return <Link className="back-link" to="/"><ArrowLeft size={16}/> Back to home</Link>}

function Header(){
  const [open,setOpen]=useState(false);
  const {pathname}=useLocation();
  useEffect(()=>setOpen(false),[pathname]);
  return <header className="site-header"><div className="nav-shell"><Link className="brand" to="/" aria-label="Jefri Junifer Pangaribuan, home"><span className="brand__symbol">J<span>.</span>JP</span><span className="brand__line"/><span className="brand__descriptor">ACADEMIC LEADER<br/> & RESEARCHER</span></Link>
    <nav className="desktop-nav" aria-label="Primary navigation"><NavLink to="/" end>Home</NavLink><NavLink to="/about">About</NavLink><NavLink to="/leadership">Leadership</NavLink><NavLink to="/research">Research</NavLink><NavLink to="/journey">Journey</NavLink></nav>
    <Link to="/#connect" className="nav-contact">Let's connect <ArrowUpRight size={15}/></Link>
    <button className="mobile-toggle" onClick={()=>setOpen(v=>!v)} aria-label={open?'Close navigation':'Open navigation'} aria-expanded={open}>{open?<X size={24}/>:<Menu size={24}/>}</button>
  </div>
  {open&&<nav className="mobile-nav" aria-label="Mobile navigation">{[['/','Home'],['/about','About'],['/leadership','Leadership'],['/research','Research'],['/journey','Journey'],['/#connect','Connect']].map(([url,label])=><Link key={url} to={url} onClick={()=>setOpen(false)}>{label}<ArrowUpRight size={18}/></Link>)}</nav>}</header>;
}
function Footer(){
  return <footer className="footer" id="connect">
    <div className="container footer__main"><div><Eyebrow dark>THE NEXT CHAPTER</Eyebrow><h2>Let's build<br/><em>something meaningful.</em></h2><p>Open to conversations around research, academic development, digital innovation, and collaborative opportunities.</p><External href={PROFILES.linkedin} className="footer__cta">Connect on LinkedIn</External></div>
    <div className="footer__side"><span className="footer__side-label">FIND ME ELSEWHERE</span><External href={PROFILES.scholar}>Google Scholar</External><External href={PROFILES.scopus}>Scopus</External><External href={PROFILES.orcid}>ORCID</External><External href={PROFILES.sinta}>SINTA</External><External href={PROFILES.github}>GitHub</External></div></div>
    <div className="container footer__bottom"><span>© {new Date().getFullYear()} Jefri Junifer Pangaribuan</span><span>Research · Leadership · Impact</span><a href="#top" aria-label="Back to top">Back to top <ArrowUp size={14}/></a></div>
  </footer>;
}
function Home(){
  return <main>
    <section className="hero">
      <div className="container hero__grid">
        <div className="hero__copy">
          <Eyebrow>ACADEMIC LEADER & RESEARCHER <span className="eyebrow__location">/ MEDAN, INDONESIA</span></Eyebrow>
          <h1>Building<br/><span>Ecosystems.</span><br/>Empowering<br/><em>Generations.</em></h1>
          <p className="hero__lede">Advancing Information Systems and Digital Transformation through research, academic leadership, and meaningful collaboration.</p>
          <div className="hero__actions"><ButtonLink to="/about">Discover my story</ButtonLink><Link className="text-link" to="/research">Explore research <ArrowUpRight size={17}/></Link></div>
          <div className="hero__smallnote"><span className="hero__smallnote-line"/> <span>Where knowledge becomes innovation<br/>and people become possibility.</span></div>
        </div>
        <div className="hero__visual"><Suspense fallback={<div className="ecosystem ecosystem__fallback">Connecting the ecosystem…</div>}><GlassEcosystem/></Suspense><div className="hero__visual-index">FIG. 01 <span>THE CONNECTED FUTURE</span></div></div>
      </div>
      <div className="container hero__bottom"><span>AN EDITORIAL PORTFOLIO / 2026</span><a href="#intro">SCROLL TO EXPLORE <ArrowDown size={15}/></a><span>01 — 06</span></div>
    </section>
    <section className="intro-section section-pad" id="intro"><div className="container"><SectionTop number="01" label="THE PERSPECTIVE"/><div className="intro-section__grid"><h2>Research creates innovation.<br/><em>Leadership prepares people</em><br/>to bring it to life.</h2><div className="intro-section__aside"><p>My work exists at the intersection of information systems, digital transformation, and academic leadership—connecting ideas with the people and places where they can matter.</p><ButtonLink to="/leadership" outline>My leadership philosophy</ButtonLink></div></div></div></section>
    <section className="about-peek section-pad"><div className="container"><SectionTop number="02" label="THE PERSON"/><div className="about-peek__grid"><Portrait className="about-peek__photo"/><div className="about-peek__copy"><Eyebrow>BEYOND THE TITLE</Eyebrow><h2>An educator<br/>at heart.<br/><em>A builder by purpose.</em></h2><p>My journey began in the classroom in 2011. Since then, it has taken me through international industry experience in Japan, research, academic quality, and university leadership.</p><p>Through each chapter, one conviction remains: the next generation deserves more than knowledge. They deserve direction, opportunity, and room to go further.</p><Link className="large-inline-link" to="/about">Read my story <ArrowUpRight size={23}/></Link></div></div></div></section>
    <section className="ecosystem-section section-pad"><div className="container"><SectionTop number="03" label="THE ECOSYSTEM"/><div className="ecosystem-section__heading"><div><Eyebrow>ACADEMIC LEADERSHIP</Eyebrow><h2>Stronger together.<br/><em>Greater in impact.</em></h2></div><p>I believe the future of education is built through connections—not silos. An integrated ecosystem brings four essential forces together.</p></div><div className="pillar-grid">{PILLARS.map(x=><Link to="/leadership" className="pillar-card" key={x.title}><div className="pillar-card__top"><span>{x.num} / 04</span><x.icon size={24} strokeWidth={1.4}/></div><h3>{x.title}</h3><p>{x.description}</p><ArrowUpRight className="pillar-card__arrow" size={19}/></Link>)}</div><Link className="large-inline-link" to="/leadership">Explore the ecosystem <ArrowUpRight size={23}/></Link></div></section>
    <section className="research-peek section-pad"><div className="container"><SectionTop number="04" label="THE RESEARCH"/><div className="research-peek__heading"><div><Eyebrow>SELECTED RESEARCH</Eyebrow><h2>Ideas worth<br/><em>exploring.</em></h2></div><p>A curated selection of research across artificial intelligence, digital transformation, and the human context of technology.</p></div><div className="research-peek__items">{PUBLICATIONS.slice(0,3).map((w,i)=><a href={w.url} target="_blank" rel="noopener noreferrer" className="research-row" key={w.title}><span className="research-row__num">0{i+1}</span><div><span className="research-row__meta">{w.year} / {w.tag}</span><h3>{w.title}</h3><span className="research-row__venue">{w.venue}</span></div><ArrowUpRight size={24} strokeWidth={1.3}/></a>)}</div><div className="research-peek__bottom"><Link className="large-inline-link" to="/research">See research portfolio <ArrowUpRight size={23}/></Link><span>CURATED, NOT EXHAUSTIVE</span></div></div></section>
    <section className="journey-peek section-pad"><div className="container"><SectionTop number="05" label="THE JOURNEY"/><div className="journey-peek__grid"><div><Eyebrow>SINCE 2011</Eyebrow><h2>Many chapters.<br/><em>One purpose.</em></h2><p>From my earliest classroom experiences in Medan to industry work in Osaka and academic leadership today—each chapter shapes how I connect ideas, people, and opportunity.</p><ButtonLink to="/journey">Explore my journey</ButtonLink></div><div className="journey-peek__timeline"><div><span>2011</span><strong>The beginning in education</strong><small>STMIK Mikroskil · Medan</small></div><div><span>2019–21</span><strong>An international perspective</strong><small>Industry experience · Osaka, Japan</small></div><div><span>2022–25</span><strong>Academic growth & leadership</strong><small>Universitas Pelita Harapan · Medan</small></div><div><span>2026 →</span><strong>Building the next chapter</strong><small>BINUS University · Medan</small></div></div></div></div></section>
  </main>;
}
function PageHero({eyebrow,title,italic,description,index}){return <section className="page-hero"><div className="container"><div className="page-hero__top"><Eyebrow>{eyebrow}</Eyebrow><span>CHAPTER {index} / 04</span></div><h1>{title}<br/><em>{italic}</em></h1><p>{description}</p><div className="page-hero__line"/></div></section>}
function About(){
  return <main><PageHero eyebrow="ABOUT / THE PERSON" title="Beyond academia." italic="Driven by purpose." description="A journey shaped by curiosity, a commitment to young people, and a belief that meaningful change begins when knowledge is shared." index="01"/>
    <section className="section-pad about-detail"><div className="container about-detail__grid"><Portrait className="about-detail__portrait"/><div className="about-detail__content"><Eyebrow>MY STORY</Eyebrow><h2>There is always<br/><em>a generation ahead.</em></h2><p>My academic journey began in 2011, driven by a simple belief: education is not only about passing on information. It is about preparing people for possibilities they may not yet see.</p><p>Over time, the journey expanded across teaching, research, academic quality assurance, and leadership. Working in Osaka, Japan also gave me a perspective on how technology, professional practice, and diverse experiences can enrich education.</p><p>Today, my work focuses on Information Systems, Digital Transformation, and building an academic environment where students, research, industry, and society can grow through connection.</p><External href={PROFILES.linkedin} className="text-link text-link--strong">Connect with me on LinkedIn</External></div></div></section>
    <section className="quote-section section-pad"><div className="container quote-section__grid"><Quote size={30} strokeWidth={1.2}/><blockquote>"Young people are like arrows in the hands of those who guide them. Our role is to prepare them with purpose, then help them travel further than we ever could."</blockquote><span>MY PERSPECTIVE ON EDUCATION & MENTORSHIP</span></div></section>
    <section className="section-pad values-section"><div className="container"><SectionTop number="01" label="WHAT GUIDES ME"/><div className="values-grid">{[{a:'01',t:'Curiosity',d:'Ask better questions. Explore beyond familiar answers.'},{a:'02',t:'Connection',d:'Build bridges between people, disciplines, and opportunities.'},{a:'03',t:'Responsibility',d:'Let knowledge serve a purpose beyond ourselves.'}].map(x=><div key={x.a}><span>{x.a}</span><h3>{x.t}</h3><p>{x.d}</p></div>)}</div></div></section>
    <section className="next-section"><div className="container"><span>CONTINUE THE STORY</span><Link to="/leadership">The ecosystem I aspire to build <ArrowUpRight size={25}/></Link></div></section>
  </main>;
}
function Leadership(){
  const [focus,setFocus]=useState(0);
  const selected=PILLARS[focus];
  return <main><PageHero eyebrow="LEADERSHIP / THE ECOSYSTEM" title="Connection is" italic="a form of leadership." description="I see academic leadership as the work of connecting people, knowledge, professional practice, and community needs—so that each becomes stronger through the others." index="02"/>
    <section className="section-pad leadership-vision"><div className="container"><SectionTop number="01" label="THE ECOSYSTEM I ASPIRE TO BUILD"/><div className="leadership-vision__header"><h2>Four forces.<br/><em>One shared future.</em></h2><p>My leadership vision is grounded in an integrated academic ecosystem. Explore the four dimensions and how they support one another.</p></div><div className="leadership-explorer"><div className="leadership-explorer__menu" role="tablist" aria-label="Ecosystem pillars">{PILLARS.map((x,i)=><button role="tab" aria-selected={focus===i} key={x.title} className={focus===i?'active':''} onClick={()=>setFocus(i)}><span>{x.num}</span>{x.title}<ArrowUpRight size={18}/></button>)}</div><div className="leadership-explorer__detail" role="tabpanel"><selected.icon size={52} strokeWidth={.9}/><span className="leadership-explorer__num">{selected.num} / ECOSYSTEM</span><h3>{selected.title}</h3><p>{selected.description}</p><div className="leadership-explorer__rule"/><small>PART OF AN INTERCONNECTED WHOLE</small></div></div></div></section>
    <section className="section-pad leadership-proof"><div className="container"><SectionTop number="02" label="EXPERIENCE THAT SHAPES THE VISION"/><div className="leadership-proof__grid"><div><Eyebrow>LEADERSHIP IN PRACTICE</Eyebrow><h2>Perspective built<br/><em>through experience.</em></h2><p>These chapters inform my approach. Documented initiatives and academic collaborations make the vision tangible.</p></div><div className="leadership-proof__list"><div><span>01 / DOCUMENTED INITIATIVE · 2024</span><h3>Generative AI for Students</h3><p>Part of the UPH faculty team awarded government support to develop a digital learning program in generative AI, delivered in the 2024/2025 academic year to students from multiple universities. <a href="https://www.uph.edu/id/2024/12/16/dosen-fti-uph-raih-hibah-kemendikbudristek-kembangkan-program-pembelajaran-generative-ai-for-students/" target="_blank" rel="noopener noreferrer" style={{textDecoration:'underline'}}>University story ↗</a></p></div><div><span>02 / ACADEMIC PROGRAMS</span><h3>Department leadership</h3><p>Head of Information Systems Department at BINUS University, following academic leadership at Universitas Pelita Harapan.</p></div><div><span>03 / ACADEMIC QUALITY</span><h3>Continuous improvement</h3><p>Experience in academic quality assurance, supporting a culture of reflection and improvement.</p></div><div><span>04 / INTERNATIONAL CONTEXT</span><h3>Industry-informed perspective</h3><p>Professional experience in web design and IT support in Osaka, Japan, connecting practice with academic perspectives.</p></div></div></div></div></section>
    <section className="quote-section section-pad"><div className="container quote-section__grid"><Network size={33} strokeWidth={1.1}/><blockquote>"I want to help build an educational ecosystem where students, industry, research, and society are not separate worlds—but connected possibilities."</blockquote><span>MY LEADERSHIP ASPIRATION</span></div></section>
    <section className="next-section"><div className="container"><span>CONTINUE THE STORY</span><Link to="/research">Where research meets real-world questions <ArrowUpRight size={25}/></Link></div></section>
  </main>;
}
function Research(){
  const [filter,setFilter]=useState('All');
  const options=['All','AI & Data','AI & Education','Digital Transformation'];
  const visible=filter==='All'?PUBLICATIONS:PUBLICATIONS.filter(p=>p.tag===filter);
  return <main><PageHero eyebrow="RESEARCH / THE CONTRIBUTION" title="Ideas become" italic="meaningful through impact." description="Exploring Information Systems and Digital Transformation, with particular interests in artificial intelligence, machine learning, and human-centered technology." index="03"/>
    <section className="section-pad research-interests"><div className="container"><SectionTop number="01" label="RESEARCH IDENTITY"/><div className="research-interests__grid"><div><h2>Research grounded in<br/><em>real questions.</em></h2><p>I am interested in how intelligent and digital systems can improve decisions, experiences, and opportunities across organizations and communities.</p></div><div className="interest-tags"><span>Information Systems</span><span>Digital Transformation</span><span>Artificial Intelligence</span><span>Machine Learning</span><span>Human-Centered Technology</span></div></div></div></section>
    <section className="section-pad publications-section"><div className="container"><SectionTop number="02" label="CURATED RESEARCH PORTFOLIO"/><div className="publications-section__heading"><div><Eyebrow>SELECTED PUBLICATIONS</Eyebrow><h2>A selection,<br/><em>not a catalogue.</em></h2></div><p>Chosen to represent the breadth of my research interests. For a complete and continuously updated record, visit my academic profiles.</p></div><div className="publication-filters" aria-label="Filter publications">{options.map(o=><button key={o} onClick={()=>setFilter(o)} className={o===filter?'is-active':''} aria-pressed={o===filter}>{o}</button>)}</div><div className="publication-list">{visible.map((p,i)=><article className="publication-item" key={p.title}><div className="publication-item__year">{p.year}<span>0{i+1}</span></div><div><span className="publication-item__tag">{p.tag}</span><h3>{p.title}</h3><p>{p.description}</p><span className="publication-item__venue">{p.venue}</span></div><External href={p.url} className="publication-item__open" >Source</External></article>)}</div><div className="publication-note">Publication metadata based on publicly indexed academic profiles. Please refer to publisher records for canonical bibliographic details.</div></div></section>
    <section className="section-pad academic-profiles"><div className="container"><SectionTop number="03" label="ACADEMIC PROFILES"/><h2>Explore the <em>full picture.</em></h2><div className="academic-profiles__grid">{[['Google Scholar','Publications & citation history',PROFILES.scholar],['Scopus','Indexed research profile',PROFILES.scopus],['ORCID','Researcher identifier',PROFILES.orcid],['SINTA','Indonesia research index',PROFILES.sinta]].map(([name,subtitle,url])=><External href={url} key={name} className="academic-profile"><strong>{name}</strong><small>{subtitle}</small></External>)}</div></div></section>
    <section className="next-section"><div className="container"><span>CONTINUE THE STORY</span><Link to="/journey">The experiences behind the work <ArrowUpRight size={25}/></Link></div></section>
  </main>;
}
function Journey(){
  const [all,setAll]=useState(false);
  return <main><PageHero eyebrow="JOURNEY / THE EXPERIENCE" title="Every chapter" italic="shapes what comes next." description="A curated view of the experiences that have shaped my work across higher education, industry, research, and academic leadership since 2011." index="04"/>
    <section className="section-pad journey-detail"><div className="container"><SectionTop number="01" label="CURATED CAREER JOURNEY"/><div className="journey-detail__intro"><h2>From the classroom<br/><em>to the wider world.</em></h2><p>Not a list of titles, but a journey of learning, practice, and leadership—across Indonesia and Japan.</p></div><div className="career-timeline">{JOURNEY.map((j,i)=><div className="career-item" key={j.role+j.years}><div className="career-item__year">{j.years}</div><div className="career-item__node"/><div className="career-item__info"><span>{j.eyebrow}</span><h3>{j.role}</h3><strong>{j.place}</strong><p>{j.detail}</p></div><span className="career-item__index">{String(i+1).padStart(2,'0')}</span></div>)}</div></div></section>
    <section className="section-pad credentials-section"><div className="container"><SectionTop number="02" label="PROFESSIONAL CREDENTIALS"/><div className="credentials-section__heading"><div><Eyebrow>LIFELONG LEARNING</Eyebrow><h2>Continuing to<br/><em>learn and evolve.</em></h2></div><p>Selected professional certifications in AI, technology, management, education, and analytics.</p></div><div className="credential-grid">{CERTIFICATIONS.slice(0,all?CERTIFICATIONS.length:6).map(c=><div className="credential" key={c.title}><Award size={22} strokeWidth={1.3}/><span>{c.category}</span><h3>{c.title}</h3><small>{c.year}</small></div>)}</div><button className="show-more" onClick={()=>setAll(x=>!x)}>{all?'Show fewer credentials':'View all 12 credentials'} <ChevronDown className={all?'rotated':''} size={18}/></button></div></section>
    <section className="next-section"><div className="container"><span>BACK TO THE BEGINNING</span><Link to="/">Explore the vision behind the journey <ArrowUpRight size={25}/></Link></div></section>
  </main>;
}
function NotFound(){return <main className="not-found container"><Eyebrow>404 / NOT FOUND</Eyebrow><h1>This path is still<br/><em>unwritten.</em></h1><p>The page you requested is not here.</p><ButtonLink to="/">Return home</ButtonLink></main>}
function ScrollReset(){const {pathname,hash}=useLocation();useEffect(()=>{if(hash){setTimeout(()=>document.getElementById(hash.slice(1))?.scrollIntoView({behavior:'smooth'}),70)}else window.scrollTo({top:0,behavior:'instant'});},[pathname,hash]);return null;}
function PageTitle(){const {pathname}=useLocation();useEffect(()=>{const page=pathname==='/'?'Home':pathname.slice(1).replace(/^./,c=>c.toUpperCase());document.title=(page==='Home'?'Jefri Junifer Pangaribuan — Academic Leader & Researcher':page+' | Jefri Junifer Pangaribuan');},[pathname]);return null;}
export default function App(){return <div id="top" className="site"><PageTitle/><ScrollReset/><Header/><Routes><Route path="/" element={<Home/>}/><Route path="/about" element={<About/>}/><Route path="/leadership" element={<Leadership/>}/><Route path="/research" element={<Research/>}/><Route path="/journey" element={<Journey/>}/><Route path="*" element={<NotFound/>}/></Routes><Footer/></div>}
