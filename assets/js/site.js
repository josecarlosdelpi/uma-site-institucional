/* Site UMA: navegacao, escolha de loja, busca simples por categorias e orcamento WhatsApp. */
(() => {
  'use strict';
  const stores = {
    joinville: { name: 'Joinville', phone: '5547991702554' },
    itajai: { name: 'Itajaí', phone: '5547996311294' },
    tubarao: { name: 'Tubarão', phone: '5548988479091' }
  };
  const whatsUrl = (phone, message) => `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  // Mobile navigation: menu remains fully usable without a framework.
  const menuButton = document.querySelector('[data-menu-toggle]');
  const nav = document.querySelector('[data-main-nav]');
  const closeMenu = () => {
    if (!nav || !menuButton) return;
    nav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Abrir menu');
    document.body.classList.remove('menu-open');
  };
  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', String(open));
      menuButton.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
  }

  // Unit selection is deliberately local: the site has no customer database.
  const dialog = document.querySelector('[data-store-dialog]');
  let dialogContext = 'Olá! Gostaria de solicitar um orçamento.';
  function openStoreDialog(context) {
    dialogContext = context || 'Olá! Gostaria de solicitar um orçamento.';
    if (!dialog) return;
    dialog.querySelectorAll('[data-store-whatsapp]').forEach(anchor => {
      const key = anchor.dataset.storeWhatsapp;
      if (stores[key]) anchor.href = whatsUrl(stores[key].phone, dialogContext);
    });
    if (typeof dialog.showModal === 'function') {
      dialog.showModal();
      document.body.classList.add('modal-open');
    } else {
      // Legacy fallback: links can still be reached below the page.
      dialog.setAttribute('open', '');
    }
  }
  document.querySelectorAll('[data-open-stores]').forEach(element => {
    element.addEventListener('click', event => {
      event.preventDefault();
      openStoreDialog(element.dataset.context);
    });
  });
  if (dialog) {
    dialog.querySelectorAll('[data-close-dialog]').forEach(button => button.addEventListener('click', () => dialog.close()));
    dialog.addEventListener('close', () => document.body.classList.remove('modal-open'));
    dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
    dialog.querySelectorAll('[data-store-whatsapp]').forEach(link => link.addEventListener('click', () => dialog.close()));
  }

  // A category search; not an ERP product search or live inventory check.
  const search = document.querySelector('[data-category-search]');
  const cards = Array.from(document.querySelectorAll('[data-product-card]'));
  const count = document.querySelector('[data-result-count]');
  const empty = document.querySelector('[data-no-results]');
  const normalize = str => str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
  if (search && cards.length) {
    const refresh = () => {
      const query = normalize(search.value);
      let visible = 0;
      cards.forEach(card => {
        const match = normalize(card.dataset.search || card.textContent).includes(query);
        card.hidden = !match;
        card.style.display = match ? '' : 'none';
        if (match) visible++;
      });
      if (count) count.textContent = `${visible} ${visible === 1 ? 'categoria encontrada' : 'categorias encontradas'}`;
      if (empty) empty.classList.toggle('visible', visible === 0);
    };
    search.addEventListener('input', refresh);
    refresh();
  }

  // Creates a pre-filled message in WhatsApp; does not send data to our server.
  document.querySelectorAll('[data-quote-form]').forEach(form => {
    form.addEventListener('submit', event => {
      event.preventDefault();
      const data = new FormData(form);
      const store = stores[data.get('loja')];
      if (!store) { form.querySelector('[name="loja"]')?.focus(); return; }
      const product = String(data.get('produto') || '').trim();
      const vehicle = String(data.get('veiculo') || '').trim();
      const code = String(data.get('codigo') || '').trim();
      const lines = [
        'Olá! Vim pelo site da Universo das Mangueiras e gostaria de solicitar um orçamento.',
        `Unidade: ${store.name}.`,
        `Produto de interesse: ${product || 'Preciso de orientação para encontrar a peça'}.`
      ];
      if (vehicle) lines.push(`Veículo/aplicação: ${vehicle}.`);
      if (code) lines.push(`Código ou referência: ${code}.`);
      lines.push('Podem me ajudar a identificar a peça e verificar a disponibilidade?');
      const link = document.createElement('a');
      link.href = whatsUrl(store.phone, lines.join('\n'));
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      link.remove();
    });
  });

  const year = document.querySelectorAll('[data-year]');
  year.forEach(node => { node.textContent = String(new Date().getFullYear()); });
})();
