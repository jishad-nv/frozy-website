import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import fs from 'fs';
import multer from 'multer';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

const DATA_DIR = path.join(__dirname, 'data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const DB_FILE = path.join(DATA_DIR, 'frozy_db.json');

const initialData = {
  admin: {
    email: 'admin@frozyicecream.in',
    passwordHash: 'frozyadmin2026',
    name: 'FROZY Master Admin'
  },
  settings: {
    brandName: 'FROZY',
    tagline: 'Sweetness in every swirl',
    phone: '+91 98450 78921',
    email: 'namaste@frozyicecream.in',
    address: '100 Feet Road, Indiranagar, Bengaluru 560038',
    deliveryCharge: 49,
    freeDeliveryThreshold: 499,
    storeOpen: true
  },
  products: [
    {
      id: 'pink-velvet',
      name: 'Pink Velvet',
      slug: 'pink-velvet',
      flavour: 'Strawberry & Velvet Cake',
      subtitle: 'Signature strawberry & velvet cake cream',
      headline: 'Sweetness in Pink.',
      description: 'Creamy strawberry goodness made for happy cravings.',
      shortDescription: 'Creamy strawberry goodness made for happy cravings.',
      price: 199,
      discountPrice: 179,
      stock: 25,
      category: 'signature',
      image: '/images/products/ChatGPT Image Sep 28, 2026, 01_17_29 PM.png',
      active: true,
      featured: true,
      rating: 4.9,
      calories: '210 kcal / serving',
      netCarbs: '12g',
      protein: '6g',
      fat: '7g',
      story: 'Crafted with ripe Mahabaleshwar strawberries and fresh churned malai dairy.',
      ingredients: ['Fresh Dairy Cream', 'Mahabaleshwar Strawberries', 'Velvet Cake Crumbs', 'Cane Sugar', 'Natural Beetroot Extract']
    },
    {
      id: 'berry-bliss',
      name: 'Berry Bliss',
      slug: 'berry-bliss',
      flavour: 'Himalayan Wild Berries',
      subtitle: 'Wild raspberry & blackberry swirl',
      headline: 'Berry bliss in every creamy bite.',
      description: 'Wild Himalayan berries folded into sweet vanilla cream.',
      shortDescription: 'Wild Himalayan berries folded into sweet vanilla cream.',
      price: 229,
      discountPrice: 209,
      stock: 20,
      category: 'fruit',
      image: '/images/products/ChatGPT Image Sep 28, 2026, 01_21_30 PM.png',
      active: true,
      featured: true,
      rating: 5.0,
      calories: '195 kcal / serving',
      netCarbs: '10g',
      protein: '5g',
      fat: '6g',
      story: 'Handcrafted with slow-simmered wild berry compote and whole milk.',
      ingredients: ['Pure Dairy Cream', 'Wild Raspberries', 'Blackberries', 'Vanilla Pods', 'Citrus Pectin']
    },
    {
      id: 'belgian-choco-melt',
      name: 'Belgian Choco Melt',
      slug: 'belgian-choco-melt',
      flavour: 'Belgian Dark Fudge',
      subtitle: 'Decadent dark fudge & cocoa curls',
      headline: 'Rich chocolate. Pure indulgence.',
      description: 'Single-origin 70% dark Belgian fudge in every scoop.',
      shortDescription: 'Single-origin 70% dark Belgian fudge in every scoop.',
      price: 249,
      discountPrice: 229,
      stock: 18,
      category: 'indulgent',
      image: '/images/products/ChatGPT Image Sep 28, 2026, 01_20_01 PM.png',
      active: true,
      featured: true,
      rating: 4.9,
      calories: '240 kcal / serving',
      netCarbs: '15g',
      protein: '7g',
      fat: '9g',
      story: 'Imported Belgian cocoa solids melted gently with fresh cream and studded with crunchy chocolate curls.',
      ingredients: ['Dark Belgian Chocolate 70%', 'Dutch Cocoa Solids', 'Fresh Cream', 'Chocolate Ganache Ribbons', 'Sea Salt']
    },
    {
      id: 'mango-sunshine',
      name: 'Mango Sunshine',
      slug: 'mango-sunshine',
      flavour: 'Ratnagiri Alphonso',
      subtitle: 'Ratnagiri Alphonso mango swirl',
      headline: 'A little taste of summer.',
      description: 'Real Ratnagiri Alphonso mango in golden cream.',
      shortDescription: 'Real Ratnagiri Alphonso mango in golden cream.',
      price: 199,
      discountPrice: 179,
      stock: 30,
      category: 'fruit',
      image: '/images/products/ChatGPT Image Sep 28, 2026, 01_22_56 PM.png',
      active: true,
      featured: true,
      rating: 4.9,
      calories: '205 kcal / serving',
      netCarbs: '14g',
      protein: '5g',
      fat: '6g',
      story: 'Tree-ripened GI-tagged Alphonso mangoes sourced directly from seaside Konkan orchards.',
      ingredients: ['Alphonso Mango Pulp', 'Whole Dairy Milk', 'Sweet Cream', 'Mango Fruit Chunks', 'Cardamom Essence']
    },
    {
      id: 'pistachio-dream',
      name: 'Pistachio Dream',
      slug: 'pistachio-dream',
      flavour: 'Iranian Pista & Saffron',
      subtitle: 'Roasted Iranian pista & saffron malai',
      headline: 'Smooth, nutty and dreamy.',
      description: 'Roasted Iranian pista with royal saffron malai.',
      shortDescription: 'Roasted Iranian pista with royal saffron malai.',
      price: 249,
      discountPrice: 229,
      stock: 15,
      category: 'signature',
      image: '/images/products/ChatGPT Image Sep 28, 2026, 01_23_31 PM.png',
      active: true,
      featured: true,
      rating: 5.0,
      calories: '225 kcal / serving',
      netCarbs: '11g',
      protein: '8g',
      fat: '9g',
      story: 'Toasted pistachios ground into nut butter and folded into reduced malai milk with Kashmiri saffron.',
      ingredients: ['Roasted Pistachios', 'Reduced Malai Milk', 'Kashmiri Saffron', 'Green Cardamom', 'Sweet Cream']
    },
    {
      id: 'cookie-crunch',
      name: 'Cookie Crunch',
      slug: 'cookie-crunch',
      flavour: 'Cookies & Cream',
      subtitle: 'Crunchy chocolate cookie crumble cream',
      headline: 'Crunch into happiness.',
      description: 'Rich vanilla cream folded with dark chocolate cookies.',
      shortDescription: 'Rich vanilla cream folded with dark chocolate cookies.',
      price: 219,
      discountPrice: 199,
      stock: 22,
      category: 'indulgent',
      image: '/images/products/ChatGPT Image Sep 28, 2026, 01_24_19 PM.png',
      active: true,
      featured: true,
      rating: 4.9,
      calories: '230 kcal / serving',
      netCarbs: '15g',
      protein: '6g',
      fat: '8g',
      story: 'Loaded with real chocolate wafer cookies crushed into sweet malai cream.',
      ingredients: ['Fresh Dairy Cream', 'Crushed Chocolate Cookies', 'Vanilla Pods', 'Cane Sugar', 'Sea Salt']
    }
  ],
  orders: [
    {
      id: 'FRZ-89214',
      customerName: 'Ananya Sharma',
      email: 'ananya@example.com',
      phone: '+91 98214 55678',
      address: 'Bandra West, Pali Hill',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400050',
      items: [
        { id: 'pink-velvet', name: 'Pink Velvet', price: 199, quantity: 2, image: '/images/products/ChatGPT Image Sep 28, 2026, 01_17_29 PM.png' }
      ],
      total: 447,
      paymentMethod: 'UPI',
      paymentStatus: 'Paid',
      orderStatus: 'Delivered',
      createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
      timeline: [
        { status: 'Order Placed', time: '2 days ago', completed: true },
        { status: 'Confirmed', time: '2 days ago', completed: true },
        { status: 'Processing', time: '2 days ago', completed: true },
        { status: 'Out for Delivery', time: 'Yesterday', completed: true },
        { status: 'Delivered', time: 'Yesterday', completed: true }
      ]
    }
  ],
  customers: [
    { id: 'cust-1', name: 'Ananya Sharma', email: 'ananya@example.com', phone: '+91 98214 55678', city: 'Mumbai', ordersCount: 3, totalSpent: 1450, createdAt: new Date(Date.now() - 86400000 * 10).toISOString() }
  ],
  reviews: [
    { id: 'rev-1', author: 'Ananya Sharma', role: 'Food Blogger', rating: 5, quote: 'FROZY Pink Velvet is genuinely unmatched.', location: 'Bandra, Mumbai', date: '2026-09-25' }
  ]
};

function readDb() {
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2));
  }
  try {
    const data = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    return initialData;
  }
}

