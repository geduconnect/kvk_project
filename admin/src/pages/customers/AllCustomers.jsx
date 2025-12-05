import React, { useEffect, useState } from "react";

// import SummaryApi from '../common'
// import { toast } from 'react-toastify'
// import moment from 'moment'
// import { MdModeEdit } from "react-icons/md";
// import ChangeUserRole from '../components/ChangeUserRole';

const AllCustomers = () => {
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
  // const [allUser,setusers] = useState([])
  // const [openUpdateRole,setOpenUpdateRole] = useState(false)
  // const [updateUserDetails,setUpdateUserDetails] = useState({
  //     email : "",
  //     name : "",
  //     role : "",
  //     _id  : ""
  // })

  // const fetchusers = async() =>{
  //     // const fetchData = await fetch(SummaryApi.allUser.url,{
  //     //     method : SummaryApi.allUser.method,
  //     //     credentials : 'include'
  //     // })

  //     const dataResponse = await fetchData.json()

  //     if(dataResponse.success){
  //         setusers(dataResponse.data)
  //     }

  //     if(dataResponse.error){
  //         toast.error(dataResponse.message)
  //     }

  // }

  // useEffect(()=>{
  //     fetchusers()
  // },[])

  return (
    <>
      <div className="all-adminorders">
        <div className="adminproduct-head">
          <span className="adminproduct-head-left">
            <h2>All Customers</h2>
          </span>
          <span className="adminproduct-head-right">
           
          </span>
        </div>
        <div className="adminproduct-body">
          <div className="adminproduct-search">
            <form action="#">
              <i className="fa fa-search"></i>
              <input
                type="text"
                placeholder="Search vendors (by name or ID)..."
              />
            </form>
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
                  </th>
                  <th scope="col" colspan="2">
                    Name
                  </th>
                  <th scope="col">Location</th>
                  <th scope="col">Orders</th>
                  <th scope="col">Spent</th>
                  <th scope="col">Actions</th>
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
                    <td className="product-price" data-title="product-price">
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
                      <h4 className="text-brand"> Total: ${getTotalCost()} </h4>
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
      </div>
    </>
  );
};
{
  /* <table className=''>
            <thead>
                <tr className=''>
                    <th>Sr.</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Created Date</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody className=''> */
}
{
  /* {
                    allUser.map((el,index) => {
                        return(
                            <tr>
                                <td>{index+1}</td>
                                <td>{el?.name}</td>
                                <td>{el?.email}</td>
                                <td>{el?.role}</td>
                                <td>{moment(el?.createdAt).format('LL')}</td>
                                <td>
                                    <button className='bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white' 
                                    onClick={()=>{
                                        setUpdateUserDetails(el)
                                        setOpenUpdateRole(true)

                                    }}
                                    >
                                        <MdModeEdit/>
                                    </button>
                                </td>
                            </tr>
                        )
                    })
                } */
}
{
  /* </tbody>
        </table> */
}

{
  /* {
            openUpdateRole && (
                <ChangeUserRole 
                    onClose={()=>setOpenUpdateRole(false)} 
                    name={updateUserDetails.name}
                    email={updateUserDetails.email}
                    role={updateUserDetails.role}
                    userId={updateUserDetails._id}
                    callFunc={fetchusers}
                />
            )      
        } */
}

export default AllCustomers;
