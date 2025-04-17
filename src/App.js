import React, { useState,useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, Navigate } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/dashboard" element={<BrandManagement />} />
          <Route path="/dashboard/brand-management" element={<BrandManagement />} />
        <Route path="/dashboard/product-management" element={<ProductManagement />} />
        <Route path="/dashboard/menu-management" element={<MenuManagement />} />
      
        <Route path="/dashboard/inventory-management" element={<InventoryManagement />} />
      </Routes>
    </Router>
  );
}

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin') {
      navigate('/dashboard/brand-management');
    } else {
      setError('Invalid credentials, please try again');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <p className="slogan">WELCOME</p>
        <form className="login-form" onSubmit={handleLogin}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit" className="login-btn">Login</button>
        </form>
      </div>
    </div>
  );
}

function Dashboard() {
  
  return (
    <div className="dashboard-container">
      {/* <h1>Dashboard</h1> */}
      <SideDrawer />
      <div className="content">
        <h2>Welcome to your Dashboard</h2>
      
      </div>
    </div>
  );
}


function SideDrawer() {
    const navigate = useNavigate();
    const handleLogout = () => {
   navigate('/'); 
  };
  return (
    <div className="side-drawer">
      <ul>
      <div style={{marginBottom:15}}></div>
      <div style={{marginBottom:20,fontSize:30,fontWeight:'bold'}}>FEATURES</div>
       <div style={{marginBottom:40}}></div>
      
      
        <li><Link to="/dashboard/brand-management" style={{fontSize:30}}>Bookings</Link></li>
        
      <div style={{marginBottom:20}}></div>
        <li><Link to="/dashboard/product-management"  style={{fontSize:30}}>Registered Users</Link></li>
        
      <div style={{marginBottom:20}}></div>
          <li><Link to="/dashboard/menu-management"  style={{fontSize:30}}>Menu</Link></li>
       
      <div style={{marginBottom:20}}></div>
          <li><Link to="/dashboard/inventory-management"  style={{fontSize:30}}>Inventory</Link></li>
         
      <div style={{marginBottom:20}}></div>
           <li><button onClick={handleLogout} style={{
      width: '100%', // Make sure to wrap the value in quotes
      padding: '12px',
      backgroundColor: '#fff', // Use camelCase for CSS properties
      color: 'black',
      border: 'none',
      borderRadius: '5px',
      fontSize: '16px',
      cursor: 'pointer',
    }}>Logout</button></li>
        
         </ul>
    </div>
  );
}

