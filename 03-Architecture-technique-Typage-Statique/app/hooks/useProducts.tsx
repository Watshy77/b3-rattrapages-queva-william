import type { ReactNode } from "react";
import { createContext, useContext, useState } from "react";
import type { Product } from "../types";

type ContextType = {
	products: Product[];
	addProduct(p: Product): void;
	removeProduct(id: string): void;
	updateQuantity(id: string, qty: number): void;
};

const ProductsContext = createContext<ContextType | null>(null);

export function ProductsProvider({ children }: { children: ReactNode }) {
	const [products, setProducts] = useState<Product[]>([]);

	const addProduct = (p: Product) => setProducts((prev) => [...prev, p]);
	const removeProduct = (id: string) =>
		setProducts((prev) => prev.filter((x) => x.id !== id));
	const updateQuantity = (id: string, qty: number) =>
		setProducts((prev) =>
			prev.map((x) =>
				x.id === id ? { ...x, quantity: qty, available: qty > 0 } : x
			)
		);

	return (
		<ProductsContext.Provider
			value={{ products, addProduct, removeProduct, updateQuantity }}
		>
			{children}
		</ProductsContext.Provider>
	);
}

export function useProducts() {
	const ctx = useContext(ProductsContext);
	if (!ctx) throw new Error("useProducts must be inside ProductsProvider");
	return ctx;
}
