import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"

function ProductForm() {
    const [product, setProduct] = useState({ 
        name: '',
        price: '',
        stock: '',
        id_category: 1
    });
    const {id} = useParams();
    const navigate = useNavigate();
    const apiStore = 'http://localhost:5001/api/products';

    useEffect(() => {
        if (id) {
            const fetchProductsById = async() =>{
                const response = await fetch(`http://localhost:5001/api/products/${id}`);
                const data = await response.json();
                setProduct(data);
            };
            fetchProductsById();
        }
    }, [id])

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setProduct({ ...product, [name]: value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const method = id ? 'PUT' : 'POST';
        const url = id ? `${apiStore}/${id}` : apiStore;

        await fetch(url , {
            method: method,
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(product),
        });

        navigate('/')
    }

    return(
        <div className="form-container">
            <h2>Tambah Product</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="nama product" 
                    value={product.name} onChange={handleInputChange} required />
                <input type="number" name="price" placeholder="harga product" 
                    value={product.price} onChange={handleInputChange} required />
                <input type="number" name="stock" placeholder="stok product" 
                    value={product.stock} onChange={handleInputChange} required />
                <div className="form-action">
                    <button type="submit">Tambah</button>
                    <button type="button" onClick={() => navigate('/')}>Batal</button>
                </div>
            </form>
        </div>
    )
}

export default ProductForm