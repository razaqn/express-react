import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './ProductList';
import ProductForm from './ProductForm';
import './App.css';

function App() {
  return (
    <Router>
      <div className="container">
        <h1>Manajemen Products</h1>
        <Routes>
          <Route path='/' element={<ProductList/>}/>
          <Route path='/add' element={<ProductForm/>}/>
          <Route path='/edit/:id' element={<ProductForm/>}/>
        </Routes>
      </div>
    </Router>
  )
}

export default App
