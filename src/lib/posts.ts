import { getCollection } from 'astro:content';
import type { Locale } from '@/i18n';

export async function getPostsByLocale(locale: Locale) {
  return getContentByLocale('posts', locale);
}

/** Generic: fetch any content collection filtered by locale, sorted by pin + date */
export async function getContentByLocale(collection: string, locale: Locale) {
  const allEntries = await getCollection(collection as any);
  return allEntries
    .filter((entry: any) => entry.id.startsWith(`${locale}/`))
    .sort((a: any, b: any) => {
      if (a.data.pinned !== b.data.pinned) return a.data.pinned ? -1 : 1;
      return b.data.date.getTime() - a.data.date.getTime();
    });
}

/** Strip the locale prefix from post ID to get the slug */
export function getSlug(postId: string): string {
  return postId.replace(/^[^/]+\//, '');
}
