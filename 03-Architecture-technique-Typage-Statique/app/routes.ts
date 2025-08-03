import { index, route } from "@react-router/dev/routes";

export default [
    index("routes/ProductList.tsx"),
    route("products/new", "./routes/AddProduct.tsx"),
    route("products/:id/edit", "./routes/EditProduct.tsx"),
];