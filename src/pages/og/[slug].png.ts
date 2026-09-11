import type { APIRoute } from 'astro';
import { allOgPages } from '@/lib/pages';
import { ogSlug } from '@/lib/site';
import { renderOg } from '@/lib/og';

export async function getStaticPaths() {
  const pages = await allOgPages();
  return pages.map((p) => ({
    params: { slug: ogSlug(p.path) },
    props: { title: p.title, kicker: p.kicker },
  }));
}

export const GET: APIRoute = async ({ props }) => {
  const { title, kicker } = props as { title: string; kicker: string };
  const png = await renderOg(title, kicker);
  return new Response(png as unknown as BodyInit, { headers: { 'Content-Type': 'image/png' } });
};
