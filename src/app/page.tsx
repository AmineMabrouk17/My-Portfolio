import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="top" className="relative z-10">
        <div className="max-w-[1200px] mx-auto px-8">
          <h1 className="text-4xl font-bold mt-32">Portfolio — Coming Soon</h1>
        </div>
      </main>
      <Footer />
    </>
  );
}
