import React, { useState } from "react";
import { useNavigate } from "react-router";
import { v4 as uuid } from "uuid";
import { useProducts } from "../hooks/useProducts";
import type { Product } from "../types";

export default function AddProduct() {
	const { addProduct } = useProducts();
	const navigate = useNavigate();

	const [form, setForm] = useState<Partial<Product>>({
		name: "",
		description: "",
		price: 0,
		quantity: 0,
		rating: 0,
		available: true,
		imageUrl: "",
		expiryDate: new Date(),
		addedDate: new Date(),
	});

	function handleChange<K extends keyof Product>(key: K, value: Product[K]) {
		setForm((f) => ({ ...f, [key]: value }));
	}

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		if (!form.name) return alert("Le nom est requis");
		if (!form.description) return alert("La description est requise");
		if (form.price == null || form.price < 0) return alert("Prix invalide");
		if (form.quantity == null || form.quantity < 0)
			return alert("Quantité invalide");
		if (form.rating == null || form.rating < 0 || form.rating > 5)
			return alert("Note invalide");
		if (!form.imageUrl) return alert("URL de l’illustration requise");
		if (!form.expiryDate) return alert("Date de péremption requise");
		if (!form.addedDate) return alert("Date d’ajout requise");

		const product: Product = {
			id: uuid(),
			name: form.name,
			description: form.description,
			price: Number(form.price),
			quantity: Number(form.quantity),
			rating: Number(form.rating),
			available: Boolean(form.available),
			imageUrl: form.imageUrl,
			expiryDate: new Date(form.expiryDate),
			addedDate: new Date(form.addedDate),
		};

		addProduct(product);
		navigate("/products");
	}

	return (
		<form
			onSubmit={handleSubmit}
			className="space-y-4 max-w-md mx-auto p-4"
		>
			<h1 className="text-2xl font-bold">Ajouter un produit</h1>

			<div>
				<label>Nom *</label>
				<input
					type="text"
					value={form.name}
					required
					onChange={(e) => handleChange("name", e.target.value)}
				/>
			</div>

			<div>
				<label>Description *</label>
				<textarea
					value={form.description}
					required
					onChange={(e) =>
						handleChange("description", e.target.value)
					}
				/>
			</div>

			<div>
				<label>Prix (€) *</label>
				<input
					type="number"
					min="0"
					step="0.01"
					value={form.price}
					required
					onChange={(e) =>
						handleChange("price", parseFloat(e.target.value))
					}
				/>
			</div>

			<div>
				<label>Quantité *</label>
				<input
					type="number"
					min="0"
					step="1"
					value={form.quantity}
					required
					onChange={(e) =>
						handleChange("quantity", parseInt(e.target.value))
					}
				/>
			</div>

			<div>
				<label>Note (0–5) *</label>
				<input
					type="number"
					min="0"
					max="5"
					step="0.1"
					value={form.rating}
					required
					onChange={(e) =>
						handleChange("rating", parseFloat(e.target.value))
					}
				/>
			</div>

			<div>
				<label>Disponible</label>
				<input
					type="checkbox"
					checked={form.available}
					onChange={(e) =>
						handleChange("available", e.target.checked)
					}
				/>
			</div>

			<div>
				<label>Illustration (URL) *</label>
				<input
					type="url"
					value={form.imageUrl}
					required
					onChange={(e) => handleChange("imageUrl", e.target.value)}
				/>
			</div>

			<div>
				<label>Date de péremption *</label>
				<input
					type="date"
					value={
						form.expiryDate
							? form.expiryDate.toISOString().split("T")[0]
							: ""
					}
					required
					onChange={(e) =>
						handleChange("expiryDate", new Date(e.target.value))
					}
				/>
			</div>

			<div>
				<label>Date d’ajout *</label>
				<input
					type="date"
					value={
						form.addedDate
							? form.addedDate.toISOString().split("T")[0]
							: ""
					}
					required
					onChange={(e) =>
						handleChange("addedDate", new Date(e.target.value))
					}
				/>
			</div>

			<button type="submit">Enregistrer</button>
		</form>
	);
}