function BrandManagement() {
  const [bookings, setBookings] = useState([]);

  // Fetch booking data from the new API
  useEffect(() => {
    fetch("http://localhost:8093/getAllBook")
      .then((response) => response.json())
      .then((data) => setBookings(data.products)) // Assuming the data is under "products"
      .catch((error) => console.error("Error fetching bookings:", error));
  }, []);

  // Inline CSS styles
  const styles = {
    dashboardContainer: {
      display: 'flex',
      height: '100vh',
    },
    content: {
      flexGrow: 1,
      padding: '20px',
      backgroundColor: '#f8f9fa',
    },
    header: {
      fontSize: '2rem',
      color: '#333',
      marginBottom: '20px',
    },
    bookingList: {
      display: 'flex',
      flexDirection: 'column',  // Vertical layout for booking list
      gap: '20px',
      justifyContent: 'flex-start',
    },
    bookingCard: {
      display: 'flex',
      alignItems: 'center', // Aligns the image and text horizontally
      justifyContent: 'space-between', // Adds space between elements inside the card
      backgroundColor: 'white',
      border: '1px solid #ddd',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      padding: '10px 20px',
      width: '100%',
      transition: 'transform 0.3s ease',
    },
    bookingImage: {
      width: '50px',
      height: '50px',
      objectFit: 'contain',
      marginRight: '15px',
    },
    bookingDetails: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      gap: '5px', // Adds a small gap between booking details
    },
    bookingName: {
      fontSize: '1.1rem',
      color: '#333',
      marginBottom: '5px',
      fontWeight: 'bold',
    },
    bookingPrice: {
      fontSize: '1rem',
      color: '#e74c3c',
      fontWeight: 'bold',
    },
    bookingPaymentMethod: {
      fontSize: '0.9rem',
      color: '#555',
    },
    bookingStatus: {
      fontSize: '0.9rem',
      color: '#777',
      fontStyle: 'italic',
    },
    bookingCreatedAt: {
      fontSize: '0.9rem',
      color: '#777',
      fontStyle: 'italic',
    },
    bookingUpdatedAt: {
      fontSize: '0.9rem',
      color: '#777',
      fontStyle: 'italic',
    },
  };

  return (
    <div style={styles.dashboardContainer}>
      <SideDrawer />
      <div style={styles.content}>
        <h2 style={styles.header}>Booking Details</h2>
        <div style={styles.bookingList}>
          {bookings.map((booking) => (
            <div key={booking._id} style={styles.bookingCard}>
              <img
                src={booking.items[0].image} // Assuming the first item is always the one to display
                alt={booking.items[0].name}
                style={styles.bookingImage}
              />
              <div style={styles.bookingDetails}>
               
                <h3 style={styles.bookingName}>{booking.items[0].name}</h3>

                <p style={styles.bookingPrice}>${booking.items[0].price}</p>
               <p style={styles.bookingPaymentMethod}>Customer: {booking.email}</p>

                <p style={styles.bookingPaymentMethod}>Payment: {booking.paymentMethod}</p>
                <p style={styles.bookingStatus}>Status: {booking.status}</p>
                <p style={styles.bookingCreatedAt}>Created At: {new Date(booking.createdAt).toLocaleString()}</p>
                <p style={styles.bookingUpdatedAt}>Updated At: {new Date(booking.updatedAt).toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
function InventoryManagement() {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    product_image: "",
    product_name: "",
    product_price: "",
  });

  // Fetch products from the API
  useEffect(() => {
    fetch("http://localhost:8093/getproducts")
      .then((response) => response.json())
      .then((data) => setProducts(data.products))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  // Handle form input change
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8093/product", {  // <-- Updated API endpoint
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        setProducts([...products, result.product]); // Update the product list
        setShowModal(false); // Close modal after submission
        setFormData({ product_image: "", product_name: "", product_price: "" }); // Reset form
      } else {
        console.error("Failed to add product");
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  // Inline CSS styles
  const styles = {
    dashboardContainer: { display: "flex", height: "100vh" },
    content: { flexGrow: 1, padding: "20px", backgroundColor: "#f8f9fa" },
    headerContainer: { display: "flex", justifyContent: "space-between", alignItems: "center" },
    header: { fontSize: "2rem", color: "#333", marginBottom: "20px" },
    addButton: {
      fontSize: "1.5rem",
      backgroundColor: "#28a745",
      color: "white",
      border: "none",
      padding: "8px 12px",
      borderRadius: "50%",
      cursor: "pointer",
    },
    productList: { display: "flex", flexDirection: "column", gap: "20px" },
    productCard: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: "white",
      border: "1px solid #ddd",
      borderRadius: "8px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      padding: "10px 20px",
      width: "90%",
    },
    productImage: { width: "50px", height: "50px", objectFit: "contain", marginRight: "15px" },
    productDetails: { display: "flex", flexDirection: "column" },
    productName: { fontSize: "1.1rem", color: "#333", fontWeight: "bold" },
    productPrice: { fontSize: "1rem", color: "#e74c3c", fontWeight: "bold" },

    // Modal Styles
    modalOverlay: {
      position: "fixed",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    modalContent: {
      backgroundColor: "white",
      padding: "20px",
      borderRadius: "8px",
      width: "350px",
      display: "flex",
      flexDirection: "column",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    },
    modalTitle: { fontSize: "1.5rem", marginBottom: "10px", textAlign: "center" },
    input: {
      width: "100%",
      padding: "8px",
      marginBottom: "10px",
      border: "1px solid #ccc",
      borderRadius: "5px",
    },
    submitButton: { backgroundColor: "#007bff", color: "white", padding: "10px", border: "none", borderRadius: "5px", cursor: "pointer" },
    closeButton: { marginTop: "10px", backgroundColor: "red", color: "white", padding: "5px", border: "none", borderRadius: "5px", cursor: "pointer" },
  };

  return (
    <div style={styles.dashboardContainer}>
      <SideDrawer />
      <div style={styles.content}>
        {/* Header with + Button */}
        <div style={styles.headerContainer}>
          <h2 style={styles.header}>Inventory</h2>
          <button style={styles.addButton} onClick={() => setShowModal(true)}>+</button>
        </div>

        {/* Product List */}
        <div style={styles.productList}>
          {products.map((product) => (
            <div key={product._id} style={styles.productCard}>
              <img src={product.product_image} alt={product.product_name} style={styles.productImage} />
              <h3 style={styles.productName}>{product.product_name}</h3>
              <p style={styles.productPrice}>${product.product_price}</p>
            </div>
          ))}
        </div>

        {/* Modal Form */}
        {showModal && (
          <div style={styles.modalOverlay}>
            <div style={styles.modalContent}>
              <h3 style={styles.modalTitle}>Add Product</h3>
              <form onSubmit={handleSubmit}>
                <input type="text" name="product_image" placeholder="Product Image URL" value={formData.product_image} onChange={handleInputChange} style={styles.input} required />
                <input type="text" name="product_name" placeholder="Product Name" value={formData.product_name} onChange={handleInputChange} style={styles.input} required />
                <input type="number" name="product_price" placeholder="Product Price" value={formData.product_price} onChange={handleInputChange} style={styles.input} required />
                <button type="submit" style={styles.submitButton}>Add Product</button>
                <button type="button" style={styles.closeButton} onClick={() => setShowModal(false)}>Close</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
// function InventoryManagement() {
//   const [products, setProducts] = useState([]);

//   // Fetch products from the API
//   useEffect(() => {
//     fetch("http://localhost:8093/getproducts")
//       .then((response) => response.json())
//       .then((data) => setProducts(data.products))
//       .catch((error) => console.error("Error fetching products:", error));
//   }, []);

//   // Inline CSS styles
//   const styles = {
//     dashboardContainer: {
//       display: 'flex',
//       height: '100vh',
//     },
//     content: {
//       flexGrow: 1,
//       padding: '20px',
//       backgroundColor: '#f8f9fa',
//     },
//     header: {
//       fontSize: '2rem',
//       color: '#333',
//       marginBottom: '20px',
//     },
//     productList: {
//       display: 'flex',
//       flexDirection: 'column',  // Vertical layout for product list
//       gap: '20px',
//       justifyContent: 'flex-start',
//     },
//     productCard: {
//       display: 'flex',
//       alignItems: 'center', // Aligns the image and text horizontally
//     justifyContent: 'space-between', // Adds space between elements inside the card
//      backgroundColor: 'white',
//       border: '1px solid #ddd',
//       borderRadius: '8px',
//       boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
//       padding: '10px 20px',
//       width: '90%',
//       transition: 'transform 0.3s ease',
      
//     },
//     productImage: {
//       width: '50px', // Smaller image size for vertical list
//       height: '50px',
//       objectFit: 'contain',
//       marginRight: '15px', // Space between image and text
//     },
//     productDetails: {
//       display: 'flex',
//       flexDirection: 'column',
//     },
//     productName: {
//       fontSize: '1.1rem',
//       color: '#333',
//       marginBottom: '5px',
//       fontWeight: 'bold',
//     },
//     productPrice: {
//       fontSize: '1rem',
//       color: '#e74c3c',
//       fontWeight: 'bold',
//     },
//   };

//   return (
//     <div style={styles.dashboardContainer}>
//       <SideDrawer />
//       <div style={styles.content}>
//         <h2 style={styles.header}>Inventory</h2>
//         <div style={styles.productList}>
//           {products.map((product) => (
//             <div key={product._id} style={styles.productCard}>
//               <img
//                 src={product.product_image}
//                 alt={product.product_name}
//                 style={styles.productImage}
//               />
//                <h3 style={styles.productName}>{product.product_name}</h3>
             
//                 <p style={styles.productPrice}>${product.product_price}</p>
          
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }




function MenuManagement() {
   const [menuItems, setMenuItems] = useState([]);

  // Fetch menu items from the new API
  useEffect(() => {
    fetch("http://localhost:8093/getmenuItem")
      .then((response) => response.json())
      .then((data) => setMenuItems(data.menuItemm))
      .catch((error) => console.error("Error fetching menu items:", error));
  }, []);

  // Inline CSS styles
  const styles = {
    dashboardContainer: {
      display: 'flex',
      height: '100vh',
    },
    content: {
      flexGrow: 1,
      padding: '20px',
      backgroundColor: '#f8f9fa',
    },
    header: {
      fontSize: '2rem',
      color: '#333',
      marginBottom: '20px',
    },
    menuItemList: {
      display: 'flex',
      flexDirection: 'column',  // Vertical layout for menu items
      gap: '20px',
      justifyContent: 'flex-start',
    },
    menuItemCard: {
      display: 'flex',
      alignItems: 'center', // Aligns the image and text horizontally
      justifyContent: 'space-between', // Adds space between elements inside the card
      backgroundColor: 'white',
      border: '1px solid #ddd',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      padding: '10px 20px',
      width: '100%',
      transition: 'transform 0.3s ease',
    },
    menuItemImage: {
      width: '50px',
      height: '50px',
      objectFit: 'contain',
      marginRight: '15px',
    },
    menuItemDetails: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between', // Adds space between product name and price
      gap: '5px', // Adds a small gap between the product name and price
    },
    menuItemName: {
      fontSize: '1.1rem',
      color: '#333',
      marginBottom: '5px',
      fontWeight: 'bold',
    },
    menuItemPrice: {
      fontSize: '1rem',
      color: '#e74c3c',
      fontWeight: 'bold',
    },
    menuItemCategory: {
      fontSize: '0.9rem',
      color: '#777',
      fontStyle: 'italic',
    },
  };

  return (
    <div style={styles.dashboardContainer}>
      <SideDrawer />
      <div style={styles.content}>
        <h2 style={styles.header}>Menu Items</h2>
        <div style={styles.menuItemList}>
          {menuItems.map((item) => (
            <div key={item._id} style={styles.menuItemCard}>
              <img
                src={item.image}
                alt={item.name}
                style={styles.menuItemImage}
              />
               <h3 style={styles.menuItemName}>{item.name}</h3>
                <p style={styles.menuItemPrice}>${item.price}</p>
                <p style={styles.menuItemCategory}>{item.category}</p>
             
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
function ProductManagement() {
  const [users, setUsers] = useState([]);

  // Fetch user data from the new API
  useEffect(() => {
    fetch("http://localhost:8093/getAllEndUser")  // Updated API URL
      .then((response) => response.json())
      .then((data) => setUsers(data.products))  // Assuming the data is under "products"
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  // Inline CSS styles
  const styles = {
    dashboardContainer: {
      display: 'flex',
      height: '100vh',
    },
    content: {
      flexGrow: 1,
      padding: '20px',
      backgroundColor: '#f8f9fa',
    },
    header: {
      fontSize: '2rem',
      color: '#333',
      marginBottom: '20px',
    },
    userList: {
      display: 'flex',
      flexDirection: 'column',  // Vertical layout for user list
      gap: '20px',
      justifyContent: 'flex-start',
    },
    userCard: {
      display: 'flex',
      alignItems: 'center', // Aligns the image and text horizontally
      justifyContent: 'space-between', // Adds space between elements inside the card
      backgroundColor: 'white',
      border: '1px solid #ddd',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      padding: '10px 20px',
      width: '100%',
      transition: 'transform 0.3s ease',
    },
    userDetails: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      gap: '5px', // Adds a small gap between user details
    },
    userName: {
      fontSize: '1.1rem',
      color: '#333',
      marginBottom: '5px',
      fontWeight: 'bold',
    },
    userEmail: {
      fontSize: '1rem',
      color: '#555',
    },
    userPassword: {
      fontSize: '1rem',
      color: '#555',
    },
    userCreatedAt: {
      fontSize: '0.9rem',
      color: '#777',
      fontStyle: 'italic',
    },
    userUpdatedAt: {
      fontSize: '0.9rem',
      color: '#777',
      fontStyle: 'italic',
    },
  };

  return (
    <div style={styles.dashboardContainer}>
      <SideDrawer />
      <div style={styles.content}>
        <h2 style={styles.header}>User Details</h2>
        <div style={styles.userList}>
          {users.map((user) => (
            <div key={user._id} style={styles.userCard}>
              <div style={styles.userDetails}>
                <h3 style={styles.userName}>{user.username}</h3>
                <p style={styles.userEmail}>Email: {user.email}</p>  {/* Display the email */}
                <p style={styles.userPassword}>Password: {user.password}</p>
                <p style={styles.userCreatedAt}>Created At: {new Date(user.createdAt).toLocaleString()}</p>
                <p style={styles.userUpdatedAt}>Updated At: {new Date(user.updatedAt).toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;

const styles = `
/* Basic reset */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Center the login form */
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f4f4f4;
}

/* Login box styles */
.login-box {
  background-color: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 100%;
  max-width: 400px;
}

/* Logo styling */
.logo {
  width: 150px;
  margin-bottom: 20px;
}

/* Slogan styling */
.slogan {
  font-size: 18px;
  font-weight: 500;
  color: #555;
  margin-bottom: 20px;
}

/* Input group styles */
.input-group {
  margin-bottom: 20px;
  text-align: left;
}

.input-group label {
  font-size: 14px;
  color: #333;
}

.input-group input {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-top: 5px;
}

/* Button styling */
.login-btn {
  width: 100%;
  padding: 12px;
  background-color: #0066cc;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}

.login-btn:hover {
  background-color: #005bb5;
}

/* Dashboard and Side Drawer Styles */
.dashboard-container {
  display: flex;
  height: 100vh;
  background-color: #f4f4f4;
}

.side-drawer {
  width: 200px;
  background-color: #333;
  color: white;
  padding: 20px;
}

.side-drawer ul {
  list-style: none;
  padding: 0;
}

.side-drawer li {
  margin: 10px 0;
}

.side-drawer a {
  color: white;
  text-decoration: none;
  font-size: 18px;
}

.side-drawer a:hover {
  text-decoration: underline;
}

.content {
  flex-grow: 1;
  padding: 20px;
}
`;

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
