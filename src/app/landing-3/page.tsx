"use client";

import { useState, useEffect } from "react";

function Countdown() {
  const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const getRemainingTime = () => {
      const now = new Date();
      const end = new Date(now);
      end.setHours(23, 59, 59, 999);
      const diff = Math.max(0, Math.floor((end.getTime() - now.getTime()) / 1000));
      return {
        hours: Math.floor(diff / 3600),
        minutes: Math.floor((diff % 3600) / 60),
        seconds: diff % 60,
      };
    };

    setTime(getRemainingTime());
    const interval = setInterval(() => setTime(getRemainingTime()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex gap-4 justify-center">
      {[
        { value: time.hours, label: "ساعة" },
        { value: time.minutes, label: "دقيقة" },
        { value: time.seconds, label: "ثانية" },
      ].map((item) => (
        <div key={item.label} className="bg-[#0f172a] px-4 py-2 rounded-xl border border-slate-700 min-w-[70px]">
          <span className="text-2xl font-bold text-[#0d9488]">{String(item.value).padStart(2, "0")}</span>
          <span className="block text-xs text-slate-400">{item.label}</span>
        </div>
      ))}
    </div>
  );
}

function Accordion() {
  const [openModule, setOpenModule] = useState<string | null>(null);

  const modules = [
    {
      id: "module1",
      title: "الوحدة الأولى: أساسيات تطوير الويب ومفاهيم التصميم (HTML5 & CSS3)",
      content: [
        "فهم كيفية عمل المتصفحات وبنية صفحات الويب.",
        "بناء هيكل المواقع باستخدام HTML5 بشكل متوافق مع محركات البحث.",
        "استخدام CSS3 لبناء تصاميم متجاوبة وتطوير الواجهات الجذابة.",
      ],
    },
    {
      id: "module2",
      title: "الوحدة الثانية: لغة JavaScript والبرمجة التفاعلية",
      content: [
        "أساسيات المتغيرات والدوال والشروط والحلقات التكرارية.",
        "التعامل مع DOM وتعديل عناصر الصفحة ديناميكياً.",
        "إضافة تفاعلات وحركات سلسة للمواقع باستخدام ES6+.",
      ],
    },
    {
      id: "module3",
      title: "الوحدة الثالثة: مقدمة في React.js وبناء المكونات",
      content: [
        "فهم مفاهيم Virtual DOM والمكونات الحالية وال状态 (State).",
        "بناء تطبيقات Single Page Application (SPA) باستخدام React.",
        "استخدام Hooks مثل useState و useEffect لإدارة البيانات.",
      ],
    },
  ];

  return (
    <div className="space-y-4">
      {modules.map((mod) => (
        <div key={mod.id} className="bg-[#1e293b] border border-slate-800 rounded-xl overflow-hidden">
          <button
            onClick={() => setOpenModule(openModule === mod.id ? null : mod.id)}
            className="w-full flex justify-between items-center p-5 text-right font-bold text-white hover:bg-slate-800/50 transition-all"
          >
            <span>{mod.title}</span>
            <svg
              className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${openModule === mod.id ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {openModule === mod.id && (
            <div className="p-5 border-t border-slate-800 text-slate-400 text-sm space-y-2 bg-slate-900/30">
              {mod.content.map((item, i) => (
                <p key={i}>• {item}</p>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default function LandingPage3() {
  return (
    <div dir="rtl" className="bg-[#0f172a] text-slate-100 antialiased overflow-x-hidden" style={{ fontFamily: "'Cairo', sans-serif" }}>
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0f172a]/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2 space-x-reverse">
            <div className="w-8 h-8 rounded-lg bg-[#0d9488] flex items-center justify-center font-bold text-white">C</div>
            <span className="text-xl font-extrabold tracking-wide text-white">اسم <span className="text-[#0d9488]">الكورس</span></span>
          </div>
          <a href="#order-form" className="bg-[#0d9488] hover:bg-[#0f766e] text-white px-5 py-2 rounded-lg text-sm font-bold transition-all transform hover:scale-105 duration-200 shadow-lg shadow-[#0d9488]/25">
            احصل على الكورس الآن
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative py-16 lg:py-24 max-w-6xl mx-auto px-4">
        <div className="absolute top-10 left-10 w-72 h-72 bg-[#0d9488]/10 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl -z-10"></div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 text-center lg:text-right">
            <span className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full text-xs font-semibold bg-[#0d9488]/10 text-[#0d9488] border border-[#0d9488]/20">
              موصى به لجميع المستويات
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight text-white">
              احترف <span className="text-[#0d9488]">تطوير الويب</span> وابدأ مشروعك أو وظيفتك البرمجية الأولى
            </h1>
            <p className="text-slate-400 text-base sm:text-lg max-w-xl mx-auto lg:mx-0">
              كورس عملي مكثف يأخذك خطوة بخطوة لبناء تطبيقات ومواقع حقيقية باستخدام أحدث التقنيات البرمجية المطلوبة في سوق العمل.
            </p>
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 text-sm text-slate-300">
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <svg className="w-5 h-5 text-[#0d9488]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg>
                <span>تحديثات مجانية مدى الحياة</span>
              </div>
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <svg className="w-5 h-5 text-[#0d9488]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg>
                <span>مشاريع عملية وحقيقية</span>
              </div>
            </div>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <a href="#order-form" className="w-full sm:w-auto bg-[#0d9488] hover:bg-[#0f766e] text-white px-8 py-4 rounded-xl text-lg font-bold transition-all text-center shadow-xl shadow-[#0d9488]/30">
                سجل في الكورس اليوم
              </a>
              <a href="#curriculum" className="w-full sm:w-auto border border-slate-700 hover:border-slate-600 bg-slate-800/40 text-slate-300 px-8 py-4 rounded-xl text-lg font-semibold text-center transition-all">
                تصفح محتوى المنهج
              </a>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-[#1e293b] shadow-2xl group">
              <div className="aspect-video sm:aspect-square flex flex-col justify-center items-center p-8 bg-gradient-to-br from-[#1e293b] to-slate-900 text-center">
                <div className="p-4 bg-[#0d9488]/10 rounded-full text-[#0d9488] mb-4">
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <span className="text-sm font-semibold text-slate-400">شاهد الفيديو التعريفي بالكورس</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Countdown */}
      <section className="bg-[#1e293b] py-8 border-y border-slate-800">
        <div className="max-w-4xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-right">
          <div>
            <h3 className="text-xl font-bold text-white">العرض الخاص ينتهي قريباً!</h3>
            <p className="text-sm text-slate-400 mt-1">احصل على خصم بقيمة 50% فقط خلال الفترة المحدودة.</p>
          </div>
          <Countdown />
        </div>
      </section>

      {/* Target Audience */}
      <section className="py-20 max-w-6xl mx-auto px-4">
        <div className="text-center max-w-xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-white">لمن تم تصميم هذا الكورس؟</h2>
          <p className="text-slate-400 mt-2">إن كان ينطبق عليك أحد الأوصاف التالية، فهذا التدريب مناسب لك:</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "المبتدئين كلياً", desc: "الذين ليس لديهم أي خلفية سابقة في البرمجة ويريدون البدء من الصفر بطريقة صحيحة." },
            { title: "الباحثين عن عمل", desc: "الراغبين في تعلم المهارات المطلوبة في الشركات التقنية وتجهيز بورتفوليو احترافي." },
            { title: "أصحاب المشاريع الناشئة", desc: "الذين يرغبون في بناء نماذج أعمالهم الأولية وتطبيقاتهم بدون الاستعانة بشركات مكلفة." },
          ].map((item) => (
            <div key={item.title} className="p-6 rounded-2xl bg-[#1e293b] border border-slate-800 hover:border-[#0d9488]/40 transition-all">
              <div className="w-12 h-12 bg-[#0d9488]/10 rounded-xl flex items-center justify-center text-[#0d9488] mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" /></svg>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Curriculum */}
      <section id="curriculum" className="py-20 bg-slate-900/50 border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white">ماذا ستتعلم في هذا الكورس؟</h2>
            <p className="text-slate-400 mt-2">منهج دراسي متكامل تم تقسيمه وتسهيله ليغطي كل الأساسيات والأدوات الاحترافية.</p>
          </div>
          <Accordion />
        </div>
      </section>

      {/* Order Form */}
      <section id="order-form" className="py-20 bg-slate-50 border-t border-slate-100">
        <div className="max-w-xl mx-auto px-6">
          <div className="bg-white border border-slate-100 rounded-3xl p-8 sm:p-10 shadow-xl">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">سجّل الآن واحصل على وصول مباشر</h2>
              <p className="text-slate-400 text-xs sm:text-sm mt-2">املأ الحقول لتفعيل حسابك فوراً.</p>
            </div>
            <form className="space-y-5">
              <div>
                <label className="block text-slate-700 text-xs font-bold mb-2">الاسم بالكامل</label>
                <input type="text" placeholder="اكتب اسمك الثلاثي" required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-slate-800 text-sm placeholder-slate-400 focus:outline-none focus:border-[#0d9488] transition-all" />
              </div>
              <div>
                <label className="block text-slate-700 text-xs font-bold mb-2">البريد الإلكتروني</label>
                <input type="email" placeholder="name@domain.com" required dir="ltr" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-slate-800 text-sm placeholder-slate-400 focus:outline-none focus:border-[#0d9488] transition-all text-right" />
              </div>
              <div>
                <label className="block text-slate-700 text-xs font-bold mb-2">رقم الهاتف (واتساب)</label>
                <input type="tel" placeholder="+966" required dir="ltr" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-slate-800 text-sm placeholder-slate-400 focus:outline-none focus:border-[#0d9488] transition-all text-left" />
              </div>
              <div className="pt-2">
                <button type="submit" className="w-full bg-[#0d9488] hover:bg-[#0f766e] text-white py-4 rounded-xl font-bold text-lg shadow-lg transition-all transform hover:-translate-y-px">
                  تأكيد الاشتراك والدفع 🚀
                </button>
              </div>
              <p className="text-center text-[11px] text-slate-400 mt-4 leading-relaxed">
                بمجرد إتمام الدفع ستتلقى بيانات الدخول على بريدك الإلكتروني فوراً.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-100 py-12 text-center text-slate-400 text-xs">
        <div className="max-w-6xl mx-auto px-6 space-y-4">
          <p className="font-bold text-slate-800">أكاديمية تطوير الويب</p>
          <p>جميع الحقوق محفوظة © 2026.</p>
        </div>
      </footer>
    </div>
  );
}
