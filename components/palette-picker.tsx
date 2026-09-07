'use client';

import { type Language, type PreviewStyle } from '@/lib/site';

type Palette = Exclude<PreviewStyle, false>;

const labels = {
  en: {
    title: 'Compare color themes',
    options: {
      'black-gold': '1. Black, white & gold',
      'black-peach': '2. Black, peach & white',
      'white-navy': '3. White, black & navy',
    },
  },
  es: {
    title: 'Comparar temas de color',
    options: {
      'black-gold': '1. Negro, blanco y dorado',
      'black-peach': '2. Negro, durazno y blanco',
      'white-navy': '3. Blanco, negro y azul',
    },
  },
} as const;

export function PalettePicker({
  current,
  lang,
  options,
}: {
  current: Palette;
  lang: Language;
  options: { palette: Palette; href: string }[];
}) {
  const copy = labels[lang];
  const selected = options.find((option) => option.palette === current)?.href;

  return (
    <div className="palette-picker">
      <label htmlFor="palette-select">{copy.title}</label>
      <select
        id="palette-select"
        className="palette-select"
        data-current={current}
        value={selected}
        onChange={(event) => window.location.assign(event.target.value)}
      >
        {options.map(({ palette, href }) => (
          <option key={palette} value={href} data-palette={palette}>
            {copy.options[palette]}
          </option>
        ))}
      </select>
    </div>
  );
}
