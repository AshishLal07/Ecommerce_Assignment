import express from "express";
import cors from "cors";
import sqlite3 from "sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database setup
const db = new sqlite3.Database(path.join(__dirname, "ecommerce.db"));

// Initialize database
db.serialize(() => {
  // Products table
  db.run(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      price REAL NOT NULL,
      description TEXT,
      image TEXT
    )
  `);

  // Cart table
  db.run(`
    CREATE TABLE IF NOT EXISTS cart (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      productId INTEGER NOT NULL,
      quantity INTEGER NOT NULL,
      FOREIGN KEY (productId) REFERENCES products(id)
    )
  `);

  // Seed products if empty
  db.get("SELECT COUNT(*) as count FROM products", (err, row) => {
    if (row.count === 0) {
      const products = [
        {
          name: "Wireless Headphones",
          price: 79.99,
          description: "High-quality sound",
          image: "/wireless-headphones.jpg",
        },
        {
          name: "USB-C Cable",
          price: 12.99,
          description: "Fast charging cable",
          image: "/usb-c-cable.jpg",
        },
        {
          name: "Phone Case",
          price: 24.99,
          description: "Protective case",
          image: "/colorful-phone-case-display.jpg",
        },
        {
          name: "Screen Protector",
          price: 9.99,
          description: "Tempered glass",
          image: "/screen-protector.jpg",
        },
        {
          name: "Portable Charger",
          price: 34.99,
          description: "20000mAh capacity",
          image: "/portable-charger-lifestyle.jpg",
        },
        {
          name: "Bluetooth Speaker",
          price: 49.99,
          description: "Waterproof speaker",
          image: "/bluetooth-speaker.jpg",
        },
        {
          name: "Phone Stand",
          price: 14.99,
          description: "Adjustable stand",
          image: "/phone-stand.jpg",
        },
        {
          name: "Screen Cleaner",
          price: 8.99,
          description: "Microfiber cloth included",
          image: "/screen-cleaner.jpg",
        },
      ];

      products.forEach((product) => {
        db.run(
          "INSERT INTO products (name, price, description, image) VALUES (?, ?, ?, ?)",
          [product.name, product.price, product.description, product.image]
        );
      });
    }
  });
});

// Routes

// GET /api/products - Get all products
app.get("/api/products", (req, res) => {
  db.all("SELECT * FROM products", (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// GET /api/cart - Get cart items with total
app.get("/api/cart", (req, res) => {
  db.all(
    `
    SELECT c.id, c.productId, c.quantity, p.name, p.price, p.image
    FROM cart c
    JOIN products p ON c.productId = p.id
  `,
    (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      const total = rows.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      res.json({ items: rows, total: Number.parseFloat(total.toFixed(2)) });
    }
  );
});

// POST /api/cart - Add item to cart
app.post("/api/cart", (req, res) => {
  const { productId, qty } = req.body;

  if (!productId || !qty) {
    res.status(400).json({ error: "Missing productId or qty" });
    return;
  }

  // Check if item already in cart
  db.get("SELECT * FROM cart WHERE productId = ?", [productId], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    if (row) {
      // Update quantity
      db.run(
        "UPDATE cart SET quantity = quantity + ? WHERE productId = ?",
        [qty, productId],
        (err) => {
          if (err) {
            res.status(500).json({ error: err.message });
            return;
          }
          res.json({ message: "Cart updated", id: row.id });
        }
      );
    } else {
      // Insert new item
      db.run(
        "INSERT INTO cart (productId, quantity) VALUES (?, ?)",
        [productId, qty],
        function (err) {
          if (err) {
            res.status(500).json({ error: err.message });
            return;
          }
          res.json({ message: "Item added to cart", id: this.lastID });
        }
      );
    }
  });
});

// DELETE /api/cart/:id - Remove item from cart
app.delete("/api/cart/:id", (req, res) => {
  const { id } = req.params;

  db.run("DELETE FROM cart WHERE id = ?", [id], (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: "Item removed from cart" });
  });
});

// POST /api/checkout - Process checkout
app.post("/api/checkout", (req, res) => {
  const { cartItems, name, email } = req.body;

  if (!cartItems || !name || !email) {
    res.status(400).json({ error: "Missing required fields" });
    return;
  }

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const receipt = {
    orderId: `ORD-${Date.now()}`,
    name,
    email,
    items: cartItems,
    total: Number.parseFloat(total.toFixed(2)),
    timestamp: new Date().toISOString(),
  };

  // Clear cart after checkout
  db.run("DELETE FROM cart", (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(receipt);
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
