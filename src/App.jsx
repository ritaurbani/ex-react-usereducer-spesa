import { useState } from 'react'

const lista = [
  { name: 'Mela', price: 0.5 },
  { name: 'Pane', price: 1.2 },
  { name: 'Latte', price: 1.0 },
  { name: 'Pasta', price: 0.7 },
];

function App() {
  const [products, setProducts] = useState(lista)

  //prodotti nel carrello
  const [addedProducts, setAddedProducts] = useState([])

  const addToCart = (product) => {
  
    const itemToAdd = addedProducts.find((item, index) => item.name === product.name)
    if(itemToAdd){return}
    const cartItem = {
      ...product, 
      quantity: 1
    }

    setAddedProducts(...addedProducts, cartItem)
  }

  // const addToCart = product => {
  //   const isProductAlreadyAdded = addedProducts.some(p => p.name === product.name);
  //   if(isProductAlreadyAdded){return}
  //   const productToAdd = {
  //     ...product,
  //     quantity: 1
  //   }
  //   setAddedProducts( curr => [...curr, productToAdd])
  // } 
  // //or also invece di creare variabile productToAdd, crea oggetto direttamente qui..
  // setAddedProducts(curr => [...curr, {
  //   ...product,
  //   quantity:1
  // }])



  return (
    <>
      <div>
        <h2>Lista Prodotti</h2>
        <ul>
          {products.map((product, i) => (
            <div>
              <li key={i}>
                <p>{product.name} ({product.price.toFixed(2)}$)</p>
                <button onClick={() => addToCart(product)}>Aggiungi al carrello</button>
              </li>
            </div>
          ))}
        </ul>
        <div>
          <h2>Prodotti nel carrello</h2>
          <ul>
            {
              addedProducts.map((item, index) => (
                <li key={index}>{item.name} {item.price} {item.quantity}</li>
              ))
            }
          </ul>
        </div>
      </div>
    </>
  )
}

export default App
