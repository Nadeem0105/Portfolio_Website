export default function CodingProfilesSkeleton() {
  return (
    <section id="profiles" className="py-24 border-b border-border-subtle bg-obsidian relative overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#252528_1px,transparent_1px),linear-gradient(to_bottom,#252528_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-[0.025]" />
      </div>

      <div className="max-w-container-max mx-auto px-gutter w-full relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-start space-y-2 mb-16 relative w-fit">
          <div className="font-mono text-xs font-semibold text-primary/50 uppercase tracking-widest animate-pulse">
            06 / LIVE_WIDGETS
          </div>
          <h2 className="font-display text-4xl font-extrabold text-cream/40 animate-pulse">
            DEV_PROFILES
          </h2>
          <span className="absolute -top-3 -right-2 font-mono text-xs text-primary/45 font-bold select-none">+</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {[1, 2, 3].map((id) => (
            <div key={id} className="bg-surface border border-border-subtle p-6 shadow-sm min-h-[480px] flex flex-col justify-between animate-pulse">
              <div>
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-elevated rounded border border-border-subtle/50" />
                    <div className="space-y-2">
                      <div className="w-24 h-4 bg-elevated rounded" />
                      <div className="w-16 h-3 bg-elevated rounded" />
                    </div>
                  </div>
                  <div className="w-16 h-5 bg-elevated rounded" />
                </div>

                {/* Metrics Row */}
                <div className="grid grid-cols-4 gap-2 mb-6 border-y border-border-subtle/40 py-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="space-y-1.5 flex flex-col items-center">
                      <div className="w-10 h-2 bg-elevated rounded" />
                      <div className="w-8 h-3 bg-elevated rounded" />
                    </div>
                  ))}
                </div>

                {/* Content block */}
                <div className="mb-6 space-y-3">
                  <div className="w-32 h-3 bg-elevated rounded" />
                  <div className="w-full h-16 bg-elevated rounded" />
                </div>
              </div>

              {/* Bottom List */}
              <div className="space-y-3">
                <div className="w-28 h-3 bg-elevated rounded" />
                <div className="space-y-2">
                  <div className="w-full h-8 bg-elevated/50 rounded" />
                  <div className="w-full h-8 bg-elevated/50 rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
