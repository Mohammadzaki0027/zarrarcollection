import { useState, useEffect, useRef, useCallback } from "react";

/* ─────────────── DATA ─────────────── */
const NAV_LINKS = ["Home", "Products", "Gallery", "Contact"];

const HERO_SLIDES = [
  {
    id: 1,
    title: "Eternal Elegance",
    subtitle: "Spring / Summer 2026",
    desc: "Where femininity meets artistry — curated gowns for the modern woman.",
    bg: "from-rose-900 via-pink-800 to-fuchsia-900",
    accent: "#f9a8d4",
    img:"/assets/products/image2.jpeg",
    catalogue: [
      { name: "Velvet Rose Gown",   price: 289, img:"/assets/products/hero1.jpeg", },
      { name: "Petal Midi Dress",   price: 179,img:"/assets/products/hero2.jpeg", },
      { name: "Blush Evening Wear", price: 319, img:"/assets/products/hero3.jpeg", },
    ],
  },
  {
    id: 2,
    title: "Midnight Garden",
    subtitle: "Evening Collection",
    desc: "Dramatic silhouettes that command every room, every moment.",
    bg: "from-slate-900 via-purple-900 to-indigo-900",
    accent: "#c4b5fd",
img:"/assets/products/image1.jpeg",
    catalogue: [
      { name: "Sapphire Satin Maxi", img:"/assets/products/hero1.jpeg", },
      { name: "Midnight Black Gown",  img:"/assets/products/hero2.jpeg", },
      { name: "Azure Mini Cut-Out",  img:"/assets/products/hero3.jpeg", },
    ],
  },
  {
    id: 3,
    title: "Blossom & Bloom",
    subtitle: "Floral Luxe Series",
    desc: "Soft florals reimagined with bold, contemporary cuts.",
    bg: "from-amber-900 via-orange-800 to-rose-800",
    accent: "#fcd34d",
    img:"/assets/products/image3.jpeg",
    catalogue: [
      { name: "Golden Hour Gown",  img:"/assets/products/hero1.jpeg", },
      { name: "Coral Casual Dress",  img:"/assets/products/hero2.jpeg", },
      { name: "Peach Midi Wrap",    img:"/assets/products/hero3.jpeg",},
    ],
  },
  {
    id: 4,
    title: "Lavender Dreams",
    subtitle: "New Arrivals 2026",
    desc: "Ethereal purples and delicate silhouettes for the dreamer in you.",
    bg: "from-purple-900 via-violet-800 to-fuchsia-800",
    accent: "#e9d5ff",
    img:"/assets/products/image4.jpeg",
    catalogue: [
      { name: "Lavender Dream Maxi", img:"/assets/products/hero1.jpeg", },
      { name: "Rose Cocktail Lace",  img:"/assets/products/hero2.jpeg", },
      { name: "Forest Mini Dress",    img:"/assets/products/hero3.jpeg", },
    ],
  },
];

const CATEGORIES = ["All", "Gown", "Midi", "Mini", "Maxi", "Cocktail", "Casual"];

const PRODUCTS = [
  { id:1,  name:"Crimson Velvet Gown",   category:"Gown",     color:"Red",    rating:4.9, img:"/assets/products/image1.jpeg", tag:"Best Seller" },
  { id:2,  name:"Ivory Lace Midi",        category:"Midi",     color:"White",  rating:4.7, img:"/assets/products/image2.jpeg", tag:"New" },
  { id:3,  name:"Sapphire Satin Maxi",    category:"Maxi",     color:"Blue",   rating:4.8, img:"/assets/products/image3.jpeg", tag:"" },
  { id:4,  name:"Blush Cocktail Dress",  category:"Cocktail", color:"Pink",   rating:4.6, img:"/assets/products/image4.jpeg", tag:"Trending" },
  { id:5,  name:"Forest Mini Dress",      category:"Mini",     color:"Green",  rating:4.5,img:"/assets/products/image5.jpeg", tag:"" },
  { id:6,  name:"Golden Hour Gown",       category:"Gown",     color:"Gold",   rating:5.0, img:"/assets/products/image1.jpeg", tag:"Luxe" },
  { id:7,  name:"Lavender Dream Maxi",   category:"Maxi",     color:"Purple", rating:4.7, img:"/assets/products/image2.jpeg", tag:"" },
  { id:8,  name:"Coral Casual Dress",    category:"Casual",   color:"Coral",  rating:4.4, img:"/assets/products/image3.jpeg", tag:"Sale" },
  { id:9,  name:"Midnight Black Gown",   category:"Gown",     color:"Black",  rating:4.9, img:"/assets/products/image4.jpeg", tag:"Best Seller" },
  { id:10, name:"Peach Midi Wrap",       category:"Midi",     color:"Peach",  rating:4.6, img:"/assets/products/image5.jpeg", tag:"New" },
  { id:11, name:"Azure Mini Cut-Out",    category:"Mini",     color:"Blue",   rating:4.5, img:"/assets/products/image1.jpeg", tag:"" },
  { id:12, name:"Rose Cocktail Lace",     category:"Cocktail", color:"Pink",   rating:4.8, img:"/assets/products/image2.jpeg", tag:"Trending" },
];

const GALLERY_IMGS = [
  "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600&q=80",
  "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80",
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80",
  "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&q=80",
  "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&q=80",
  "https://images.unsplash.com/photo-1566479179817-9fa3b4e6e820?w=600&q=80",
  "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&q=80",
  "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&q=80",
  "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&q=80",
];

