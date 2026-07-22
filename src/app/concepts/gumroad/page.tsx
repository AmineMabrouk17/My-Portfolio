"use client";

import { useState, useMemo, useCallback } from "react";

// Types
interface Product {
  id: string;
  title_ar: string;
  title_en: string;
  category: string;
  categoryLabel_ar: string;
  categoryLabel_en: string;
  price: number;
  author_ar: string;
  author_en: string;
  rating: number;
  salesCount: number;
  image: string;
  desc_ar: string;
  desc_en: string;
  allowPwyw: boolean;
}

interface CartItem extends Product {
  selectedPrice: number;
}

// Product Data
const initialProducts: Product[] = [
  { id: "prod-1", title_ar: "دليل تصميم واجهات الاستخدام الشامل 2026", title_en: "UI/UX Design Masterclass & Design System 2026", category: "design", categoryLabel_ar: "تصاميم وقوالب", categoryLabel_en: "Design & Templates", price: 29, author_ar: "سارة خالد", author_en: "Sarah Khaled", rating: 4.9, salesCount: 1240, image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=600&q=80", desc_ar: "كتاب ودليل تطبيقي يحتوي على أكثر من 300 نموذج وقالب جاهز للاستخدام في Figma.", desc_en: "A comprehensive handbook with 300+ Figma components and modern responsive UI guidelines.", allowPwyw: true },
  { id: "prod-2", title_ar: "دورة احتراف تطوير تطبيقات React & Next.js", title_en: "Fullstack React & Next.js Pro Bootcamp", category: "course", categoryLabel_ar: "دورات تدريبية", categoryLabel_en: "Courses", price: 79, author_ar: "مهندس عمر الشريف", author_en: "Omar Al-Sherif", rating: 5.0, salesCount: 850, image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80", desc_ar: "أكثر من 25 ساعة فيديو عالية الدقة مع تطبيق عملي لبناء 4 مشاريع حقيقية.", desc_en: "Over 25 hours of HD video lessons building 4 production-ready web apps.", allowPwyw: false },
  { id: "prod-3", title_ar: "كتاب العمل الحر وجمع أول 10,000$ من الإنترنت", title_en: "Freelancing Blueprint: Earn Your First $10K Online", category: "ebook", categoryLabel_ar: "كتب إلكترونية", categoryLabel_en: "E-Books", price: 15, author_ar: "كريم عبدالمجيد", author_en: "Kareem Abdul", rating: 4.8, salesCount: 3100, image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80", desc_ar: "استراتيجية مجربة بالأدوات والخطوات العملية لبناء هوية رقمية.", desc_en: "Actionable guide covering client acquisition and premium pricing strategy.", allowPwyw: true },
  { id: "prod-4", title_ar: "حزمة المؤثرات الصوتية والموسيقى التصويرية", title_en: "Cinematic Sound Effects & Audio Tracks Bundle", category: "audio", categoryLabel_ar: "صوتيات وموسيقى", categoryLabel_en: "Audio & Music", price: 19, author_ar: "استوديو صدى", author_en: "Sada Sound Studio", rating: 4.7, salesCount: 620, image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80", desc_ar: "أكثر من 500 كليب صوتي ومؤثر بدقة عالية مع رخصة استخدام تجاري مفتوحة.", desc_en: "Over 500 high-fidelity sound effects and royalty-free soundtracks.", allowPwyw: true },
  { id: "prod-5", title_ar: "قالب إدارة المشاريع وإدارة الوقت لـ Notion", title_en: "Ultimate Notion Productivity & Project Hub", category: "design", categoryLabel_ar: "تصاميم وقوالب", categoryLabel_en: "Design & Templates", price: 12, author_ar: "منى التميمي", author_en: "Mona Al-Tamimi", rating: 4.9, salesCount: 1900, image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=600&q=80", desc_ar: "قالب منظم واحترافي لإنتاجية مضاعفة مع لوحة متابعة المهام.", desc_en: "A sleek Notion workspace designed to supercharge your goals.", allowPwyw: false },
  { id: "prod-6", title_ar: "سكربت أتمتة المهام واستخراج البيانات بـ Python", title_en: "Python Web Scraping & Automation Suite", category: "code", categoryLabel_ar: "برمجيات وأكواد", categoryLabel_en: "Software & Code", price: 35, author_ar: "طارق المبرمج", author_en: "Tarek Dev", rating: 4.8, salesCount: 430, image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80", desc_ar: "مجموعة أدوات برمجية جاهزة للعمل مباشرة لتجميع البيانات ومعالجة الصور.", desc_en: "Ready-to-run automation scripts for data extraction and API bots.", allowPwyw: true },
];

// i18n
const i18n = {
  ar: {
    nav_title: "سوق رقمي",
    hero_tag: "منصة البيع الأولى لصُنّاع المحتوى",
    hero_title_1: "حول معارفك وخبراتك إلى",
    hero_title_2: "أرباح حقيقية",
    hero_desc: "بيّع الكتب الإلكترونية، التصاميم، الأكواد، الدورات التدريبية والملفات الصوتية مباشرة لجمهورك.",
    hero_cta: "ابدأ البيع الآن مجاناً",
    hero_browse: "تصفح المنتجات",
    stat_earnings: "أرباح تم تحويلها",
    stat_products: "منتج رقمي",
    stat_rating: "تقييم المشتريين",
    market_title: "أحدث المنتجات الرقمية",
    market_subtitle: "اختر من بين مئات الكتب، القوالب، والأدوات.",
    search_ph: "ابحث عن كتاب، دورة، قالب...",
    cat_all: "الكل",
    cat_ebook: "كتب",
    cat_course: "دورات",
    cat_design: "تصاميم",
    cat_code: "برمجيات",
    cat_audio: "صوتيات",
    sort_featured: "الأكثر شعبية",
    sort_newest: "الأحدث",
    sort_low: "السعر: من الأقل",
    sort_high: "السعر: من الأعلى",
    cart_title: "سلة المشتريات",
    cart_empty: "سلتك فارغة",
    cart_total: "المجموع:",
    cart_checkout: "إتمام الدفع",
    pwyw_tag: "ادفع ما تشاء",
    btn_buy: "شراء",
    btn_details: "التفاصيل",
    no_results: "لم نجد منتجات تطابق بحثك",
    reset_filters: "إعادة ضبط",
    add_product: "أضف منتجك",
    lang_btn: "English",
  },
  en: {
    nav_title: "Digital Marketplace",
    hero_tag: "The #1 Selling Platform for Creators",
    hero_title_1: "Turn your knowledge & skills into",
    hero_title_2: "Real Income",
    hero_desc: "Sell e-books, design assets, source code, courses, and audio files directly to your audience.",
    hero_cta: "Start Selling Free",
    hero_browse: "Browse Products",
    stat_earnings: "Earnings Paid",
    stat_products: "Digital Products",
    stat_rating: "Buyer Rating",
    market_title: "Latest Digital Products",
    market_subtitle: "Choose from hundreds of books, templates, and tools.",
    search_ph: "Search books, courses, templates...",
    cat_all: "All",
    cat_ebook: "E-Books",
    cat_course: "Courses",
    cat_design: "Design",
    cat_code: "Code",
    cat_audio: "Audio",
    sort_featured: "Most Popular",
    sort_newest: "Newest",
    sort_low: "Price: Low to High",
    sort_high: "Price: High to Low",
    cart_title: "Shopping Cart",
    cart_empty: "Your cart is empty",
    cart_total: "Total:",
    cart_checkout: "Secure Checkout",
    pwyw_tag: "Pay What You Want",
    btn_buy: "Buy",
    btn_details: "Details",
    no_results: "No products match your search",
    reset_filters: "Reset Filters",
    add_product: "Add Product",
    lang_btn: "العربية",
  },
};

const categories = ["all", "ebook", "course", "design", "code", "audio"];

export default function GumroadApp() {
  const [lang, setLang] = useState<"ar" | "en">("ar");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("featured");
  const [cartOpen, setCartOpen] = useState(false);
  const [modalProduct, setModalProduct] = useState<Product | null>(null);
  const [customPrice, setCustomPrice] = useState(0);
  const [showAddModal, setShowAddModal] = useState(false);
  const t = i18n[lang];

  const filteredProducts = useMemo(() => {
    let items = initialProducts.filter(
      (p) =>
        (category === "all" || p.category === category) &&
        (search === "" ||
          p[`title_${lang}`].toLowerCase().includes(search.toLowerCase()) ||
          p[`author_${lang}`].toLowerCase().includes(search.toLowerCase()))
    );
    if (sort === "price-low") items = [...items].sort((a, b) => a.price - b.price);
    if (sort === "price-high") items = [...items].sort((a, b) => b.price - a.price);
    if (sort === "newest") items = [...items].reverse();
    return items;
  }, [category, search, sort, lang]);

  const cartTotal = cart.reduce((sum, item) => sum + item.selectedPrice, 0);

  const addToCart = useCallback(
    (product: Product, price?: number) => {
      setCart((prev) => {
        const existing = prev.find((i) => i.id === product.id);
        if (existing) return prev.map((i) => (i.id === product.id ? { ...i, selectedPrice: price || i.price } : i));
        return [...prev, { ...product, selectedPrice: price || product.price }];
      });
      setCartOpen(true);
    },
    []
  );

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const openModal = (product: Product) => {
    setModalProduct(product);
    setCustomPrice(product.price);
  };

  return (
    <div dir="rtl" className="min-h-screen bg-[#FAF8F5] text-black" style={{ fontFamily: "'Cairo', sans-serif" }}>
      <style>{`
        .brutal-border { border: 3px solid #000; }
        .brutal-btn { border: 3px solid #000; box-shadow: 4px 4px 0px 0px #000; transition: all 0.15s ease; }
        .brutal-btn:hover { transform: translate(2px, 2px); box-shadow: 2px 2px 0px 0px #000; }
        .brutal-btn:active { transform: translate(4px, 4px); box-shadow: 0 0 0 0 #000; }
      `}</style>

      {/* Announcement Bar */}
      <div className="bg-[#FFC900] border-b-3 border-black py-2.5 text-center text-xs sm:text-sm font-black">
        {lang === ar ? "بع منتجاتك الرقمية بـ 0$ رسوم شهرية!" : "Sell digital products with $0 monthly fees!"}
      </div>

      {/* Navbar */}
      <nav className="sticky top-0 z-40 bg-[#FAF8F5]/90 backdrop-blur-md border-b-2 border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
          <span className="text-xl font-black tracking-wider">G<span className="text-[#FF90E8]">S</span></span>
          <div className="flex items-center gap-2 sm:gap-3">
            <button onClick={() => setCartOpen(true)} className="relative bg-white brutal-border px-3 py-1.5 rounded-lg text-xs font-black">
              🛒 <span className="text-[10px]">{cart.length}</span>
            </button>
            <button onClick={() => setLang(lang === "ar" ? "en" : "ar")} className="bg-white brutal-border px-3 py-1.5 rounded-lg text-xs font-black">
              {t.lang_btn}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-5 text-center lg:text-right">
            <span className="inline-block bg-[#FFC900] brutal-border px-3 py-1 text-xs font-black rounded-lg">{t.hero_tag}</span>
            <h1 className="text-3xl sm:text-5xl font-black leading-tight">
              {t.hero_title_1} <span className="text-[#FF90E8]">{t.hero_title_2}</span>
            </h1>
            <p className="text-gray-600 font-bold text-sm sm:text-base max-w-lg mx-auto lg:mx-0">{t.hero_desc}</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <button className="bg-[#FFC900] brutal-btn px-6 py-3 rounded-xl font-black text-sm">{t.hero_cta}</button>
              <a href="#marketplace" className="border-2 border-black px-6 py-3 rounded-xl font-black text-sm text-center hover:bg-gray-100">{t.hero_browse}</a>
            </div>
            <div className="grid grid-cols-3 gap-4 pt-4 max-w-md mx-auto lg:mx-0">
              {["$85K+", "350+", "4.9⭐"].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-xl font-black">{stat}</div>
                  <div className="text-[10px] font-bold text-gray-500">{[t.stat_earnings, t.stat_products, t.stat_rating][i]}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center">
            <div className="bg-white brutal-border rounded-2xl p-6 sm:p-8 shadow-[6px_6px_0px_0px_#000] max-w-sm w-full">
              <span className="bg-[#00F5D4] brutal-border px-2 py-0.5 text-[10px] font-black rounded-md">{t.stat_products}</span>
              <div className="mt-3 space-y-2">
                {initialProducts.slice(0, 3).map((p) => (
                  <div key={p.id} className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg border border-gray-200">
                    <img src={p.image} alt="" className="w-10 h-10 rounded-lg object-cover border border-black" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-black truncate">{p[`title_${lang}`]}</p>
                      <p className="text-[10px] text-gray-500 font-bold">${p.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marketplace */}
      <section id="marketplace" className="py-12 sm:py-16 px-4 sm:px-6 border-t-3 border-black">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <span className="bg-[#FF90E8] brutal-border px-3 py-1 text-xs font-black rounded-lg">{t.hero_browse}</span>
            <h2 className="text-2xl sm:text-3xl font-black mt-3">{t.market_title}</h2>
            <p className="text-gray-500 font-bold text-sm mt-1">{t.market_subtitle}</p>
          </div>

          {/* Search & Filters */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t.search_ph}
              className="flex-1 bg-white brutal-border rounded-xl px-4 py-2.5 text-sm font-bold focus:outline-none"
            />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="bg-white brutal-border rounded-xl px-4 py-2.5 text-sm font-bold focus:outline-none"
            >
              <option value="featured">{t.sort_featured}</option>
              <option value="newest">{t.sort_newest}</option>
              <option value="price-low">{t.sort_low}</option>
              <option value="price-high">{t.sort_high}</option>
            </select>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`brutal-border px-4 py-2 rounded-xl text-xs font-black transition-all ${
                  category === cat ? "bg-black text-white" : "bg-white hover:bg-gray-100"
                }`}
              >
                {t[`cat_${cat}` as keyof typeof t]}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16 bg-white brutal-border rounded-2xl">
              <p className="text-3xl mb-2">😕</p>
              <h3 className="text-xl font-black">{t.no_results}</h3>
              <button onClick={() => { setCategory("all"); setSearch(""); }} className="mt-3 bg-[#FFC900] brutal-btn px-5 py-2 rounded-xl font-black text-xs">
                {t.reset_filters}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div key={product.id} className="bg-white brutal-border rounded-2xl overflow-hidden shadow-[4px_4px_0px_0px_#000] flex flex-col justify-between group hover:-translate-y-1 transition-all">
                  <div>
                    <div className="relative aspect-video bg-gray-100 overflow-hidden border-b-2 border-black">
                      <img src={product.image} alt={product[`title_${lang}`]} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      <span className="absolute top-3 right-3 ltr:left-3 bg-[#FFC900] brutal-border px-2 py-0.5 text-[10px] font-black rounded-lg">
                        {product[`categoryLabel_${lang}`]}
                      </span>
                      {product.allowPwyw && (
                        <span className="absolute bottom-3 left-3 ltr:right-3 bg-[#FF90E8] brutal-border px-2 py-0.5 text-[9px] font-black rounded-md">
                          {t.pwyw_tag}
                        </span>
                      )}
                    </div>
                    <div className="p-4 space-y-2">
                      <div className="flex justify-between text-[11px] font-bold text-gray-500">
                        <span>{product[`author_${lang}`]}</span>
                        <span className="text-amber-500">⭐ {product.rating} ({product.salesCount})</span>
                      </div>
                      <h3 className="font-extrabold text-sm leading-snug line-clamp-2">{product[`title_${lang}`]}</h3>
                      <p className="text-[11px] text-gray-600 font-bold line-clamp-2">{product[`desc_${lang}`]}</p>
                    </div>
                  </div>
                  <div className="p-4 pt-0 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-gray-400 block">Starting at</span>
                      <span className="text-xl font-black">${product.price}</span>
                    </div>
                    <div className="flex gap-1.5">
                      <button onClick={() => openModal(product)} className="bg-gray-100 brutal-btn p-2 rounded-lg text-black hover:bg-[#FF90E8]">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                      </button>
                      <button onClick={() => addToCart(product)} className="bg-[#FFC900] brutal-btn px-3 py-2 rounded-lg font-black text-xs flex items-center gap-1">
                        🛒 {t.btn_buy}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Cart Drawer */}
      {cartOpen && <div className="fixed inset-0 bg-black/50 z-50" onClick={() => setCartOpen(false)} />}
      <div
        className={`fixed inset-y-0 left-0 w-full sm:w-96 bg-white border-r-3 border-black z-50 transform transition-transform duration-300 flex flex-col ${
          cartOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ borderRight: "3px solid #000" }}
      >
        <div className="p-5 border-b-2 border-black bg-[#FFC900] flex justify-between items-center">
          <h3 className="font-black text-lg">🛒 {t.cart_title}</h3>
          <button onClick={() => setCartOpen(false)} className="w-8 h-8 bg-white brutal-border rounded-full font-black text-sm">✕</button>
        </div>
        <div className="flex-1 overflow-y-auto p-5 space-y-3">
          {cart.length === 0 ? (
            <div className="text-center py-12 text-gray-500 font-bold space-y-2">
              <p className="text-3xl">🛒</p>
              <p>{t.cart_empty}</p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="bg-gray-50 brutal-border p-3 rounded-xl flex items-center gap-3">
                <img src={item.image} alt="" className="w-12 h-12 rounded-lg object-cover border border-black" />
                <div className="flex-1 min-w-0">
                  <h4 className="font-extrabold text-xs truncate">{item[`title_${lang}`]}</h4>
                  <p className="text-[11px] text-gray-500 font-bold">${item.selectedPrice.toFixed(2)}</p>
                </div>
                <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700 font-black text-sm p-1">✕</button>
              </div>
            ))
          )}
        </div>
        <div className="p-5 border-t-2 border-black bg-gray-50 space-y-3">
          <div className="flex justify-between text-lg font-black">
            <span>{t.cart_total}</span>
            <span className="text-xl">${cartTotal.toFixed(2)}</span>
          </div>
          <button
            disabled={cart.length === 0}
            className="w-full bg-[#00F5D4] brutal-btn py-3 rounded-xl font-black text-sm disabled:opacity-50"
          >
            🔒 {t.cart_checkout}
          </button>
        </div>
      </div>

      {/* Product Modal */}
      {modalProduct && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setModalProduct(null)}>
          <div className="bg-white brutal-border rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 relative" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setModalProduct(null)} className="absolute top-4 left-4 w-8 h-8 bg-gray-100 brutal-border rounded-full font-black text-sm">✕</button>
            <img src={modalProduct.image} alt="" className="w-full aspect-video object-cover rounded-xl brutal-border mb-4" />
            <span className="bg-[#FFC900] brutal-border px-2 py-0.5 text-[10px] font-black rounded-md">{modalProduct[`categoryLabel_${lang}`]}</span>
            <h2 className="text-xl font-black mt-2">{modalProduct[`title_${lang}`]}</h2>
            <p className="text-sm font-bold text-gray-700 mt-2">{modalProduct[`desc_${lang}`]}</p>
            {modalProduct.allowPwyw && (
              <div className="bg-[#FF90E8]/20 brutal-border p-3 rounded-xl mt-4">
                <label className="text-xs font-black">{t.pwyw_tag} (Min ${modalProduct.price}):</label>
                <input
                  type="number"
                  min={modalProduct.price}
                  value={customPrice}
                  onChange={(e) => setCustomPrice(Number(e.target.value))}
                  className="w-full bg-white brutal-border rounded-lg px-3 py-2 font-black mt-1 focus:outline-none"
                />
              </div>
            )}
            <div className="flex justify-between items-center mt-4 pt-4 border-t-2 border-black">
              <span className="text-2xl font-black">${modalProduct.allowPwyw ? customPrice : modalProduct.price}</span>
              <button
                onClick={() => {
                  addToCart(modalProduct, modalProduct.allowPwyw ? customPrice : undefined);
                  setModalProduct(null);
                }}
                className="bg-[#FFC900] brutal-btn px-5 py-2.5 rounded-xl font-black text-sm"
              >
                🛒 {t.btn_buy}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const ar = "ar";
