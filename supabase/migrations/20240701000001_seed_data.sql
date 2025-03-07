-- Seed data for the e-commerce platform

-- Insert categories
INSERT INTO categories (name, slug, description) VALUES
('Face', 'face', 'Products for face makeup and skincare'),
('Eyes', 'eyes', 'Products for eye makeup'),
('Lips', 'lips', 'Products for lip makeup'),
('Skincare', 'skincare', 'Products for skin care and treatment'),
('Brushes', 'brushes', 'Makeup brushes and tools');

-- Insert subcategories
INSERT INTO subcategories (name, slug, category_id) VALUES
('Foundation', 'foundation', (SELECT id FROM categories WHERE slug = 'face')),
('Concealer', 'concealer', (SELECT id FROM categories WHERE slug = 'face')),
('Powder', 'powder', (SELECT id FROM categories WHERE slug = 'face')),
('Blush', 'blush', (SELECT id FROM categories WHERE slug = 'face')),
('Bronzer', 'bronzer', (SELECT id FROM categories WHERE slug = 'face')),
('Highlighter', 'highlighter', (SELECT id FROM categories WHERE slug = 'face')),
('Eyeshadow', 'eyeshadow', (SELECT id FROM categories WHERE slug = 'eyes')),
('Eyeliner', 'eyeliner', (SELECT id FROM categories WHERE slug = 'eyes')),
('Mascara', 'mascara', (SELECT id FROM categories WHERE slug = 'eyes')),
('Eyebrows', 'eyebrows', (SELECT id FROM categories WHERE slug = 'eyes')),
('Lipstick', 'lipstick', (SELECT id FROM categories WHERE slug = 'lips')),
('Lip Gloss', 'lip-gloss', (SELECT id FROM categories WHERE slug = 'lips')),
('Lip Liner', 'lip-liner', (SELECT id FROM categories WHERE slug = 'lips')),
('Lip Balm', 'lip-balm', (SELECT id FROM categories WHERE slug = 'lips')),
('Cleansers', 'cleansers', (SELECT id FROM categories WHERE slug = 'skincare')),
('Moisturizers', 'moisturizers', (SELECT id FROM categories WHERE slug = 'skincare')),
('Serums', 'serums', (SELECT id FROM categories WHERE slug = 'skincare')),
('Masks', 'masks', (SELECT id FROM categories WHERE slug = 'skincare')),
('Sunscreen', 'sunscreen', (SELECT id FROM categories WHERE slug = 'skincare')),
('Face Brushes', 'face-brushes', (SELECT id FROM categories WHERE slug = 'brushes')),
('Eye Brushes', 'eye-brushes', (SELECT id FROM categories WHERE slug = 'brushes')),
('Lip Brushes', 'lip-brushes', (SELECT id FROM categories WHERE slug = 'brushes')),
('Brush Sets', 'brush-sets', (SELECT id FROM categories WHERE slug = 'brushes'));

-- Insert brands
INSERT INTO brands (name, slug, logo_url) VALUES
('Glossier', 'glossier', 'https://example.com/logos/glossier.png'),
('Fenty Beauty', 'fenty', 'https://example.com/logos/fenty.png'),
('Rare Beauty', 'rare', 'https://example.com/logos/rare.png'),
('Charlotte Tilbury', 'charlotte', 'https://example.com/logos/charlotte.png'),
('MAC Cosmetics', 'mac', 'https://example.com/logos/mac.png'),
('NARS', 'nars', 'https://example.com/logos/nars.png');

-- Insert sample products
INSERT INTO products (name, description, price, category_id, subcategory_id, brand_id, sku, stock, images) VALUES
('Luminous Matte Foundation', 'A lightweight, buildable foundation that provides medium coverage with a natural matte finish.', 39.99, 
 (SELECT id FROM categories WHERE slug = 'face'), 
 (SELECT id FROM subcategories WHERE slug = 'foundation'), 
 (SELECT id FROM brands WHERE slug = 'fenty'), 
 'FDN-LM-001', 125, 
 ARRAY['https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=300&q=80']),
 
('Velvet Lip Stain', 'A long-lasting, non-drying lip stain that delivers intense color with a velvet matte finish.', 24.99, 
 (SELECT id FROM categories WHERE slug = 'lips'), 
 (SELECT id FROM subcategories WHERE slug = 'lipstick'), 
 (SELECT id FROM brands WHERE slug = 'mac'), 
 'LIP-VL-002', 89, 
 ARRAY['https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=300&q=80']),
 
('Radiant Skin Illuminator', 'A liquid highlighter that creates a luminous, dewy glow on all skin tones.', 32.50, 
 (SELECT id FROM categories WHERE slug = 'face'), 
 (SELECT id FROM subcategories WHERE slug = 'highlighter'), 
 (SELECT id FROM brands WHERE slug = 'charlotte'), 
 'HLT-RS-003', 54, 
 ARRAY['https://images.unsplash.com/photo-1599733589046-9b8308b5b50d?w=300&q=80']),
 