/* ─────────────── INJECT STYLES ─────────────── */
const injectStyles = () => {
  if (document.getElementById("rosa-styles")) return;
  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap');
    *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }

    @keyframes fadeUp       { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
    @keyframes fadeDown     { from{opacity:0;transform:translateY(-18px)} to{opacity:1;transform:translateY(0)} }
    @keyframes fadeIn       { from{opacity:0} to{opacity:1} }
    @keyframes slideInLeft  { from{opacity:0;transform:translateX(-38px)} to{opacity:1;transform:translateX(0)} }
    @keyframes slideInRight { from{opacity:0;transform:translateX(38px)}  to{opacity:1;transform:translateX(0)} }
    @keyframes zoomIn       { from{opacity:0;transform:scale(.93)} to{opacity:1;transform:scale(1)} }
    @keyframes marquee      { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
    @keyframes floatY       { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
    @keyframes heartPop     { 0%,100%{transform:scale(1)} 40%{transform:scale(1.35)} 70%{transform:scale(.9)} }
    @keyframes tagPop       { 0%{transform:scale(0) rotate(-8deg)} 70%{transform:scale(1.1) rotate(1deg)} 100%{transform:scale(1) rotate(0)} }
    @keyframes pulseGlow    { 0%,100%{box-shadow:0 0 0 0 rgba(190,24,93,.3)} 50%{box-shadow:0 0 0 10px rgba(190,24,93,0)} }
    @keyframes catSlideIn   { from{opacity:0;transform:translateY(14px) scale(.97)} to{opacity:1;transform:translateY(0) scale(1)} }
    @keyframes progressBar  { from{width:0%} to{width:100%} }
    @keyframes shimmerSlide { 0%{background-position:-400% 0} 100%{background-position:400% 0} }
    @keyframes spinOnce     { 0%{transform:rotate(0) scale(.8)} 100%{transform:rotate(360deg) scale(1)} }

    .font-display { font-family:'Cormorant Garamond',serif; }

    .anim-fadeUp       { animation:fadeUp       .7s cubic-bezier(.25,.8,.25,1) both; }
    .anim-fadeDown     { animation:fadeDown     .5s ease both; }
    .anim-fadeIn       { animation:fadeIn       .45s ease both; }
    .anim-slideInLeft  { animation:slideInLeft  .6s cubic-bezier(.25,.8,.25,1) both; }
    .anim-slideInRight { animation:slideInRight .6s cubic-bezier(.25,.8,.25,1) both; }
    .anim-zoomIn       { animation:zoomIn       .55s cubic-bezier(.25,.8,.25,1) both; }
    .anim-marquee      { animation:marquee 22s linear infinite; }
    .anim-floatY       { animation:floatY 3.6s ease-in-out infinite; }
    .anim-catSlideIn   { animation:catSlideIn .45s cubic-bezier(.25,.8,.25,1) both; }
    .anim-spinOnce     { animation:spinOnce .4s ease both; }
    .heart-pop         { animation:heartPop .55s ease; }

    .ht1 { animation:fadeUp .9s ease .1s both; }
    .ht2 { animation:slideInLeft .85s ease .3s both; }
    .ht3 { animation:fadeUp .8s ease .5s both; }
    .ht4 { animation:fadeUp .8s ease .7s both; }

    .card-hover { transition:transform .38s cubic-bezier(.25,.8,.25,1),box-shadow .38s ease; }
    .card-hover:hover { transform:translateY(-10px) scale(1.012); }

    .img-zoom img { transition:transform .65s ease; }
    .img-zoom:hover img { transform:scale(1.09); }

    .nav-link { position:relative; }
    .nav-link::after { content:''; position:absolute; bottom:-3px; left:0; width:0; height:2px; background:#be185d; border-radius:2px; transition:width .35s cubic-bezier(.25,.8,.25,1); }
    .nav-link:hover::after, .nav-link.active::after { width:100%; }

    .tag-pill { font-size:9.5px; letter-spacing:1.8px; text-transform:uppercase; animation:tagPop .4s ease both; }
    .filter-btn { transition:all .28s cubic-bezier(.25,.8,.25,1); }

    .pulse-cta { animation:pulseGlow 2.4s infinite; }
    .shimmer-overlay { background:linear-gradient(90deg,transparent 0%,rgba(255,255,255,.12) 50%,transparent 100%); background-size:400% 100%; animation:shimmerSlide 2.8s linear infinite; }

    input[type=range]::-webkit-slider-thumb { -webkit-appearance:none; width:17px; height:17px; border-radius:50%; background:#be185d; cursor:pointer; transition:transform .2s; }
    input[type=range]::-webkit-slider-thumb:hover { transform:scale(1.2); }
    input[type=range] { -webkit-appearance:none; height:3px; border-radius:2px; outline:none; }

    ::-webkit-scrollbar { width:4px; }
    ::-webkit-scrollbar-track { background:transparent; }
    ::-webkit-scrollbar-thumb { background:#d1d5db; border-radius:2px; }

    .progress-bar { animation:progressBar 4.5s linear forwards; }

    /* Toggle pill */
    .toggle-pill { transition:all .4s cubic-bezier(.25,.8,.25,1); }
    .toggle-thumb { transition:transform .35s cubic-bezier(.34,1.56,.64,1); }
  `;
  const el = document.createElement("style");
  el.id = "rosa-styles";
  el.textContent = css;
  document.head.appendChild(el);
};

/* ─────────────── STAR RATING ─────────────── */
function Stars({ rating, dark }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1,2,3,4,5].map(s => (
        <svg key={s} className={`w-3 h-3 ${s <= Math.round(rating) ? "text-amber-400" : dark ? "text-gray-600" : "text-gray-300"}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
        </svg>
      ))}
      <span className={`text-xs ml-1 ${dark ? "text-gray-500" : "text-gray-400"}`}>({rating})</span>
    </div>
  );
}

/* ─────────────── PRODUCT CARD (no cart) ─────────────── */
function ProductCard({ p, delay = 0, dark }) {
  const [liked, setLiked]     = useState(false);
  const [popping, setPopping] = useState(false);

  const handleLike = () => {
    setLiked(v => !v);
    setPopping(true);
    setTimeout(() => setPopping(false), 600);
  };

  const tagColor =
    p.tag === "Sale"     ? "bg-red-500 text-white" :
    p.tag === "New"      ? "bg-emerald-500 text-white" :
    p.tag === "Luxe"     ? "bg-amber-500 text-white" :
    p.tag === "Trending" ? "bg-violet-600 text-white" :
    "bg-rose-700 text-white";

  return (
    <div
      className={`card-hover rounded-2xl overflow-hidden border anim-fadeUp ${dark ? "border-rose-900/60 shadow-rose-950/40" : "border-rose-50 shadow-sm"}`}
      style={{
        background: dark ? "#1c1118" : "#fff",
        animationDelay: `${delay}ms`,
        animationFillMode: "both",
        boxShadow: dark ? "0 4px 20px rgba(0,0,0,.4)" : undefined,
      }}
    >
      <div className="relative img-zoom overflow-hidden aspect-[3/4]">
        <img src={p.img} alt={p.name} className="w-full h-full object-cover" loading="lazy" />

        {/* Shimmer hover */}
        <div className="absolute inset-0 shimmer-overlay opacity-0 hover:opacity-100 pointer-events-none transition-opacity duration-400" />

        {/* Wishlist */}
        <button
          onClick={handleLike}
          className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm active:scale-90 transition-transform ${dark ? "bg-black/60" : "bg-white/80"}`}
        >
          <svg
            className={`w-4 h-4 transition-colors ${popping ? "heart-pop" : ""} ${liked ? "text-rose-500" : dark ? "text-gray-400" : "text-gray-400"}`}
            fill={liked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
          </svg>
        </button>

        {/* Tag */}
        {p.tag && <span className={`absolute top-3 left-3 tag-pill px-2.5 py-1 rounded-full font-semibold ${tagColor}`}>{p.tag}</span>}
      </div>

      <div className="p-4">
        <p className="text-xs text-rose-400 uppercase tracking-widest mb-1 font-medium">{p.category} · {p.color}</p>
        <h3 className={`font-display text-lg font-semibold leading-tight mb-1.5 ${dark ? "text-rose-100" : "text-gray-900"}`}>{p.name}</h3>
        <Stars rating={p.rating} dark={dark} />
      
      </div>
    </div>
  );
}

/* ─────────────── HOME PAGE ─────────────── */
function HomePage({ goTo, dark }) {
  const [slide,       setSlide]       = useState(0);
  const [fading,      setFading]      = useState(false);
  const [catIdx,      setCatIdx]      = useState(0);
  const [catFading,   setCatFading]   = useState(false);
  const [progressKey, setProgressKey] = useState(0);
  const timerRef = useRef(null);
  const INTERVAL = 4500;

  // Main slide change
  const changeSlide = useCallback((idx) => {
    if (fading) return;
    setFading(true);
    setTimeout(() => {
      setSlide(idx);
      setCatIdx(0);
      setProgressKey(k => k + 1);
      setFading(false);
    }, 380);
  }, [fading]);

  // Auto-advance slides
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setSlide(prev => {
        const next = (prev + 1) % HERO_SLIDES.length;
        setFading(true);
        setTimeout(() => {
          setSlide(next);
          setCatIdx(0);
          setProgressKey(k => k + 1);
          setFading(false);
        }, 380);
        return prev;
      });
    }, INTERVAL);
    return () => clearInterval(timerRef.current);
  }, []);

  // Auto-cycle catalogue items
  useEffect(() => {
    const t = setInterval(() => {
      setCatFading(true);
      setTimeout(() => {
        setCatIdx(i => (i + 1) % HERO_SLIDES[slide].catalogue.length);
        setCatFading(false);
      }, 280);
    }, 2000);
    return () => clearInterval(t);
  }, [slide]);

  const s = HERO_SLIDES[slide];

  return (
    <div>
      {/* ── HERO ── */}
      <section className={`relative h-screen bg-gradient-to-br ${s.bg} overflow-hidden transition-all duration-700`}>
        {/* BG image */}
        <div className={`absolute inset-0 transition-opacity duration-400 ${fading ? "opacity-0" : "opacity-100"}`}>
          <img src={s.img} alt="" className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/25 to-transparent" />
        </div>

        {/* Floating dots */}
        {[...Array(7)].map((_,i) => (
          <div key={i}
            className="absolute rounded-full anim-floatY pointer-events-none opacity-25"
            style={{ background: s.accent, width: 6+i*2, height: 6+i*2, left:`${10+i*13}%`, top:`${15+(i%3)*22}%`, animationDelay:`${i*0.55}s`, animationDuration:`${3+i*0.4}s` }} />
        ))}

        {/* Content */}
        <div className={`relative z-10 h-full flex items-center transition-opacity duration-380 ${fading ? "opacity-0" : "opacity-100"}`}>
          <div className="max-w-7xl mx-auto px-6 w-full grid md:grid-cols-2 gap-10 items-center">

            {/* Left – text */}
            <div key={`txt-${slide}`}>
              <p className="ht1 text-xs tracking-[5px] uppercase font-medium mb-4" style={{color: s.accent}}>{s.subtitle}</p>
              <h1 className="ht2 font-display text-5xl md:text-7xl lg:text-8xl font-light text-white leading-none mb-5">{s.title}</h1>
              <p className="ht3 text-gray-300 text-base md:text-lg font-light max-w-md mb-10 leading-relaxed">{s.desc}</p>
              <div className="ht4 flex gap-3 flex-wrap">
              
                <button onClick={() => goTo("Gallery")}
                  className="px-7 py-3.5 text-sm font-medium tracking-widest uppercase rounded-full transition-all duration-300 hover:opacity-90"
                  style={{background: s.accent, color:"#1a1a1a"}}>
                  View Gallery
                </button>
              </div>
            </div>

            {/* Right – auto-changing catalogue (desktop only) */}
            <div className="hidden md:block" key={`cat-${slide}`}>
              <p className="ht1 text-xs tracking-[3px] uppercase mb-4 font-medium" style={{color: s.accent}}>
                Featured From This Collection
              </p>
              <div className="flex flex-col gap-3">
                {s.catalogue.map((item, i) => (
                  <div
                    key={i}
                    onClick={() => goTo("Products")}
                    className={`flex items-center gap-4 rounded-2xl p-3 backdrop-blur-sm border transition-all duration-400 cursor-pointer hover:border-white/30 ${
                      catIdx === i && !catFading
                        ? "bg-white/15 scale-[1.025] border-white/20 anim-catSlideIn"
                        : "bg-white/5 border-white/8 scale-100"
                    }`}
                  >
                    <img src={item.img} alt={item.name} className="w-16 h-16 rounded-xl object-cover shrink-0 shadow-md" />
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-medium text-sm leading-tight truncate">{item.name}</p>
                    </div>
                    {catIdx === i && (
                      <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{background: s.accent}} />
                    )}
                  </div>
                ))}
              </div>
              {/* Catalogue dot indicator */}
              <div className="flex gap-1.5 mt-4">
                {s.catalogue.map((_,i) => (
                  <div key={i}
                    className={`rounded-full transition-all duration-300 ${catIdx === i ? "w-5 h-1.5" : "w-1.5 h-1.5"}`}
                    style={{background: catIdx === i ? s.accent : "rgba(255,255,255,.3)"}} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/10 z-20">
          <div key={progressKey} className="h-full bg-white/45 progress-bar" style={{animationDuration:`${INTERVAL}ms`}} />
        </div>

        {/* Slide dots */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {HERO_SLIDES.map((_,i) => (
            <button key={i} onClick={() => changeSlide(i)}
              className="rounded-full transition-all duration-350"
              style={{
                width:  i === slide ? 28 : 10,
                height: 10,
                background: i === slide ? s.accent : "rgba(255,255,255,.33)",
              }} />
          ))}
        </div>

        {/* Arrows */}
        {["prev","next"].map(dir => (
          <button key={dir}
            onClick={() => changeSlide(dir==="prev" ? (slide-1+HERO_SLIDES.length)%HERO_SLIDES.length : (slide+1)%HERO_SLIDES.length)}
            className="absolute top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/25 active:scale-95 transition-all"
            style={{[dir==="prev"?"left":"right"]: 16}}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d={dir==="prev" ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"} />
            </svg>
          </button>
        ))}
      </section>

      {/* ── MARQUEE ── */}
      <div className="py-3 overflow-hidden" style={{background: dark?"#7f1d3f":"#9f1239"}}>
        <div className="flex anim-marquee whitespace-nowrap select-none">
          {[...Array(4)].map((_,i) => (
            <span key={i} className="flex items-center gap-6 mx-6 text-white text-xs tracking-[3px] uppercase font-light">
              On Zarrar Collection <span className="text-rose-300">✦</span> New Arrivals Weekly <span className="text-rose-300">✦</span> Sustainable Fashion <span className="text-rose-300">✦</span> Exclusively Yours <span className="text-rose-300">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── SHOP BY STYLE ── */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-14 anim-fadeUp">
          <p className="text-xs tracking-[4px] uppercase text-rose-400 mb-3">Explore</p>
          <h2 className={`font-display text-5xl font-light ${dark?"text-rose-100":"text-gray-900"}`}>Shop by Style</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {label:"Maxis",    img:"https://images.unsplash.com/photo-1572804013427-4d7ca7268217?w=400&q=80"},
            {label:"Cocktail", img:"https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=400&q=80"},
            {label:"Casual",   img:"https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=400&q=80"},
                        {label:"Marriage",   img:"/assets/products/image1.jpeg"},

          ].map((c,i) => (
            <button key={i} onClick={() => goTo("Products")}
              className={`card-hover relative rounded-2xl overflow-hidden aspect-[3/4] img-zoom anim-zoomIn`}
              style={{animationDelay:`${i*100}ms`}}>
              <img src={c.img} alt={c.label} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/78 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="font-display text-2xl text-white font-light">{c.label}</h3>
                <p className="text-white/55 text-xs mt-0.5 tracking-widest uppercase">Shop →</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* ── BEST SELLERS ── */}
      <section className="py-16 px-6" style={{background: dark?"#130d11":"#fff5f5"}}>
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-10 anim-fadeUp">
            <div>
              <p className="text-xs tracking-[4px] uppercase text-rose-400 mb-2">Curated For You</p>
              <h2 className={`font-display text-4xl font-light ${dark?"text-rose-100":"text-gray-900"}`}>Best Sellers</h2>
            </div>
            <button onClick={() => goTo("Products")} className="text-sm text-rose-500 border-b border-rose-500 hover:text-rose-400 pb-0.5 transition-colors">View All →</button>
          </div>
          {/* 1-col on mobile, 2 on sm, 4 on md+ */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
            {PRODUCTS.filter(p => p.tag==="Best Seller" || p.rating>=4.8).slice(0,4).map((p,i) => (
              <ProductCard key={p.id} p={p} delay={i*100} dark={dark} />
            ))}
          </div>
        </div>
      </section>

      {/* ── SALE BANNER ── */}
      <section className="relative py-28 px-6 overflow-hidden text-white text-center">
        <img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1400&q=60" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{background:"linear-gradient(135deg,rgba(120,10,50,.85),rgba(180,20,80,.75))"}} />
        <div className="relative z-10 anim-fadeUp">
          <p className="text-xs tracking-[5px] uppercase text-rose-300 mb-4">Limited Time</p>
          <h2 className="font-display text-6xl md:text-7xl font-light mb-5 leading-none">Summer Sale</h2>
          <p className="text-rose-200 mb-9 text-lg font-light">Up to 40% off selected styles</p>
          <button onClick={() => goTo("Products")}
            className="pulse-cta px-10 py-4 bg-white text-rose-900 rounded-full text-sm font-medium tracking-widest uppercase hover:bg-rose-50 transition-all">
            Shop the Sale
          </button>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-12 anim-fadeUp">
          <p className="text-xs tracking-[4px] uppercase text-rose-400 mb-3">Love Letters</p>
          <h2 className={`font-display text-4xl font-light ${dark?"text-rose-100":"text-gray-900"}`}>What Our Ladies Say</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[
            {name:"Sophia L.",   role:"Fashion Editor",    stars:5, quote:"The Crimson Velvet Gown made me feel like royalty. The quality is absolutely unmatched — I receive compliments every single time."},
            {name:"Amara K.",    role:"Lifestyle Blogger",  stars:5, quote:"Completely obsessed with my Sapphire Maxi. The fabric drapes beautifully and the colour is even more stunning in person."},
            {name:"Isabelle R.", role:"Creative Director",  stars:5, quote:"Finally a brand that understands both elegance and comfort. My cocktail dress fit perfectly with zero alterations needed."},
          ].map((t,i) => (
            <div key={i}
              className={`rounded-2xl p-7 border card-hover anim-fadeUp ${dark?"border-rose-900/50":"border-rose-50 shadow-sm bg-white"}`}
              style={{background: dark?"#1c1118":undefined, animationDelay:`${i*120}ms`}}>
              <div className="flex gap-0.5 mb-4">
                {[...Array(t.stars)].map((_,s) => (
                  <svg key={s} className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                ))}
              </div>
              <p className={`font-display text-lg italic leading-relaxed mb-5 ${dark?"text-rose-200":"text-gray-700"}`}>"{t.quote}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-300 to-pink-400 flex items-center justify-center text-rose-900 font-bold text-sm">{t.name[0]}</div>
                <div>
                  <p className={`font-medium text-sm ${dark?"text-rose-100":"text-gray-900"}`}>{t.name}</p>
                  <p className="text-xs text-rose-400">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

/* ─────────────── PRODUCTS PAGE ─────────────── */
function ProductsPage({ dark }) {
  const [search,   setSearch]   = useState("");
  const [category, setCategory] = useState("All");
  const [maxPrice, setMaxPrice] = useState(500);
  const [sort,     setSort]     = useState("default");
  const [page,     setPage]     = useState(1);
  const PER_PAGE = 6;

  const filtered = PRODUCTS
    .filter(p => category === "All" || p.category === category)
    .filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase()) ||
      p.color.toLowerCase().includes(search.toLowerCase())
    )
    .filter(p => p.price <= maxPrice)
    .sort((a,b) =>
      sort === "price-asc"  ? a.price - b.price :
      sort === "price-desc" ? b.price - a.price :
      sort === "rating"     ? b.rating - a.rating : 0
    );

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated  = filtered.slice((page-1)*PER_PAGE, page*PER_PAGE);

  useEffect(() => setPage(1), [search, category, maxPrice, sort]);

  const inputCls = `w-full px-4 py-3 rounded-xl border text-sm focus:outline-none transition-all ${dark
    ? "border-rose-900/60 focus:border-rose-600 placeholder-gray-600 text-rose-100"
    : "border-gray-200 bg-rose-50/50 focus:border-rose-300 focus:bg-white"}`;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="text-center mb-12 anim-fadeUp">
        <p className="text-xs tracking-[4px] uppercase text-rose-400 mb-3">Our Collection</p>
        <h1 className={`font-display text-5xl font-light mb-3 ${dark?"text-rose-100":"text-gray-900"}`}>All Dresses</h1>
        <p className={`font-light text-sm ${dark?"text-gray-500":"text-gray-400"}`}>{filtered.length} pieces available</p>
      </div>

      {/* Filter card */}
      <div
        className={`rounded-2xl border p-6 mb-10 anim-fadeDown`}
        style={{background: dark?"#1c1118":"#fff", borderColor: dark?"rgba(180,30,80,.3)":"rgba(255,228,230,1)", boxShadow: dark?"0 4px 24px rgba(0,0,0,.35)":"0 2px 12px rgba(244,63,94,.06)"}}
      >
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
          {/* Search */}
          <div className="relative flex-1 w-full min-w-0">
            <svg className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 ${dark?"text-gray-500":"text-gray-400"}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
            <input type="text" placeholder="Search by name, style or colour…" value={search} onChange={e => setSearch(e.target.value)}
              className={`${inputCls} pl-11 pr-10`}
              style={{background: dark?"#0e0a0d":undefined}} />
            {search && (
              <button onClick={() => setSearch("")}
                className={`absolute right-4 top-1/2 -translate-y-1/2 text-xs transition-colors ${dark?"text-gray-500 hover:text-gray-200":"text-gray-400 hover:text-gray-700"}`}>✕</button>
            )}
          </div>

          {/* Sort */}
          <select value={sort} onChange={e => setSort(e.target.value)}
            className={`py-3 px-4 rounded-xl border text-sm focus:outline-none w-full md:w-auto ${dark?"border-rose-900/60 text-rose-200":"border-gray-200 bg-rose-50/50"}`}
            style={{background: dark?"#0e0a0d":undefined}}>
            <option value="default">Sort: Featured</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
            <option value="rating">Highest Rated</option>
          </select>

          {/* Price range */}
          <div className="flex items-center gap-3 w-full md:w-52">
            <span className={`text-xs whitespace-nowrap ${dark?"text-gray-500":"text-gray-500"}`}>Max ${maxPrice}</span>
            <input type="range" min={100} max={500} step={10} value={maxPrice} onChange={e => setMaxPrice(+e.target.value)}
              className="flex-1"
              style={{background:`linear-gradient(to right,#be185d ${(maxPrice-100)/4}%,${dark?"#3d1525":"#e5e7eb"} ${(maxPrice-100)/4}%)`}} />
          </div>
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap gap-2 mt-5">
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setCategory(cat)}
              className={`filter-btn px-4 py-2 rounded-full text-xs font-medium tracking-widest uppercase ${
                category === cat
                  ? "bg-rose-700 text-white shadow-md"
                  : dark
                    ? "text-rose-400 border border-rose-800/60 hover:bg-rose-800/30"
                    : "bg-rose-50 text-gray-600 hover:bg-rose-100"
              }`}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid — 1 col mobile, 2 sm, 3 md */}
      {paginated.length === 0 ? (
        <div className="text-center py-24 anim-fadeUp">
          <div className="text-6xl mb-4">🌸</div>
          <h3 className={`font-display text-2xl mb-2 ${dark?"text-rose-300":"text-gray-500"}`}>No dresses found</h3>
          <p className={dark?"text-gray-600":"text-gray-400"}>Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {paginated.map((p,i) => <ProductCard key={p.id} p={p} delay={i*60} dark={dark} />)}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-12 flex-wrap">
          <button disabled={page===1} onClick={() => setPage(p=>p-1)}
            className={`w-10 h-10 rounded-full flex items-center justify-center text-lg transition-all ${page===1?"opacity-25 cursor-not-allowed":dark?"hover:bg-rose-900/40 text-rose-300":"hover:bg-rose-50 text-gray-600"}`}>‹</button>
          {[...Array(totalPages)].map((_,i) => (
            <button key={i} onClick={() => setPage(i+1)}
              className={`w-10 h-10 rounded-full text-sm font-medium transition-all ${page===i+1?"bg-rose-700 text-white":dark?"text-rose-300 hover:bg-rose-900/40":"text-gray-600 hover:bg-rose-50"}`}>{i+1}</button>
          ))}
          <button disabled={page===totalPages} onClick={() => setPage(p=>p+1)}
            className={`w-10 h-10 rounded-full flex items-center justify-center text-lg transition-all ${page===totalPages?"opacity-25 cursor-not-allowed":dark?"hover:bg-rose-900/40 text-rose-300":"hover:bg-rose-50 text-gray-600"}`}>›</button>
        </div>
      )}
    </div>
  );
}

