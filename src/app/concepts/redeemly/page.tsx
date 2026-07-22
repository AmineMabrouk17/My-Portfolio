"use client";

import { useState, useEffect, useCallback } from "react";

// i18n translations
const i18n = {
  ar: {
    brand_name: "ريديم لي",
    nav_store: "متجر الشحن السريع",
    nav_api: "ربط الـ API والمطورين",
    nav_cards: "أكواد وكروت الهدايا",
    nav_orders: "حالة السيرفرات والطلبات",
    balance_label: "رصيد حسابك المتاح:",
    hero_badge: "المنصة الأولى المعتمدة لتوفير خدمات الـ API لربط المتاجر المباشر",
    hero_title: "اشحن حساباتك أو",
    hero_title_highlight: "اربط متجرك بالـ API",
    hero_title_end: "فورياً بأسعار الجملة!",
    hero_desc: "نوفر حلول الشحن التلقائي لألعاب ببجي، فري فاير، روبلوكس، وتطبيقات البث المباشر (تيك توك، بيجو، لايكي) عبر نظام الشحن المباشر بالمعرف.",
    hero_btn_store: "ابتدئ الشحن السريع",
    hero_btn_api: "تجربة الـ API Sandbox",
    stat_1: "استقرار خدمات الـ API",
    stat_2: "متوسط زمن التنفيذ",
    stat_3: "خدمة ولعبة مدعومة",
    stat_4: "طلب تم معالجته",
    calc_title: "حاسبة الشحن الفوري السريع",
    calc_select_label: "اختر الخدمة أو اللعبة:",
    calc_id_label: "أدخل معرف اللاعب (Player ID):",
    calc_verify_btn: "تحقق",
    calc_package_label: "اختر الحزمة المطلوبة:",
    calc_submit_btn: "تنفيذ الشحن التلقائي الآن",
    store_badge: "متجر الشحن الفوري",
    store_title: "قائمة الألعاب والتطبيقات المتاحة",
    store_search_ph: "ابحث عن لعبة أو تطبيق...",
    cat_all: "جميع الأقسام",
    cat_games: "🎮 ألعاب الفيديو",
    cat_apps: "📱 تطبيقات البث والعملات",
    api_title: "مركز المطورين وتوصيل الـ API المباشر",
    api_desc: "يمكنك ربط متجرك الإلكتروني بـ API منصة ريديم لي لتنفيذ طلبات الشحن أوتوماتيكياً بدون تدخل بشري وبأسعار الموزعين.",
    api_key_label: "مفتاح الـ API الخاص بك (Live Key):",
    api_testing_title: "منصة تجربة نقاط النهاية",
    api_select_ep_label: "اختر الـ Endpoint المطلوبة:",
    api_send_btn: "إرسال الطلب التجريبي",
    api_code_title: "كود الربط المباشر",
    api_copy_code: "نسخ الكود",
    api_res_title: "استجابة السيرفر المباشرة",
    webhook_title: "إعدادات الإشعارات الفورية",
    webhook_save: "حفظ الرابط",
    cards_badge: "البطاقات الأوتوماتيكية",
    cards_title: "بطاقات الهدايا وأكواد التفعيل الرقمية",
    orders_title: "حالة سيرفرات وبوابات الشحن المباشر",
    orders_refresh: "更新 الجدول",
    th_ord_id: "رقم الطلب",
    th_service: "الخدمة",
    th_player_id: "المعرف / ID",
    th_price: "المبلغ",
    th_method: "طريقة الشحن",
    th_status: "الحالة",
    status_connected: "متصل",
    lang_btn: "English",
  },
  en: {
    brand_name: "Redeemly",
    nav_store: "Quick Topup Store",
    nav_api: "API & Developers Hub",
    nav_cards: "Gift Cards & Codes",
    nav_orders: "Server & Order Status",
    balance_label: "Available Balance:",
    hero_badge: "The #1 Trusted Platform for Direct API Store Integration",
    hero_title: "Topup your accounts or",
    hero_title_highlight: "Integrate your store with API",
    hero_title_end: "Instantly at wholesale prices!",
    hero_desc: "We provide automatic topup solutions for PUBG, Free Fire, Roblox, and live streaming apps (TikTok, Bigo, Likee) via direct Player ID charging.",
    hero_btn_store: "Start Quick Topup",
    hero_btn_api: "Try API Sandbox",
    stat_1: "API Service Uptime",
    stat_2: "Avg Execution Time",
    stat_3: "Services & Games Supported",
    stat_4: "Orders Processed",
    calc_title: "Instant Topup Calculator",
    calc_select_label: "Select Service or Game:",
    calc_id_label: "Enter Player ID:",
    calc_verify_btn: "Verify",
    calc_package_label: "Select Package:",
    calc_submit_btn: "Execute Auto Topup Now",
    store_badge: "Instant Topup Store",
    store_title: "Available Games & Apps",
    store_search_ph: "Search games or apps...",
    cat_all: "All Categories",
    cat_games: "🎮 Video Games",
    cat_apps: "📱 Streaming & Coins Apps",
    api_title: "Developer Hub & Direct API Delivery",
    api_desc: "Integrate your e-commerce store with Redeemly API to execute topup orders automatically without human intervention at reseller prices.",
    api_key_label: "Your API Key (Live Key):",
    api_testing_title: "Endpoint Testing Platform",
    api_select_ep_label: "Select Endpoint:",
    api_send_btn: "Execute Test Request",
    api_code_title: "Integration Code",
    api_copy_code: "Copy Code",
    api_res_title: "Live Server Response",
    webhook_title: "Instant Notifications Settings",
    webhook_save: "Save URL",
    cards_badge: "Automatic Cards",
    cards_title: "Gift Cards & Digital Activation Codes",
    orders_title: "Server & Gateway Status",
    orders_refresh: "Refresh Table",
    th_ord_id: "Order ID",
    th_service: "Service",
    th_player_id: "Player ID",
    th_price: "Amount",
    th_method: "Topup Method",
    th_status: "Status",
    status_connected: "Connected",
    lang_btn: "العربية",
  },
};

