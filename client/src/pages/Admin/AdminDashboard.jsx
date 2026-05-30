import React, { useState, useEffect } from 'react';
import { useNavigate, Link} from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import { useToast } from '../../context/ToastContext';
import './AdminDashboard.css';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('inventory'); // 'inventory' or 'add'
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [products, setProducts] = useState([]);
  const [loadingInventory, setLoadingInventory] = useState(false);
  const [sideImages, setSideImages] = useState([]);
  const [orders, setOrders] = useState([]);
  const [mainFile, setMainFile] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null); 

    const [formData, setFormData] = useState({
    name: '',
    slug: '',
    price: '',
    originalPrice: '',
    color: '',
    category: 'modern',
    description: '',
    sizes: 'FR 34, FR 36, FR 38', // We'll split this by comma later
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const fetchOrders = async () => {
    // We fetch the orders AND the items inside them in one go!
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (*)
      `)
      .order('created_at', { ascending: false });

    if (!error) setOrders(data);
  };

  useEffect(() => {
    const fetchInventory = async () => {
        setLoadingInventory(true);
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .order('created_at', { ascending: false });
        if (error) {
            console.error('Error fetching products:', error);
        } else {
            setProducts(data);
        } 
        setLoadingInventory(false);
    };

    if (activeTab === 'inventory') {
        fetchInventory();
    }
  }, [activeTab]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const toggleHeroStatus = async (e, productId, currentStatus) => {
    e.stopPropagation(); // Stops the card from clicking through to the Product Detail page

    // Instantly update the UI so it feels lightning fast (Optimistic UI)
    const newStatus = !currentStatus;
    setProducts(products.map(p => p.id === productId ? { ...p, is_hero: newStatus } : p));

    // Update the database securely in the background
    const { error } = await supabase
      .from('products')
      .update({ is_hero: newStatus })
      .eq('id', productId);

    if (error) {
      console.error("Error updating Hero status:", error);
      alert("Failed to update status. Please try again.");
      // If it fails, refresh the inventory to show the true database state
      const { data } = await supabase.from('products').select('*').order('created_at', { ascending: false });
      setProducts(data);
    }
  };

  // ─────────────────────────────────────────────
  // DELETE PRODUCT ENGINE
  // ─────────────────────────────────────────────
  const handleDelete = async (e, productId) => {
    e.stopPropagation(); // Stops the card from clicking through
    
    // Safety check!
    const isConfirmed = window.confirm("Are you sure you want to permanently delete this piece from the vault?");
    if (!isConfirmed) return;

    // Delete from Supabase
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', productId);

    if (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product.");
    } else {
      // Instantly remove it from your screen without reloading
      setProducts(products.filter(p => p.id !== productId));
    }
  };

  // ─────────────────────────────────────────────
  // EDIT PRODUCT ENGINE
  // ─────────────────────────────────────────────
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    
    // Update Supabase
    const { error } = await supabase
      .from('products')
      .update({
        name: editingProduct.name,
        price: editingProduct.price,
        category: editingProduct.category,
        description: editingProduct.description,
      })
      .eq('id', editingProduct.id);

    if (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product.");
    } else {
      // Instantly update the UI
      setProducts(products.map(p => p.id === editingProduct.id ? editingProduct : p));
      setEditingProduct(null); // Close the modal
      alert("Product updated successfully!");
    }
  };

  // Handle Form Inputs
  const handleGalleryChange = (e) => {
    const files = Array.from(e.target.files);
  if (files.length < 3 || files.length > 5) {
    alert("Please upload between 3 and 5 side images for the gallery.");
    return;
  }
  setSideImages(files);
};

// THE UPLOAD ENGINE: Upgraded for Multi-Image
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('Accessing vault...');

    try {
      if (!mainFile) throw new Error('You must select a main image.');
      if (sideImages.length < 3) throw new Error('Please select at least 3 gallery images.');

      // --- UPLOAD MAIN IMAGE ---
      const mainExt = mainFile.name.split('.').pop();
      const mainName = `main-${Date.now()}.${mainExt}`;
      const { error: mainError } = await supabase.storage
        .from('divine-assets')
        .upload(mainName, mainFile);
      if (mainError) throw mainError;

      const { data: { publicUrl: mainUrl } } = await supabase.storage
        .from('divine-assets')
        .getPublicUrl(mainName);

      // - UPLOAD GALLERY IMAGES -
      setMessage('Uploading gallery pieces (this may take a moment)...');
      const galleryUrls = [];

      for (const file of sideImages) {
        const ext = file.name.split('.').pop();
        const name = `gallery/${Date.now()}-${Math.random().toString(36).substring(7)}.${ext}`;
        
        const { error: gError } = await supabase.storage
          .from('divine-assets')
          .upload(name, file);
        
        if (gError) throw gError;

        const { data: { publicUrl: gUrl } } = supabase.storage
          .from('divine-assets')
          .getPublicUrl(name);
        
        galleryUrls.push(gUrl);
      }

      // --- C. SAVE TO DATABASE ---
      setMessage('Cataloging product in database...');
      const { error: dbError } = await supabase
        .from('products')
        .insert([
          {
            name: formData.name,
            slug: formData.slug.toLowerCase().replace(/\s+/g, '-'),
            price: parseFloat(formData.price),
            original_price: formData.originalPrice ? parseFloat(formData.originalPrice) : null,
            color: formData.color,
            category: formData.category,
            description: formData.description,
            sizes: formData.sizes.split(',').map(s => s.trim()),
            main_image: mainUrl,
            gallery_images: galleryUrls, // <--- The new column we added!
            is_published: true
          }
        ]);

      if (dbError) throw dbError;

      setMessage('Product successfully published to showroom!');
      
      // Reset
      setTimeout(() => {
        setMessage('');
        setActiveTab('inventory'); // Take them back to inventory to see it
      }, 2000);

    } catch (error) {
      console.error(error);
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-brand"><span>ADMIN</span></div>
        <nav className="admin-nav">
          <button className={activeTab === 'inventory' ? 'active' : ''} onClick={() => setActiveTab('inventory')}>Inventory</button>
          <button className={activeTab === 'add' ? 'active' : ''} onClick={() => setActiveTab('add')}>Add Product</button>
          <button className={activeTab === 'orders' ? 'active' : ''} onClick={() => setActiveTab('orders')}>
          Orders ({orders.length})
          </button>
        </nav>
        <button className="admin-logout" onClick={handleLogout}>LOGOUT</button>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <h1>{activeTab === 'add' ? 'Create New Product' : 'Inventory Management'}</h1>
        </header>

        <div className="admin-content">
          {activeTab === 'add' && (
            <form className="admin-upload-form" onSubmit={handleSubmit}>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Product Name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>URL Slug</label>
                  <input type="text" name="slug" value={formData.slug} onChange={handleChange} required />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Price (₹)</label>
                  <input type="number" name="price" value={formData.price} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>Original Price (Optional)</label>
                  <input type="number" name="originalPrice" value={formData.originalPrice} onChange={handleChange} />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Category</label>
                  <select name="category" value={formData.category} onChange={handleChange}>
                    <option value="modern">Modern Silhouette</option>
                    <option value="bridal">Bridal Collection</option>
                    <option value="traditional">Traditional Elegance</option>
                    <option value="avant-garde">Avant-Garde</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Color</label>
                  <input type="text" name="color" value={formData.color} onChange={handleChange} required />
                </div>
              </div>

              <div className="form-group">
                <label>Sizes (Comma separated)</label>
                <input type="text" name="sizes" value={formData.sizes} onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label>Editorial Description</label>
                <textarea name="description" value={formData.description} onChange={handleChange} rows="4" required />
              </div>

              {/* UPDATED FILE INPUTS */}
              <div className="form-row">
                <div className="form-group file-upload">
                  <label>Main Image (Portrait)</label>
                  <input type="file" accept="image/*" onChange={(e) => setMainFile(e.target.files[0])} required />
                </div>
                <div className="form-group file-upload">
                  <label>Gallery (Select 3-5 images)</label>
                  <input 
                    type="file" 
                    accept="image/*" 
                    multiple 
                    onChange={(e) => setSideImages(Array.from(e.target.files))} 
                    required 
                  />
                  <small style={{color: '#666', fontSize: '0.7rem'}}>Selected: {sideImages.length} files</small>
                </div>
              </div>

              {message && <div className={`admin-status ${message.includes('Error') ? 'error' : 'success'}`}>{message}</div>}

              <button type="submit" className="admin-submit-btn" disabled={loading}>
                {loading ? 'PUBLISHING...' : 'PUBLISH PRODUCT'}
              </button>
            </form>
          )}

          {activeTab === 'inventory' && (
            <div className="admin-inventory-section">
              {loadingInventory ? (
                <div className="admin-status">Loading vault...</div>
              ) : products.length === 0 ? (
                <div className="admin-placeholder">
                  <p>Your vault is empty. Click "+ Add Product" to begin.</p>
                </div>
              ) : (
                <div className="admin-inventory-grid">
                  {products.map((product) => (
                   <div 
                      key={product.id} 
                      className="admin-product-card"
                      onClick={() => navigate(`/products/${product.slug}`)}
                    >
                      <div className="admin-card-image">
                        <img src={product.main_image} alt={product.name} />
                        <span className={`admin-badge category-${product.category}`}>
                          {product.category}
                        </span>
                      </div>
                      <div className="admin-card-details">
                        <h4>{product.name}</h4>
                        <p className="admin-card-price">₹{product.price.toLocaleString()}</p>
                        <p className="admin-card-brand">{product.brand}</p>
                        <div className="admin-card-actions">
                          <button 
                            className={`hero-toggle-btn ${product.is_hero ? 'active' : ''}`}
                            onClick={(e) => toggleHeroStatus(e, product.id, product.is_hero)}
                          >
                            {product.is_hero ? '★ FEATURED ' : '☆ FEATURE'}
                          </button>

                          <div className="admin-modify-actions">
                            <button 
                              className="admin-edit-btn"
                              onClick={(e) => {
                                e.stopPropagation();
                                setEditingProduct(product); // Opens the modal with this product's data
                              }}
                            >
                              EDIT
                            </button>
                            <button 
                              className="admin-delete-btn"
                              onClick={(e) => handleDelete(e, product.id)}
                            >
                              DELETE
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        {activeTab === 'orders' && (
            <div className="admin-orders-section">
              <h2>Recent Orders</h2>
              <div className="orders-list">
                {orders.map(order => (
                  <div key={order.id} style={{ border: '1px solid #ddd', padding: '20px', marginBottom: '20px', background: '#fff' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', paddingBottom: '10px', marginBottom: '15px' }}>
                      <strong>Order #{order.id.split('-')[0].toUpperCase()}</strong>
                      <span style={{ color: '#00a000' }}>{order.payment_status}</span>
                    </div>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                      <div>
                        <p><strong>Customer:</strong> {order.customer_name}</p>
                        <p><strong>Phone:</strong> {order.customer_phone}</p>
                        <p><strong>Address:</strong> {order.shipping_address}</p>
                        <p><strong>Total:</strong> ₹{order.total_amount.toLocaleString()}</p>
                      </div>
                      
                      <div style={{ background: '#f9f9f9', padding: '15px' }}>
                        <strong>Items Purchased:</strong>
                        {order.order_items.map(item => (
                          <p key={item.id} style={{ margin: '5px 0', fontSize: '0.9rem' }}>
                            {item.quantity}x {item.product_name} (Size: {item.size})
                          </p>
                        ))}
                      </div>
                    </div>
                    
                    <button style={{ marginTop: '15px', padding: '8px 16px', background: '#1a1a1a', color: '#fff', border: 'none' }}>
                      Mark as Shipped
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}


        </div>
      </main>
      {/* ─────────────────────────────────────────────
          EDIT PRODUCT MODAL
      ───────────────────────────────────────────── */}
      {editingProduct && (
        <div className="admin-modal-overlay" onClick={() => setEditingProduct(null)}>
          <div className="admin-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h2>Edit Product</h2>
              <button className="admin-modal-close" onClick={() => setEditingProduct(null)}>&times;</button>
            </div>
            
            <form onSubmit={handleEditSubmit} className="admin-edit-form">
              <label>Product Name</label>
              <input 
                type="text" 
                value={editingProduct.name} 
                onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})}
                required 
              />

              <label>Price (₹)</label>
              <input 
                type="number" 
                value={editingProduct.price} 
                onChange={(e) => setEditingProduct({...editingProduct, price: parseFloat(e.target.value)})}
                required 
              />

              <label>Category</label>
              <select 
                value={editingProduct.category} 
                onChange={(e) => setEditingProduct({...editingProduct, category: e.target.value})}
              >
                <option value="modern">Modern Silhouette</option>
                <option value="bridal">Bridal Collection</option>
                <option value="traditional">Traditional Elegance</option>
                <option value="avant-garde">Avant-Garde</option>
              </select>

              <label>Description</label>
              <textarea 
                value={editingProduct.description} 
                onChange={(e) => setEditingProduct({...editingProduct, description: e.target.value})}
                rows="4"
              />

              <div className="admin-modal-footer">
                <button type="button" className="btn-cancel" onClick={() => setEditingProduct(null)}>Cancel</button>
                <button type="submit" className="btn-save">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}