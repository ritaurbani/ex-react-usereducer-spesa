import { use, useState } from 'react'

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

                          //////////////////KEY CONCEPT/////////////
//Se il prodotto esiste già, aumenti la sua quantità di 1 e poi lo aggiorni nel carrello
//addToCart si occupa di aggiungere il prodotto e gestire il flusso quando il prodotto è già nel carrello (incremento della quantità).
// updateProductQuantity è una funzione dedicata solo ad aggiornare la quantità di 
// un prodotto già nel carrello(quando un prodotto è già presente e vogliamo cambiare la sua quantità).

// User scrive in input →
// onChange chiama updateProductQuantity →
// updateProductQuantity aggiorna addedProducts →
// React ricarica tutto, mostrando il nuovo item.quantity.
  const updateProductQuantity = (name, quantity) => {
    //controlli del bonus: quantiy e negativo o non e un numero
    if (quantity < 1 || isNaN(quantity)) {
      return;
    }//aggiorna lo stato (il carrello) mappando tutti gli elementi correnti(la quantita)
    setAddedProducts(curr => curr.map(p => {//map(p => p.name === name? {...p, quantity} : p)
      if (p.name === name) {
        return {
          ...p,
          quantity //quantity maggiorata vedi sotto
          //La funzione updateProductQuantity è pensata per aggiornare una quantità esistente, 
          // non per aumentarla
        //Se scrivessi quantity + 1 dentro questa funzione, aumenteresti
        // la quantità ogni volta che la chiami, ma l'aumento deve essere fatto 
        // all'interno di addToCart, poiché è lì che decidi di aumentare la quantità di 1.
        // Se il prodotto è già nel carrello, incrementi la quantità e 
        // poi invochi updateProductQuantity per aggiornare il carrello.
        }
      }
      return p
    }))
  }
  //OPZIONE CON TERNARIO
  //   //const updateProductQuantity = (name) => {
  //   setAddedProducts(curr => curr.map(p =>
  //     p.name === name
  //       ? { ...p, quantity: p.quantity + 1 }
  //       : p
  //   ));
  // };

  //l flusso giusto
// In addToCart, decidi di incrementare la quantità del prodotto(con itemToAdd.quantity + 1).
// Poi invii il nuovo valore della quantità alla funzione updateProductQuantity 
// per aggiornarlo nello stato del carrello.
  const addToCart = (product) => {
    //potevo usare anche some
    const itemToAdd = addedProducts.find((item, index) => item.name === product.name)
    //se provo ad aggiungere elemento piu di una volta non si aggiunge
    if (itemToAdd) {
      //chiamo questa funzione per aggiornare quantita quando prodotto esiste gia
      //Se il prodotto è già nel carrello,incrementi la quantità 
      // e poi invochi updateProductQuantity PER AGGIORNARE CARRELLO
      updateProductQuantity(itemToAdd.name, itemToAdd.quantity + 1)
      return
    }
    const cartItem = {
      ...product,
      quantity: 1
    }
    setAddedProducts([...addedProducts, cartItem])
    // setAddedProducts(curr => [...curr, {
    //   ...product,
    //   quantity:1
    // }])
  }

  const removeFromCart = (item) => {
    //teniamo i prodotti che non hanno il nome uguale a quello del item.name passato
    setAddedProducts(curr => curr.filter((product, i) => product.name !== item.name))
  }

  const calculateTotalPrice = () => {
    let totalPriceToPay = 0
    addedProducts.forEach((item) => {
      totalPriceToPay += item.price * item.quantity
    })
    return totalPriceToPay.toFixed(2) + "$"
  }
  //VERSIONE CON VARIABILE E REDUCE
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
                        <p>
                          <input
                            type='number'
                            //valore e sincronizzato con quantita
                            value={item.quantity}
                            //onChange invoca updateProductQuantity, che aggiorna la quantità del prodotto nello stato (addedProducts).
                            onChange={(e) => updateProductQuantity(item.name, parseInt(e.target.value))} />
                          <span> x {item.name} ({item.price.toFixed(2)}$) </span>
                        </p>
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
