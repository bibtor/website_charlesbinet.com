import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const SPLINE_BASE = 800;
const SPLINE_BADGE_EXTRA = 200;

const SplineEmbed: React.FC<{
  src: string;
  aspect?: "4/3" | "1/1";
  title?: string;
}> = ({ src, aspect = "1/1", title = "3D scene" }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  const visibleH = aspect === "1/1" ? SPLINE_BASE : (SPLINE_BASE * 3) / 4;
  const iframeH = visibleH + SPLINE_BADGE_EXTRA;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      setScale(entry.contentRect.width / SPLINE_BASE);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`rounded-2xl overflow-hidden relative`}
      style={{ aspectRatio: aspect }}
    >
      <div
        style={{
          width: SPLINE_BASE,
          height: iframeH,
          transform: `scale(${scale}) translateY(-${SPLINE_BADGE_EXTRA / 2}px)`,
          transformOrigin: "top left",
        }}
      >
        <iframe
          src={src}
          frameBorder="0"
          width={SPLINE_BASE}
          height={iframeH}
          className="pointer-events-none"
          allow="autoplay"
          title={title}
        />
      </div>
    </div>
  );
};

export const CreationSection: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="py-16"
    >
      {/* MineSquad */}
      <article>
        <div className="max-w-[500px] mx-auto">
          {/* Header: icon + name */}
          <a
            href="https://www.minesquad.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 mb-6 hover:opacity-70 transition-opacity"
          >
            <Image
              src="/minesquad.png"
              alt="MineSquad"
              width={40}
              height={40}
              className="rounded-xl"
            />
            <h2 className="text-base font-medium">MineSquad</h2>
          </a>

          {/* Product description */}
          <p className="text-base font-light mb-12">
            MineSquad is a give back game. While being a new take on the old
            classic Minesweeper, the real twist is that 50% of the revenue is
            donated to The Halo Trust for real-world demining activities.
          </p>

          {/* Role */}
          <section className="mb-12">
            <h3 className="text-base font-medium mb-4">Role</h3>
            <p className="text-base font-light">
              I created and distributed the website and the game on iPhone, iPad
              and MacOS. Signed an agreement with The Halo Trust. I collaborated
              with a musician for the orginal score and sound effects, as well
              as a 3D artist for the little bomber squad guy modelling &
              animation.
            </p>
          </section>
        </div>

        {/* Case study images — full width, up to 1200px */}
        <div className="mt-12 max-w-[1200px] mx-auto space-y-6">
          <Image
            src="/minesquad1.png"
            alt="MineSquad product"
            width={1200}
            height={800}
            className="w-full h-auto rounded-2xl"
          />
          <div className="grid grid-cols-2 gap-6">
            <Image
              src="/minesquad3.png"
              alt="MineSquad product"
              width={800}
              height={600}
              className="w-full h-auto rounded-2xl"
            />
            <SplineEmbed
              src="https://my.spline.design/ration-VV5NNzKXo3ll93kaoisxoaLl/?v=2"
              aspect="4/3"
              title="MineSquad ration"
            />
          </div>
          <Image
            src="/minesquad2.png"
            alt="MineSquad product"
            width={1200}
            height={800}
            className="w-full h-auto rounded-2xl"
          />
          <div className="grid grid-cols-4 gap-6">
            {[2, 3, 4, 5].map((n) => (
              <div key={n} className="rounded-2xl overflow-hidden">
                <video
                  src={`/msvid${n}.mp4`}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-auto"
                />
              </div>
            ))}
          </div>
        </div>
      </article>

      <div className="my-20" />

      {/* DataSweeper */}
      <article>
        <div className="max-w-[500px] mx-auto">
          {/* Header: icon + name */}
          <a
            href="https://datasweeper.app"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 mb-6 hover:opacity-70 transition-opacity"
          >
            <Image
              src="/datasweeper.png"
              alt="DataSweeper"
              width={40}
              height={40}
              className="rounded-xl"
            />
            <h2 className="text-base font-medium">DataSweeper</h2>
          </a>

          {/* Product description */}
          <p className="text-base font-light mb-12">
            DataSweeper is a native macOS disk cleaner that finds what's eating
            your space. System data, duplicates, large and junk files, cleaned
            up safely by going to Trash first.
          </p>

          {/* Role */}
          <section className="mb-12">
            <h3 className="text-base font-medium mb-4">Role</h3>
            <p className="text-base font-light">
              I created and distributed the website and the app on the macOS app
              store.
            </p>
          </section>
        </div>

        {/* Case study assets — full width, up to 1200px */}
        <div className="mt-12 max-w-[1200px] mx-auto space-y-6">
          <div className="rounded-2xl overflow-hidden">
            <video
              src="/dsvid1.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-auto"
            />
          </div>
          <div className="rounded-2xl overflow-hidden">
            <video
              src="/dsvid2.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-auto"
            />
          </div>
        </div>
      </article>
    </motion.div>
  );
};
