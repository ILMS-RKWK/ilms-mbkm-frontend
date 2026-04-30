import berandaData from "@/json/beranda.json";

export default function HeroSection() {
  const { userName, greeting, title, subtitle } = berandaData.hero;

  return (
    <section className="px-6 lg:px-10 pt-10 pb-6 max-w-[1440px] mx-auto">
      <h1 className="text-3xl md:text-[40px] font-extrabold text-[#1e293b] leading-tight tracking-tight">
        {greeting}{" "}
        <span className="text-[#99BD4A]">{userName}</span>
        , {title}
      </h1>
      <p className="mt-3 text-slate-500 text-base md:text-[15px] leading-relaxed max-w-2xl">
        {subtitle}
      </p>
    </section>
  );
}
