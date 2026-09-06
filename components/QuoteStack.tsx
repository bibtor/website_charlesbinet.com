import Image from "next/image";

// Full quotes from the portfolio about page
const QUOTES = [
  {
    name: "John Tan",
    role: "CEO, Depict ai",
    avatar: "/john.jpeg",
    text: "Charles is one of the best leaders I have ever worked with. He never ceases to amaze me with how he inspires and builds high-trust, high-performance teams, without shying away from difficult situations.\n\nHe has a brilliant ability to seamlessly zoom out on vision/strategy, and zoom in on all aspects of design execution, making him instrumental in driving design/product/tech organizations that consistently delivered on strong outcomes.\n\nHe always takes the time to sincerely care for people, balancing it with strong purpose and clear processes to bring a multiplier effect everywhere he goes. Charles is a true superstar hire, and more importantly, he has made a genuinely positive impact on me and the people around him.",
  },
  {
    name: "Jason Gregory",
    role: "Design manager, Mentimeter",
    avatar: "/jason.jpeg",
    text: "I had the great privilege of working with Charles at Zettle. An inspirational leader and holistic design thinker. I look forward to a future where one day we may work together again.",
  },
  {
    name: "Keren Tal",
    role: "Product design, EQT",
    avatar: "/keren.jpeg",
    text: "I've had the pleasure to work with Charles since 2015 and can sincerely say that he is one of the best and most versatile designers I've met.\n\nAs he masters both design leadership and craftsmanship, Charles is that person who can deliver both high-level visions and pixel-perfect designs.\n\nHis work is well thought out and I'm often impressed by his way to convey the message, process or user need behind it in a visual and engaging way.\n\nTo top all that, he is the nicest, most humble guy whom many find inspiring.\n\nThe team that gets Charles onboard is a truly lucky one.",
  },
];

export function QuoteStack() {
  return (
    <div className="flex flex-col gap-3">
      {QUOTES.map((quote) => (
        <blockquote
          key={quote.name}
          className="rounded-2xl p-6"
          style={{ backgroundColor: "rgba(255,255,255,0.04)" }}
        >
          <div className="fade-unit flex items-center gap-3 mb-5">
            <Image
              src={quote.avatar}
              alt={quote.name}
              width={40}
              height={40}
              className="rounded-full w-10 h-10 object-cover"
            />
            <div className="flex flex-col">
              <span className="text-[14px] font-semibold text-white">{quote.name}</span>
              <span className="text-[14px] text-white/40">{quote.role}</span>
            </div>
          </div>
          <div className="space-y-4">
            {quote.text.split("\n\n").map((paragraph, i) => (
              <p key={i} className="fade-unit text-[15px] leading-relaxed text-white/60">
                {paragraph}
              </p>
            ))}
          </div>
        </blockquote>
      ))}
    </div>
  );
}
