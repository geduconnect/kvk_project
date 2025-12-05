import React, { useState } from "react";

export const Wishlist = () => {
    const sampleProducts = [
        { id: 1, name: "Product 1", price: 10 },
        { id: 2, name: "Product 2", price: 15 },
        { id: 3, name: "Product 3", price: 20 },
      ];
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const increaseQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const getTotalCost = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };
  const clearCart = () => {
    setCartItems([]); // Clear all items in the cart
  };

  const handleCheckout = () => {
    alert("Proceeding to checkout...");
    // Implement checkout logic here
  };
  return (
    <div className="container mb-30 mt-50">
      <div className="row">
        <h2>Products</h2>
        <ul>
          {sampleProducts.map((product) => (
            <li key={product.id}>
              {product.name} - ${product.price}
              <button onClick={() => addToCart(product)}>Add to Cart</button>
            </li>
          ))}
        </ul>
        <div className="addtocart-container">
          <div className="addtocart-head">
            <h1>Your Shopping Cart</h1>

            <span>There are {} products in your cart</span>
            <span>
              {" "}
              <button
                className="cartremove-btn"
                onClick={() => removeFromCart(item.id)}
              >
                <i className="fa fa-trash" aria-hidden="true"></i>Clear Cart
              </button>
            </span>
          </div>
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <div className="col-xl-10 col-lg-12 m-auto">
              <div className="mb-50">
                <h1 className="heading-2 mb-10">Your Wishlist</h1>
                <h6 className="text-body">
                  There are <span className="text-brand">5</span> products in this
                  list
                </h6>
              </div>

              <div className="table-responsive shopping-summery">
                <table className="table table-wishlist">
                  <thead>
                    <tr className="main-heading">
                      <th className="custome-checkbox start pl-30">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="checkbox"
                          id="exampleCheckbox11"
                          value=""
                        />
                        <label
                          className="form-check-label"
                          for="exampleCheckbox11"
                        ></label>
                      </th>
                      <th scope="col" colspan="2">
                        Product
                      </th>
                      <th scope="col">Unit Price</th>
                      <th scope="col">(Per Quantity)</th>
                      <th scope="col">Subtotal</th>
                      <th scope="col" className="end">
                        Remove
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => (
                      <tr className="addtocart-item" key={item.id}>
                        <td className="">
                          {/* <input
                            className="form-check-input"
                            type="checkbox"
                            name="checkbox"
                            id="exampleCheckbox1"
                            value=""
                          />
                          <label
                            className="form-check-label"
                            for="exampleCheckbox1"
                          ></label> */}
                        </td>
                        <td className="product-table-image">
                          <img src={{}} alt="#" />
                        </td>
                        <td className="product-name">
                          <h6 className="mb-5">
                            <a
                              className="product-name mb-10 text-heading"
                              // href="shop-product-right.html"
                            >
                              {item.name}
                            </a>
                          </h6>
                          {/* <div className="product-rate-cover">
                              <div className="product-rate d-inline-block">
                                <div
                                  className="product-rating"
                                  style={{{ width": "90%"}} }}
                                ></div>
                              </div>
                              <span className="font-small ml-5 text-muted">
                                {" "}
                                (4.0)
                              </span>
                            </div> */}
                        </td>
                        <td
                          className="product-price"
                          data-title="product-price"
                        >
                          <h4 className="text-body"> ${item.price} </h4>
                        </td>
                        <td className="product-quatity" data-title="Stock">
                          x {item.quantity}
                          <button
                            className="addtocartincdec-btn"
                            onClick={() => increaseQuantity(item.id)}
                          >
                            +
                          </button>
                          <button
                            className="addtocartincdec-btn"
                            onClick={() => decreaseQuantity(item.id)}
                          ></button>
                        </td>
                        <td
                          className="product-total-price"
                          data-title="product-price"
                        >
                          <h4 className="text-brand">
                            {" "}
                            Total: ${getTotalCost()}{" "}
                          </h4>
                        </td>
                        <td className="action text-center" data-title="Remove">
                          <button
                            className="cartremove-btn"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <i className="fa fa-trash" aria-hidden="true"></i>
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
