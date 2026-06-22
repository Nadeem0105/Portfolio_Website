"use client";


export default function About() {
  const funFacts = [
    "FULL STACK BUILDER",
    "JAVA DEVELOPER",
    "NEXT.JS ENTHUSIAST",
    "PROBLEM SOLVER",
    "HACKATHON PARTICIPANT",
    "TEAM PLAYER",
    "SPORTS ENTHUSIAST",
    "CONTINUOUS LEARNER"
  ];

  const stats = [
    { value: "5+", label: "YEARS OF EXPERIENCE" },
    { value: "50+", label: "COMPLETED PROJECTS" },
    { value: "1M+", label: "LINES OF CODE" },
    { value: "400L+", label: "COFFEE CONSUMED" }
  ];

  return (
    <section
      id="about"
      className="py-24 border-b border-border-subtle bg-surface relative overflow-hidden"
    >
      {/* Background grid + glowing orbs */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#252528_1px,transparent_1px),linear-gradient(to_bottom,#252528_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-[0.03] animate-grid-pan" />
        <div className="absolute -top-[10%] -left-[10%] w-[350px] h-[350px] rounded-full bg-primary/8 blur-[100px] animate-float-slow" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[300px] h-[300px] rounded-full bg-secondary/8 blur-[100px] animate-float-reverse" />
      </div>

      <div className="max-w-container-max mx-auto px-gutter w-full relative z-10">
        {/* Section Title */}
        <div className="flex flex-col items-start space-y-2 mb-16 relative w-fit">
          <div className="font-mono text-xs font-semibold text-primary uppercase tracking-widest">
            01 / WHO_WE_ARE
          </div>
          <h2 className="font-display text-4xl font-extrabold text-cream relative w-fit pr-4">
            CORE_PHILOSOPHY
          </h2>
          <span className="absolute -top-3 -right-2 font-mono text-xs text-primary/45 font-bold select-none">+</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: Biography description */}
          <div className="lg:col-span-7 flex flex-col space-y-6">
            <p className="font-sans text-lg text-cream leading-relaxed font-medium">
              I create software that transforms ideas into practical solutions. From web applications to innovative tech projects, I enjoy building products that make an impact.
            </p>
            <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
              I believe great software is built through a combination of problem-solving, thoughtful design, and strong engineering principles. Rather than simply writing code, I focus on understanding the problem first and then creating solutions that are efficient, scalable, and meaningful.
            </p>
            <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
              Beyond academics, I enjoy building projects, participating in hackathons, playing sports, and exploring new technologies that challenge me to grow both personally and professionally.
            </p>

            {/* Fun fact chips */}
            <div className="pt-6">
              <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-primary mb-4">
                ENVIRONMENT_SPECS // FUN_FACTS
              </h4>
              <div className="flex flex-wrap gap-2.5">
                {funFacts.map((fact, idx) => (
                  <span
                    key={idx}
                    className="font-mono text-[10px] uppercase font-semibold text-[#8A8A96] bg-elevated border border-border-subtle px-3 py-1.5 rounded-sm hover:border-primary hover:text-primary transition-colors cursor-default"
                  >
                    {fact}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Metrics / Stats Grid */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4 relative">
            {/* Border accents */}
            <div className="absolute inset-0 border border-border-subtle/30 pointer-events-none" />
            <span className="absolute -top-2 -left-2 font-mono text-base text-primary/60 font-bold select-none">+</span>
            <span className="absolute -bottom-4 -right-1 font-mono text-base text-primary/60 font-bold select-none">+</span>

            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="bg-elevated p-8 flex flex-col items-center justify-center text-center border border-border-subtle/40 hover:border-primary/40 transition-colors"
              >
                <div className="font-display text-4xl md:text-5xl font-extrabold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="font-mono text-[9px] uppercase font-bold text-on-surface-variant tracking-widest leading-normal">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
