
import { Link } from 'react-router-dom'
import { useCartStore } from '../store/cartStore'

function Cart() {
  const items = useCartStore((state) => state.items)
  const removeItem = useCartStore((state) => state.removeItem)
  const setQuantity = useCartStore((state) => state.setQuantity)
  const clear = useCartStore((state) => state.clear)

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  if (items.length === 0) {
    return (
      <section className="cart-page">
        <h2>Your Cart Is Empty</h2>
        <p>You haven't added any products yet.</p>
        <Link to="/products">Continue Shopping</Link>
      </section>
    )
  }

  return (
    <section className="cart-page">
      <h2>Shopping Cart</h2>

      {items.map((item) => (
        <div className="cart-item" key={item.id}>
          <div>
            <h3>{item.title}</h3>
            <p>${item.price.toFixed(2)}</p>
          </div>

          <div className="quantity-controls">
            <button
              onClick={() =>
                setQuantity(item.id, item.quantity - 1)
              }
            >
              -
            </button>

            <span>{item.quantity}</span>

            <button
              onClick={() =>
                setQuantity(item.id, item.quantity + 1)
              }
            >
              +
            </button>
          </div>

          <strong>
            ${(item.price * item.quantity).toFixed(2)}
          </strong>

          <button
            className="remove-button"
            onClick={() => removeItem(item.id)}
          >
            Remove
          </button>
        </div>
      ))}

      <div className="cart-total">
        <h3>Total: ${total.toFixed(2)}</h3>

        <button onClick={clear}>Clear Cart</button>
      </div>
    </section>
  )
}

export default Cart