function writeDb(data: any) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

readDb();

const uploadDir = path.join(__dirname, 'public', 'images', 'products');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + '-' + file.originalname.replace(/\\s+/g, '_'));
  }
});
const upload = multer({ storage });

const VALID_ADMIN_TOKEN = 'frozy-admin-secure-token-2026';

// Admin Auth Middleware
const adminAuth = (req: any, res: any, next: any) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized. Admin token required.' });
  }
  const token = authHeader.split(' ')[1];
  if (token !== VALID_ADMIN_TOKEN) {
    return res.status(403).json({ error: 'Forbidden. Invalid admin session.' });
  }
  next();
};

// Public Routes
app.get('/api/products', (req, res) => {
  const db = readDb();
  res.json(db.products);
});

app.get('/api/reviews', (req, res) => {
  const db = readDb();
  res.json(db.reviews);
});

app.post('/api/reviews', (req, res) => {
  const db = readDb();
  const { author, role, rating, quote, location } = req.body;
  const newRev = {
    id: `rev-${Date.now()}`,
    author,
    role: role || 'Scoop Lover',
    rating: Number(rating) || 5,
    quote,
    location: location || 'India',
    date: new Date().toISOString().split('T')[0]
  };
  db.reviews.unshift(newRev);
  writeDb(db);
  res.status(201).json(newRev);
});

