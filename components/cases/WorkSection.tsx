import { motion } from "framer-motion";
import Image from "next/image";

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
          <div className="flex items-center gap-3 mb-6">
            <Image
              src="/depict.jpg"
              alt="Depict AI"
              width={40}
              height={40}
              className="rounded-xl"
            />
            <h2 className="text-base font-medium">Depict AI</h2>
          </div>

          {/* Product description */}
          <p className="text-base font-light mb-6">
            Co-founded by Oliver Edholm at 17y/o, with Anton Osika, co-founder
            and CEO of Lovable, Depict AI is an E-commerce tool. Started as one
            of the first ai companies for recommendations online, it grew to add
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
                Product onboarding took 3 months to complete.
                <br />
                Now takes 3 minutes.
                <br />
                99% time to value reduction.
              </p>
              <p>
                Product took minimum 1 customer success manager to onboard, and
                1 engineer to integrate.
                <br />
                Now is fully self-served.
                <br />
                96% internal cost reduction.
              </p>
              <p>
                Product made $500k ARR.
                <br />
                Now is making $2M ARR.
                <br />
                300% increase in revenue.
              </p>
              <p>
                Product is now used by 1000+ online stores.
                <br />
                Certified as a built for Shopify app.
                <br />
                4.5 stars rating on Shopify App Store.
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
          <div className="flex items-center gap-3 mb-6">
            <Image
              src="/zettle.png"
              alt="Zettle by PayPal"
              width={40}
              height={40}
              className="rounded-xl"
            />
            <h2 className="text-base font-medium">Zettle by PayPal</h2>
          </div>

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
              the hardware e-shop. Increased sign-up metrics with market-specific
              improvements of the KYC and document upload flows.
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
    </motion.div>
  );
};
