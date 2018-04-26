const SHOPPING_CART = 'shoppingCart'
const getCart = () => JSON.parse(localStorage.getItem(SHOPPING_CART))
const saveCart = (cart) => localStorage.setItem(SHOPPING_CART, JSON.stringify(cart))
const removeCart = () => localStorage.removeItem(SHOPPING_CART)

const ShoppingCart = {
  getCart,
  saveCart,
  removeCart,
}

const PRODUCTS = [
  {
    id: 'item-1',
    name: 'Product 1',
    price: 100000,
  },
  {
    id: 'item-2',
    name: 'Product 2',
    price: 500000,
  },
  {
    id: 'item-3',
    name: 'Product 3',
    price: 50000,
  }
]

const Cart = ({ data, onClick }) => {
  if (data.length > 0) {
    const total = data.reduce((p, c) => p + (c.qty * c.price), 0)
    return (
      <div className="cart">  
        <div className="row title">
          <div>ProductID</div>
          <div>ProductName</div>
          <div>Price</div>
          <div>Qty</div>
          <div>Total</div>
          <div>Actions</div>
        </div>
        {data.map(item => (
          <div className="row">
            <div>{item.id}</div>
            <div>{item.name}</div>
            <div>{item.price}</div>
            <div>{item.qty}</div>
            <div>{item.price * item.qty}</div>
            <div><button onClick={() => onClick(item)}>Remove</button></div>
          </div>
        ))}
        <div className="row total">
          <div>Total</div>
          <div>{total}</div>
        </div>
      </div>
    )
  }
  return <div />
}

const Product = ({ data, onClick }) => (
  <div className="product">
    {data.map(item => (
      <div className="item">
        <div>{item.name}</div>
        <div>{item.price}</div>
        <button onClick={() => onClick({ ...item, qty: 1 })}>Add to Cart</button>
      </div>
    ))}  
  </div>
)

class App extends React.PureComponent {
  constructor() {
    super()
    this.state = {
      shoppingCart: ShoppingCart.getCart() || [],
    }
  }
  
  addToCart = (item) => {
    const { shoppingCart } = this.state
    const isItemExist = shoppingCart.some(({ id }) => item.id === id)
    let newCart
    if (isItemExist) {
      newCart = shoppingCart.map(d => {
        if (d.id === item.id) {
          return {
            ...d,
            qty: d.qty + item.qty,
          }
        }
        return d
      })
    } else {
      newCart = [
        ...shoppingCart,
        item,
      ]
    }
    this.setState({ shoppingCart: newCart })
    ShoppingCart.saveCart(newCart)
  }
  
  removeFromCart = (item) => {
    const { shoppingCart } = this.state
    const newCart = shoppingCart.filter((d) => d.id !== item.id)
    this.setState({ shoppingCart: newCart })
    ShoppingCart.saveCart(newCart)
  }
  
  render() {
    return (
    <div>
        <Product data={PRODUCTS} onClick={this.addToCart} />
        <Cart data={this.state.shoppingCart} onClick={this.removeFromCart} />
    </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)