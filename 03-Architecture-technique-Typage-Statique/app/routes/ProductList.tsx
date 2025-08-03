import { Link } from "react-router";
import { useProducts } from "../hooks/useProducts";

export default function ProductList() {
	const { products, removeProduct } = useProducts();

	return (
		<div>
			<h1>Liste des produits</h1>
			<Link to="/products/new">+ Ajouter un produit</Link>
			<ul>
				{products.map((p) => (
					<li key={p.id}>
						<img src={p.imageUrl} alt={p.name} width={80} />
						<strong>{p.name}</strong> – {p.quantity} en stock –{" "}
						<button onClick={() => removeProduct(p.id)}>
							Supprimer
						</button>{" "}
						<Link to={`/products/${p.id}/edit`}>Modifier</Link>
					</li>
				))}
			</ul>
		</div>
	);
}
