# Universo das Mangueiras — site institucional

Versão 1.0 de desenvolvimento do site institucional da Universo das Mangueiras Automotivas (UMA), preparada para avaliação e futura publicação na hospedagem Linux da Locaweb.

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
