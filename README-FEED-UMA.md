# Vitrine social da UMA (versao inicial)

Uma galeria propria com fotos, navegacao em carrossel e acesso ao Instagram oficial da UMA, sem APIs, widgets, credenciais, publicidade de terceiros ou mensalidade.

## Onde esta o conteudo?

- `assets/data/feed-uma.json`: relacao de itens, imagens, legendas e destinos.
- `assets/js/feed-uma.js`: script que monta os cartoes e controla a navegacao.
- `assets/css/feed-uma.css`: visual para desktop e celular.
- `assets/img/oficiais`: fotografias reais do catalogo e unidades da UMA.

Os seis itens iniciais usam fotografias institucionais. **Nao sao publicacoes extraidas do Instagram.** Para conferir as postagens atuais, o visitante pode abrir `https://www.instagram.com/universodasmangueiras/`.

## Como incluir uma publicacao real do Instagram?

1. Tenha a imagem ou miniatura original da publicacao, com autorizacao para reutilizar. Copie o arquivo para `assets/img/` no repositorio.
2. Abra `assets/data/feed-uma.json` e acrescente o item, como no exemplo:

```json
{
  "id": "campanha-outubro-2026",
  "title": "Campanha da UMA",
  "caption": "Descricao curta do post",
  "image": "assets/img/campanha-outubro-2026.jpg",
  "alt": "Descricao da imagem",
  "url": "https://www.instagram.com/p/CODIGODOPOST/",
  "kind": "instagram",
  "fit": "cover"
}
```

3. O feed atualizara ao publicar a alteracao no GitHub Pages; a imagem ficara no nosso servidor.
4. O arquivo de dados mostra no maximo doze itens por vez. Recomendamos os seis mais relevantes.

**Para quem nao programa:** basta enviar a imagem e o link do post ao assistente, que podera atualizar o repositorio quando a conexao GitHub estiver disponivel.

## O que nao e automatizado?

Sem acesso a dados do Instagram, o site nao consegue descobrir novos posts por conta propria. A API oficial da Meta pode permitir essa sincronizacao no futuro, mediante permissao da conta empresarial. Alternativamente, se a UMA publicar a mesma arte no Instagram e na area de conteudo do futuro Portal UMA, o site podera atualizar a partir dos arquivos internos **sem consultar o Instagram**.

## Seguranca

O JavaScript rejeita URLs suspeitas nos itens do feed e coloca textos no DOM com `textContent`, evitando HTML nao confiavel. Nao armazene tokens ou credenciais no JSON ou nos scripts publicos. Todos os links externos abrem com `rel="noopener noreferrer"`.