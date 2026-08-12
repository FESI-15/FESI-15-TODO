import { m, type Variants } from "motion/react";

export const titleContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06 },
  },
};

export const titleItemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

export function renderAnimatedWords(text: string, keyPrefix = "") {
  return text.split(" ").map((word, index) => (
    <m.span
      key={`${keyPrefix}${index}-${word}`}
      variants={titleItemVariants}
      className="inline-block"
    >
      {word}
    </m.span>
  ));
}