const gamesData = [
  { id: "pubg", title: "PUBG Mobile UC", titleEn: "PUBG Mobile UC", icon: "🎯", category: "games", packages: [{ name: "60 UC", price: 0.99 }, { name: "325 UC", price: 4.99 }, { name: "660 UC", price: 9.99 }, { name: "1800 UC", price: 24.99 }, { name: "3850 UC", price: 49.99 }, { name: "8100 UC", price: 99.99 }] },
  { id: "freefire", title: "Free Fire Diamonds", titleEn: "Free Fire Diamonds", icon: "🔥", category: "games", packages: [{ name: "110 Diamonds", price: 0.99 }, { name: "330 Diamonds", price: 2.99 }, { name: "550 Diamonds", price: 4.99 }, { name: "1100 Diamonds", price: 9.99 }, { name: "2200 Diamonds", price: 19.99 }, { name: "5500 Diamonds", price: 49.99 }] },
  { id: "roblox", title: "Roblox Robux", titleEn: "Roblox Robux", icon: "👾", category: "games", packages: [{ name: "80 Robux", price: 0.99 }, { name: "400 Robux", price: 4.99 }, { name: "800 Robux", price: 9.99 }, { name: "1700 Robux", price: 19.99 }, { name: "4500 Robux", price: 49.99 }, { name: "10000 Robux", price: 99.99 }] },
  { id: "tiktok", title: "TikTok Coins", titleEn: "TikTok Coins", icon: "🎵", category: "apps", packages: [{ name: "70 Coins", price: 0.99 }, { name: "350 Coins", price: 4.99 }, { name: "700 Coins", price: 9.99 }, { name: "1400 Coins", price: 19.99 }, { name: "3500 Coins", price: 49.99 }, { name: "7000 Coins", price: 99.99 }] },
  { id: "bigolive", title: "Bigo Diamonds", titleEn: "Bigo Diamonds", icon: "📺", category: "apps", packages: [{ name: "42 Diamonds", price: 0.99 }, { name: "210 Diamonds", price: 4.99 }, { name: "420 Diamonds", price: 9.99 }, { name: "840 Diamonds", price: 19.99 }, { name: "2100 Diamonds", price: 49.99 }, { name: "4200 Diamonds", price: 99.99 }] },
  { id: "mobilelegends", title: "Mobile Legends", titleEn: "Mobile Legends", icon: "⚔️", category: "games", packages: [{ name: "56 Diamonds", price: 0.99 }, { name: "172 Diamonds", price: 2.99 }, { name: "285 Diamonds", price: 4.99 }, { name: "578 Diamonds", price: 9.99 }, { name: "1450 Diamonds", price: 24.99 }, { name: "2895 Diamonds", price: 49.99 }] },
];

const cardsData = [
  { id: "steam", title: "Steam Wallet Card", titleAr: "بطاقة ستيم المحافظة", icon: "🎮", price: 10, category: "games" },
  { id: "psn", title: "PlayStation Store Card", titleAr: "بطاقة بلاي ستيشن ستور", icon: "🎯", price: 20, category: "games" },
  { id: "xbox", title: "Xbox Game Pass Gift Card", titleAr: "بطاقة اكس بوكس جيم باس", icon: "🟢", price: 15, category: "games" },
  { id: "google", title: "Google Play Gift Card", titleAr: "بطاقة جوجل بلاي", icon: "📱", price: 10, category: "apps" },
  { id: "itunes", title: "Apple iTunes Gift Card", titleAr: "بطاقة آبل آيتونز", icon: "🍎", price: 25, category: "apps" },
  { id: "netflix", title: "Netflix Gift Card", titleAr: "بطاقة نتفليكس", icon: "🎬", price: 30, category: "apps" },
];

