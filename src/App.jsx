import { useReducer, useState } from 'react'

//ORA NON ABBIAMO PIU SET..DOBBIAMO RITORNARCI LO STATE..PERCHE NON ABBIAMO USESTATE, QUINDI FACCIAMO RETURN
//payload > nome da controllare
const cartReducer = (addedProducts, action) => {
  switch (action.type) {
    case "ADD_ITEM"://usiamo intero prodotto per trovare il nome per capire qual'e l'added product
      const itemToAdd = addedProducts.find((item, index) => item.name === action.payload.name)
      if (itemToAdd) {
        //se il prodotto c'è già, incremento quantity non aggiungere solo aggiornare
        return addedProducts.map(item => {//action.payload.quantity = itemToAdd.quantity + 1
          if (item.name === action.payload.name) {
            return {
              ...item,
              quantity: item.quantity + 1
            }
          }
          return item;
        })
       
        //non metto return quindi voglio che il codice continui, quindi tolgo anceh break
      } else {// se NON esiste, aggiungo nuovo prodotto con quantity 1
        return [...addedProducts, {
          ...action.payload,
          quantity: 1
        }]
      }
    case "UPDATE_QUANTITY":
      if (action.payload.quantity < 1 || isNaN(action.payload.quantity)) {//fare niente all interno di un reducer significa tornare lo state
        return addedProducts;
      }
      return addedProducts.map(p => {//map(p => p.name === action.payload.name? {...p, quantity:action.payload.quantity} : p);
        if (p.name === action.payload.name) {
          return {
            ...p,
            quantity: action.payload.quantity
          }
        }
        return p
      })
    case "REMOVE_ITEM":
      return addedProducts.filter((p, i) => p.name !== action.payload)
    default:
      return state;
  }
}

// const updateProductQuantity = (name, quantity) => {
//   //controlli del bonus: quantiy e negativo o non e un numero
//   if (quantity < 1) {
//     return;
//   }
//   setAddedProducts(curr => curr.map(p => {//map(p => p.name === name? {...p, quantity} : p)
//     if (p.name === name) {
//       return {
//         ...p,
//         quantity
//       }
//     }
//     return p
//   }))
// }

// const removeFromCart = (item) => {
//   //teniamo i prodotti che non hanno il nome uguale a quello del item.name passato
//   setAddedProducts(curr => curr.filter((product, i) => product.name !== item.name))
// }

// const addToCart = (product) => {
//   const itemToAdd = addedProducts.find((item, index) => item.name === product.name)
//   //se provo ad aggiungere elemento piu di una volta non si aggiunge
//   if (itemToAdd) {
//     //chiamo questa funzione quando prodotto esiste gia
//     updateProductQuantity(itemToAdd.name, itemToAdd.quantity + 1)
//     return
//   }
//   const cartItem = {
//     ...product,
//     quantity: 1
//   }
//   setAddedProducts([...addedProducts, cartItem])
// }

const lista = [
  { name: 'Mela', price: 0.5 },
  { name: 'Pane', price: 1.2 },
  { name: 'Latte', price: 1.0 },
  { name: 'Pasta', price: 0.7 },
];

function App() {
  // const [products, setProducts] = useState(lista)

  //prodotti nel carrello
  const [addedProducts, dispatchCart] = useReducer(cartReducer, [])



  //   //const updateProductQuantity = (name) => {
  //   setAddedProducts(curr => curr.map(p =>
  //     p.name === name
  //       ? { ...p, quantity: p.quantity + 1 }
  //       : p
  //   ));
  // };


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




  const calculateTotalPrice = () => {
    let totalPriceToPay = 0
    addedProducts.forEach((item) => {
      totalPriceToPay += item.price * item.quantity
    })
    return totalPriceToPay.toFixed(2) + "$"
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
          {lista.map((product, i) => (
            <div>
              <li key={i}>
                <p>{product.name} ({product.price.toFixed(2)}$)</p>
                <button onClick={() => dispatchCart({ type: "ADD_ITEM", payload: product })}>Aggiungi al carrello</button>
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
                        <p>
                          <input
                            type='number'
                            //valore e sincronizzato con quantita
                            value={item.quantity}
                            onChange={(e) => dispatchCart({
                              type: "UPDATE_QUANTITY",
                              payload: { name: item.name, quantity: parseInt(e.target.value) }
                            })} />
                          <span> x {item.name} ({item.price.toFixed(2)}$) </span>
                        </p>
                        <button onClick={() => dispatchCart({ type: "REMOVE_ITEM", payload: item.name })}>Rimuovi dal carrello</button>
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
