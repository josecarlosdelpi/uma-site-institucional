#!/usr/bin/env node
/* Auditoria automatica de SEO do site UMA. Sem bibliotecas externas. */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const BASE = 'https://universodasmangueiras.com.br';
const errors = [];
const fail = (where, message) => errors.push(where + ': ' + message);
const get = file => fs.readFileSync(path.join(ROOT, file), 'utf8');
const exists = file => fs.existsSync(path.join(ROOT, file));

function walk(dir = '') {
  return fs.readdirSync(path.join(ROOT, dir), { withFileTypes: true }).flatMap(item => {
    if (['.git', 'node_modules'].includes(item.name)) return [];
    const relative = path.posix.join(dir, item.name);
    return item.isDirectory() ? walk(relative) : [relative];
  });
}

const pages = walk().filter(file => file.endsWith('.html'));
const livePages = pages.filter(file => file !== '404.html');
const canonicalSet = new Set();
const urlsFromSitemap = [...get('sitemap.xml').matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
const sitemapSet = new Set(urlsFromSitemap);

for (const file of pages) {
  const text = get(file);
  const title = text.match(/<title>([^<]+)<\/title>/)?.[1];
  const description = text.match(/<meta name="description" content="([^"]+)"/)?.[1];
  const canonical = text.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  const ogUrl = text.match(/<meta property="og:url" content="([^"]+)"/)?.[1];
  const headings = [...text.matchAll(/<h1\b[^>]*>/g)];
  const expected = file === 'index.html' ? BASE + '/' :
    BASE + '/' + (file.endsWith('/index.html') ? file.slice(0, -'index.html'.length) : file);
  if (!title || title.trim().length < 12) fail(file, 'titulo ausente ou muito curto');
  if (!description || description.trim().length < 60) fail(file, 'meta description ausente ou muito curta');
  if (canonical !== expected) fail(file, 'canonical incorreto: ' + String(canonical));
  if (ogUrl !== canonical) fail(file, 'og:url diferente do canonical');
  if (text.includes('https://www.universodasmangueiras.com.br')) fail(file, 'dominio antigo com www nos metadados');
  if (headings.length !== 1) fail(file, 'deve ter exatamente um H1, encontrou ' + headings.length);
  if (!text.includes('<html lang="pt-BR">')) fail(file, 'idioma pt-BR ausente');

  for (const img of text.matchAll(/<img\b[^>]*>/g)) {
    if (!/\balt="[^"]*"/.test(img[0])) fail(file, 'imagem sem alt');
  }

  for (const link of text.matchAll(/<(?:a|img|script|link)\b[^>]*(?:href|src)="([^"]+)"/g)) {
    const url = link[1].replace(/&amp;/g, '&');
    if (/^(https?:|mailto:|tel:|data:|#)/i.test(url)) continue;
    if (/^javascript:/i.test(url)) { fail(file, 'link javascript proibido'); continue; }
    const ref = url.split(/[?#]/)[0];
    if (!ref) continue;
    const target = ref.startsWith('/') ? ref.slice(1) : path.posix.join(path.posix.dirname(file), ref);
    if (!exists(target)) fail(file, 'referencia interna inexistente: ' + url);
  }

  const ld = text.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1];
  if (!ld) fail(file, 'JSON-LD ausente');
  else {
    try {
      const schema = JSON.parse(ld);
      const graph = schema['@graph'];
      if (!Array.isArray(graph) || !graph.some(x => x['@type'] === 'Organization')) fail(file, 'schema Organization ausente');
      if (file === 'index.html' && !graph.some(x => x['@type'] === 'WebSite')) fail(file, 'schema WebSite ausente na home');
      if (file !== 'index.html' && file !== '404.html' && text.includes('class="breadcrumbs"') && !graph.some(x => x['@type'] === 'BreadcrumbList')) fail(file, 'schema BreadcrumbList ausente');
    } catch (e) { fail(file, 'JSON-LD invalido: ' + e.message); }
  }

  if (file === '404.html') {
    if (!/<meta name="robots" content="noindex/.test(text)) fail(file, '404 deve ser noindex');
  } else {
    if (/<meta name="robots" content="[^"]*noindex/.test(text)) fail(file, 'pagina publica marcada noindex');
    if (canonicalSet.has(canonical)) fail(file, 'canonical duplicada: ' + canonical);
    canonicalSet.add(canonical);
    if (!sitemapSet.has(canonical)) fail(file, 'canonical nao aparece no sitemap');
  }
}
for (const url of sitemapSet) if (!canonicalSet.has(url)) fail('sitemap.xml', 'URL nao existe como canonical indexavel: ' + url);
if (urlsFromSitemap.length !== livePages.length) fail('sitemap.xml', 'numero de URLs difere das paginas indexaveis');
if (sitemapSet.size !== urlsFromSitemap.length) fail('sitemap.xml', 'URLs duplicadas');
if (!get('robots.txt').includes('Sitemap: ' + BASE + '/sitemap.xml')) fail('robots.txt', 'sitemap com dominio incorreto');
for (const file of ['index.html', 'nossas-lojas/index.html']) {
  for (const city of ['joinville', 'tubarao', 'itajai']) {
    if (!get(file).includes('mangueiras-automotivas-' + city + '/index.html')) fail(file, 'link para unidade ' + city + ' ausente');
  }
}
if (errors.length) {
  process.stderr.write('SEO UMA: ' + errors.length + ' problema(s)\n' + errors.map(x => ' - ' + x).join('\n') + '\n');
  process.exitCode = 1;
} else {
  process.stdout.write('SEO UMA OK: ' + pages.length + ' paginas HTML, ' + livePages.length + ' indexaveis, canonicals, sitemap, links internos, imagens e JSON-LD verificados.\n');
}
