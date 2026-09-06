import { useEffect, useRef, ReactNode } from "react";
import { splitText } from "kugiri";

/**
 * Progressive line reveal powered by kugiri: splits the paragraph at the exact
 * line breaks the browser painted, then slides each line up out of a mask.
 * Splitting waits for fonts so the line boxes are final.
 */
export function RevealText({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let split: ReturnType<typeof splitText> | null = null;
    let cancelled = false;

    (async () => {
      await document.fonts.ready;
      if (cancelled) return;
      try {
        split = splitText(el, { type: ["lines"], mask: "lines" });
      } catch {
        // If the split fails for any reason, never leave the text invisible
        el.style.opacity = "1";
        return;
      }
      el.style.opacity = "1";
      const reveals = split.lines.map((line, i) =>
        line.animate(
          [
            { transform: "translateY(110%)", opacity: 0 },
            { transform: "none", opacity: 1 },
          ],
          {
            duration: 700,
            delay: delay * 1000 + i * 90,
            easing: "cubic-bezier(0.23, 1, 0.32, 1)",
            fill: "backwards",
          }
        )
      );
      // A mask clips at rest too (descenders), so drop the clip once done
      Promise.all(reveals.map((a) => a.finished))
        .then(() => {
          if (split) for (const mask of split.masks) mask.style.clipPath = "none";
        })
        .catch(() => {});
    })();

    return () => {
      cancelled = true;
      split?.revert();
    };
  }, [delay]);

  return (
    // opacity (not visibility) hides the pre-split flash: kugiri skips
    // visibility-hidden content but happily splits opacity-0 content
    <p ref={ref} className={className} style={{ opacity: 0 }}>
      {children}
    </p>
  );
}
