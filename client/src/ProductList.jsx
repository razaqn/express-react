import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function ProductList() {
    const [product, setProduct] = useState([]);
    const apiUrl = 'http://localhost:5001/api/products';

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async() => {
        const response = await fetch(apiUrl);
        const data =  await response.json();
        setProduct(data);
    };

    const handleDelete = async(id) => {
        if (window.confirm('apakah anda ingin menghapus data ini?')) {
            await fetch(`${apiUrl}/${id}`, 
            { method : 'DELETE' });
            fetchProducts();
        }
    }

  return (
    <div>
        <Link to="/add" className='btn-add'>Tambah Produk</Link>
        <table className='product-table'>
            <thead>
                <tr>
                    <th>Nama Product</th>
                    <th>Stok</th>
                    <th>Harga</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {product.map((p) => (
                    <tr key={p.id}>
                        <td>{p.name}</td>
                        <td>{p.stock}</td>
                        <td>{p.price}</td>
                        <td>
                            <div className="action">
                                <Link to={`/edit/${p.id}`}>Edit</Link>
                                <button onClick={() => handleDelete(p.id)}>Hapus</button>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}
export default ProductList
