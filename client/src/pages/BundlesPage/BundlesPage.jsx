import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { useToast } from '../../context/ToastContext';  
import { useNavigate, Link } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import { supabase } from '../../supabaseClient';
import './BundlesPage.css';

export default function BundlesPage() {
  const navigate = useNavigate();
  const { cart, removeFromCart } = useStore();
  const { showToast } = useToast();
  
  // Checkout States
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Shipping Form States
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: '',
    postalCode: ''
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
  // This loads the Razorpay checkout window securely

        const loadRazorpayScript = () => {
            return new Promise((resolve) => {
                const script = document.createElement("script");
                script.src = "https://checkout.razorpay.com/v1/checkout.js";
                script.onload = () => resolve(true);
                script.onerror = () => resolve(false);
                document.body.appendChild(script);
            });
        };

  // --- THE PAYMENT & ORDER CREATION ENGINE ---

  // --- THE REAL RAZORPAY PAYMENT ENGINE ---
  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);

    // 1. Load Razorpay
    const res = await loadRazorpayScript();
    if (!res) {
      alert("Payment system failed to load. Please check your internet connection.");
      setLoading(false);
      return;
    }

    // 2. Configure the Payment Window
    const options = {
      key: "rzp_test_YOUR_KEY_HERE", // 🔥 Replace with your Razorpay Test Key ID 🔥
      amount: cartTotal * 100, // Razorpay calculates in Paise (Multiply by 100)
      currency: "INR",
      name: "Opihage Vault",
      description: "Luxury Fashion Transaction",
      theme: {
        color: "#1a1a1a", // Matches your sleek dark branding
      },
      prefill: {
        name: formData.fullName,
        contact: formData.phone,
      },
      // 3. THIS RUNS ONLY IF THE CUSTOMER SUCCESSFULLY PAYS
      handler: async function (response) {
        // Grab the Razorpay transaction ID to keep for your records
        const paymentId = response.razorpay_payment_id;

        // 4. NOW WE SAVE TO SUPABASE (Because we have their money!)
        const fullAddress = `${formData.address}, ${formData.city}, ${formData.postalCode}`;

        const { data: orderData, error: orderError } = await supabase
          .from('orders')
          .insert([{
            customer_name: formData.fullName,
            customer_phone: formData.phone,
            shipping_address: fullAddress,
            total_amount: cartTotal,
            payment_status: `Paid (ID: ${paymentId})`, // Saves the exact bank receipt ID!
          }])
          .select()
          .single();

        if (!orderError) {
          const orderItems = cart.map(item => ({
            order_id: orderData.id,
            product_id: item.id,
            product_name: item.name,
            size: item.size,
            quantity: item.quantity,
            price: item.price
          }));

          await supabase.from('order_items').insert(orderItems);
          sessionStorage.removeItem('opihage_cart');
          confetti({
            particleCount: 150,
            spread: 80,
            origin: { y: 0.6 },
            colors: ['#e5d0b3', '#1a1a1a', '#ffffff'] 
          });
          showToast(`Payment Successful! Receipt ID: ${paymentId}`);
          setTimeout(() => {            
            window.location.href = '/'; 
          }, 3500);
        }
      },
    };

    // Open the Razorpay Window!
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
    setLoading(false);
  };

  return (
    <div className="bundles-page-wrapper">
      <header className="bundles-header">
        <h1 className="bundles-title">{isCheckingOut ? 'Secure Checkout' : 'Your Bundles'}</h1>
        {!isCheckingOut && <p className="bundles-subtitle">{cart.length} {cart.length === 1 ? 'Item' : 'Items'} in your cart</p>}
      </header>

      {cart.length === 0 ? (
        <div className="bundles-empty">
          <h2>Your bundle is currently empty.</h2>
          <button onClick={() => navigate('/')} className="btn-return">CONTINUE SHOPPING</button>
        </div>
      ) : (
        <div className="bundles-content">
          
          {/* LEFT SIDE: DYNAMIC (Either Cart Items OR Shipping Form) */}
          <div className="bundles-left-col">
            {!isCheckingOut ? (
              // CART VIEW
              <div className="bundles-items">
                {cart.map((item, index) => (
                  <div key={`${item.id}-${item.size}-${index}`} className="bundle-item-card">
                    <Link to={`/products/${item.slug}`}><img src={item.main_image} alt={item.name} className="bundle-item-img" /></Link>
                    <div className="bundle-item-details">
                      <h3 className="bundle-item-name">{item.name}</h3>
                      <p className="bundle-item-size">Size: {item.size}</p>
                      <p className="bundle-item-qty">Qty: {item.quantity}</p>
                      <button className="bundle-item-remove" onClick={() => removeFromCart(item.id, item.size)}>Remove</button>
                    </div>
                    <div className="bundle-item-price">₹{(item.price * item.quantity).toLocaleString()}</div>
                  </div>
                ))}
              </div>
            ) : (
              // SHIPPING FORM VIEW
              <form className="checkout-form" onSubmit={handlePayment}>
                <h3 className="form-section-title">Shipping Information</h3>
                <input type="text" placeholder="Full Name" required className="checkout-input" value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} />
                <input type="tel" placeholder="Mobile Number" required className="checkout-input" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                <input type="text" placeholder="Street Address" required className="checkout-input" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} />
                <div className="checkout-row">
                  <input type="text" placeholder="City" required className="checkout-input" value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} />
                  <input type="text" placeholder="Postal Code" required className="checkout-input" value={formData.postalCode} onChange={e => setFormData({...formData, postalCode: e.target.value})} />
                </div>
                
                <h3 className="form-section-title" style={{marginTop: '40px'}}>Payment</h3>
                <div className="mock-payment-box">
                  <p>🔒 256-bit Secure Encrypted Checkout</p>
                  <span style={{fontSize: '0.8rem', color: '#666'}}>Payment gateways (Razorpay/Stripe) will securely mount here.</span>
                </div>

                <button type="submit" className="btn-pay-now" disabled={loading}>
                  {loading ? 'PROCESSING...' : `PAY ₹${cartTotal.toLocaleString()}`}
                </button>
                <button type="button" className="btn-back-cart" onClick={() => setIsCheckingOut(false)}>
                  &larr; Return to Cart
                </button>
              </form>
            )}
          </div>

          {/* RIGHT SIDE: ORDER SUMMARY (Always Visible) */}
          <div className="bundles-summary">
            <h3 className="summary-title">Order Summary</h3>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{cartTotal.toLocaleString()}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>Complimentary</span>
            </div>
            <div className="summary-divider"></div>
            <div className="summary-row total">
              <span>Total</span>
              <span>₹{cartTotal.toLocaleString()}</span>
            </div>
            
            {!isCheckingOut && (
              <button className="btn-checkout" onClick={() => setIsCheckingOut(true)}>
                PROCEED TO SECURE CHECKOUT
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}