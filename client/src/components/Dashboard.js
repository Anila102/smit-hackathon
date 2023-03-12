
import React, { useState, useEffect } from 'react';
import Product from './Product';
export default function Dashboard() {
    const [products, setProducts] = useState([]);
    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    function handleSubmit(e) {
       
        e.preventDefault();
        const filteredData = products.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setProducts(filteredData);
        console.log(filteredData)
      }
    const getAllProducts=async ()=>{
        const response = await fetch("http://localhost:5000/api/products/getproducts", {
            method: 'GET'
        });
        const json = await response.json()
        setProducts(json)
   
    
    }
    useEffect(() => {
        getAllProducts();
      }, [data]);
  return (
    <>

<form className='d-flex justify-content-end my-4' onSubmit={handleSubmit}>
  <label htmlFor="search" className='mx-2 d-flex align-items-center'> Search: </label>
  <input
    type="text"
    id="search"
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
  />
  <button className='btn btn-success mx-2' type="submit">Search </button>
</form>

    <h2 className='d-flex justify-content-center' style={{color:"green"}}> Popular Items</h2>
  <div className='row container'>
    { products.map((product) => (
  <Product
    key={product._id}
    title={product.title}
    user={product.user}
    description={product.description}
    price={product.price}
    category={product.category}
  />
))}

<div>
  {data && data
    .filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .map((product) => (
        <Product
          key={product._id}
          title={product.title}
          description={product.description}
          price={product.price}
          category={product.category}
        />
      ))}
</div>
</div>
    
    </>
  )
}
