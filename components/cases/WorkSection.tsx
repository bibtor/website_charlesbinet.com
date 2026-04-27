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

export const WorkSection: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="py-16"
    >
      {/* Depict AI */}
      <article>
        {/* Text content — constrained width, centered */}
        <div className="max-w-[500px] mx-auto">
          {/* Header: icon + name */}
          <a
            href="https://depict.ai/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 mb-6 hover:opacity-70 transition-opacity"
          >
            <Image
              src="/depict.jpg"
              alt="Depict AI"
              width={40}
              height={40}
              className="rounded-xl"
            />
            <h2 className="text-base font-medium">Depict AI</h2>
          </a>

          {/* Product description */}
          <p className="text-base font-light mb-6">
            Founded by Oliver Edholm at 17y/o, and Anton Osika, co-founder and
            CEO of Lovable, Depict AI is an E-commerce tool. Started as one of
            the first ai companies for recommendations online, it grew to add
            search and merchandising features.
          </p>

          {/* Launch video */}
          <div className="mb-12">
            <video
              src="/depictvid1.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-auto rounded-2xl"
            />
            <p className="text-sm mt-2" style={{ color: "#75777A" }}>
              Launch video made for Product Hunt - Got #1 product of the day
            </p>
          </div>

          {/* Role */}
          <section className="mb-12">
            <h3 className="text-base font-medium mb-4">Role</h3>
            <p className="text-base font-light">
              I joined as Head of Design then grew to Head of Product & Design.
              I was responsible for the brand identity, the product design, the
              design system, the product building process, and roadmap with a
              team of around 20 people. I supported the CEO in people
              management, company strategy, recruiting, sales, and marketing.
            </p>
          </section>

          {/* Impact */}
          <section>
            <h3 className="text-base font-medium mb-4">Impact</h3>
            <div className="space-y-6 text-base font-light">
              <p>
                The product took 3 months to integrate.
                <br />
                Now takes 3 minutes. 99% time to value reduction.
              </p>
              <p>
                The product took a customer success manager to onboard, and an
                engineer to integrate.
                <br />
                Now is fully self-served. 96% internal cost reduction.
              </p>
              <p>
                The product made $500k ARR.
                <br />
                Now it is making $2M ARR. 300% increase in revenue.
              </p>
              <p>
                The product is now used by 1000+ online stores.
                <br />
                Certified "built for Shopify", the app has 4.5 stars rating.
              </p>
            </div>
          </section>
        </div>

        {/* Case study images — full width, up to 1200px */}
        <div className="mt-12 max-w-[1200px] mx-auto space-y-6">
          <Image
            src="/depict1.png"
            alt="Depict AI product"
            width={1200}
            height={800}
            className="w-full h-auto rounded-2xl"
          />
          <Image
            src="/depict2.png"
            alt="Depict AI product"
            width={1200}
            height={800}
            className="w-full h-auto rounded-2xl"
          />
          <div className="grid grid-cols-2 gap-6">
            <Image
              src="/depict3.png"
              alt="Depict AI product"
              width={600}
              height={400}
              className="w-full h-auto rounded-2xl"
            />
            <Image
              src="/depict4.png"
              alt="Depict AI product"
              width={600}
              height={400}
              className="w-full h-auto rounded-2xl"
            />
          </div>
          <Image
            src="/depict5.png"
            alt="Depict AI product"
            width={1200}
            height={800}
            className="w-full h-auto rounded-2xl"
          />
          <Image
            src="/depict6.png"
            alt="Depict AI product"
            width={1200}
            height={800}
            className="w-full h-auto rounded-2xl"
          />
          <div className="rounded-2xl overflow-hidden">
            <video
              src="/depictvid2.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-auto mb-[-2px]"
            />
          </div>
        </div>
      </article>

      <div className="my-20" />

      {/* Zettle */}
      <article>
        <div className="max-w-[500px] mx-auto">
          {/* Header: icon + name */}
          <a
            href="https://www.zettle.com/se"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 mb-6 hover:opacity-70 transition-opacity"
          >
            <Image
              src="/zettle.png"
              alt="Zettle by PayPal"
              width={40}
              height={40}
              className="rounded-xl"
            />
            <h2 className="text-base font-medium">Zettle by PayPal</h2>
          </a>

          {/* Product description */}
          <p className="text-base font-light mb-12">
            Formerly called iZettle, a Swedish scale-up FinTech company offering
            payments and point of sale solutions to small businesses. It got
            acquired by PayPal in 2018 for $2.2B and scaled to 1000+ employees.
          </p>

          {/* Role */}
          <section className="mb-12">
            <h3 className="text-base font-medium mb-4">Role</h3>
            <p className="text-base font-light">
              I joined as product designer in the growth team when the company
              had 300 people. I then grew to senior product designer and then
              Lead Product Designer, as well as interim product lead.
            </p>
          </section>

          {/* Impact */}
          <section>
            <h3 className="text-base font-medium mb-4">Impact</h3>
            <p className="text-base font-light">
              I contributed to the re-design of the onboarding flow in all
              platforms, web, iOS and Android. Aligned multiple areas within the
              organization to ship the new flow with their respective features
              and deadlines. Put in place notifications, activation and
              experimentation tactics. Put in place design critiques rituals,
              motion design guidelines and ways of working. Fully re-designed
              the hardware e-shop. Increased sign-up metrics with
              market-specific improvements of the KYC and document upload flows.
            </p>
          </section>
        </div>

        {/* Case study images — full width, up to 1200px */}
        <div className="mt-12 max-w-[1200px] mx-auto space-y-6">
          <Image
            src="/zettle1.png"
            alt="Zettle product"
            width={1200}
            height={800}
            className="w-full h-auto rounded-2xl"
          />
          <div className="grid grid-cols-2 gap-6">
            <img
              src="/zettle6.gif"
              alt="Zettle product"
              className="w-full h-auto rounded-2xl"
            />
            <img
              src="/zettle7.gif"
              alt="Zettle product"
              className="w-full h-auto rounded-2xl"
            />
          </div>
          <Image
            src="/zettle2.png"
            alt="Zettle product"
            width={1200}
            height={800}
            className="w-full h-auto rounded-2xl"
          />
          <div className="grid grid-cols-2 gap-6">
            <Image
              src="/zettle4.png"
              alt="Zettle product"
              width={600}
              height={400}
              className="w-full h-auto rounded-2xl"
            />
            <img
              src="/zettle5.gif"
              alt="Zettle product"
              className="w-full h-auto rounded-2xl"
            />
          </div>
          <Image
            src="/zettle3.png"
            alt="Zettle product"
            width={1200}
            height={800}
            className="w-full h-auto rounded-2xl"
          />
        </div>
      </article>

      <div className="my-20" />

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
