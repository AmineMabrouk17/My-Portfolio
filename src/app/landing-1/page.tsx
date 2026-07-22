import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "كورس احترافي - نمط تصميم عصري فاتح",
  robots: { index: false, follow: false },
};

export default function LandingPage1() {
  return (
    <div dir="rtl" className="bg-white text-[#0f172a] antialiased" style={{ fontFamily: "'Almarai', sans-serif" }}>
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#4f46e5] to-violet-500 flex items-center justify-center text-white font-extrabold text-lg shadow-md">🎓</span>
            <span className="text-xl font-extrabold text-slate-900 tracking-tight">أكاديمية <span className="text-[#4f46e5]">التعلم</span></span>
          </div>
          <a href="#register" className="bg-[#4f46e5] hover:bg-[#4338ca] text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-md">
            احجز مقعدك
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-slate-50 to-white pt-16 pb-24 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6 text-center lg:text-right">
            <div className="inline-flex items-center gap-3 bg-white border border-slate-200/80 px-4 py-2 rounded-full shadow-sm max-w-max mx-auto lg:mx-0">
              <div className="flex -space-x-2 space-x-reverse">
                <span className="w-7 h-7 rounded-full bg-slate-300 border-2 border-white flex items-center justify-center text-[10px] font-bold text-slate-700">A</span>
                <span className="w-7 h-7 rounded-full bg-indigo-200 border-2 border-white flex items-center justify-center text-[10px] font-bold text-indigo-700">M</span>
                <span className="w-7 h-7 rounded-full bg-teal-200 border-2 border-white flex items-center justify-center text-[10px] font-bold text-teal-700">Y</span>
              </div>
              <span className="text-xs text-slate-600 font-bold">انضم إلينا أكثر من 4,200 طالب وطالبة</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight">
              طوّر مهاراتك البرمجية وابدأ <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4f46e5] to-violet-600">مهنتك المستقبلية</span> اليوم
            </h1>
            <p className="text-slate-500 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed">
              منهج تطبيقي عملي 100% مصمم لمساعدتك على إتقان الأدوات التقنية الحديثة وبناء المشاريع دون الخوض في تعقيدات نظرية لا حاجة لها.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
              <a href="#register" className="bg-[#4f46e5] hover:bg-[#4338ca] text-white text-center px-8 py-4 rounded-xl font-bold text-lg shadow-lg transition-all hover:-translate-y-0.5">
                اشترك في الكورس الآن
              </a>
              <a href="#features" className="border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 text-center px-8 py-4 rounded-xl font-bold text-lg transition-all">
                لماذا نحن؟
              </a>
            </div>
          </div>
          <div className="lg:col-span-6 flex justify-center">
            <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-2xl relative max-w-md w-full">
              <div className="absolute -top-4 -right-4 bg-amber-400 text-slate-900 font-extrabold text-xs px-3 py-1.5 rounded-lg shadow-md transform rotate-6">
                عرض محدود جداً 🔥
              </div>
              <span className="text-xs font-bold text-[#4f46e5] tracking-wider uppercase">باقة التدريب المتكاملة</span>
              <h3 className="text-2xl font-bold text-slate-900 mt-2 mb-4">كورس الويب الشامل</h3>
              <ul className="space-y-3.5 mb-8 text-sm text-slate-600">
                <li className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xs">✓</span>
                  <span>أكثر من 40 ساعة من الشروحات المرئية</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xs">✓</span>
                  <span>شهادة إتمام معتمدة لملفك الشخصي</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xs">✓</span>
                  <span>كود برمجي لـ 5 مشاريع كاملة جاهزة للرفع</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xs">✓</span>
                  <span>رابط مباشر للمجموعة التفاعلية ومتابعة كودك</span>
                </li>
              </ul>
              <div className="border-t border-slate-100 pt-6 flex justify-between items-center">
                <div>
                  <span className="block text-xs text-slate-400">سعر الاشتراك</span>
                  <span className="text-3xl font-extrabold text-slate-900">49$ <span className="text-sm text-slate-400 font-normal">/ بدلاً من 120$</span></span>
                </div>
                <a href="#register" className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-xl text-sm font-bold transition-all">
                  سجل الآن
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 bg-[#f8fafc] border-y border-slate-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-xs font-bold text-[#4f46e5] uppercase tracking-wider">مزايا الدراسة معنا</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">ما الذي يجعل هذا التدريب فريداً من نوعه؟</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: "🚀", title: "تطبيق فوري وعملي", desc: "لن تشاهد شروحات نظرية مملة؛ كل درس ينتهي بإنشاء تطبيق أو ميزة تبرمجها بنفسك." },
              { icon: "💬", title: "دعم فني وتواصل مستمر", desc: "فريقنا الفني موجود يومياً للإجابة عن أسئلتك البرمجية ومراجعة الأكواد خطوة بخطوة." },
              { icon: "📂", title: "ملف أعمال جاهز للتوظيف", desc: "عند التخرج ستمتلك محفظة أعمال تبرز مهاراتك أمام مديري التوظيف والشركات." },
              { icon: "♾️", title: "صلاحية وصول مدى الحياة", desc: "بمجرد التسجيل، يمكنك العودة لمراجعة الفيديوهات ومتابعة التحديثات مجاناً في أي وقت." },
            ].map((feature) => (
              <div key={feature.title} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <span className="text-3xl block mb-4">{feature.icon}</span>
                <h3 className="font-bold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center max-w-md mx-auto mb-16">
            <span className="text-xs font-bold text-[#4f46e5] uppercase tracking-wider">آراء وقصص النجاح</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">ماذا يقول طلابنا بعد الانتهاء من التدريب؟</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 space-y-4">
              <div className="flex items-center gap-1 text-amber-400 text-lg">★★★★★</div>
              <p className="text-slate-600 text-sm leading-relaxed">&quot;الكورس غيّر طريقتي في التفكير وتجاوز العقبات البرمجية تماماً. التفصيل والشرح العملي رائع، والمشاريع ممتازة لبناء بورتفوليو احترافي.&quot;</p>
              <div className="flex items-center gap-3 pt-2">
                <div className="w-10 h-10 rounded-full bg-slate-300 flex items-center justify-center font-bold text-slate-700 text-xs">Y</div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">ياسر عبد الله</h4>
                  <span className="text-[11px] text-slate-400 block">مطوّر ويب مبتدئ</span>
                </div>
              </div>
            </div>
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 space-y-4">
              <div className="flex items-center gap-1 text-amber-400 text-lg">★★★★★</div>
              <p className="text-slate-600 text-sm leading-relaxed">&quot;أفضل ميزة بالنسبة لي كانت سرعة الرد ومراجعة الكود البرمجي الخاص بي. كنت عالقاً في بعض الأخطاء واستطاع الفريق توجيهي بشكل سليم.&quot;</p>
              <div className="flex items-center gap-3 pt-2">
                <div className="w-10 h-10 rounded-full bg-slate-300 flex items-center justify-center font-bold text-slate-700 text-xs">S</div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">سارة الخالدي</h4>
                  <span className="text-[11px] text-slate-400 block">مستقلة (Freelancer)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section id="register" className="py-20 bg-slate-50 border-t border-slate-100">
        <div className="max-w-xl mx-auto px-6">
          <div className="bg-white border border-slate-100 rounded-3xl p-8 sm:p-10 shadow-xl">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">سجل بياناتك للبدء فوراً</h2>
              <p className="text-slate-400 text-xs sm:text-sm mt-2">يرجى كتابة بريدك الإلكتروني الحقيقي للتأكد من استلام ملفات التفعيل بنجاح.</p>
            </div>
            <form className="space-y-5">
              <div>
                <label className="block text-slate-700 text-xs font-bold mb-2">الاسم بالكامل</label>
                <input type="text" placeholder="اكتب اسمك الثلاثي" required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-slate-800 text-sm placeholder-slate-400 focus:outline-none focus:border-[#4f46e5] transition-all" />
              </div>
              <div>
                <label className="block text-slate-700 text-xs font-bold mb-2">البريد الإلكتروني</label>
                <input type="email" placeholder="name@domain.com" required dir="ltr" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-slate-800 text-sm placeholder-slate-400 focus:outline-none focus:border-[#4f46e5] transition-all text-right" />
              </div>
              <div>
                <label className="block text-slate-700 text-xs font-bold mb-2">رقم الهاتف (الواتساب)</label>
                <input type="tel" placeholder="+966" required dir="ltr" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-slate-800 text-sm placeholder-slate-400 focus:outline-none focus:border-[#4f46e5] transition-all text-left" />
              </div>
              <div className="pt-2">
                <button type="submit" className="w-full bg-[#4f46e5] hover:bg-[#4338ca] text-white py-4 rounded-xl font-bold text-lg shadow-lg transition-all transform hover:-translate-y-px">
                  شراء وتأكيد الاشتراك 🌟
                </button>
              </div>
              <p className="text-center text-[11px] text-slate-400 mt-4 leading-relaxed">
                بمجرّد إتمام عملية الدفع ستتحول تلقائياً إلى صفحة تحميل المواد الترحيبية وتفاصيل الدخول للأكاديمية.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-100 py-12 text-center text-slate-400 text-xs">
        <div className="max-w-6xl mx-auto px-6 space-y-4">
          <div className="flex items-center justify-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-[#4f46e5]/10 flex items-center justify-center text-[#4f46e5] text-xs font-bold">🎓</span>
            <span className="font-bold text-slate-800">أكاديمية التعلم الرقمي</span>
          </div>
          <p>جميع الحقوق محفوظة © 2026 للأكاديمية.</p>
          <div className="flex justify-center gap-6 text-[11px]">
            <a href="#" className="hover:text-slate-600 transition-colors">سياسة الخصوصية</a>
            <a href="#" className="hover:text-slate-600 transition-colors">شروط الاستخدام والدعم</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
