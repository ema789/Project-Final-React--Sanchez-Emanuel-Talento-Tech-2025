import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCartContext } from "../../context/CartContext/useCartContext";
import { useAuth } from "../../context/AuthContext/useAuth"
import { useProducts } from "../../context/ProductsContext/useProducts";

import CardProducts from "../CardProduct/CardProducts";
import "../ProductDetail/productDetail.css"

export default function ProductDetail( { showShoppingCartButton } ) {
    
    const { id } = useParams();
    const navigate = useNavigate();

    const { addCart } = useCartContext();
    const { user } = useAuth();

    const { products, loading, error, handleEdit, handleDelete } = useProducts();

    const [ productEdit, setProductEdit ] = useState(null);

    if (loading) return <p className="been charging">Loading products...</p>;
    if (error) return <p className="been error">⚠️ Error: {error}</p>;

    const product = products.find((p) => String(p.id) === String(id));

    if(!product) return <p className="not-exit">Product not found</p>
   
    // 🗑️ Eliminar con confirmación
    const handleDeleteClick = async (prod) => {
        const confirm = confirm(`Delete the product "${prod.name}"?`);
        if(!confirm) return ;
        await handleDelete(prod.id);
        navigate("/")
    };

    // 🔁 Actualizar producto desde el formulario
    const handleUpdate = async (prodUpdate) => {

        if(prodUpdate) await handleEdit(prodUpdate);

        setProductEdit(null);
    };

    return (
        <div className="container-wrapper">
            <CardProducts

            product={product}
            user={user}
            detailMode={true}
            addToCart={addCart}
            onEditProduct={(prod) => setProductEdit(prod)}
            onDelete={handleDelete}

            />
        </div>
    );

    
};