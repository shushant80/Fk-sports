Fk sports module

using react with redux and supabase(alternative server)

1️⃣ User Order History Page 📜
2️⃣ Authentication (Login & Signup) with Supabase 🔐
3️⃣ Improved Cart Functionality 🛒
4️⃣ Shipping & Order Tracking 🚚
5️⃣ Email Order Confirmation 📧
6️⃣ Wishlist Feature ❤️
7️⃣ Review & Rating System ⭐
8️⃣ Apply Discounts & Coupons 🎟️
9️⃣ Admin Dashboard (Manage Products & Orders) ⚙️

🌍 Pages & Features
1️⃣ Home.jsx
✅ Displays products with a search bar and categories.

2️⃣ ProductDetail.jsx
✅ Shows product details, images, price, and an "Add to Cart" button.

3️⃣ Cart.jsx
✅ Lists cart items, allows quantity updates, and a "Proceed to Checkout" button.

4️⃣ Checkout.jsx
✅ Requires login before checkout.
✅ Displays saved addresses or allows adding a new one.
✅ Payment options: COD / Card (OTP verification pending).

5️⃣ OrderSummary.jsx
✅ Displays order details, estimated delivery, and confirmation.
✅ Saves the order in Supabase (fixed previous issues).

6️⃣ Profile.jsx
✅ Shows order history, saved addresses, and account settings.
✅ Fetches orders from Supabase (now working fine).

7️⃣ Login.jsx & Signup.jsx
✅ Auth via Supabase (Session handling fixed).
✅ Redirects back to the last page after login.

🛠️ Components
Header.jsx
✅ Navigation bar with links to Home, Profile, Cart, and Logout.

Footer.jsx
✅ Basic footer with links (Contact Us, Terms, etc.).

ProductCard.jsx
✅ Used in Home & ProductDetail for consistent product display.

CartItem.jsx
✅ Used inside the Cart page to show individual items.

OrderCard.jsx
✅ Used inside Profile to show past orders with delivery status.

AddressForm.jsx
✅ Used inside Checkout for adding new addresses.

🔧 Improvements & Next Steps
✅ Optimize DB Schema: Remove order_id (use id as primary key).
✅ Fix OTP-based Payments: Implement a mock OTP verification flow.
✅ Enhance UI/UX: Use Tailwind or Material-UI for better styling.
✅ Add Loading States: Show a spinner while fetching orders.
✅ Profile Page Enhancements: Allow editing user info & addresses.

#payment options:credit card, paypal, klarna flexibe payments 

Fk-sports/
├── public/
│   ├── index.html
│   └── Assets/
│       └── for-web1.png
├── src/
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   ├── index.css
│   ├── App.test.js
│   ├── setupTest.js
│   ├── reportWebVitals.js
│   ├── App/
│   │   └── store.js
│   │   └── dataSlice.js
│   ├── Config/
│   │   └── AuthContext.js
│   │   └── authService.js
│   │   └── cartService.js
│   │   └── supabase.js
│   │   └── supabaseClient.js
│   ├── Components/
│   │   ├── Header/
│   │   │   ├── Navbar.jsx
│   │   │   └── Navbar.css
│   │   ├── Footer/
│   │   │   ├── Footer.jsx
│   │   │   └── Footer.css
│   │   ├── About/
│   │   │   ├── AboutPage.jsx
│   │   │   └── AboutPage.css
│   │   ├── Home/
│   │   │   ├── Footer.jsx
│   │   │   └── Footer.css
│   │   ├── Home
│   │   │   ├── Banner/
│   │   │   ├─── Banner.css
│   │   │   └─── Banner.jsx
│   │   │   ├── Collection/
│   │   │   ├─── CollectionBox.css
│   │   │   └─── CollectionBox.jsx
│   │   │   ├── Deal/
│   │   │   ├─── DealTimmer.css
│   │   │   └─── DealTimmer.jsx
│   │   │   ├── Hero/
│   │   │   ├─── HeroSection.css
│   │   │   └─── HeroSection.jsx
│   │   │   ├── Instagram/
│   │   │   ├─── Instagram.css
│   │   │   └─── Instagram.jsx
│   │   │   ├── Limited/
│   │   │   ├─── LimitedEdition.css
│   │   │   └─── LimitedEdition.jsx
│   │   │   ├── Services/
│   │   │   ├─── Services.css
│   │   │   └─── Services.jsx
│   │   │   ├── Trendy/
│   │   │   ├─── Trendy.css
│   │   │   └─── Trendy.jsx
│   │   ├── Model/
│   │   │   ├── Model.jsx
│   │   ├── Authentication/
│   │   │   ├── LoginSign/
│   │   │   ├─── LoginSignUp.css
│   │   │   └─── LoginSignUp.jsx
│   │   │   ├── Reset/
│   │   │   ├─── ResetPass.css
│   │   │   └─── ResetPass.jsx
│   │   ├── Contact/
│   │   │   ├── ContactPage.css
│   │   │   └── ContactPage.jsx
│   │   ├── Product/
│   │   │   ├── ContactPage.css
│   │   │   └── ContactPage.jsx

