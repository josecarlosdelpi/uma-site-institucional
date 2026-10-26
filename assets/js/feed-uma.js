/* Galeria propria UMA: arquivos locais, sem Instagram API, widgets ou tokens. */
(() => {
  'use strict';

  const track = document.querySelector('[data-uma-feed-track]');
  if (!track) return;

  const previous = document.querySelector('[data-uma-feed-previous]');
  const next = document.querySelector('[data-uma-feed-next]');
  const status = document.querySelector('[data-uma-feed-status]');

  const safeImage = path => typeof path === 'string'
    && /^assets\/img\/[a-z0-9_/-]+\.(?:jpg|jpeg|png|webp)$/i.test(path)
    && !path.includes('..') && !path.includes('//');

  const safeLink = href => {
    if (typeof href !== 'string') return null;
    if (/^(?:[a-z0-9-]+\/)+index\.html$/i.test(href) && !href.includes('..')) return href;
    try {
      const url = new URL(href);
      if (url.protocol !== 'https:' || !['www.instagram.com', 'instagram.com'].includes(url.hostname)) return null;
      if (!/^\/(?:p|reel|tv)\/[a-zA-Z0-9_-]+\/?$/.test(url.pathname)) return null;
      return url.href;
    } catch { return null; }
  };

  const make = (tag, className, content) => {
    const element = document.createElement(tag);
    element.className = className;
    element.textContent = content;
    return element;
  };

  function createCard(item) {
    if (!item || !safeImage(item.image)) return null;
    const href = safeLink(item.url);
    if (!href) return null;
    const card = document.createElement('a');
    card.className = 'uma-feed-card';
    card.href = href;
    card.setAttribute('role', 'listitem');
    card.setAttribute('aria-label', String(item.title || 'Ver destaque da UMA'));
    if (href.startsWith('https://')) {
      card.target = '_blank';
      card.rel = 'noopener noreferrer';
    }

    const picture = document.createElement('div');
    picture.className = item.fit === 'cover' ? 'uma-feed-media uma-feed-cover' : 'uma-feed-media';
    const image = document.createElement('img');
    image.src = item.image;
    image.alt = String(item.alt || item.title || 'Imagem da UMA');
    image.loading = 'lazy';
    image.decoding = 'async';
    image.width = 600;
    image.height = 600;
    picture.append(image);

    const content = document.createElement('div');
    content.className = 'uma-feed-text';
    const isPost = item.kind === 'instagram';
    content.append(make('span', 'uma-feed-type', isPost ? 'Publicacao no Instagram' : 'Destaque da UMA'));
    content.append(make('strong', 'uma-feed-title', String(item.title || 'Universo das Mangueiras')));
    content.append(make('span', 'uma-feed-caption', String(item.caption || '')));
    content.append(make('span', 'uma-feed-more', isPost ? 'Abrir publicacao  ->' : 'Saiba mais  ->'));
    card.append(picture, content);
    return card;
  }

  function updateButtons() {
    if (!previous || !next) return;
    const available = track.scrollWidth - track.clientWidth;
    previous.disabled = available <= 3 || track.scrollLeft <= 3;
    next.disabled = available <= 3 || track.scrollLeft >= available - 3;
  }

  function move(direction) {
    const card = track.querySelector('.uma-feed-card');
    if (!card) return;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    const distance = card.getBoundingClientRect().width + gap;
    track.scrollBy({
      left: distance * direction,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'
    });
  }

  previous?.addEventListener('click', () => move(-1));
  next?.addEventListener('click', () => move(1));
  track.addEventListener('scroll', updateButtons, { passive: true });
  window.addEventListener('resize', updateButtons);
  track.addEventListener('keydown', event => {
    if (event.target !== track) return;
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault();
      move(event.key === 'ArrowRight' ? 1 : -1);
    }
  });

  fetch('assets/data/feed-uma.json', { cache: 'no-cache' })
    .then(response => {
      if (!response.ok) throw new Error('Falha ao acessar a vitrine da UMA.');
      return response.json();
    })
    .then(data => {
      if (!data || !Array.isArray(data.items)) throw new Error('Dados invalidos.');
      const cards = data.items.slice(0, 12).map(createCard).filter(Boolean);
      if (!cards.length) throw new Error('Sem destaques cadastrados.');
      track.replaceChildren(...cards);
      if (status) status.textContent = cards.length + (cards.length === 1 ? ' destaque do acervo' : ' destaques do acervo');
      requestAnimationFrame(updateButtons);
    })
    .catch(() => {
      if (status) status.textContent = 'Galeria temporariamente indisponivel. Visite nosso Instagram pelo botao acima.';
      updateButtons();
    });
})();