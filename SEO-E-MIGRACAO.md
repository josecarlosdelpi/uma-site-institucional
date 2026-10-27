# SEO E MIGRACAO — UNIVERSO DAS MANGUEIRAS

**Estado: SOMENTE PREPARADO NO GITHUB. SEM AUTORIZACAO PARA MIGRAR O SITE.**

A migracao do site institucional para a Locaweb e a alteracao do DNS/SSL dependem de **aprovacao expressa de Milena e Jardel**. Esta documentacao nao constitui autorizacao para trocar hospedagem, transferir dominio ou interromper o site atual. O Portal UMA e seus arquivos devem ser preservados.

## URL oficial preferencial

- URL preferencial: **https://universodasmangueiras.com.br/**
- Verificado em 26/10/2026: `https://www.universodasmangueiras.com.br/` redireciona para `https://universodasmangueiras.com.br/` no site atual.
- Por isso, todos os `canonical`, `og:url`, URLs de dados estruturados, `robots.txt` e `sitemap.xml` devem usar o dominio **sem www**.
- Nao incluir `noindex` nas paginas publicas de producao. A pagina 404 e excecao.
- O preview do GitHub Pages NAO e a publicacao oficial. Nao cadastrar o endereco github.io no Search Console como propriedade principal.
- Se Milena e Jardel escolherem outra URL principal, alterar **todos** os sinais de canonicalizacao e testar redirecionamentos ANTES da migracao.

## URLs existentes: preservar durante a troca de site

A maior parte dos caminhos atuais da plataforma anterior ja corresponde aos diretorios do novo site. A diferenca e a barra final; os redirecionamentos HTTP 301 devem conservar a equivalencia.

| Caminho antigo (sem barra) | Destino novo (com barra) |
|---|---|
| `/` | `/` |
| `/mangueiras-intercooler` | `/mangueiras-intercooler/` |
| `/mangueira-radiador` | `/mangueira-radiador/` |
| `/mangueiras-de-ar-quente` | `/mangueiras-de-ar-quente/` |
| `/mangueira-filtro-ar-automotivo` | `/mangueira-filtro-ar-automotivo/` |
| `/mangueira-de-respiro` | `/mangueira-de-respiro/` |
| `/tubo-de-agua-automotivo` | `/tubo-de-agua-automotivo/` |
| `/adaptador-mangueira-automotiva` | `/adaptador-mangueira-automotiva/` |
| `/abracadeiras-automotivas` | `/abracadeiras-automotivas/` |
| `/contato-distribuidor-mangueiras-automotivas-sc` | `/contato-distribuidor-mangueiras-automotivas-sc/` |

Conferir o inventario completo de URLs atuais no **Google Search Console antigo, sitemap do provedor atual e relatorio de links externos** antes da migracao: a lista acima cobre as URLs de navegacao publica identificadas, mas nao garante incluir toda URL historica indexada.

O arquivo de **exemplo** `deploy/locaweb.htaccess.exemplo` prepara as regras Apache (SSL, host e caminhos). **Nao copiar para a raiz da Locaweb antes das duas aprovacoes, backup e teste de redirecionamentos.** `.htaccess` no GitHub Pages nao tem efeito. O ambiente Locaweb pode exigir ajustes de Apache/proxy.

## Preparado tecnicamente no repositorio

- Paginas com `title`, `description`, H1 e `canonical` especificos.
- URLs padronizadas no dominio sem www (incluindo Open Graph, sitemap e dados estruturados).
- `Organization` com logo e Instagram oficial; `AutoPartsStore` para as tres lojas, com endereco, telefone e URL especifica; sem `aggregateRating` para evitar uso indevido de notas proprias.
- `BreadcrumbList` alinhado ao caminho de navegacao visivel, alem de `WebSite` na pagina inicial.
- Tres paginas de loja com contatos e orientacao especifica para **Joinville, Tubarao e Itajai**.
- Links internos no inicio e na pagina de lojas direcionam para cada pagina de unidade.
- `robots.txt` e `sitemap.xml` com enderecos coerentes.
- `scripts/auditar-seo.mjs` e workflow `.github/workflows/auditoria-seo.yml` para detectar erros futuros.
- Conteudos de disponibilidade, estoque, prazos, avaliacao e preco nao podem ser inventados para palavras-chave.

## Aprovacoes obrigatorias (nenhuma concedida neste momento)

- [ ] **Milena aprovou** conteudos, produtos, paginas locais, telefones, fotos, horarios e informacoes comerciais.
- [ ] **Jardel aprovou** o site, a identidade visual, a estrategia e a mudanca de hospedagem.
- [ ] Confirmadas as condicoes contratuais para o uso da marca e das imagens.
- [ ] Exportados e revisados os dados atuais de SEO e URLs do Search Console.
- [ ] Mapeados os caminhos antigos que tenham cliques ou links recebidos.
- [ ] Concluidos backup do site anterior e inventario do DNS, e-mail, SSL e Portal UMA.
- [ ] Validado o ambiente Locaweb sem alterar os apontamentos do site oficial.
- [ ] Testados HTTPS, redirecionamentos 301 (sem loops), 404 real, funcionamento do formularios e links em celular.
- [ ] Executada a auditoria de SEO do repositorio com resultado aprovado.
- [ ] Medido desempenho real com PageSpeed Insights e corrigidos problemas relevantes.
- [ ] **Somente depois das aprovacoes**, publicada a versao validada e enviado `sitemap.xml` ao Google Search Console.
- [ ] Monitoradas indexacao, consultas, cliques, impressões, erros 404 e redirecionamentos nas semanas seguintes.

## Regra permanente de alteracoes futuras

**Toda mudanca no site deve preservar SEO.** Antes de alterar paginas, titulos, URLs, conteudos, fotos, dados das lojas ou menus: rever `title`, `description`, H1, `canonical`, `og:url`, JSON-LD, breadcrumb, alt de imagem, links internos, `sitemap.xml` e as URLs antigas. Ao remover ou renomear paginas, criar redirecionamento permanente do caminho anterior para a pagina equivalente. Atualizar este documento quando a politica evoluir.

Executar `node scripts/auditar-seo.mjs` em toda alteracao de codigo e corrigir as falhas antes da publicacao. Este compromisso esta documentado aqui para que sobreviva a troca de conversas ou responsaveis, independentemente da memoria do chat.

## Referencias oficiais

- https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes
- https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls
- https://developers.google.com/search/docs/appearance/structured-data/local-business
- https://search.google.com/search-console/about

**Limite de garantia:** SEO tecnico preparado no codigo nao implica primeiro lugar no Google. A indexacao, performance real, mapeamento historico total e o resultado comercial so podem ser verificados na infraestrutura aprovada, com dados do Search Console.