('Volumizing Mascara', 'A volumizing mascara that creates dramatic, full lashes without clumping.', 19.99, 
 (SELECT id FROM categories WHERE slug = 'eyes'), 
 (SELECT id FROM subcategories WHERE slug = 'mascara'), 
 (SELECT id FROM brands WHERE slug = 'glossier'), 
 'EYE-VM-004', 0, 
 ARRAY['https://images.unsplash.com/photo-1591360236480-9c6a4cb3a6de?w=300&q=80']),
 
('Hydrating Face Primer', 'A hydrating primer that creates a smooth canvas for makeup while nourishing the skin.', 28.99, 
 (SELECT id FROM categories WHERE slug = 'face'), 
 (SELECT id FROM subcategories WHERE slug = 'foundation'), 
 (SELECT id FROM brands WHERE slug = 'rare'), 
 'PRM-HF-005', 12, 
 ARRAY['https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=300&q=80']),
 
('Creamy Blush Stick', 'A creamy, blendable blush stick that adds a natural flush of color to the cheeks.', 22.50, 
 (SELECT id FROM categories WHERE slug = 'face'), 
 (SELECT id FROM subcategories WHERE slug = 'blush'), 
 (SELECT id FROM brands WHERE slug = 'rare'), 
 'BLH-CB-006', 76, 
 ARRAY['https://images.unsplash.com/photo-1596704017254-9b121068fb31?w=300&q=80']),
 
('Precision Brow Pencil', 'A precision brow pencil that creates natural-looking, defined brows.', 18.99, 
 (SELECT id FROM categories WHERE slug = 'eyes'), 
 (SELECT id FROM subcategories WHERE slug = 'eyebrows'), 
 (SELECT id FROM brands WHERE slug = 'nars'), 
 'BRW-PB-007', 42, 
 ARRAY['https://images.unsplash.com/photo-1625093742435-6fa192b6fb1a?w=300&q=80']),
 
('Matte Eyeshadow Palette', 'A versatile eyeshadow palette featuring 12 highly-pigmented matte shades.', 45.00, 
 (SELECT id FROM categories WHERE slug = 'eyes'), 
 (SELECT id FROM subcategories WHERE slug = 'eyeshadow'), 
 (SELECT id FROM brands WHERE slug = 'charlotte'), 
 'EYE-ME-008', 0, 
 ARRAY['https://images.unsplash.com/photo-1583241800698-e8ab01c85b27?w=300&q=80']);

-- Update product statuses
UPDATE products SET status = 'out_of_stock' WHERE stock = 0;
UPDATE products SET status = 'low_stock' WHERE stock < low_stock_threshold AND stock > 0;

