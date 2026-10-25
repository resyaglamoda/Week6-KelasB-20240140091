async function testFetchAPI() {
  const testUrl = "https://dummyjson.com/products?limit=10";
  try {
    console.log("Mengambil data tes...");
    const response = await fetch(testUrl);
    if (!response.ok) throw new Error(`Status ${response.status}`);
    const data = await response.json();
    console.log("✅ Test fetch berhasil! Menampilkan judul produk:");
    data.products.forEach((p, i) => console.log(`${i + 1}. ${p.title}`));
  } catch (error) {
    console.error("❌ Test fetch error:", error.message);
  }
}
testFetchAPI();