app.post('/api/orders', (req, res) => {
  const db = readDb();
  const { customerName, email, phone, address, city, state, pincode, items, total, paymentMethod } = req.body;

  for (const item of items) {
    const prod = db.products.find((p: any) => p.id === item.id);
    if (prod) {
      if (prod.stock < item.quantity) {
        return res.status(400).json({ error: `Product ${prod.name} is out of stock or has insufficient quantity.` });
      }
      prod.stock -= item.quantity;
    }
  }

  const orderId = `FRZ-${Math.floor(10000 + Math.random() * 90000)}`;
  const newOrder = {
    id: orderId,
    customerName,
    email,
    phone,
    address,
    city,
    state,
    pincode,
    items,
    total: Number(total),
    paymentMethod: paymentMethod || 'UPI',
    paymentStatus: paymentMethod === 'COD' ? 'Pending' : 'Paid',
    orderStatus: 'Pending',
    createdAt: new Date().toISOString(),
    timeline: [
      { status: 'Order Placed', time: 'Just now', completed: true },
      { status: 'Confirmed', time: 'Pending', completed: false },
      { status: 'Processing', time: 'Pending', completed: false },
      { status: 'Out for Delivery', time: 'Pending', completed: false },
      { status: 'Delivered', time: 'Pending', completed: false }
    ]
  };

  db.orders.unshift(newOrder);

  let customer = db.customers.find((c: any) => c.email === email);
  if (customer) {
    customer.ordersCount += 1;
    customer.totalSpent += Number(total);
  } else {
    db.customers.push({
      id: `cust-${Date.now()}`,
      name: customerName,
      email,
      phone,
      city,
      ordersCount: 1,
      totalSpent: Number(total),
      createdAt: new Date().toISOString()
    });
  }

  writeDb(db);
  res.status(201).json(newOrder);
});

app.get('/api/orders/track/:orderId', (req, res) => {
  const db = readDb();
  const { orderId } = req.params;
  const order = db.orders.find((o: any) => o.id.toLowerCase() === orderId.toLowerCase());
  if (!order) {
    return res.status(404).json({ error: 'Order not found. Please check your Order ID.' });
  }
  res.json(order);
});

// Admin Auth Route
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const db = readDb();
  if (email === db.admin.email && password === db.admin.passwordHash) {
    res.json({ success: true, token: VALID_ADMIN_TOKEN, admin: { name: db.admin.name, email: db.admin.email } });
  } else {
    res.status(401).json({ error: 'Invalid admin credentials' });
  }
});

app.get('/api/auth/me', adminAuth, (req, res) => {
  const db = readDb();
  res.json({ success: true, admin: { name: db.admin.name, email: db.admin.email } });
});

// Protected Admin Routes
app.post('/api/products', adminAuth, upload.single('image'), (req, res) => {
  const db = readDb();
  const { name, flavour, description, shortDescription, price, discountPrice, stock, category, headline, subtitle, active, featured } = req.body;
  const image = req.file ? `/images/products/${req.file.filename}` : (req.body.image || '/images/products/ChatGPT Image Sep 28, 2026, 01_17_29 PM.png');
  
  const id = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const newProduct = {
    id,
    name,
    slug: id,
    flavour: flavour || name,
    subtitle: subtitle || 'Artisanal Ice Cream Pint',
    headline: headline || 'Sweetness in every scoop.',
    description: description || 'Crafted with pure malai cream.',
    shortDescription: shortDescription || description || 'Crafted with pure malai cream.',
    price: Number(price) || 199,
    discountPrice: discountPrice ? Number(discountPrice) : undefined,
    stock: Number(stock) || 20,
    category: category || 'signature',
    image,
    active: active !== 'false' && active !== false,
    featured: featured === 'true' || featured === true,
    rating: 5.0,
    calories: '210 kcal / serving',
    netCarbs: '12g',
    protein: '6g',
    fat: '7g',
    story: 'Crafted in small batches with premium dairy.',
    ingredients: ['Fresh Dairy Cream', 'Cane Sugar', 'Natural Flavours']
  };

  db.products.push(newProduct);
  writeDb(db);
  res.status(201).json(newProduct);
});

