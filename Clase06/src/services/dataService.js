import productsRaw from "../data/products.json";

function loadStockOverrides() {
  try {
    const raw = localStorage.getItem("mishop_stock_overrides");
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveStockOverrides(overrides) {
  localStorage.setItem("mishop_stock_overrides", JSON.stringify(overrides));
}

function withCurrentStock(products) {
  const overrides = loadStockOverrides();
  return products.map((p) => {
    const override = overrides[p.id];
    return override != null ? { ...p, stock: override } : p;
  });
}

export async function getProducts(categoryId) {
  const list = withCurrentStock(productsRaw);
  return categoryId ? list.filter((p) => p.category === categoryId) : list;
}

export async function getProductById(id) {
  const list = withCurrentStock(productsRaw);
  return list.find((p) => p.id === String(id)) || null;
}

export async function createOrder({ buyer, items, total }) {
  const overrides = loadStockOverrides();
  const current = withCurrentStock(productsRaw);

  for (const cartItem of items) {
    const prod = current.find((p) => p.id === cartItem.id);
    if (!prod || prod.stock < cartItem.qty) {
      throw new Error(`Sin stock para: ${cartItem?.title || cartItem.id}`);
    }
  }
  for (const cartItem of items) {
    const prod = current.find((p) => p.id === cartItem.id);
    const newStock = prod.stock - cartItem.qty;
    overrides[cartItem.id] = newStock;
  }
  saveStockOverrides(overrides);

  const orderId = crypto.randomUUID
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2);

  try {
    const raw = localStorage.getItem("mishop_orders");
    const orders = raw ? JSON.parse(raw) : [];
    orders.push({
      id: orderId,
      buyer,
      items,
      total,
      createdAt: new Date().toISOString(),
      status: "generated",
    });
    localStorage.setItem("mishop_orders", JSON.stringify(orders));
  } catch {}

  return { id: orderId };
}
