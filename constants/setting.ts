export type LanguageCode = "ko" | "en" | "ja" | "zh" | "fr";

export const LANGUAGE_OPTIONS: { code: LanguageCode; label: string }[] = [
  { code: "en", label: "English" },
  { code: "ja", label: "日本語" },
  { code: "ko", label: "한국어" },
  { code: "zh", label: "简体中文" },
  { code: "fr", label: "Français" },
];

export const DEFAULT_LANGUAGE: LanguageCode = "ko";