app.put('/api/products/:id', adminAuth, upload.single('image'), (req, res) => {
  const db = readDb();
  const { id } = req.params;
  const index = db.products.findIndex((p: any) => p.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }

  const p = db.products[index];
  const updated = {
    ...p,
    name: req.body.name || p.name,
    flavour: req.body.flavour || p.flavour,
    description: req.body.description || p.description,
    shortDescription: req.body.shortDescription || p.shortDescription,
    price: req.body.price ? Number(req.body.price) : p.price,
    discountPrice: req.body.discountPrice ? Number(req.body.discountPrice) : p.discountPrice,
    stock: req.body.stock !== undefined ? Number(req.body.stock) : p.stock,
    category: req.body.category || p.category,
    active: req.body.active !== undefined ? (req.body.active === 'true' || req.body.active === true) : p.active,
    featured: req.body.featured !== undefined ? (req.body.featured === 'true' || req.body.featured === true) : p.featured,
    image: req.file ? `/images/products/${req.file.filename}` : (req.body.image || p.image)
  };

  db.products[index] = updated;
  writeDb(db);
  res.json(updated);
});

app.delete('/api/products/:id', adminAuth, (req, res) => {
  const db = readDb();
  const { id } = req.params;
  const index = db.products.findIndex((p: any) => p.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }
  db.products.splice(index, 1);
  writeDb(db);
  res.json({ success: true });
});

app.post('/api/upload', adminAuth, upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No image uploaded' });
  }
  const imageUrl = `/images/products/${req.file.filename}`;
  res.json({ url: imageUrl });
});

app.get('/api/orders', adminAuth, (req, res) => {
  const db = readDb();
  res.json(db.orders);
});

app.put('/api/orders/:id/status', adminAuth, (req, res) => {
  const db = readDb();
  const { id } = req.params;
  const { orderStatus, paymentStatus } = req.body;

  const order = db.orders.find((o: any) => o.id === id);
  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }

  if (orderStatus) order.orderStatus = orderStatus;
  if (paymentStatus) order.paymentStatus = paymentStatus;

  const statuses = ['Order Placed', 'Confirmed', 'Processing', 'Out for Delivery', 'Delivered'];
  const targetIndex = statuses.indexOf(order.orderStatus);
  if (targetIndex !== -1) {
    order.timeline = statuses.map((st, idx) => ({
      status: st,
      time: idx <= targetIndex ? (idx === 0 ? 'Just now' : 'Completed') : 'Pending',
      completed: idx <= targetIndex
    }));
  }

  writeDb(db);
  res.json(order);
});

app.get('/api/customers', adminAuth, (req, res) => {
  const db = readDb();
  res.json(db.customers);
});

app.get('/api/settings', adminAuth, (req, res) => {
  const db = readDb();
  res.json(db.settings);
});

app.put('/api/settings', adminAuth, (req, res) => {
  const db = readDb();
  db.settings = { ...db.settings, ...req.body };
  writeDb(db);
  res.json(db.settings);
});

app.get('/api/dashboard/stats', adminAuth, (req, res) => {
  const db = readDb();
  const totalProducts = db.products.length;
  const activeProducts = db.products.filter((p: any) => p.active).length;
  const inactiveProducts = totalProducts - activeProducts;
  
  const totalOrders = db.orders.length;
  const pendingOrders = db.orders.filter((o: any) => o.orderStatus === 'Pending').length;
  const confirmedOrders = db.orders.filter((o: any) => o.orderStatus === 'Confirmed' || o.orderStatus === 'Processing').length;
  const deliveredOrders = db.orders.filter((o: any) => o.orderStatus === 'Delivered').length;
  const cancelledOrders = db.orders.filter((o: any) => o.orderStatus === 'Cancelled').length;

  const totalCustomers = db.customers.length;
  const totalSales = db.orders.reduce((acc: number, o: any) => acc + (o.orderStatus !== 'Cancelled' ? o.total : 0), 0);

  res.json({
    totalProducts,
    activeProducts,
    inactiveProducts,
    totalOrders,
    pendingOrders,
    confirmedOrders,
    deliveredOrders,
    cancelledOrders,
    totalCustomers,
    totalSales,
    recentOrders: db.orders.slice(0, 5),
    recentCustomers: db.customers.slice(0, 5)
  });
});

if (process.env.NODE_ENV !== 'production') {
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });
  app.use(vite.middlewares);
} else {
  app.use(express.static(path.join(__dirname, 'dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
}

const PORT = 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`FROZY Full-Stack Secure Server running on http://0.0.0.0:${PORT}`);
});
