import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useProducts } from "../hooks/useProducts";
import type { Product } from "../types";

export default function EditProduct() {
	const { products, addProduct, removeProduct } = useProducts();
	const navigate = useNavigate();
	const { id } = useParams<{ id: string }>();

	const existing = products.find((p) => p.id === id);

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

	useEffect(() => {
		if (!existing) return;
		setForm({
			name: existing.name,
			description: existing.description,
			price: existing.price,
			quantity: existing.quantity,
			rating: existing.rating,
			available: existing.available,
			imageUrl: existing.imageUrl,
			expiryDate: existing.expiryDate,
			addedDate: existing.addedDate,
		});
	}, [existing]);

	if (!existing) {
		return <div>Produit non trouvé</div>;
	}

	function handleChange<K extends keyof Product>(key: K, value: Product[K]) {
		setForm((f) => ({ ...f, [key]: value }));
	}

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		if (!form.name) return alert("Nom requis");
		if (!form.description) return alert("Description requise");
		if (form.price == null || form.price < 0) return alert("Prix invalide");
		if (form.quantity == null || form.quantity < 0)
			return alert("Quantité invalide");
		if (form.rating == null || form.rating < 0 || form.rating > 5)
			return alert("Note invalide");
		if (!form.imageUrl) return alert("URL requise");
		if (!form.expiryDate) return alert("Date de péremption requise");
		if (!form.addedDate) return alert("Date d’ajout requise");

		removeProduct(id!);
		const updated: Product = {
			id: id!,
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

		addProduct(updated);
		navigate("/");
	}

	return (
		<div className="max-w-md mx-auto p-6 text-black bg-white shadow rounded">
			<h1 className="text-2xl font-bold mb-4">Modifier un produit</h1>
			<form onSubmit={handleSubmit} className="space-y-4">
				<div>
					<label className="block font-medium mb-1">Nom *</label>
					<input
						type="text"
						value={form.name}
						required
						className="w-full border px-3 py-2 rounded"
						onChange={(e) => handleChange("name", e.target.value)}
					/>
				</div>
				<div>
					<label className="block font-medium mb-1">
						Description *
					</label>
					<textarea
						value={form.description}
						required
						className="w-full border px-3 py-2 rounded"
						onChange={(e) =>
							handleChange("description", e.target.value)
						}
					/>
				</div>
				<div className="grid grid-cols-2 gap-4">
					<div>
						<label className="block font-medium mb-1">
							Prix (€) *
						</label>
						<input
							type="number"
							min="0"
							step="0.01"
							value={form.price}
							required
							className="w-full border px-3 py-2 rounded"
							onChange={(e) =>
								handleChange(
									"price",
									parseFloat(e.target.value)
								)
							}
						/>
					</div>
					<div>
						<label className="block font-medium mb-1">
							Quantité *
						</label>
						<input
							type="number"
							min="0"
							step="1"
							value={form.quantity}
							required
							className="w-full border px-3 py-2 rounded"
							onChange={(e) =>
								handleChange(
									"quantity",
									parseInt(e.target.value)
								)
							}
						/>
					</div>
				</div>
				<div className="grid grid-cols-2 gap-4">
					<div>
						<label className="block font-medium mb-1">
							Note (0–5) *
						</label>
						<input
							type="number"
							min="0"
							max="5"
							step="0.1"
							value={form.rating}
							required
							className="w-full border px-3 py-2 rounded"
							onChange={(e) =>
								handleChange(
									"rating",
									parseFloat(e.target.value)
								)
							}
						/>
					</div>
					<div className="flex items-center mt-6">
						<input
							type="checkbox"
							checked={form.available}
							className="mr-2"
							onChange={(e) =>
								handleChange("available", e.target.checked)
							}
						/>
						<label>Disponible</label>
					</div>
				</div>
				<div>
					<label className="block font-medium mb-1">
						Illustration (URL) *
					</label>
					<input
						type="url"
						value={form.imageUrl}
						required
						className="w-full border px-3 py-2 rounded"
						onChange={(e) =>
							handleChange("imageUrl", e.target.value)
						}
					/>
				</div>
				<div className="grid grid-cols-2 gap-4">
					<div>
						<label className="block font-medium mb-1">
							Date de péremption *
						</label>
						<input
							type="date"
							value={
								form.expiryDate?.toISOString().split("T")[0] ||
								""
							}
							required
							className="w-full border px-3 py-2 rounded"
							onChange={(e) =>
								handleChange(
									"expiryDate",
									new Date(e.target.value)
								)
							}
						/>
					</div>
					<div>
						<label className="block font-medium mb-1">
							Date d’ajout *
						</label>
						<input
							type="date"
							value={
								form.addedDate?.toISOString().split("T")[0] ||
								""
							}
							required
							className="w-full border px-3 py-2 rounded"
							onChange={(e) =>
								handleChange(
									"addedDate",
									new Date(e.target.value)
								)
							}
						/>
					</div>
				</div>
				<button
					type="submit"
					className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
				>
					Mettre à jour
				</button>
			</form>
		</div>
	);
}