/* ─────────────── GALLERY PAGE ─────────────── */
function GalleryPage({ dark }) {
  const [selected, setSelected] = useState(null);
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="text-center mb-12 anim-fadeUp">
        <p className="text-xs tracking-[4px] uppercase text-rose-400 mb-3">Visual Diary</p>
        <h1 className={`font-display text-5xl font-light mb-4 ${dark?"text-rose-100":"text-gray-900"}`}>Style Gallery</h1>
        <p className={`font-light max-w-md mx-auto text-sm ${dark?"text-gray-500":"text-gray-500"}`}>A curated lookbook of our most beloved pieces, worn by real women with extraordinary style.</p>
      </div>

      <div className="columns-2 md:columns-3 gap-4 space-y-4">
        {GALLERY_IMGS.map((img,i) => (
          <div key={i}
            className="break-inside-avoid card-hover img-zoom rounded-2xl overflow-hidden cursor-pointer anim-zoomIn"
            style={{animationDelay:`${i*80}ms`}}
            onClick={() => setSelected(img)}>
            <img src={img} alt={`Look ${i+1}`}
              className={`w-full object-cover rounded-2xl ${i%3===1?"aspect-[3/4]":i%3===2?"aspect-square":"aspect-[4/5]"}`} />
          </div>
        ))}
      </div>

      {selected && (
        <div className="fixed inset-0 bg-black/92 z-50 flex items-center justify-center p-6 anim-fadeIn" onClick={() => setSelected(null)}>
          <button className="absolute top-5 right-6 text-white/60 hover:text-white text-3xl transition-colors leading-none">✕</button>
          <img src={selected} alt="" className="max-w-2xl max-h-[90vh] w-full object-contain rounded-2xl shadow-2xl anim-zoomIn" onClick={e => e.stopPropagation()} />
        </div>
      )}
    </div>
  );
}

