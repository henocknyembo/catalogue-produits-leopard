const WHATSAPP_PHONE = "243820257621"; // Remplacez par votre numéro sans + (ex: 33612345678)
const PRODUCTS = [
  { id: "p1", name: "LATEX SIMPLE", description: "Quantité: 15 kilogrammes; Propriétés : faible odeur et résistance moyenne, non toxique (zéro COV); Spécifications : usage intérieur, non applicable sur surface métallique; Avantage : pouvoir couvrant moyen, séchage rapide; Durée de vie : minimum 3 ans", price: "Contacter nous par WhatsApp ou Facebook", img: "images/latex-simple.jpg" },
  { id: "p2", name: "LATEX ULTRA", description: "Quantité : 20 kilogrammes; Propriétés : haute adhérence, résistance à l’humidité, rayures et chaleur; Spécifications : usage interne et externe; Avantage : durabilité exceptionnelle; Durée de vie : minimum 8 ans", price: "Contacter nous par WhatsApp ou Facebook", img: "images/latex-ultra.jpg" },
  { id: "p3", name: "MASTIC SIMPLE", description: "Quantité : 15 kilogrammes; Propriétés : élasticité moyenne, bonne adhérence; Avantage : facile à appliquer; Durée de vie : 3 à 5 ans intérieur", price: "Contacter nous par WhatsApp ou Facebook", img: "images/mastic-simple.jpg" },
  { id: "p4", name: "MASTIC EXTRA", description: "Quantité : 20 kilogrammes; Propriétés : haute résistance, adhérence améliorée; Durée de vie : jusqu’à 20 ans intérieur", price: "Contacter nous par WhatsApp ou Facebook", img: "images/mastic-extra.jpg" },
  { id: "p5", name: "EMAILLE SIMPLE", description: "Quantité : 1 litre; Propriétés : film dur, résistance à l’eau; Durée de vie : 15 à 20 ans intérieur", price: "Contacter nous par WhatsApp ou Facebook", img: "images/latex-simple.jpg" },
  { id: "p6", name: "EMAILLE LARGE", description: "Quantité : 1.5 litre; Durée de vie : 25 à 30 ans intérieur", price: "Contacter nous par WhatsApp ou Facebook", img: "images/latex-ultra.jpg" },
  { id: "p7", name: "ANTI ROUILLE", description: "Quantité : 1.5 litre; Propriétés : protège contre la rouille", price: "Contacter nous par WhatsApp ou Facebook", img: "images/mastic-simple.jpg" },
  { id: "p8", name: "VERNIS A BOIS", description: "Quantité : 1 litre; Propriétés : protège le bois contre l’humidité", price: "Contacter nous par WhatsApp ou Facebook", img: "images/mastic-extra.jpg" }
];

