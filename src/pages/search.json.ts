import type { APIRoute } from 'astro';
import { getAllNotes } from '../lib/notes';
import wordcut from 'wordcut';

wordcut.init();

export interface SearchDoc {
  slug: string;
  title: string;
  tags: string;
  content: string;
  excerpt: string;
}

function stripMarkdown(md: string): string {
  return md
    .replace(/#{1,6}\s+/g, '')
    .replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (_, link, alias) => alias?.trim() ?? link.trim())
    .replace(/[*_`]/g, '')
    .replace(/\n+/g, ' ')
    .trim();
}

// Insert spaces at Thai word boundaries so lunr indexes individual words.
function segmentThai(text: string): string {
  return text.replace(/[฀-๿]+/g, (thai) => wordcut.cut(thai).split('|').join(' '));
}

export const GET: APIRoute = () => {
  const notes = getAllNotes();
  const docs: SearchDoc[] = notes.map((note) => {
    const plain = stripMarkdown(note.content);
    return {
      slug: note.slug,
      title: note.title,
      tags: note.tags.join(' '),
      content: segmentThai(plain).slice(0, 5000),
      excerpt: plain.slice(0, 200),
    };
  });
  return new Response(JSON.stringify(docs), {
    headers: { 'Content-Type': 'application/json' },
  });
};