-- Insert sample customers
INSERT INTO customers (name, email, phone, address, segment, avatar_url) VALUES
('Emma Johnson', 'emma.j@example.com', '+1 (555) 123-4567', '123 Main St, Anytown, CA 12345', 'vip', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma'),
('Michael Smith', 'michael.s@example.com', '+1 (555) 987-6543', '456 Oak Ave, Somewhere, NY 54321', 'regular', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael'),
('Sophia Williams', 'sophia.w@example.com', '+1 (555) 456-7890', '789 Pine Ln, Elsewhere, TX 67890', 'vip', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sophia'),
('James Brown', 'james.b@example.com', '+1 (555) 789-0123', '321 Elm St, Nowhere, WA 13579', 'regular', 'https://api.dicebear.com/7.x/avataaars/svg?seed=James'),
('Olivia Davis', 'olivia.d@example.com', '+1 (555) 321-6547', '654 Maple Dr, Anywhere, FL 97531', 'new', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Olivia');

-- Set one customer as inactive
UPDATE customers SET status = 'inactive' WHERE email = 'james.b@example.com';

-- Insert sample orders
INSERT INTO orders (customer_id, status, total, shipping_address, shipping_method, shipping_cost, payment_method, payment_status) VALUES
((SELECT id FROM customers WHERE email = 'emma.j@example.com'), 'completed', 128.50, '123 Main St, Anytown, CA 12345', 'Standard Shipping', 4.99, 'Credit Card', 'completed'),
((SELECT id FROM customers WHERE email = 'michael.s@example.com'), 'processing', 74.99, '456 Oak Ave, Somewhere, NY 54321', 'Express Shipping', 9.99, 'PayPal', 'completed'),
((SELECT id FROM customers WHERE email = 'sophia.w@example.com'), 'shipped', 253.25, '789 Pine Ln, Elsewhere, TX 67890', 'Standard Shipping', 4.99, 'Credit Card', 'completed'),
((SELECT id FROM customers WHERE email = 'james.b@example.com'), 'shipped', 96.75, '321 Elm St, Nowhere, WA 13579', 'Express Shipping', 9.99, 'Credit Card', 'completed'),
((SELECT id FROM customers WHERE email = 'olivia.d@example.com'), 'cancelled', 189.30, '654 Maple Dr, Anywhere, FL 97531', 'Standard Shipping', 4.99, 'Credit Card', 'refunded');

-- Insert sample order items
INSERT INTO order_items (order_id, product_id, quantity, price) VALUES
((SELECT id FROM orders WHERE customer_id = (SELECT id FROM customers WHERE email = 'emma.j@example.com') LIMIT 1), 
 (SELECT id FROM products WHERE sku = 'FDN-LM-001'), 1, 39.99),
((SELECT id FROM orders WHERE customer_id = (SELECT id FROM customers WHERE email = 'emma.j@example.com') LIMIT 1), 
 (SELECT id FROM products WHERE sku = 'BLH-CB-006'), 2, 22.50),
((SELECT id FROM orders WHERE customer_id = (SELECT id FROM customers WHERE email = 'emma.j@example.com') LIMIT 1), 
 (SELECT id FROM products WHERE sku = 'BRW-PB-007'), 1, 18.99),
 
((SELECT id FROM orders WHERE customer_id = (SELECT id FROM customers WHERE email = 'michael.s@example.com') LIMIT 1), 
 (SELECT id FROM products WHERE sku = 'EYE-VM-004'), 1, 19.99),
((SELECT id FROM orders WHERE customer_id = (SELECT id FROM customers WHERE email = 'michael.s@example.com') LIMIT 1), 
 (SELECT id FROM products WHERE sku = 'PRM-HF-005'), 1, 28.99),
((SELECT id FROM orders WHERE customer_id = (SELECT id FROM customers WHERE email = 'michael.s@example.com') LIMIT 1), 
 (SELECT id FROM products WHERE sku = 'LIP-VL-002'), 1, 24.99),
 
((SELECT id FROM orders WHERE customer_id = (SELECT id FROM customers WHERE email = 'sophia.w@example.com') LIMIT 1), 
 (SELECT id FROM products WHERE sku = 'EYE-ME-008'), 2, 45.00),
((SELECT id FROM orders WHERE customer_id = (SELECT id FROM customers WHERE email = 'sophia.w@example.com') LIMIT 1), 
 (SELECT id FROM products WHERE sku = 'HLT-RS-003'), 3, 32.50),
((SELECT id FROM orders WHERE customer_id = (SELECT id FROM customers WHERE email = 'sophia.w@example.com') LIMIT 1), 
 (SELECT id FROM products WHERE sku = 'BLH-CB-006'), 2, 22.50);

-- Insert sample reviews
INSERT INTO reviews (product_id, customer_id, rating, comment, status) VALUES
((SELECT id FROM products WHERE sku = 'FDN-LM-001'), 
 (SELECT id FROM customers WHERE email = 'emma.j@example.com'), 
 5, 'This foundation is amazing! It gives a perfect matte finish without drying out my skin. The coverage is buildable and it lasts all day. Definitely my new go-to foundation.', 'published'),
 
((SELECT id FROM products WHERE sku = 'LIP-VL-002'), 
 (SELECT id FROM customers WHERE email = 'michael.s@example.com'), 
 4, 'Bought this for my wife and she loves it. The color is beautiful and it stays on for hours. Only giving 4 stars because it can be a bit drying after a full day of wear.', 'published'),
 
((SELECT id FROM products WHERE sku = 'HLT-RS-003'), 
 (SELECT id FROM customers WHERE email = 'sophia.w@example.com'), 
 5, 'This highlighter gives the most beautiful glow! It's not glittery at all, just a natural-looking radiance. A little goes a long way, so the bottle will last forever.', 'published'),
 
((SELECT id FROM products WHERE sku = 'EYE-VM-004'), 
 (SELECT id FROM customers WHERE email = 'james.b@example.com'), 
 2, 'This mascara clumps a lot and smudges under my eyes throughout the day. Not worth the price. I've used drugstore mascaras that perform much better.', 'pending'),
 
((SELECT id FROM products WHERE sku = 'PRM-HF-005'), 
 (SELECT id FROM customers WHERE email = 'olivia.d@example.com'), 
 1, 'Terrible product! Made my skin break out immediately. I have sensitive skin and this was way too harsh. Returning it ASAP.', 'pending');

-- Create a test admin user (you would replace this with your actual admin user in production)
INSERT INTO admin_users (user_id, role) VALUES 
('00000000-0000-0000-0000-000000000000', 'admin');
