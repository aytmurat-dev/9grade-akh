import rehypeHighlight from 'rehype-highlight';
import rehypeStringify from 'rehype-stringify';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';
import { visit } from 'unist-util-visit';
import type { Element, Root } from 'hast';
import { rasmBormi } from './darslar';

/**
 * Qo'llanma markdown'i build paytida HTML'ga aylantiriladi.
 * Sabab: brauzerga markdown kutubxonasi umuman tushmasin — o'quvchilar
 * telefondan, ko'pincha sekin internetdan kirishadi.
 */

const TIL_NOMI: Record<string, string> = {
  html: 'HTML',
  css: 'CSS',
  js: 'JavaScript',
  javascript: 'JavaScript',
  ts: 'TypeScript',
  typescript: 'TypeScript',
  json: 'JSON',
  bash: 'Terminal',
  sh: 'Terminal',
  shell: 'Terminal',
  python: 'Python',
  py: 'Python',
  sql: 'SQL',
  xml: 'XML',
  yaml: 'YAML',
  dart: 'Dart',
  java: 'Java',
  kotlin: 'Kotlin',
};

function tilniAniqla(kod: Element): string | null {
  const sinflar = kod.properties?.className;
  if (!Array.isArray(sinflar)) return null;
  for (const sinf of sinflar) {
    const nom = String(sinf);
    if (nom.startsWith('language-')) return nom.slice('language-'.length);
  }
  return null;
}

/**
 * Har bir kod blokini paneli bor qutiga o'raydi va "Nusxa olish"
 * tugmasini HTML'ning o'ziga qo'shadi. Tugma statik HTML ichida
 * bo'lgani uchun mijoz tomonida DOM yasash shart emas — faqat bitta
 * klik tinglovchisi yetadi (Qollanma komponentiga qarang).
 */
function rehypeKodPanel() {
  return (tree: Root) => {
    visit(tree, 'element', (tugun, indeks, ota) => {
      if (tugun.tagName !== 'pre' || !ota || indeks === undefined) return;
      if ((ota as Element).properties?.['dataKodBlok'] !== undefined) return;

      const kod = tugun.children.find(
        (bola): bola is Element => bola.type === 'element' && bola.tagName === 'code',
      );
      const til = kod ? tilniAniqla(kod) : null;
      const yorliq = til ? (TIL_NOMI[til] ?? til.toUpperCase()) : 'Kod';

      const qobiq: Element = {
        type: 'element',
        tagName: 'div',
        properties: { className: ['ds-kod-blok'], dataKodBlok: '' },
        children: [
          {
            type: 'element',
            tagName: 'div',
            properties: { className: ['ds-kod-panel'] },
            children: [
              {
                type: 'element',
                tagName: 'span',
                properties: { className: ['ds-kod-til'] },
                children: [{ type: 'text', value: yorliq }],
              },
              {
                type: 'element',
                tagName: 'button',
                properties: {
                  type: 'button',
                  className: ['ds-kod-nusxa'],
                  dataNusxa: '',
                },
                children: [{ type: 'text', value: 'Nusxa olish' }],
              },
            ],
          },
          tugun,
        ],
      };

      ota.children[indeks] = qobiq;
      return ['skip', indeks + 1] as const;
    });
  };
}

/**
 * Rasmlarni kattalashtirish uchun belgilaymiz + lazy yuklash.
 *
 * Fayl hali qo'yilmagan bo'lsa (skrinshotni o'qituvchi keyin oladi,
 * rules/08) buzuq rasm belgisi o'rniga punktir plita chiziladi —
 * slayddagi "SKRINSHOT KUTILMOQDA" bilan bir xil g'oya.
 */
function rehypeRasmlar() {
  return (tree: Root) => {
    visit(tree, 'element', (tugun, indeks, ota) => {
      if (tugun.tagName !== 'img') return;

      const yol = String(tugun.properties?.src ?? '');
      const tavsif = String(tugun.properties?.alt ?? '');

      if (ota && indeks !== undefined && yol.startsWith('/') && !rasmBormi(yol)) {
        // <img> ko'pincha <p> ichida turadi, shuning uchun <span> —
        // <figure> bo'lsa HTML tuzilishi buziladi.
        ota.children[indeks] = {
          type: 'element',
          tagName: 'span',
          properties: { className: ['ds-rasm-kutilmoqda'] },
          children: [
            {
              type: 'element',
              tagName: 'span',
              properties: { className: ['ds-rasm-kutilmoqda-yorliq'] },
              children: [{ type: 'text', value: 'Skrinshot kutilmoqda' }],
            },
            {
              type: 'element',
              tagName: 'span',
              properties: { className: ['ds-rasm-kutilmoqda-tavsif'] },
              children: [{ type: 'text', value: tavsif }],
            },
          ],
        };
        return ['skip', indeks + 1] as const;
      }

      tugun.properties = {
        ...tugun.properties,
        loading: 'lazy',
        decoding: 'async',
        className: ['ds-rasm'],
        dataKatta: '',
      };
    });
  };
}

/** Jadvalni gorizontal scroll qiluvchi o'ramga soladi. */
function rehypeJadval() {
  return (tree: Root) => {
    visit(tree, 'element', (tugun, indeks, ota) => {
      if (tugun.tagName !== 'table' || !ota || indeks === undefined) return;
      if ((ota as Element).properties?.['dataJadvalQuti'] !== undefined) return;

      tugun.properties = { ...tugun.properties, className: ['ds-jadval'] };

      ota.children[indeks] = {
        type: 'element',
        tagName: 'div',
        properties: { className: ['ds-jadval-quti'], dataJadvalQuti: '' },
        children: [tugun],
      };
      return ['skip', indeks + 1] as const;
    });
  };
}

/** Tashqi havolalar yangi oynada ochilsin. */
function rehypeHavolalar() {
  return (tree: Root) => {
    visit(tree, 'element', (tugun) => {
      if (tugun.tagName !== 'a') return;
      const href = String(tugun.properties?.href ?? '');
      if (/^https?:\/\//.test(href)) {
        tugun.properties = {
          ...tugun.properties,
          target: '_blank',
          rel: ['noopener', 'noreferrer'],
        };
      }
    });
  };
}

const quvur = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype)
  .use(rehypeHighlight, { detect: false, ignoreMissing: true })
  .use(rehypeKodPanel)
  .use(rehypeRasmlar)
  .use(rehypeJadval)
  .use(rehypeHavolalar)
  .use(rehypeStringify);

export async function markdownToHtml(markdown: string): Promise<string> {
  const natija = await quvur.process(markdown);
  return String(natija);
}

/* ------------------------------------------------------------------
   Slayd ichidagi kod uchun — panel va nusxa tugmasisiz, sof bo'yalgan
   kod. Slayd ekranga yozib olinadi, ortiqcha bezak kerak emas.
   ------------------------------------------------------------------ */

const kodQuvur = unified()
  .use(remarkParse)
  .use(remarkRehype)
  .use(rehypeHighlight, { detect: false, ignoreMissing: true })
  .use(rehypeStringify);

export async function kodniBoyash(kod: string, til?: string): Promise<string> {
  const chegara = '~~~~~';
  const markdown = `${chegara}${til ?? ''}\n${kod.replace(/\n$/, '')}\n${chegara}`;
  return String(await kodQuvur.process(markdown));
}
