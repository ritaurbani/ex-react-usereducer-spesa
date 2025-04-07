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
  console.log(addedProducts)

  const updateProductQuantity = (name, quantity) => {
    setAddedProducts(curr => curr.map(p => {//map(p => p.name === name? {...p, quantity} : p)
      if(p.name === name){
        return {
          ...p,
          quantity
        }
      }
      return p
    }))
  }

//   //const updateProductQuantity = (name) => {
//   setAddedProducts(curr => curr.map(p =>
//     p.name === name
//       ? { ...p, quantity: p.quantity + 1 }
//       : p
//   ));
// };

  const addToCart = (product) => {
    const itemToAdd = addedProducts.find((item, index) => item.name === product.name)
    //se provo ad aggiungere elemento piu di una volta non si aggiunge
    if (itemToAdd) { 
      //chiamo questa funzione quando prodotto esiste gia
      updateProductQuantity(itemToAdd.name, itemToAdd.quantity + 1)
      return }
    const cartItem = {
      ...product,
      quantity: 1
    }
    setAddedProducts([...addedProducts, cartItem])
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

  const removeFromCart = (item) => {
    //teniamo i prodotti che non hanno il nome uguale a quello del item.name passato
    setAddedProducts(curr => curr.filter((product,i) => product.name !== item.name))
  }

 

const calculateTotalPrice = () => {
  let totalPriceToPay = 0
  addedProducts.forEach((item) => {
    totalPriceToPay += item.price*item.quantity
  })
  return totalPriceToPay.toFixed(2)+"$"
}
 //Versione con variabile e reduce
  //calcolata a ogni modifica - Trasformare array di addedProducts in un valore, la sua somma > reduce
  // const totalPriceToPay = addedProducts.reduce((acc, curr) => {
  //   return acc + (curr.price * curr.quantity)
  // },0 )

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
          <ul>
            {addedProducts.length > 0 && (
              <>
                <h2>Prodotti nel carrello</h2>
                <ul>
                  {
                    addedProducts.map((item, index) => (
                      <li key={index}>
                        <p>{item.quantity} x {item.name} ({item.price.toFixed(2)}$)</p>
                        <button onClick={() => removeFromCart(item)}>Rimuovi dal carrello</button>
                      </li>
                    ))
                  }
                </ul>
                <div>
                  {/* Se uso variabile con reduce invece di funzione */}
                  {/* <h2>Totale da pagare {totalPriceToPay.toFixed(2)}$</h2> */}
                  <h2>Totale da pagare</h2>
                  {calculateTotalPrice()}
                </div>
              </>
            )}

          </ul>
        </div>
      </div>
    </>
  )
}

export default App
