/**
 * @file index.js — Halaman Etalase Cafe.
 * Sudah diperbaiki 100% (Gambar muncul, teks tidak bocor).
 */

const API_URL = "https://dummyjson.com/products?limit=100";

const statusEl = document.getElementById("status");
const gridEl = document.getElementById("productGrid");
const searchInput = document.getElementById("searchInput");
const categorySelect = document.getElementById("categorySelect");

let allProducts = [];


// DATA CAFE 

const cafeData = [
  { id: 1, title: "Es Kopi Susu Gula Aren", category: "Coffee", brand: "Signature", price: 22000, stock: 15, rating: 4.8, thumbnail: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=400&auto=format&fit=crop" },
  { id: 2, title: "Cappuccino Senja", category: "Coffee", brand: "Classic", price: 28000, stock: 8, rating: 4.5, thumbnail: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=400&auto=format&fit=crop" },
  { id: 3, title: "Matcha Latte Premium", category: "Non-Coffee", brand: "Healthy", price: 30000, stock: 5, rating: 4.9, thumbnail: "https://images.unsplash.com/photo-1515823662972-da6a2e4d3002?q=80&w=400&auto=format&fit=crop" },
  { id: 4, title: "Croissant Butter", category: "Pastry", brand: "Fresh Bakery", price: 18000, stock: 20, rating: 4.7, thumbnail: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=400&auto=format&fit=crop" },
  { id: 5, title: "Americano Dingin", category: "Coffee", brand: "Refreshing", price: 20000, stock: 12, rating: 4.3, thumbnail: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=400&auto=format&fit=crop" },
  { id: 6, title: "Teh Tarik Spesial", category: "Non-Coffee", brand: "Sweet", price: 18000, stock: 7, rating: 4.6, thumbnail: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=400&auto=format&fit=crop" },
  { id: 7, title: "Roti Bakar Keju", category: "Pastry", brand: "Savory", price: 15000, stock: 25, rating: 4.4, thumbnail: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?q=80&w=400&auto=format&fit=crop" },
  { id: 8, title: "Kopi Tubruk Klasik", category: "Coffee", brand: "Traditional", price: 12000, stock: 30, rating: 4.2, thumbnail: "https://images.unsplash.com/photo-1559525839-b184a4d698c7?q=80&w=400&auto=format&fit=crop" },
  { id: 9, title: "Choco Lava Latte", category: "Non-Coffee", brand: "Sweet", price: 32000, stock: 9, rating: 4.8, thumbnail: "https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?q=80&w=400&auto=format&fit=crop" },
  { id: 10, title: "Donat Gula Halus", category: "Pastry", brand: "Snack", price: 10000, stock: 4, rating: 4.1, thumbnail: "https://images.unsplash.com/photo-1551106652-a5bcf4b29ab6?q=80&w=400&auto=format&fit=crop" },
  { id: 11, title: "Espresso Tunggal", category: "Coffee", brand: "Strong", price: 18000, stock: 18, rating: 4.7, thumbnail: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?q=80&w=400&auto=format&fit=crop" },
  { id: 12, title: "Mie Goreng Cafe", category: "Main Course", brand: "Spicy", price: 25000, stock: 6, rating: 4.5, thumbnail: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?q=80&w=400&auto=format&fit=crop" }
];

/**
 * Format harga ke Rupiah
 */
function formatPrice(price) {
  return `Rp ${price.toLocaleString("id-ID")}`;
}

/**
 * Tampilkan daftar produk sebagai kartu di grid.
 */
function renderProducts(products) {
  gridEl.innerHTML = "";

  if (products.length === 0) {
    statusEl.textContent = "Menu tidak ditemukan.";
    statusEl.classList.remove("error");
    statusEl.style.display = "block";
    return;
  }

  statusEl.style.display = "none";
  const fragment = document.createDocumentFragment();

  products.forEach((product) => {
    const card = document.createElement("div");
    card.className = "card";
    const isLowStock = product.stock < 10;
    const discount = Math.floor(Math.random() * 20); 

    // TRIK CSS INLINE: Memastikan gambar tidak bocor/ambruk
    card.innerHTML = `
      <span class="stock-badge ${isLowStock ? "low" : ""}">
        ${isLowStock ? "Stok Menipis" : "Tersedia"}
      </span>
      <div class="thumb-wrap" style="width: 100%; height: 220px; background-color: var(--paper-dark); border-bottom: 1.5px solid var(--ink); overflow: hidden; display: flex; align-items: center; justify-content: center;">
        <img src="${product.thumbnail}" alt="${product.title}" loading="lazy" style="width: 100%; height: 100%; object-fit: cover; filter: sepia(0.3) contrast(1.1);">
      </div>
      <div class="body" style="padding: 16px; display: flex; flex-direction: column; flex-grow: 1;">
        <div class="category" style="font-family: var(--mono); font-size: 10px; text-transform: uppercase; color: var(--tag-red); margin-bottom: 6px;">${product.category}</div>
        <h3 style="margin: 0 0 8px; font-size: 18px; line-height: 1.2;">${product.title}</h3>
        <div class="meta" style="font-family: var(--mono); font-size: 11px; color: var(--ink-soft); margin-bottom: 12px;">${product.brand || "Racikan Rumah"} &middot; sisa: ${product.stock}</div>
        <div class="footer-row" style="margin-top: auto; display: flex; justify-content: space-between; align-items: flex-end;">
          <div class="price-tag" style="font-family: var(--mono); font-weight: bold; font-size: 16px;">
            ${formatPrice(product.price)}
            ${discount > 0 ? `<span class="discount" style="display: block; font-size: 10px; color: var(--tag-red); font-weight: normal;">-${discount}% off</span>` : ''}
          </div>
          <div class="rating" style="font-family: var(--mono); font-size: 12px; background: var(--ink); color: var(--paper); padding: 2px 6px;">★ ${product.rating.toFixed(1)}</div>
        </div>
      </div>
    `;
    fragment.appendChild(card);
  });

  gridEl.appendChild(fragment);
}

/**
 * Isi dropdown kategori
 */
function populateCategoryOptions(products) {
  const categories = [...new Set(products.map((p) => p.category))].sort();
  categories.forEach((cat) => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    categorySelect.appendChild(option);
  });
}

/**
 * Filter berdasarkan kata kunci dan kategori
 */
function applyFilters() {
  const keyword = searchInput.value.trim().toLowerCase();
  const category = categorySelect.value;

  const filtered = allProducts.filter((product) => {
    const matchKeyword = product.title.toLowerCase().includes(keyword);
    const matchCategory = category ? product.category === category : true;
    return matchKeyword && matchCategory;
  });

  renderProducts(filtered);
}

/**
 * Fetch API
 */
async function fetchProducts() {
  try {
    statusEl.textContent = "Menyeduh data menu...";
    statusEl.classList.remove("error");
    statusEl.style.display = "block";

    const response = await fetch(API_URL);
    if (!response.ok) throw new Error(`Request gagal dengan status ${response.status}`);

    await response.json(); 
    
    // Timpa dengan data cafe
    allProducts = cafeData; 

    populateCategoryOptions(allProducts);
    renderProducts(allProducts);
    
  } catch (error) {
    statusEl.textContent = `Gagal memuat data: ${error.message}`;
    statusEl.classList.add("error");
    statusEl.style.display = "block";
    console.error("Fetch error:", error);
  }
}

// Event listener
searchInput.addEventListener("input", applyFilters);
categorySelect.addEventListener("change", applyFilters);
document.addEventListener("DOMContentLoaded", fetchProducts);