function getQueryParam(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

function setYear() {
  document.querySelectorAll("#year, #year2, #year3, #year4").forEach(el => {
    if (el) el.textContent = new Date().getFullYear();
  });
}

function copyToClipboard(text) {
  navigator.clipboard?.writeText(text).then(() => {
    alert("Lien copié dans le presse-papiers.");
  }).catch(() => {
    prompt("Copiez manuellement le lien", text);
  });
}

function formatPrice(amount) {
  return amount.toFixed(2).replace(".", ",") + " FCFA";
}

function getCart() {
  const stored = localStorage.getItem("leopardCart");
  if (!stored) return {};
  try {
    return JSON.parse(stored);
  } catch (e) {
    return {};
  }
}

function saveCart(cart) {
  localStorage.setItem("leopardCart", JSON.stringify(cart));
}

function addToCart(productId) {
  const cart = getCart();
  cart[productId] = (cart[productId] || 0) + 1;
  saveCart(cart);
  renderCart();
}

function removeFromCart(productId) {
  const cart = getCart();
  delete cart[productId];
  saveCart(cart);
  renderCart();
}

function clearCart() {
  localStorage.removeItem("leopardCart");
  renderCart();
}

function renderProducts() {
  const container = document.getElementById("products");
  if (!container) return;
  container.innerHTML = "";

  PRODUCTS.forEach(product => {
    const card = document.createElement("article");
    card.className = "product";

    card.innerHTML = `
      <img src="${product.img}" alt="${product.name}" class="product-image" onerror="this.style.display='none'">
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <div class="product-footer">
        <span class="product-price">${product.price}</span>
        <button class="btn btn-sm" data-product="${product.id}">Ajouter</button>
      </div>
    `;

    card.querySelector("button").addEventListener("click", () => {
      addToCart(product.id);
    });

    container.appendChild(card);
  });
}

function renderCart() {
  const cartItems = document.getElementById("cartItems");
  const cartTotalElement = document.getElementById("cartTotal");
  const sendWhatsApp = document.getElementById("sendWhatsApp");

  if (!cartItems || !cartTotalElement || !sendWhatsApp) return;

  const cart = getCart();
  const entries = Object.entries(cart);
  cartItems.innerHTML = "";

  if (entries.length === 0) {
    cartItems.textContent = "Votre panier est vide.";
    cartTotalElement.textContent = "0,00 FCFA";
    sendWhatsApp.disabled = true;
    return;
  }

  let total = 0;

  entries.forEach(([productId, qty]) => {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    // total += product.price * qty; // Removed since price is string

    const item = document.createElement("div");
    item.className = "cart-item";

    item.innerHTML = `
      <div>
        <strong>${product.name} × ${qty}</strong>
        <span>Prix sur demande</span>
      </div>
      <div>
        <span>Prix sur demande</span>
        <button class="btn-sm" data-remove="${productId}">✕</button>
      </div>
    `;

    item.querySelector("button")?.addEventListener("click", () => {
      removeFromCart(productId);
    });

    cartItems.appendChild(item);
  });

  cartTotalElement.textContent = "Prix sur demande";
  sendWhatsApp.disabled = false;
}

function buildWhatsAppMessage() {
  const cart = getCart();
  const entries = Object.entries(cart);
  if (entries.length === 0) return "";

  const lines = ["Bonjour, je souhaite commander :\n"];

  entries.forEach(([productId, qty]) => {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;
    lines.push(`${qty} × ${product.name} (Prix sur demande)`);
  });

  lines.push("\nMerci !");
  return lines.join("\n");
}

function openWhatsApp(message) {
  const text = encodeURIComponent(message);
  const url = `https://wa.me/${WHATSAPP_PHONE}?text=${text}`;
  window.open(url, "_blank");
}

function initAccessPage() {
  setYear();
  const baseUrl = window.location.href.split("?")[0];
  const shareUrl = `${baseUrl}/catalogue.html`;

  const shareInput = document.getElementById("shareUrl");
  const copyButton = document.getElementById("copyLink");

  if (shareInput) shareInput.value = shareUrl;
  if (copyButton) {
    copyButton.addEventListener("click", () => copyToClipboard(shareUrl));
  }

  // Redirection automatique vers le catalogue
  window.location.href = "catalogue.html";
}

function initCataloguePage() {
  setYear();
  renderProducts();
  renderCart();

  const shareInput = document.getElementById("catalogShare");
  const copyButton = document.getElementById("copyCatalogLink");
  const sendWhatsApp = document.getElementById("sendWhatsApp");
  const clearBtn = document.getElementById("clearCart");

  const shareUrl = window.location.href;
  if (shareInput) shareInput.value = shareUrl;
  if (copyButton) {
    copyButton.addEventListener("click", () => copyToClipboard(shareUrl));
  }

  if (sendWhatsApp) {
    sendWhatsApp.addEventListener("click", () => {
      const message = buildWhatsAppMessage();
      if (!message) return;
      openWhatsApp(message);
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener("click", clearCart);
  }
}

function initContactPage() {
  setYear();
  const contactBtn = document.getElementById("contactWhatsApp");
  const facebookBtn = document.getElementById("contactFacebook");
  const numberEl = document.getElementById("whatsappNumber");

  if (numberEl) numberEl.textContent = `+${WHATSAPP_PHONE}`;
  if (contactBtn) {
    contactBtn.addEventListener("click", () => {
      const message = "Bonjour, je souhaite obtenir plus d\u2019informations.";
      openWhatsApp(message);
    });
  }
  if (facebookBtn) {
    facebookBtn.addEventListener("click", () => {
      window.open("https://www.facebook.com/share/1XjBNyqCg4/", "_blank");
    });
  }
}

function initHeaderMenu() {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");
  if (!toggle || !nav) return;

  const closeNav = () => {
    nav.classList.remove("nav--open");
    toggle.setAttribute("aria-expanded", "false");
  };

  toggle.addEventListener("click", () => {
    const opened = nav.classList.toggle("nav--open");
    toggle.setAttribute("aria-expanded", opened);
  });

  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", closeNav);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initHeaderMenu();
  const page = document.body.dataset.page;
  if (!page) return;
  if (page === "access") initAccessPage();
  if (page === "catalogue") initCataloguePage();
  if (page === "contact") initContactPage();
  if (page === "services") setYear();
});
