import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  doc,
  getDoc,
  addDoc,
  writeBatch,
  serverTimestamp,
} from "firebase/firestore";
import { app } from "./firebase";

export const db = getFirestore(app);

export const getProducts = async () => {
  const documents = await getDocs(collection(db, "items"));

  const products = [];

  documents.forEach((doc) => {
    products.push({
      ...doc.data(),
      id: doc.id,
    });
  });

  return products;
};

export const getProductsByCategory = async (category) => {
  const q = query(collection(db, "items"), where("category", "==", category));

  const documents = await getDocs(q);

  const products = [];
  documents.forEach((doc) => {
    products.push({
      ...doc.data(),
      id: doc.id,
    });
  });

  return products;
};

export const getProductById = async (id) => {
  const docRef = doc(db, "items", id);

  const document = await getDoc(docRef);

  if (document.exists()) {
    return {
      ...document.data(),
      id: document.id,
    };
  } else {
    return null;
  }
};

export const getCategories = async () => {
  const documents = await getDocs(collection(db, "items"));

  const categories = new Set();

  documents.forEach((doc) => {
    const data = doc.data();
    if (data.category) {
      categories.add(data.category);
    }
  });

  return Array.from(categories);
};

// Crea una orden de compra y actualiza el stock de los productos
// Usa "batch" (lote) para hacer varias operaciones en una transacción atómica
// Si algo falla, NADA se guarda (evita datos inconsistentes)
export const createOrder = async (cart, buyer, total) => {
  // writeBatch(): crea un lote de escrituras
  // Todas las operaciones del batch se ejecutan juntas o ninguna
  const batch = writeBatch(db);

  const outOfStock = [];

  // Verificamos stock de cada producto del carrito
  for (const item of cart) {
    const productRef = doc(db, "items", item.id);

    const productSnap = await getDoc(productRef);

    if (!productSnap.exists()) {
      outOfStock.push({ ...item, reason: "Producto no encontrado" });
      continue;
    }

    const productData = productSnap.data();

    // Si hay stock suficiente, programamos la actualización del stock en el batch
    if (productData.stock >= item.qty) {
      batch.update(productRef, {
        stock: productData.stock - item.qty,
      });
    } else {
      outOfStock.push({
        ...item,
        available: productData.stock,
      });
    }
  }

  // Si hay productos sin stock, retornamos error sin guardar nada
  if (outOfStock.length > 0) {
    return { success: false, outOfStock };
  }

  // Creamos el objeto de la orden
  const order = {
    buyer,
    items: cart.map((i) => ({
      id: i.id,
      title: i.title,
      price: i.price,
      qty: i.qty,
    })),
    total,
    createdAt: serverTimestamp(), // Timestamp automático del servidor
    status: "generated",
  };

  // Creamos referencia a un nuevo documento (con ID automático)
  const orderRef = doc(collection(db, "orders"));

  // Programamos la creación de la orden en el batch
  batch.set(orderRef, order);

  // commit(): EJECUTA todas las operaciones del batch de una vez
  // Actualiza el stock Y crea la orden, o no hace nada si falla
  await batch.commit();

  return { success: true, orderId: orderRef.id };
};