const currencyRates: Record<string, { symbol: string; rate: number }> = {
  USD: { symbol: "$", rate: 1.0 },
  SAR: { symbol: "SR ", rate: 3.75 },
  EGP: { symbol: "EGP ", rate: 48.5 },
  AED: { symbol: "AED ", rate: 3.67 },
};

type Tab = "store" | "api" | "cards" | "orders";

export default function RedeemlyApp() {
  const [lang, setLang] = useState<"ar" | "en">("ar");
  const [activeTab, setActiveTab] = useState<Tab>("store");
  const [currency, setCurrency] = useState("USD");
  const [balance, setBalance] = useState(1450);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState<typeof gamesData[0] | null>(null);
  const [selectedPkg, setSelectedPkg] = useState<typeof gamesData[0]["packages"][0] | null>(null);
  const [playerId, setPlayerId] = useState("");
  const [playerVerified, setPlayerVerified] = useState(false);
  const [apiKey, setApiKey] = useState("rdm_live_99831a0293f88d22");
  const [apiKeyVisible, setApiKeyVisible] = useState(false);
  const [apiEndpoint, setApiEndpoint] = useState("topup");
  const [langCode, setLangCode] = useState("curl");
  const [apiRequestBody, setApiRequestBody] = useState('{\n  "service": "pubg_uc",\n  "amount": 660,\n  "player_id": "51293810"\n}');
  const [apiResponse, setApiResponse] = useState('{\n  "status": "success",\n  "message": "API System Operational. Ready for requests."\n}');
  const [orders, setOrders] = useState([
    { id: "#ORD-38291", service: "PUBG Mobile UC", playerId: "51293810", price: "$9.99", method: "Direct Portal", status: "Completed" },
    { id: "#ORD-38292", service: "TikTok Coins", playerId: "user_8812", price: "$19.99", method: "API v2", status: "Completed" },
    { id: "#ORD-38293", service: "Free Fire Diamonds", playerId: "3829102", price: "$4.99", method: "Direct Portal", status: "Completed" },
  ]);
  const [webhookUrl, setWebhookUrl] = useState("");
  const t = i18n[lang];

  const cur = currencyRates[currency];

  const showToast = useCallback((msg: string, type: "success" | "error" = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  }, []);

  const filteredGames = gamesData.filter((g) => {
    const matchCat = categoryFilter === "all" || g.category === categoryFilter;
    const title = lang === "ar" ? g.title : g.titleEn;
    const matchSearch = search === "" || title.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const openCheckout = (game: typeof gamesData[0]) => {
    setSelectedGame(game);
    setSelectedPkg(game.packages[0]);
    setPlayerId("");
    setPlayerVerified(false);
    setCheckoutOpen(true);
  };

  const executeTopup = () => {
    if (!playerId.trim()) {
      showToast(lang === "ar" ? "أدخل معرّف الحساب أولاً" : "Enter Player ID first", "error");
      return;
    }
    if (!selectedPkg) return;
    if (balance < selectedPkg.price) {
      showToast(lang === "ar" ? "رصيد محفظتك غير كافٍ" : "Insufficient wallet balance", "error");
      return;
    }
    setBalance((b) => b - selectedPkg.price);
    const orderId = "#ORD-" + Math.floor(10000 + Math.random() * 90000);
    setOrders((prev) => [{ id: orderId, service: selectedGame!.title, playerId, price: "$" + selectedPkg.price.toFixed(2), method: "Direct Portal", status: "Completed" }, ...prev]);
    setCheckoutOpen(false);
    showToast(lang === "ar" ? `تم الشحن بنجاح للحساب (${playerId})⚡` : `Topup completed for ID (${playerId})⚡`);
  };

  const executeApiCall = () => {
    setApiResponse('{\n  "status": "pending",\n  "message": "Executing API request..."\n}');
    setTimeout(() => {
      const endpoint = apiEndpoint;
      if (endpoint === "topup") {
        setApiResponse(JSON.stringify({ status: "success", code: 200, order_id: "RDM_API_" + Math.floor(100000 + Math.random() * 90000), service: "PUBG Mobile UC", player_id: "51293810", amount_deducted: 10.80, remaining_balance: (balance - 10.80).toFixed(2), timestamp: new Date().toISOString() }, null, 2));
      } else if (endpoint === "player_info") {
        setApiResponse(JSON.stringify({ status: "success", verified: true, player_id: "51293810", player_name: "AL_GAMER_99", region: "MENA" }, null, 2));
      } else if (endpoint === "balance") {
        setApiResponse(JSON.stringify({ status: "success", currency: "USD", balance: balance.toFixed(2), tier: "VIP Reseller" }, null, 2));
      } else {
        setApiResponse(JSON.stringify({ status: "success", services_count: 120, gateway_status: "Operational" }, null, 2));
      }
      showToast(lang === "ar" ? "تم تنفيذ طلب الـ API بنجاح ⚡" : "API Request executed successfully ⚡");
    }, 500);
  };

  const getCodeSnippet = (): string => {
    const body = apiRequestBody;
    if (langCode === "curl") {
      return `curl -X POST "https://api.redeemly.net/v2/${apiEndpoint}" \\\n  -H "Content-Type: application/json" \\\n  -d '${body}'`;
    } else if (langCode === "node") {
      return `const axios = require('axios');\n\naxios.post('https://api.redeemly.net/v2/${apiEndpoint}', ${body})\n  .then(response => console.log(response.data))\n  .catch(error => console.error(error));`;
    } else if (langCode === "python") {
      return `import requests\n\nurl = "https://api.redeemly.net/v2/${apiEndpoint}"\npayload = ${body}\n\nresponse = requests.post(url, json=payload)\nprint(response.json())`;
    } else {
      return `<?php\n$ch = curl_init("https://api.redeemly.net/v2/${apiEndpoint}");\ncurl_setopt($ch, CURLOPT_RETURNTRANSFER, true);\ncurl_setopt($ch, CURLOPT_POSTFIELDS, '${body}');\ncurl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type:application/json'));\n$response = curl_exec($ch);\ncurl_close($ch);\necho $response;\n?>`;
    }
  };

  const tabs: { id: Tab; icon: string; label: string }[] = [
    { id: "store", icon: "🎮", label: t.nav_store },
    { id: "api", icon: "🔌", label: t.nav_api },
    { id: "cards", icon: "💳", label: t.nav_cards },
    { id: "orders", icon: "📊", label: t.nav_orders },
  ];

  return (
    <div dir="rtl" className="min-h-screen bg-[#060911] text-slate-100" style={{ fontFamily: "'IBM Plex Sans Arabic', Inter, sans-serif" }}>
      {/* Toast */}
      {toast && (
        <div className={`fixed top-5 left-5 z-50 bg-slate-900/90 backdrop-blur-md border ${toast.type === "success" ? "border-emerald-500/40 text-emerald-400" : "border-red-500/40 text-red-400"} px-4 py-3 rounded-xl text-xs font-bold shadow-2xl flex items-center gap-2 animate-in`}>
          {toast.type === "success" ? "✅" : "⚠️"} {toast.msg}
        </div>
      )}

      {/* Announcement Bar */}
      <div className="bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-950 border-b border-indigo-500/20 text-xs py-2 px-4 text-gray-300">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-3">
            <span className="bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black px-2.5 py-0.5 rounded text-[10px] tracking-wide uppercase">API v2.4 {t.status_connected}</span>
            <p className="truncate text-gray-300 text-xs">بوابة شحن الألعاب والتطبيقات للموزعين وأصحاب المتاجر ⚡</p>
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              {t.stat_2}: <span className="font-mono">{Math.floor(140 + Math.random() * 80)}ms</span>
            </span>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#080c14]/90 backdrop-blur-md border-b border-gray-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-600 to-purple-600 p-0.5">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center text-cyan-400 text-lg">⚡</div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-black tracking-wide bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-500 bg-clip-text text-transparent">{t.brand_name}</span>
                <span className="text-[9px] bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-bold px-1.5 py-0.5 rounded">API</span>
              </div>
              <span className="text-[9px] text-gray-500 font-medium tracking-wider">REDEEMLY TOPUP HUB</span>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-gray-800 text-xs font-bold">
            {tabs.map((tab) => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${activeTab === tab.id ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/20" : "text-gray-400 hover:text-white"}`}>
                {tab.icon} {tab.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button onClick={() => setLang(lang === "ar" ? "en" : "ar")} className="bg-slate-900 border border-indigo-500/40 hover:border-cyan-400 text-cyan-300 font-bold text-xs rounded-lg px-2.5 py-1.5 flex items-center gap-1.5">
              🌐 {t.lang_btn}
            </button>
            <div className="bg-slate-900/90 border border-indigo-500/30 rounded-lg px-2.5 py-1 flex items-center gap-2">
              <div>
                <span className="text-[9px] text-gray-400 font-medium block">{t.balance_label}</span>
                <span className="text-xs font-black text-emerald-400 font-mono">{cur.symbol}{balance.toFixed(2)} USD</span>
              </div>
              <button onClick={() => { const amt = prompt(lang === "ar" ? "أدخل مبلغ الإيداع:" : "Enter deposit amount:"); if (amt) { const n = parseFloat(amt); if (n > 0) { setBalance((b) => b + n); showToast(lang === "ar" ? `تمت إضافة ${cur.symbol}${n} USD لرصيد حسابك!` : `Added ${cur.symbol}${n} USD to wallet!`); } } }} className="w-7 h-7 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 flex items-center justify-center text-xs">+</button>
            </div>
            <select value={currency} onChange={(e) => setCurrency(e.target.value)} className="bg-slate-900 border border-gray-700 text-gray-300 text-xs rounded-lg px-2 py-1.5 focus:outline-none cursor-pointer">
              <option value="USD">$ USD</option>
              <option value="SAR">SR ريال</option>
              <option value="EGP">EGP جنيه</option>
              <option value="AED">AED درهم</option>
            </select>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative py-12 lg:py-16 overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900/90 to-slate-950">
        <div className="absolute top-1/3 end-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute top-10 start-10 w-96 h-96 bg-purple-600/10 rounded-full blur-[130px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-5 text-center lg:text-right">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-cyan-500/10 to-purple-500/10 text-cyan-400 text-xs font-bold border border-cyan-500/30">
              🛡️ {t.hero_badge}
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
              {t.hero_title} <span className="bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-500 bg-clip-text text-transparent">{t.hero_title_highlight}</span> {t.hero_title_end}
            </h1>
            <p className="text-gray-400 text-sm leading-relaxed max-w-2xl mx-auto lg:mx-0">{t.hero_desc}</p>
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <button onClick={() => setActiveTab("store")} className="bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-black px-6 py-3 rounded-xl shadow-lg shadow-cyan-500/20 transition-all flex items-center gap-2 text-xs">
                ⚡ {t.hero_btn_store}
              </button>
              <button onClick={() => setActiveTab("api")} className="bg-slate-900 hover:bg-slate-800 text-cyan-400 font-bold px-5 py-3 rounded-xl border border-cyan-500/30 transition-all flex items-center gap-2 text-xs">
                🔌 {t.hero_btn_api}
              </button>
            </div>
            <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 border-t border-gray-800/80">
              {[{ val: "99.99%", label: t.stat_1, color: "text-white" }, { val: "< 3 Sec", label: t.stat_2, color: "text-cyan-400" }, { val: "+120", label: t.stat_3, color: "text-purple-400" }, { val: "+4.2M", label: t.stat_4, color: "text-emerald-400" }].map((s, i) => (
                <div key={i} className="p-3 bg-slate-900/60 rounded-xl border border-gray-800">
                  <div className={`text-lg font-black font-mono ${s.color}`}>{s.val}</div>
                  <div className="text-[10px] text-gray-400">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
          {/* Quick Widget */}
          <div className="lg:col-span-5">
            <div className="bg-slate-900/85 backdrop-blur-md p-5 rounded-2xl border border-cyan-500/30 shadow-2xl">
              <h3 className="text-base font-bold text-white flex items-center gap-2 mb-4">
                🧮 {t.calc_title}
                <span className="text-[9px] bg-emerald-500/10 text-emerald-400 font-bold px-2 py-0.5 rounded border border-emerald-500/30">{t.status_connected}</span>
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">{t.calc_select_label}</label>
                  <select className="w-full bg-slate-900 border border-gray-700 text-white text-xs rounded-xl p-2.5 focus:border-cyan-500 focus:outline-none">
                    {gamesData.map((g) => <option key={g.id} value={g.id}>{g.icon} {lang === "ar" ? g.title : g.titleEn}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">{t.calc_id_label}</label>
                  <input type="text" placeholder="51293810" className="w-full bg-slate-900 border border-gray-700 text-white text-xs rounded-xl p-2.5 focus:border-cyan-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">{t.calc_package_label}</label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {gamesData[0].packages.slice(0, 3).map((pkg, i) => (
                      <button key={i} className="p-2 rounded-lg border border-gray-700 bg-slate-950 text-gray-300 text-center text-[10px] font-bold hover:border-cyan-400 transition-all">
                        <span className="block">{pkg.name}</span>
                        <span className="text-cyan-400 font-mono">{cur.symbol}{(pkg.price * cur.rate).toFixed(2)}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <button className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black py-3 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-xs">
                  {t.calc_submit_btn} →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10 flex-1">

        {/* Store Tab */}
        {activeTab === "store" && (
          <div className="space-y-6 animate-in">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-800 pb-6">
              <div>
                <span className="text-cyan-400 text-xs font-bold uppercase tracking-wider">{t.store_badge}</span>
                <h2 className="text-2xl font-black text-white mt-0.5">{t.store_title}</h2>
              </div>
              <div className="flex items-center gap-3 w-full md:w-auto">
                <div className="relative flex-1 md:w-64">
                  <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder={t.store_search_ph} className="w-full bg-slate-900 text-xs text-gray-200 rounded-xl py-2 ps-8 pe-3 border border-gray-700 focus:outline-none focus:border-cyan-500" />
                  <span className="absolute start-3 top-2.5 text-gray-400 text-xs">🔍</span>
                </div>
                <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="bg-slate-900 border border-gray-700 text-gray-300 text-xs rounded-xl px-3 py-2 focus:outline-none cursor-pointer">
                  <option value="all">{t.cat_all}</option>
                  <option value="games">{t.cat_games}</option>
                  <option value="apps">{t.cat_apps}</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {filteredGames.map((game) => (
                <button key={game.id} onClick={() => openCheckout(game)} className="bg-gradient-to-br from-slate-800/60 to-slate-900/90 border border-white/5 rounded-2xl p-4 text-center transition-all hover:-translate-y-1 hover:border-cyan-400/40 hover:shadow-lg hover:shadow-cyan-500/20 group">
                  <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{game.icon}</div>
                  <h3 className="text-xs font-bold text-white mb-1">{lang === "ar" ? game.title : game.titleEn}</h3>
                  <p className="text-[10px] text-gray-400">{game.packages.length} packages</p>
                  <div className="mt-2 pt-2 border-t border-gray-800 text-cyan-400 font-mono text-xs font-bold">
                    {cur.symbol}{(game.packages[0].price * cur.rate).toFixed(2)}+
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* API Tab */}
        {activeTab === "api" && (
          <div className="space-y-6 animate-in">
            <div className="bg-slate-900/85 backdrop-blur-md p-5 rounded-2xl border border-cyan-500/30">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 bg-cyan-500/10 text-cyan-400 text-xs font-bold px-3 py-1 rounded-full border border-cyan-500/30">🔌 REDEEMLY REST API v2</div>
                  <h2 className="text-xl font-black text-white">{t.api_title}</h2>
                  <p className="text-xs text-gray-400 max-w-2xl">{t.api_desc}</p>
                </div>
                <div className="bg-slate-900 p-3 rounded-xl border border-gray-800 min-w-[240px]">
                  <span className="text-[10px] text-gray-400 font-bold block">{t.api_key_label}</span>
                  <div className="flex items-center gap-1.5 mt-1">
                    <input type={apiKeyVisible ? "text" : "password"} value={apiKey} readOnly className="bg-slate-950 text-cyan-400 font-mono text-[11px] p-1.5 rounded-lg border border-gray-800 flex-1 outline-none" />
                    <button onClick={() => setApiKeyVisible(!apiKeyVisible)} className="bg-slate-800 hover:bg-slate-700 text-gray-300 p-1.5 rounded-lg text-xs">{apiKeyVisible ? "🙈" : "👁️"}</button>
                    <button onClick={() => { navigator.clipboard?.writeText(apiKey); showToast(lang === "ar" ? "تم نسخ مفتاح الـ API" : "API Key copied"); }} className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold p-1.5 rounded-lg text-xs">📋</button>
                  </div>
                  <button onClick={() => { setApiKey("rdm_live_" + Math.random().toString(36).substring(2, 18)); showToast(lang === "ar" ? "تم توليد مفتاح API جديد!" : "New API Key generated!"); }} className="text-[9px] text-purple-400 hover:underline mt-1 block text-end">↻ {lang === "ar" ? "إعادة توليد مفتاح جديد" : "Reset Key"}</button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              <div className="lg:col-span-5 space-y-4">
                <div className="bg-slate-900/85 backdrop-blur-md p-4 rounded-2xl border border-gray-800 space-y-3">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">💻 {t.api_testing_title}</h3>
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">{t.api_select_ep_label}</label>
                    <select value={apiEndpoint} onChange={(e) => setApiEndpoint(e.target.value)} className="w-full bg-slate-900 border border-gray-700 text-xs text-white rounded-xl p-2 focus:border-cyan-500 outline-none cursor-pointer">
                      <option value="topup">POST /api/v2/topup</option>
                      <option value="player_info">POST /api/v2/player-info</option>
                      <option value="balance">GET /api/v2/balance</option>
                      <option value="services">GET /api/v2/services</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">{lang === "ar" ? "لغة البرمجة:" : "Language:"}</label>
                    <div className="grid grid-cols-4 gap-1 bg-slate-900 p-1 rounded-xl border border-gray-800 text-[10px] font-bold">
                      {["curl", "node", "python", "php"].map((l) => (
                        <button key={l} onClick={() => setLangCode(l)} className={`py-1 rounded-lg transition-all ${langCode === l ? "bg-indigo-600 text-white" : "text-gray-400 hover:text-white"}`}>{l === "node" ? "Node.js" : l === "curl" ? "cURL" : l === "python" ? "Python" : "PHP"}</button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">{lang === "ar" ? "بيانات الطلب (JSON):" : "Request Body (JSON):"}</label>
                    <textarea value={apiRequestBody} onChange={(e) => setApiRequestBody(e.target.value)} rows={5} dir="ltr" className="w-full bg-slate-950 border border-gray-800 font-mono text-[11px] text-cyan-300 rounded-xl p-2.5 focus:border-cyan-500 outline-none" />
                  </div>
                  <button onClick={executeApiCall} className="w-full bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-black py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 text-xs">
                    📤 {t.api_send_btn}
                  </button>
                </div>
              </div>
              <div className="lg:col-span-7 space-y-4">
                <div className="bg-slate-900/85 backdrop-blur-md p-4 rounded-2xl border border-gray-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-300 flex items-center gap-2">💜 {t.api_code_title}</span>
                    <button onClick={() => { navigator.clipboard?.writeText(getCodeSnippet()); showToast(lang === "ar" ? "تم نسخ الكود!" : "Code copied!"); }} className="text-[10px] text-cyan-400 hover:underline flex items-center gap-1">📋 {t.api_copy_code}</button>
                  </div>
                  <pre className="bg-slate-950 p-3 rounded-xl border border-gray-800 overflow-x-auto text-[11px] text-emerald-400" dir="ltr"><code>{getCodeSnippet()}</code></pre>
                </div>
                <div className="bg-slate-900/85 backdrop-blur-md p-4 rounded-2xl border border-gray-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-300 flex items-center gap-2">⚡ {t.api_res_title}</span>
                    <span className="text-[9px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded">200 OK</span>
                  </div>
                  <pre className="bg-slate-950 p-3 rounded-xl border border-gray-800 overflow-x-auto text-[11px] font-mono text-cyan-300" dir="ltr"><code>{apiResponse}</code></pre>
                </div>
                <div className="bg-slate-900/85 backdrop-blur-md p-4 rounded-2xl border border-gray-800 space-y-3">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">📡 {t.webhook_title}</h3>
                  <div className="flex gap-2">
                    <input type="url" value={webhookUrl} onChange={(e) => setWebhookUrl(e.target.value)} placeholder="https://yourstore.com/api/redeemly-callback" className="flex-1 bg-slate-900 border border-gray-700 text-xs text-white rounded-xl p-2.5 focus:border-cyan-500 outline-none" dir="ltr" />
                    <button onClick={() => { if (webhookUrl.trim()) showToast(lang === "ar" ? "تم حفظ رابط الـ Webhook!" : "Webhook URL saved!"); else showToast(lang === "ar" ? "أدخل رابطاً صالحاً" : "Enter a valid URL", "error"); }} className="bg-slate-800 hover:bg-slate-700 border border-gray-700 text-white font-bold text-xs px-4 py-2 rounded-xl">{t.webhook_save}</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Cards Tab */}
        {activeTab === "cards" && (
          <div className="space-y-6 animate-in">
            <div className="border-b border-gray-800 pb-6 flex justify-between items-center">
              <div>
                <span className="text-purple-400 text-xs font-bold uppercase tracking-wider">{t.cards_badge}</span>
                <h2 className="text-2xl font-black text-white mt-0.5">{t.cards_title}</h2>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {cardsData.map((card) => (
                <div key={card.id} className="bg-gradient-to-br from-slate-800/60 to-slate-900/90 border border-white/5 rounded-2xl p-5 transition-all hover:-translate-y-1 hover:border-purple-400/40 hover:shadow-lg hover:shadow-purple-500/20 space-y-3">
                  <div className="text-4xl">{card.icon}</div>
                  <div>
                    <h3 className="text-sm font-bold text-white">{lang === "ar" ? card.titleAr : card.title}</h3>
                    <p className="text-[10px] text-gray-400 mt-1">Starting at</p>
                    <p className="text-lg font-black text-purple-400 font-mono">{cur.symbol}{(card.price * cur.rate).toFixed(2)}</p>
                  </div>
                  <button onClick={() => { if (balance < card.price) { showToast(lang === "ar" ? "رصيد حسابك غير كافٍ" : "Insufficient balance", "error"); return; } setBalance((b) => b - card.price); const code = "RDM-" + Math.floor(1000 + Math.random() * 9000) + "-" + Math.floor(1000 + Math.random() * 9000); showToast(lang === "ar" ? `تم شراء الكود بنجاح: ${code}` : `Code generated: ${code}`); }} className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white font-bold text-xs py-2.5 rounded-xl transition-all">{lang === "ar" ? "شراء الكود" : "Buy Code"}</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === "orders" && (
          <div className="space-y-6 animate-in">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">🖥️ {t.orders_title}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                { name: "PUBG Mobile API Gateway", ms: 140 },
                { name: "FreeFire Garena Gateway", ms: 190 },
                { name: "TikTok Live API Node", ms: 210 },
                { name: "Roblox Cloud Gateway", ms: 160 },
              ].map((s, i) => (
                <div key={i} className="bg-slate-900 p-3 rounded-xl border border-gray-800 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-white block">{s.name}</span>
                    <span className="text-[10px] text-emerald-400 font-mono">{t.status_connected} ({s.ms}ms)</span>
                  </div>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                </div>
              ))}
            </div>
            <div className="bg-slate-900/85 backdrop-blur-md rounded-2xl border border-gray-800 overflow-hidden p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-white">{lang === "ar" ? "سجل العمليات الأخيرة" : "Recent Orders"}</h3>
                <button onClick={() => {}} className="text-xs text-cyan-400 hover:underline">↻ {t.orders_refresh}</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-start text-xs">
                  <thead className="bg-slate-950 text-gray-400 border-b border-gray-800">
                    <tr>
                      {[t.th_ord_id, t.th_service, t.th_player_id, t.th_price, t.th_method, t.th_status].map((h, i) => (
                        <th key={i} className="p-2.5 text-start">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800/60 text-gray-300">
                    {orders.map((o, i) => (
                      <tr key={i} className="hover:bg-slate-900/50 transition-colors">
                        <td className="p-2.5 font-mono text-cyan-400 font-bold">{o.id}</td>
                        <td className="p-2.5 font-bold">{o.service}</td>
                        <td className="p-2.5 font-mono">{o.playerId}</td>
                        <td className="p-2.5 font-mono text-emerald-400 font-bold">{o.price}</td>
                        <td className="p-2.5"><span className="bg-slate-800 text-gray-300 text-[10px] px-2 py-0.5 rounded border border-gray-700">{o.method}</span></td>
                        <td className="p-2.5"><span className="text-emerald-400 font-bold text-[10px]">✅ {o.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Checkout Modal */}
      {checkoutOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4" onClick={() => setCheckoutOpen(false)}>
          <div className="bg-slate-900/95 backdrop-blur-md max-w-lg w-full rounded-2xl border border-cyan-500/30 shadow-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="bg-slate-950 p-4 border-b border-gray-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{selectedGame?.icon}</span>
                <div>
                  <h3 className="font-bold text-white text-sm">{selectedGame && (lang === "ar" ? selectedGame.title : selectedGame.titleEn)}</h3>
                  <span className="text-[10px] text-emerald-400 font-semibold">✅ {t.status_connected}</span>
                </div>
              </div>
              <button onClick={() => setCheckoutOpen(false)} className="w-7 h-7 rounded-full bg-slate-900 hover:bg-slate-800 text-gray-400 hover:text-white flex items-center justify-center text-xs">✕</button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">{t.calc_id_label}</label>
                <div className="relative">
                  <input type="text" value={playerId} onChange={(e) => { setPlayerId(e.target.value); setPlayerVerified(false); }} placeholder="59382019" className="w-full bg-slate-950 border border-gray-700 text-white text-xs rounded-xl py-2.5 pe-20 focus:border-cyan-500 outline-none" />
                  <button onClick={() => { if (playerId.trim()) { setPlayerVerified(true); showToast(lang === "ar" ? "تم التحقق من الحساب!" : "Player ID verified!"); } }} className="absolute end-1.5 top-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] px-2.5 py-1.5 rounded-lg transition-colors">{t.calc_verify_btn}</button>
                </div>
                {playerVerified && <p className="text-[10px] text-emerald-400 mt-1 font-semibold">✅ Player verified: {playerId}</p>}
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">{t.calc_package_label}</label>
                <div className="grid grid-cols-3 gap-2 max-h-40 overflow-y-auto p-1">
                  {selectedGame?.packages.map((pkg, i) => (
                    <button key={i} onClick={() => setSelectedPkg(pkg)} className={`p-2 rounded-xl border text-center transition-all ${selectedPkg === pkg ? "border-cyan-400 bg-cyan-950/60 text-white" : "border-gray-800 bg-slate-950 text-gray-300"}`}>
                      <span className="text-[10px] font-bold block">{pkg.name}</span>
                      <span className="text-[10px] text-cyan-400 font-mono mt-0.5 block">{cur.symbol}{(pkg.price * cur.rate).toFixed(2)}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-gray-800">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-gray-400">{lang === "ar" ? "المجموع:" : "Total:"}</span>
                  <span className="text-emerald-400 font-mono text-lg">{cur.symbol}{selectedPkg ? (selectedPkg.price * cur.rate).toFixed(2) : "0.00"}</span>
                </div>
              </div>
              <button onClick={executeTopup} className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black py-3 rounded-xl transition-all text-xs">
                ⚡ {t.calc_submit_btn}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