/* ─────────────── CONTACT PAGE ─────────────── */
function ContactPage({ dark }) {
  return (
    <div className="relative max-w-6xl mx-auto px-6 py-20 overflow-hidden">

      {/* Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="w-72 h-72 bg-rose-500/20 blur-[120px] rounded-full absolute top-10 left-10 animate-pulse"></div>
        <div className="w-72 h-72 bg-pink-500/20 blur-[120px] rounded-full absolute bottom-10 right-10 animate-pulse"></div>
      </div>

      {/* Header */}
      <div className="text-center mb-16 anim-fadeUp">
        <p className="text-xs tracking-[5px] uppercase text-rose-400 mb-3">
          Zarrar Collection
        </p>
        <h1 className={`font-display text-5xl md:text-6xl font-light mb-4 ${dark ? "text-rose-100" : "text-gray-900"}`}>
          Get In Touch
        </h1>
        <p className={`${dark ? "text-gray-500" : "text-gray-500"}`}>
          Luxury fashion, personally delivered to you
        </p>
      </div>

      {/* Main Card */}
      <div
        className="rounded-3xl p-10 text-center space-y-10 border backdrop-blur-xl anim-zoomIn transition-all duration-500 hover:scale-[1.01]"
        style={{
          background: dark
            ? "rgba(28,17,24,0.85)"
            : "rgba(255,255,255,0.75)",
          borderColor: "rgba(255,255,255,0.1)",
          boxShadow: dark
            ? "0 20px 60px rgba(0,0,0,.6)"
            : "0 20px 60px rgba(244,63,94,.12)",
        }}
      >
        {/* Shop Name */}
        <div className="space-y-2">
          <h2 className="font-display text-4xl text-rose-500 tracking-wide animate-pulse">
            Zarrar Collection
          </h2>
          <p className={`${dark ? "text-gray-400" : "text-gray-500"}`}>
            Premium Women's Wear
          </p>
        </div>

        {/* Owner */}
        <div>
          <h3 className="text-xl font-medium text-white/90">
            Mohsin Shaikh
          </h3>
        </div>

        {/* WhatsApp Button */}
        <a
          href="https://wa.me/919960575205"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative inline-flex items-center justify-center px-10 py-4 rounded-full text-white text-sm tracking-widest uppercase font-medium overflow-hidden"
        >
          <span className="absolute inset-0 bg-green-500 blur-lg opacity-70 group-hover:opacity-100 transition-all"></span>
          <span className="relative z-10 flex items-center gap-2">
            💬 Chat on WhatsApp
          </span>
        </a>

        {/* Instagram Button */}
        <a
          href="https://instagram.com/YOUR_INSTAGRAM_USERNAME"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative inline-flex items-center justify-center px-10 py-4 rounded-full text-white text-sm tracking-widest uppercase font-medium overflow-hidden"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-yellow-500 blur-lg opacity-70 group-hover:opacity-100 transition-all"></span>
          <span className="relative z-10 flex items-center gap-2">
            📸 Instagram Profile
          </span>
        </a>

        {/* Address */}
        <div className="pt-6 border-t border-white/10">
          <p className="text-xs text-rose-400 uppercase tracking-widest mb-2">
            Address
          </p>
          <p className={`${dark ? "text-gray-300" : "text-gray-700"}`}>
            Chota Bazar, Malkapur <br />
            Dist. Buldana
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─────────────── THEME TOGGLE ─────────────── */
function ThemeToggle({ dark, toggle }) {
  return (
    <button onClick={toggle} title={dark ? "Light mode" : "Dark mode"}
      className="relative w-14 h-7 rounded-full border-2 focus:outline-none toggle-pill"
      style={{background: dark?"#4c0519":"#ffe4e6", borderColor: dark?"#9f1239":"#fecdd3"}}>
      <span
        className="absolute top-0.5 w-5 h-5 rounded-full shadow-md flex items-center justify-center text-xs toggle-thumb"
        style={{
          transform: dark ? "translateX(28px)" : "translateX(2px)",
          background: dark ? "#f43f5e" : "#fff",
        }}
      >
        {dark ? "🌙" : "☀️"}
      </span>
    </button>
  );
}

/* ─────────────── APP ─────────────── */
export default function App() {
  const [page,     setPage]     = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dark,     setDark]     = useState(false);

  useEffect(() => { injectStyles(); }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goTo = (p) => {
    setPage(p);
    setMenuOpen(false);
    window.scrollTo({top:0, behavior:"smooth"});
  };

  const onHero = page === "Home" && !scrolled;
  const logoCol = onHero ? "#fff" : dark ? "#fda4af" : "#881337";
  const linkCol = onHero ? "rgba(255,255,255,.8)" : dark ? "#fda4af" : "#374151";

  const navBg = dark
    ? "rgba(8,3,7,.94)"
    : onHero ? "transparent" : "rgba(255,255,255,.95)";
  const navBorder = onHero ? "transparent" : dark ? "#2d1a20" : "rgba(255,228,230,.8)";

  return (
    <div style={{fontFamily:"'Jost',sans-serif", minHeight:"100vh", background: dark?"#0e0a0d":"#faf8f5", color: dark?"#f3e8ee":"#1a1a1a", transition:"background .5s,color .5s"}}>

      {/* ── NAVBAR ── */}
      <nav style={{
        position:"fixed", top:0, left:0, right:0, zIndex:50,
        background: navBg,
        borderBottom: `1px solid ${navBorder}`,
        backdropFilter: onHero ? "none" : "blur(14px)",
        WebkitBackdropFilter: onHero ? "none" : "blur(14px)",
        boxShadow: onHero ? "none" : dark ? "0 2px 20px rgba(0,0,0,.5)" : "0 1px 12px rgba(244,63,94,.08)",
        transition: "all .4s ease",
      }}>
        <div className="max-w-7xl mx-auto px-5 h-16 flex items-center justify-between">
          {/* Logo */}
          <button onClick={() => goTo("Home")} className="font-display text-2xl font-light tracking-widest transition-colors duration-300" style={{color: logoCol}}>
            Zarrar <span className="italic">Collection</span>
          </button>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(l => (
              <button key={l} onClick={() => goTo(l)}
                className={`nav-link text-sm tracking-widest uppercase font-light transition-colors duration-300 ${page===l?"active":""}`}
                style={{color: linkCol}}>
                {l}
              </button>
            ))}
          </div>

          {/* Right */}
          <div className="flex items-center gap-3">
            <button onClick={() => goTo("Products")} className="transition-colors" style={{color: linkCol}}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </button>

            <ThemeToggle dark={dark} toggle={() => setDark(d=>!d)} />

            <button className="md:hidden" style={{color: linkCol}} onClick={() => setMenuOpen(m=>!m)}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d={menuOpen?"M6 18L18 6M6 6l12 12":"M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden anim-fadeDown border-t"
            style={{background: dark?"rgba(8,3,7,.97)":"#fff", borderColor: dark?"#2d1a20":"#ffe4e6"}}>
            {NAV_LINKS.map(l => (
              <button key={l} onClick={() => goTo(l)}
                className="block w-full text-left px-6 py-4 text-sm tracking-widest uppercase font-light border-b transition-colors"
                style={{
                  borderColor: dark?"#1f1018":"#fff5f5",
                  color: page===l ? "#f43f5e" : dark?"#fda4af":"#374151",
                  background: page===l ? (dark?"rgba(159,18,57,.15)":"rgba(255,228,230,.4)") : "transparent",
                }}>
                {l}
              </button>
            ))}
          </div>
        )}
      </nav>


      {/* ── MAIN ── */}
      <main style={{paddingTop: page==="Home" ? 0 : 64}} className="anim-fadeIn">
        {page === "Home"     && <HomePage     goTo={goTo} dark={dark} />}
        {page === "Products" && <ProductsPage             dark={dark} />}
        {page === "Gallery"  && <GalleryPage              dark={dark} />}
        {page === "Contact"  && <ContactPage              dark={dark} />}
      </main>

      {/* ── FOOTER ── */}
      <footer style={{background: dark?"#050205":"#0a0a0a", paddingTop:64, paddingBottom:32, paddingLeft:24, paddingRight:24, marginTop:64}}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
            <div className="col-span-2 md:col-span-1">
              <h3 className="font-display text-3xl font-light mb-4 text-white">Zarrar Collection<span className="italic">Mode</span></h3>
              <p className="text-gray-500 text-sm font-light leading-relaxed">Designing for the woman who lives boldly, loves beautifully, and dresses with intention.</p>
            </div>
            {[
              {title:"Shop",  links:["New Arrivals","Gowns","Maxis","Midi","Cocktail","Sale"]},
              {title:"Help",  links:["Size Guide","FAQ"]},
              {title:"Brand", links:["Our Story","Sustainability","Press","Careers","Stockists"]},
            ].map(col => (
              <div key={col.title}>
                <h4 className="text-xs tracking-[3px] uppercase text-rose-600 mb-5 font-medium">{col.title}</h4>
                <ul className="space-y-2.5">
                  {col.links.map(l => <li key={l}><button className="text-gray-500 text-sm hover:text-white transition-colors font-light">{l}</button></li>)}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-white/8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 text-xs font-light">© 2026 Zarrar Collection Mode. All rights reserved.</p>
            <div className="flex items-center gap-6">
              {["Privacy","Terms","Cookies"].map(l => <button key={l} className="text-gray-600 text-xs hover:text-white transition-colors">{l}</button>)}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
