import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "الماستر كلاس الاحترافي المتقدم",
  robots: { index: false, follow: false },
};

export default function LandingPage2() {
  return (
    <div dir="rtl" className="bg-[#09090b] text-zinc-200 antialiased overflow-x-hidden" style={{ fontFamily: "'Tajawal', sans-serif" }}>
      {/* Urgency Bar */}
      <div className="bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 text-slate-950 py-2.5 text-center px-4">
        <p className="text-xs sm:text-sm font-extrabold tracking-wide">
          ⚠️ المقاعد المتبقية في هذه الدفعة: 7 مقاعد فقط. بادر بالتسجيل لتأكيد مكانك!
        </p>
      </div>

      {/* Hero Section */}
      <section className="relative pt-12 pb-24 px-6 max-w-6xl mx-auto">
        <div className="absolute -top-40 right-1/4 w-[500px] h-[500px] bg-[#6366f1]/10 rounded-full blur-[120px] -z-10"></div>
        <div className="absolute top-1/2 left-0 w-[300px] h-[300px] bg-amber-500/5 rounded-full blur-[100px] -z-10"></div>

        <div className="flex justify-between items-center mb-16">
          <span className="text-2xl font-black text-white tracking-wider">PREMIUM<span className="text-[#f59e0b]">CLASS</span></span>
          <a href="#checkout-section" className="border border-zinc-700 hover:border-amber-500/50 bg-zinc-900/60 text-white px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all">
            انضم للدفعة الحالية
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 text-center lg:text-right">
            <span className="inline-flex items-center gap-1.5 py-1 px-3 rounded-md text-[11px] font-bold bg-zinc-800 text-[#f59e0b] border border-zinc-700">
              🔒 برنامج تدريبي مكثف وحصري
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
              الماستر كلاس الاحترافي المتقدم لتصميم <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-500">تجربة المستخدم UI/UX</span>
            </h1>
            <p className="text-zinc-400 text-base sm:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
              انتقل من مرحلة الهواية إلى مصمّم محترف يتقاضى آلاف الدولارات. تعلّم كيف تبني واجهات مستخدم مذهلة تحوّل الزوار العاديين إلى عملاء دائمين لشركتك أو عملائك.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-2 text-xs sm:text-sm max-w-md mx-auto lg:mx-0">
              {["شرح لبرنامج Figma بالكامل", "مراجعة مباشرة لأعمالك", "فهم سايكولوجية الألوان", "توجيه مهني لدخول السوق"].map((item) => (
                <div key={item} className="flex items-center gap-2 justify-center lg:justify-start">
                  <span className="text-[#f59e0b]">✦</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <a href="#checkout-section" className="w-full sm:w-auto bg-[#f59e0b] hover:bg-[#d97706] text-slate-950 px-8 py-4 rounded-xl text-lg font-black transition-all text-center shadow-lg shadow-amber-500/10">
                اشترك الآن لتأمين مقعدك
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-[#18181b] border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative">
              <div className="absolute -top-3 left-6 bg-zinc-800 border border-zinc-700 text-[10px] text-zinc-300 px-3 py-1 rounded-full">
                تحديثات 2026 مجانية
              </div>
              <h3 className="text-lg font-bold text-white mb-6">مخطط الرحلة الدراسية</h3>
              <div className="space-y-6 relative border-r-2 border-zinc-800 mr-2 pr-6">
                <div className="relative">
                  <span className="absolute right-[-31px] top-1.5 w-4 h-4 rounded-full bg-[#f59e0b] border-4 border-[#18181b]"></span>
                  <h4 className="text-sm font-bold text-white">الأسبوع 1-2: فهم أساسيات المستخدم</h4>
                  <p className="text-xs text-zinc-500 mt-1">البحث والتحليل وبناء مخطط الهيكل السلكي (Wireframing).</p>
                </div>
                <div className="relative">
                  <span className="absolute right-[-31px] top-1.5 w-4 h-4 rounded-full bg-amber-500/40 border-4 border-[#18181b]"></span>
                  <h4 className="text-sm font-bold text-white">الأسبوع 3-4: تحويل الأفكار لتصاميم تفاعلية</h4>
                  <p className="text-xs text-zinc-500 mt-1">تصميم الواجهات الجمالية وإضافة الحركات والمؤثرات البصرية.</p>
                </div>
                <div className="relative">
                  <span className="absolute right-[-31px] top-1.5 w-4 h-4 rounded-full bg-zinc-800 border-4 border-[#18181b]"></span>
                  <h4 className="text-sm font-bold text-white">الأسبوع 5: اختبار سهولة الاستخدام والرفع</h4>
                  <p className="text-xs text-zinc-500 mt-1">اختبار النماذج مع مستخدمين حقيقيين ونشر العمل بشكل احترافي.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Logo Cloud */}
      <section className="border-y border-zinc-900 bg-zinc-950 py-10">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-xs text-zinc-500 font-bold uppercase tracking-wider mb-6">خريجو هذا البرنامج يعملون حالياً في كبرى الشركات</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-30 grayscale hover:grayscale-0 transition-all">
            <span className="text-sm font-extrabold tracking-widest text-white">GOOGLE</span>
            <span className="text-sm font-extrabold tracking-widest text-white">MICROSOFT</span>
            <span className="text-sm font-extrabold tracking-widest text-white">AMAZON</span>
            <span className="text-sm font-extrabold tracking-widest text-white">STRIPE</span>
          </div>
        </div>
      </section>

      {/* Value Stacking */}
      <section className="py-20 max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">كل ما ستحصل عليه بمجرد انضمامك</h2>
          <p className="text-zinc-500 text-sm mt-2">قمنا بجمع كل الأدوات والموارد الإضافية لضمان عدم احتياجك لشراء أي شيء آخر.</p>
        </div>
        <div className="space-y-4">
          <div className="bg-[#18181b] border border-zinc-800 p-5 rounded-2xl flex justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <span className="text-xl">💻</span>
              <div>
                <h4 className="font-bold text-sm sm:text-base text-white">الكورس المصور والمحدث بالكامل</h4>
                <p className="text-xs text-zinc-500 mt-0.5">شرح كامل لخطوات التصميم والمشاريع.</p>
              </div>
            </div>
            <span className="text-xs sm:text-sm text-zinc-400 line-through">بقيمة 199$</span>
          </div>
          <div className="bg-[#18181b] border border-zinc-800 p-5 rounded-2xl flex justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <span className="text-xl">🎁</span>
              <div>
                <h4 className="font-bold text-sm sm:text-base text-white">هدية: مكتبة مكونات Figma الاحترافية جاهزة</h4>
                <p className="text-xs text-zinc-500 mt-0.5">لتسريع وتيرة عملك وتصميم المواقع في دقائق.</p>
              </div>
            </div>
            <span className="text-xs sm:text-sm text-[#f59e0b] font-bold">مـجـانـاً</span>
          </div>
          <div className="bg-[#18181b] border border-zinc-800 p-5 rounded-2xl flex justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <span className="text-xl">📞</span>
              <div>
                <h4 className="font-bold text-sm sm:text-base text-white">هدية: جلستان استشاريتان جماعيتان مباشرة</h4>
                <p className="text-xs text-zinc-500 mt-0.5">للإجابة عن أسئلتك مباشرة ومراجعة معرض أعمالك.</p>
              </div>
            </div>
            <span className="text-xs sm:text-sm text-[#f59e0b] font-bold">مـجـانـاً</span>
          </div>
        </div>
      </section>

      {/* Checkout Section */}
      <section id="checkout-section" className="py-20 bg-zinc-950 border-t border-zinc-900">
        <div className="max-w-xl mx-auto px-6">
          <div className="bg-[#18181b] border border-zinc-800 rounded-3xl p-6 sm:p-10 shadow-xl relative">
            <div className="text-center mb-8">
              <h3 className="text-xl sm:text-2xl font-bold text-white">احصل على العرض الشامل اليوم</h3>
              <p className="text-zinc-500 text-xs mt-2">املأ الحقول أدناه لتفعيل حسابك وتلقي بيانات الدخول فوراً.</p>
            </div>
            <div className="bg-[#09090b] border border-zinc-800 rounded-2xl p-5 mb-8 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-zinc-500 block uppercase tracking-wider">سعر الدفعة الحالية</span>
                <span className="text-2xl font-extrabold text-white">79$ فقط</span>
              </div>
              <div className="text-left">
                <span className="text-xs text-zinc-400 block line-through">القيمة الإجمالية 249$</span>
                <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20 font-bold">وفرت أكثر من 60%</span>
              </div>
            </div>
            <form className="space-y-5">
              <div>
                <label className="block text-zinc-400 text-xs font-semibold mb-2">الاسم الثلاثي بالكامل</label>
                <input type="text" placeholder="اكتب اسمك كاملاً" required className="w-full bg-[#09090b] border border-zinc-800 rounded-xl px-4 py-3 text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-[#f59e0b] transition-all" />
              </div>
              <div>
                <label className="block text-zinc-400 text-xs font-semibold mb-2">عنوان البريد الإلكتروني</label>
                <input type="email" placeholder="you@example.com" required dir="ltr" className="w-full bg-[#09090b] border border-zinc-800 rounded-xl px-4 py-3 text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-[#f59e0b] transition-all text-left" />
              </div>
              <div>
                <label className="block text-zinc-400 text-xs font-semibold mb-2">رقم الهاتف النشط (واتساب)</label>
                <input type="tel" placeholder="+966" required dir="ltr" className="w-full bg-[#09090b] border border-zinc-800 rounded-xl px-4 py-3 text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-[#f59e0b] transition-all text-left" />
              </div>
              <button type="submit" className="w-full bg-[#f59e0b] hover:bg-[#d97706] text-slate-950 font-black py-4 rounded-xl text-lg transition-all shadow-md shadow-amber-500/15 transform hover:scale-[1.01]">
                أريد الانضمام وتأكيد الدفع 💳
              </button>
              <div className="flex items-center justify-center gap-4 pt-4 border-t border-zinc-800/60 opacity-60">
                <span className="text-[10px] text-zinc-500">دفع آمن ومضمون عن طريق:</span>
                <div className="flex gap-1.5 text-[9px] font-bold text-zinc-400">
                  <span className="border border-zinc-800 px-1.5 py-0.5 rounded bg-zinc-900">VISA</span>
                  <span className="border border-zinc-800 px-1.5 py-0.5 rounded bg-zinc-900">MASTER</span>
                  <span className="border border-zinc-800 px-1.5 py-0.5 rounded bg-zinc-900">STRIPE</span>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-900 bg-[#09090b] py-12 text-center text-zinc-600 text-xs">
        <div className="max-w-6xl mx-auto px-6 space-y-3">
          <p className="font-extrabold text-zinc-500">أكاديمية PREMIUMCLASS للتصميم الرقمي</p>
          <p>كافة الحقوق محفوظة © 2026.</p>
          <div className="flex justify-center gap-4 text-[10px] text-zinc-500">
            <a href="#" className="hover:text-zinc-400 transition-colors">سياسة الحماية والبيانات</a>
            <a href="#" className="hover:text-zinc-400 transition-colors">اتصل بمدير التدريب</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
