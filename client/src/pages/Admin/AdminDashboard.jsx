import React, { useState, useEffect } from 'react';
import { useNavigate, Link} from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import './AdminDashboard.css';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('inventory'); // 'inventory' or 'add'
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [products, setProducts] = useState([]);
  const [loadingInventory, setLoadingInventory] = useState(false);

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

  // Form State
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

  const [mainFile, setMainFile] = useState(null);

  // Handle Logout
  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  // Handle Form Inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // THE UPLOAD ENGINE
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('Uploading image to secure vault...');

    try {
      if (!mainFile) throw new Error('You must select a main image.');

      // 1. Upload the image to Supabase Storage Bucket
      const fileExt = mainFile.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('opihage-assets')
        .upload(fileName, mainFile);

      if (uploadError) throw uploadError;

      // 2. Get the public URL for the image we just uploaded
      const { data: { publicUrl } } = supabase.storage
        .from('opihage-assets')
        .getPublicUrl(fileName);

      setMessage('Image uploaded. Saving to database...');

      // 3. Save the product data + the image URL to the Database
      const { error: dbError } = await supabase
        .from('products')
        .insert([
          {
            name: formData.name,
            slug: formData.slug.toLowerCase().replace(/\s+/g, '-'), // Auto-format slug
            price: parseFloat(formData.price),
            original_price: formData.originalPrice ? parseFloat(formData.originalPrice) : null,
            color: formData.color,
            category: formData.category,
            description: formData.description,
            sizes: formData.sizes.split(',').map(s => s.trim()), // Convert "S, M, L" to array ["S", "M", "L"]
            main_image: publicUrl,
            is_published: true
          }
        ]);

      if (dbError) throw dbError;

      setMessage('Product successfully published!');
      
      // Reset form after success
      setTimeout(() => {
        setMessage('');
        setFormData({ name: '', slug: '', price: '', originalPrice: '', color: '', category: 'modern', description: '', sizes: '' });
        setMainFile(null);
      }, 3000);

    } catch (error) {
      console.error(error);
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-layout">
      {/* SIDEBAR */}
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <span>ADMIN</span>
        </div>
        <nav className="admin-nav">
          <button 
            className={activeTab === 'inventory' ? 'active' : ''} 
            onClick={() => setActiveTab('inventory')}
          >
            Inventory
          </button>
          <button 
            className={activeTab === 'add' ? 'active' : ''} 
            onClick={() => setActiveTab('add')}
          >
            + Add Product
          </button>
        </nav>
        <button className="admin-logout" onClick={handleLogout}>LOGOUT</button>
      </aside>

      {/* MAIN CONTENT AREA */}
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
                  <label>URL Slug (e.g. leather-jacket)</label>
                  <input type="text" name="slug" value={formData.slug} onChange={handleChange} required />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Price (₹)</label>
                  <input type="number" name="price" value={formData.price} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>Original Price (Optional Strike-through)</label>
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
                <label>Sizes (Comma separated: FR 34, FR 36)</label>
                <input type="text" name="sizes" value={formData.sizes} onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label>Editorial Description</label>
                <textarea name="description" value={formData.description} onChange={handleChange} rows="4" required />
              </div>

              <div className="form-group file-upload">
                <label>Main Product Image</label>
                <input type="file" accept="image/*" onChange={(e) => setMainFile(e.target.files[0])} required />
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
                    // Clicking this card redirects to your gorgeous ProductDetail page!
                    <div 
                      key={product.id} 
                      className="admin-product-card"
                      onClick={() => navigate(`/product/${product.slug}`)}
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
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}