│   │   ├── Error/
│   │   │   ├── Error.jsx
│   │   │   └── Error.css
│   │   ├── Filter/
│   │   ├── ScrollButton/
│   │   │   ├── ScrollToTop.jsx
│   │   │   └── ScrollToTop.css
│   │   ├── PopupBanner/
│   │   │   ├── Popup.jsx
│   │   │   └── Popup.css
│   │   ├── Shop/
│   │   │   ├── ShopDetails/
│   │   │   │   ├── ShopDetails.jsx
│   │   │   │   └── ShopDetails.css
│   │   │   ├── Filters/
│   │   │   │   ├── Filter.jsx
│   │   │   │   └── Filter.css
│   │   ├── ShoppingCart/
│   │   │   ├── ShoppingCart.jsx
│   │   │   └── ShoppingCart.css
│   │   ├── Authentication/
│   │   │   ├── Reset/
│   │   │   │   ├── ResetPass.jsx
│   │   │   │   └── ResetPass.css
│   │   ├── Blog/
│   │   │   ├── BlogDetails/
│   │   │   │   ├── BlogDetails.jsx
│   │   │   │   └── BlogDetails.css
│   │   ├── PrivateRoute.jsx
│   ├── Pages/
│   │   ├── About.jsx
│   │   ├── Authentication.jsx
│   │   ├── AuthPage.jsx
│   │   ├── AuthPage.css
│   │   ├── Blog.jsx
│   │   ├── Checkout.css
│   │   ├── Checkout.jsx
│   │   ├── Contact.jsx
│   │   ├── EditProfile.css
│   │   └── EditProfile.jsx
│   │   ├── Home.jsx
│   │   ├── Login.css
│   │   ├── Login.jsx
│   │   ├── NotFound.jsx
│   │   ├── OrderHistory.css
│   │   ├── OrderHistory.jsx
│   │   ├── OrderSuccess.css
│   │   ├── OrderSuccess.jsx
│   │   ├── OrderSummary.css
│   │   └── OrderSummary.jsx
│   │   └── OtpVerification.jsx
│   │   ├── Payment.css
│   │   ├── Payment.jsx
│   │   ├── ProductDetails.jsx
│   │   ├── Shop.jsx
│   │   ├── Signup.css
│   │   ├── SingleProduct.jsx
│   │   ├── SingleProduct.css
│   │   ├── TermsConditions.jsx
│   │   ├── UserProfile.css
│   │   └── UserProfile.jsx
│   ├── Utils/
│   │   └── session.js
│   ├── Features/
│   │   ├── Cart/
│   │   │   └── cartSlice.js
│   │   └── Wishlist/
│   │       └── wishListSlice.js
│   │   └── Product/
│   │       └── ProductSlice.js
│   │   └── ShopData/
│   │       └── ShopSlice.js
│   ├── Data/
│   │   └── StoreData.js
│   │   └── BlogeData.js
└── package.json


Steps to Force Login Before Checkout
When a user clicks "Buy Now," check if they are logged in.
If not logged in, redirect them to the login/signup page (/auth).
After login, redirect them back to the checkout page. 

CheckoutPage.jsx
PaymentPage.jsx
OrderSuccessPage.jsx

Checkout Page
Payment Page
Order Summary Page

currently working

shoppingcart.jsx
cartslice.js
session.js
authpage.js
supabaseclient.js
cartservice.js
shop.jsx
(on the module of updating cart products on user server and profile). done

#next module 

Implement the Supabase API functions in cartService.js:
addToSupabaseCart(userId, productId, quantity)
removeFromSupabaseCart(userId, productId)
updateSupabaseCart(userId, productId, quantity)
syncCartWithSupabase(userId, mergedCart)

currently working search products from search bar in home section


