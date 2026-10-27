# Universo das Mangueiras — site institucional

Versão 1.3 de desenvolvimento do site institucional da Universo das Mangueiras Automotivas (UMA), preparada para avaliação e futura publicação na hospedagem Linux da Locaweb.

> **Status:** protótipo funcional. Este repositório não publica o site oficial e não está integrado ao Portal UMA.

## Estrutura

- `index.html` — página inicial
- `produtos/` e páginas por categoria — apresentação de linhas de produtos
- `sobre/` — apresentação institucional
- `nossas-lojas/` — unidades e canais de atendimento
- `contato-distribuidor-mangueiras-automotivas-sc/` — contato e orçamento
- `privacidade/` — texto inicial de privacidade, sujeito a revisão
- `assets/css/site.css` — estilos e responsividade
- `assets/js/site.js` — navegação, busca de categorias e link de orçamento no WhatsApp
- `assets/img/` — ilustrações e ícones provisórios
- `LEIA-ME-PUBLICACAO.txt` — instruções de teste, revisão e publicação na Locaweb

## Testar localmente

Abra `index.html` no navegador ou utilize um servidor estático local:

```bash
python3 -m http.server 8000
```

Depois acesse `http://localhost:8000`.

## Antes de publicar

1. Substituir símbolo/logotipo e ilustrações provisórias por materiais oficiais autorizados.
2. Confirmar endereços, horários, telefones e WhatsApps das três unidades.
3. Validar textos comerciais e revisar a política de privacidade.
4. Validar redirecionamentos de URLs antigas, SEO e HTTPS.
5. Fazer backup e testar a publicação em pasta separada na Locaweb.
6. Preservar o DNS de e-mails e a pasta `/public_html/portal-uma`.

**Importante:** nenhum apontamento DNS precisa ser alterado para manter este código no GitHub.

## Tecnologia e custos

Site estático com HTML, CSS e JavaScript, sem framework, serviços pagos ou dependência de banco de dados. Preparado para hospedagem convencional de arquivos estáticos. Custos de hospedagem, domínio e SSL são tratados separadamente.

## Privacidade do código

Este projeto é material corporativo da UMA. Manter o repositório **privado** até a empresa aprovar uma eventual divulgação do código e dos arquivos.

## Atualização visual — versão 1.1

- Logo oficial branca e amarela, exportada do site institucional atual e armazenada em `assets/img/oficiais/logo-uma.png`.
- Imagens de produtos e fotografias das unidades importadas para `assets/img/oficiais/` para não depender de URLs da plataforma anterior.
- Identidade visual em grafite, branco e amarelo.
- Arquivos originais copiados do site atual em 26/10/2026; validar direitos de uso e atualizar quando necessário.

O workflow `.github/workflows/importar-imagens-uma.yml` foi utilizado para trazer os arquivos, sem solicitar credenciais da hospedagem.

## Correções visuais da versão 1.2

- Abertura genérica com fotografias de produtos; a fachada de Joinville não aparece mais no banner principal.
- Removidos os dois avisos sobrepostos à imagem da abertura.
- Fotografias de produtos preservadas sobre fundo branco uniforme, sem círculos decorativos.
- Cartões de categorias e detalhes corrigidos com contenção de imagens para telas grandes e celulares.

## Imagem de abertura — versão 1.3

- A arte aprovada destaca as unidades de Joinville, Itajaí e Tubarão sobre uma silhueta de Santa Catarina sem divisões internas.
- Arquivo `assets/img/hero-santa-catarina-uma.webp` (WebP otimizado, sem dependências externas).
- O banner mantém a identidade grafite/amarelo, sem duplicar a logomarca nem sobrepor avisos à imagem.
- A versão anterior permanece no histórico do GitHub para eventual reversão.

## Versão 1.4 — cabeçalho e avaliações públicas do Google

- Texto da abertura reduzido e imagem de Santa Catarina alinhada ao topo; inclui ajustes próprios para celulares.
- Nova seção `#avaliacoes` com **notas e quantidades conferidas em 26/10/2026**, sempre separadas por unidade.
- Joinville: 4,9/5, 170 avaliações. Tubarão: 5,0/5, 65 avaliações. Itajaí: 5,0/5, 51 avaliações.
- Cada cartão contém resumo editorial dos temas recorrentes e link para **o perfil da unidade no Google Maps**. Não são transcrições literais de avaliações individuais.
- **Sem API, chaves, scripts externos ou assinatura:** as notas são instantâneos e devem ser revisadas manualmente ao atualizar o site. Não afirmar atualização em tempo real.
- Manutenção: alterar textos, notas, quantidades e a data na seção `id="avaliacoes"` em `index.html`.
- Links seguem a documentação Google Maps URLs usando `query_place_id` para identificar cada unidade.

## Correção das notas — versão 1.4.1 (26/10/2026)

- Joinville revisada para **4,9/5 (170 avaliações)** a partir de captura do Google Maps encaminhada pela UMA.
- Itajaí revisada para **5,0/5 (51 avaliações)** da captura correspondente.
- Tubarão mantida em **5,0/5 (65 avaliações)**, sem alteração nessa revisão.
- Esses valores são estáticos; para informações atuais os visitantes devem abrir o perfil oficial de cada loja no Google Maps.

## Links oficiais no rodape — versão 1.6 (26/10/2026)

- Links verificados no site atual da UMA: `https://linktr.ee/universodasmangueiras` e `https://www.instagram.com/universodasmangueiras/`.
- Tres icones em amarelo abaixo da logo: Linktree, Instagram e WhatsApp (abre seletor de unidades existente).
- Rodape atualizado nas 16 paginas HTML, incluindo a pagina 404. Estilo responsivo no CSS compartilhado.
- Somente links externos; sem feed do Instagram, aplicativo, API ou servico pago.
