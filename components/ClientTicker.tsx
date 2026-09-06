/* eslint-disable @next/next/no-img-element */

type Client = {
  name: string;
  logo?: string;
  monogram?: string;
  invert?: boolean;
  whiteBg?: boolean;
};

// Brand logos from public/logos; Brickanta and Daresay use their local product icons
const ROW_ONE: Client[] = [
  { name: "Brickanta", logo: "/brickanta.png", whiteBg: true },
  { name: "Depict", logo: "/logos/depict.png" },
  { name: "Validio", logo: "/logos/validio.png" },
  { name: "iZettle", logo: "/logos/zettle.png" },
  { name: "PayPal", logo: "/logos/paypal.png" },
  { name: "Curb", logo: "/logos/curb.png" },
];

const ROW_TWO: Client[] = [
  { name: "Ikea", logo: "/logos/ikea.png" },
  { name: "Microsoft", logo: "/logos/microsoft.png" },
  { name: "ABB", logo: "/logos/abb.png" },
  { name: "Renault", logo: "/logos/renault.png" },
  { name: "Canal+", logo: "/logos/canalplus.png" },
  { name: "Ericsson", logo: "/logos/ericsson.png" },
];

function Badge({ client }: { client: Client }) {
  return (
    <div
      className="flex items-center gap-2.5 rounded-full pl-2 pr-4 py-1.5 flex-shrink-0"
      style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
    >
      {client.logo ? (
        <span
          className={`w-7 h-7 rounded-full overflow-hidden flex items-center justify-center flex-shrink-0 ${
            client.whiteBg ? "bg-white" : "bg-white/10"
          }`}
        >
          <img
            src={client.logo}
            alt={client.name}
            className="w-full h-full object-cover"
            style={client.invert ? { filter: "invert(1)" } : undefined}
          />
        </span>
      ) : (
        <span className="w-7 h-7 rounded-full bg-white/10 text-white/70 text-[11px] font-semibold flex items-center justify-center flex-shrink-0">
          {client.monogram}
        </span>
      )}
      <span className="text-[15px] font-medium text-white/90 whitespace-nowrap">
        {client.name}
      </span>
    </div>
  );
}

function TickerRow({
  clients,
  duration,
  reverse,
}: {
  clients: Client[];
  duration: number;
  reverse?: boolean;
}) {
  return (
    <div className="fade-unit ticker-mask overflow-hidden w-full">
      <div
        className={`flex items-center gap-2 w-max ${reverse ? "animate-ticker-reverse" : "animate-ticker"}`}
        style={{ animationDuration: `${duration}s` }}
      >
        {[...clients, ...clients].map((client, i) => (
          <Badge key={`${client.name}-${i}`} client={client} />
        ))}
      </div>
    </div>
  );
}

export function ClientTicker() {
  return (
    <div className="flex flex-col gap-2">
      <TickerRow clients={ROW_ONE} duration={38} />
      <TickerRow clients={ROW_TWO} duration={32} reverse />
    </div>
  );
}
