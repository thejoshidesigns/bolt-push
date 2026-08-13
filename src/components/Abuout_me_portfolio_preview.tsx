import { useState } from "react";

const capabilities = [
  {
    title: "Short Story Series",
    desc: "Episodic content designed for reels with strong hooks and loop endings"
  },
  {
    title: "AI Video Ads",
    desc: "Cinematic product storytelling built for performance"
  },
  {
    title: "Cinematic Animation",
    desc: "Camera-driven visuals with lighting, depth and motion"
  },
  {
    title: "Visual Storytelling",
    desc: "Narratives that work even without sound"
  }
];

export default function AboutSection() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section className="relative bg-[#0c0c0e] text-[#eeecea] py-32 px-6 overflow-hidden">

      {/* BACKGROUND GLOW */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(184,169,154,0.08),transparent_40%)]" />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* HERO */}
        <div className="mb-24">
          <p className="text-sm tracking-widest text-[#b8a99a] mb-6">
            ABOUT
          </p>

          <h2 className="text-4xl md:text-6xl max-w-3xl leading-tight">
            Building animated stories that people actually watch till the end
          </h2>
        </div>

        {/* PROOF + VISUAL */}
        <div className="grid md:grid-cols-2 gap-16 items-center mb-28">

          {/* LEFT: BIG STAT */}
          <div>
            <div className="text-[80px] md:text-[120px] text-[#b8a99a] leading-none">
              5M+
            </div>
            <p className="text-lg text-[#9e9894] mt-2">
              Total views across Instagram animated series
            </p>
          </div>

          {/* RIGHT: FLOATING VISUAL BLOCK */}
          <div className="relative h-[300px]">

            <div className="absolute top-0 left-10 w-40 h-24 bg-[#17171b] rounded-lg border border-[#242429] rotate-[-6deg]" />
            <div className="absolute top-10 right-0 w-44 h-28 bg-[#17171b] rounded-lg border border-[#242429] rotate-[4deg]" />
            <div className="absolute bottom-0 left-1/3 w-48 h-28 bg-[#17171b] rounded-lg border border-[#242429] rotate-[-2deg]" />

            {/* Replace above blocks with real thumbnails later */}
          </div>

        </div>

        {/* INTERACTIVE CAPABILITIES */}
        <div className="grid md:grid-cols-2 gap-6">

          {capabilities.map((item, i) => (
            <div
              key={i}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              className={`p-6 rounded-xl border transition-all duration-300 cursor-pointer
                ${active === i
                  ? "border-[#b8a99a] bg-[#17171b]"
                  : "border-[#242429] bg-[#111114]"}
              `}
            >
              <h3 className="text-lg mb-2">{item.title}</h3>

              <p
                className={`text-sm text-[#9e9894] transition-all duration-300
                ${active === i ? "opacity-100" : "opacity-60"}
              `}
              >
                {item.desc}
              </p>
            </div>
          ))}

        </div>

        {/* POSITIONING LINE */}
        <div className="mt-24">
          <p className="text-xl text-[#b8a99a]">
            I don’t just generate AI videos. I direct them.
          </p>
        </div>

      </div>
    </section>
  );
}