import { Link } from "react-router";
import { useProducts } from "../hooks/useProducts";

export default function ProductList() {
	const { products, removeProduct } = useProducts();

	return (
		<div className="max-w-4xl mx-auto p-6">
			<header className="flex items-center justify-between mb-6">
				<h1 className="text-3xl font-bold">Liste des produits</h1>
				<Link
					to="/products/new"
					className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded shadow"
				>
					+ Ajouter un produit
				</Link>
			</header>

			{products.length === 0 ? (
				<p className="text-center text-gray-500">
					Aucun produit disponible.
				</p>
			) : (
				<ul className="space-y-4">
					{products.map((p) => (
						<li
							key={p.id}
							className="flex items-center bg-white shadow rounded p-4 hover:shadow-md transition-shadow"
						>
							<img
								src={p.imageUrl}
								alt={p.name}
								className="w-20 h-20 object-cover rounded mr-4"
							/>
							<div className="flex-1">
								<h2 className="text-xl text-black font-semibold">
									{p.name}
								</h2>
								<p className="text-gray-600 text-sm">
									{p.description}
								</p>
								<div className="mt-2 text-black text-sm">
									<span className="font-medium">Prix :</span>{" "}
									€{p.price.toFixed(2)}
									<span className="ml-4 font-medium">
										Stock :
									</span>{" "}
									{p.quantity}
								</div>
								<div className="mt-1 text-sm">
									<span
										className={
											p.available
												? "text-green-600 font-medium"
												: "text-red-600 font-medium"
										}
									>
										{p.available ? "En stock" : "Rupture"}
									</span>
								</div>
							</div>
							<div className="ml-4 flex flex-col space-y-2">
								<Link
									to={`/products/${p.id}/edit`}
									className="text-blue-600 hover:underline text-sm"
								>
									Modifier
								</Link>
								<button
									onClick={() => removeProduct(p.id)}
									className="text-red-600 hover:underline text-sm"
								>
									Supprimer
								</button>
							</div>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}
