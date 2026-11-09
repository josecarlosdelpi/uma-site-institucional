#!/usr/bin/env node
/* Protege as alteracoes comerciais aprovadas pela UMA, incluindo SEO e canais das lojas. */
import fs from 'node:fs';
const read = p => fs.readFileSync(p, 'utf8');
const errors = [];
const assert = (ok, label) => { if (!ok) errors.push(label); };
const count = (text, term) => text.split(term).length - 1;
const home = read('index.html');
const produtos = read('produtos/index.html');
const sobre = read('sobre/index.html');
const lojas = read('nossas-lojas/index.html');
const contato = read('contato-distribuidor-mangueiras-automotivas-sc/index.html');
const js = read('assets/js/site.js');
const css = read('assets/css/site.css');
const sitemap = read('sitemap.xml');
const seo = read('SEO-E-MIGRACAO.md');

assert(home.includes('Solução e agilidade que você precisa!'), 'Slogan ausente da home');
assert(home.includes('O que você procura, nós temos a solução!'), 'Titulo comercial antigo na home');
assert(!home.includes('itens anunciados no portfólio'), 'Termo anunciados ainda aparece no contador');
assert(home.includes('Caminhões, ônibus e outras aplicações'), 'Onibus nao listado na linha pesada');
assert(!home.includes('class="board-word"'), 'Letra decorativa UMA nao removida');
assert(count(home, 'Conhecer grupo') >= 4, 'Rótulos de grupo nao revisados na home');
assert(/class="category-card" href="mangueiras-automotivas-em-santa-catarina\/index\.html"[\s\S]*?intercooler\.jpg/.test(home), 'Foto da mangueira principal nao substituida');
assert(!produtos.includes('data-search="mangueiras automotivas carros veiculos'), 'Cartao de grupo generico ainda no catalogo');
assert(count(produtos, 'class="product-card" data-product-card') === 8, 'Catalogo deveria listar 8 grupos especificos');
assert(produtos.includes('8 grupos encontrados'), 'Contagem inicial dos grupos incorreta');
assert(produtos.includes('Explore os grupos de produtos'), 'Terminologia dos grupos ausente');
assert(!sobre.includes('componentes correlatos'), 'Termo corporativo incompreensivel reapareceu');
assert(!sobre.includes('linhas voltadas a carros'), 'Descricao anterior dos veiculos reapareceu');
assert(lojas.includes('Escolha a unidade mais perto de você'), 'Texto de localizacao nao revisado');
assert(!js.includes('data-quote-form'), 'Javascript do formulario removido reapareceu');
assert(css.includes('.quote-store-link'), 'Estilo do contato direto ausente');
assert(css.includes('.footer .footer-links a:visited'), 'Rodape deveria manter links discretos');

const itajaiPhoto = 'assets/img/oficiais/loja-itajai.webp';
assert(fs.existsSync(itajaiPhoto), 'Foto de Itajaí ausente no repositório');
assert(read('mangueiras-automotivas-itajai/index.html').includes('../'+itajaiPhoto), 'Página de Itajaí sem a foto aprovada');
for (const [page,body] of [['home',home],['nossas-lojas',lojas],['contato',contato]]) {
  assert(body.includes(itajaiPhoto), page+': cartão de Itajaí sem a foto');
  assert((body.match(/class="store-photo"/g)||[]).length === 3, page+': fotos das três lojas não aparecem juntas');
}
const numbers = ['5547991702554','5548988479091','5547996311294'];
for (const [path, body] of [['index.html',home],['nossas-lojas/index.html',lojas],['contato-distribuidor-mangueiras-automotivas-sc/index.html',contato]]) {
  assert(!body.includes('data-quote-form'), path + ': formulario antigo ainda ativo');
  assert(count(body, 'class="quote-store-link"') === 3, path + ': contatos diretos por loja ausentes');
  assert(body.includes('<em>02</em>Fale com o vendedor') && body.includes('<em>03</em>Descreva a peça'), path + ': sequencia de atendimento incorreta');
  for (const number of numbers) assert(body.includes('href="https://wa.me/'+number+'?text='), path + ': WhatsApp '+number+' ausente');
}
const ids = [
  ['joinville','ChIJd6ZQTOGv3pQRy-84aFn2Df0'],
  ['tubarao','ChIJ30EutRhDIZURI6AAwIBsBe8'],
  ['itajai','ChIJ2_T2C9HL2JQR0BKb1g-oUME']
];
for(const [path,text] of [['home',home],['lojas',lojas],['contato',contato]]) {
  for (const [city,id] of ids) {
    assert(text.includes('query_place_id='+id), path + ': Google Maps '+city+' sem ID especifico');
  }
}
for(const [city] of ids){
  const file='mangueiras-automotivas-'+city+'/index.html';
  const content=read(file);
  assert(content.includes('query_place_id='), file+': Google Maps indisponivel');
  assert(!content.includes('ENCONTRE A UMA'),file+': linguagem antiga');
  assert(sitemap.includes('https://universodasmangueiras.com.br/mangueiras-automotivas-'+city+'/'),file+': URL ausente do sitemap');
}
for(const file of [home,produtos,sobre,lojas,contato]) {
  assert(!file.includes('Falar com a UMA'), 'CTA de rodape continua com sigla');
  assert(!file.includes('Conheça a UMA'), 'Link de navegacao continua com sigla');
}
assert(seo.includes('Milena E Jardel'), 'Publicacao deve continuar dependendo das duas aprovacoes');
if(errors.length) {
 console.error('Revisao UMA: '+errors.length+' falha(s):\n - '+errors.join('\n - '));
 process.exitCode = 1;
} else {
 console.log('Revisao UMA OK: slogan, produtos, formularios, WhatsApps, Google Maps e regra de aprovacao conferidos.');
}
