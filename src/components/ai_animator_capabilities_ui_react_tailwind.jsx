import { useState } from "react";
import { motion } from "framer-motion";

const capabilities = [
  {
    title: "AI-Driven Animation Production",
    desc: "End-to-end AI animation pipelines with cinematic control",
    details: "Image-to-video workflows, frame continuity, multi-pass refinement, scalable production"
  },
  {
    title: "Cinematic Visual Direction",
    desc: "Film-level camera and lighting control",
    details: "FPV shots, lens simulation, depth composition, motion choreography"
  },
  {
    title: "Stylized 2D & Hybrid Animation",
    desc: "Non-generic, controlled animation styles",
    details: "Retro 2D aesthetics, hybrid depth, matte textures, style consistency"
  },
  {
    title: "Character & World Building",
    desc: "Scalable characters and immersive worlds",
    details: "Character systems, cultural detailing, reusable assets"
  },
  {
    title: "Storyboarding & Scene Engineering",
    desc: "Shot-level planning with timing precision",
    details: "Scene pacing, transitions, visual beats"
  },
  {
    title: "AI Prompt Engineering",
    desc: "High-control prompting systems",
    details: "Time-based prompts, artifact control, consistency"
  }
];

export default function CapabilitiesSection() {
  const [active, setActive] = useState(null);

  return (
    <section className="min-h-screen bg-black text-white px-6 py-20">
      <h2 className="text-4xl md:text-6xl font-bold mb-12">Capabilities</h2>

      <div className="grid md:grid-cols-3 gap-6">
        {capabilities.map((item, index) => (
          <motion.div
            key={index}
            onClick={() => setActive(index)}
            whileHover={{ scale: 1.05 }}
            className="p-6 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 cursor-pointer"
          >
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-sm text-white/70">{item.desc}</p>
          </motion.div>
        ))}
      </div>

      {active !== null && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-0 left-0 w-full bg-black/90 p-8 border-t border-white/10"
        >
          <h3 className="text-2xl font-bold mb-2">
            {capabilities[active].title}
          </h3>
          <p className="text-white/70 mb-4">
            {capabilities[active].details}
          </p>
          <button
            onClick={() => setActive(null)}
            className="px-4 py-2 bg-white text-black rounded-lg"
          >
            Close
          </button>
        </motion.div>
      )}
    </section>
  );
}
