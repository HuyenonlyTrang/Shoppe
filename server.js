const express = require('express');
const mysql = require('mysql2');
const multer = require('multer');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('uploads'));

//
app.set('view engline', 'ejs');
app.set('Layoutagain', '/Page/Admin/Layoutagain/')
app.use(express.static('/Base/Css/'))

app.get('/', (req, res) => {
  res.render('index');
})

// MySQL Connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '15060404',
  database: 'shopee',
  port: 3307,
});

connection.connect(err => {
  if (err) return console.error('MySQL lỗi:', err);
  console.log('Kết nối MySQL thành công');
});

// Multer (upload ảnh)
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// ===== USERS =====
app.post('/add-user', (req, res) => {
  const { name, phone, email, birth_year, password} = req.body;

  if (!name || !phone || !email || !birth_year || !password) {
    return res.status(400).json({ error: 'Thiếu thông tin người dùng' });
  }

  const sql = 'INSERT INTO users (name, phone, email, birth_year, password) VALUES (?, ?, ?, ?, ?)';
  connection.query(sql, [name, phone, email, birth_year, password], (err) => {
    if (err) {
      console.error('Lỗi thêm user:', err);
      return res.status(500).json({ error: 'Lỗi thêm user' });
    }
    res.json({ message: 'Thêm user thành công' });
  });
});

app.get('/users', (req, res) => {
  connection.query('SELECT * FROM users', (err, results) => {
    if (err) return res.status(500).send('Lỗi khi lấy user');
    res.json(results);
  });
});
app.get('/users/:id', (req, res) => {
  const id = req.params.id; // Lấy id từ URL
  const sql = 'SELECT * FROM users WHERE id = ?'; // Truy vấn SQL
  connection.query(sql, [id], (err, results) => {
    if (err) {
      return res.status(500).send('Lỗi khi tìm kiếm người dùng');
    }
    if (results.length === 0) {
      return res.status(404).send('Không tìm thấy người dùng');
    }
    res.json(results[0]); // Trả về người dùng tìm được
  });
});
app.put('/update-user/:id', (req, res) => {
  const id = req.params.id;
  const { name, phone, email, birth_year , password} = req.body;
  
  const sql = 'UPDATE users SET name = ?, phone = ?, email = ?, birth_year = ? , password = ? WHERE id = ?';
  const params = [name, phone, email, birth_year, password, id];

  db.query(sql, params, (err, result) => {
    if (err) {
      console.error('Lỗi khi cập nhật user:', err);
      return res.status(500).send('Cập nhật thất bại!');
    }
    res.send('Cập nhật user thành công!');
  });
});
app.delete('/delete-user/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'DELETE FROM users WHERE id = ?';

  connection.query(sql, [id], (err) => {
    if (err) return res.status(500).send('Lỗi xóa sản phẩm');
    res.send('Xóa thành công');
  });
});




// ===== PRODUCTS =====

// Thêm sản phẩm
app.post('/add-product', upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'image_one', maxCount: 1 },
  { name: 'image_two', maxCount: 1 },
  { name: 'image_three', maxCount: 1 },
  { name: 'image_four', maxCount: 1 },
  { name: 'image_fire', maxCount: 1 }
]), (req, res) => {
  const { name, old_price, new_price, sale_price,
    sold_quantity, href,
    star, review, noi, loaisanpham, mota, name_store} = req.body;
  const is_checklike =  req.body.is_checklike === 'true';
  const files = req.files;

  const image = files['image']?.[0]?.filename || '';
  const image_one = files['image_one']?.[0]?.filename || '';
  const image_two = files['image_two']?.[0]?.filename || '';
  const image_three = files['image_three']?.[0]?.filename || '';
  const image_four = files['image_four']?.[0]?.filename || '';
  const image_fire = files['image_fire']?.[0]?.filename || '';

  const sql = 'INSERT INTO listProducts (name, old_price, new_price, sale_price, sold_quantity, href, is_checklike, star, review, noi, loaisanpham, mota, image, image_one, image_two, image_three, image_four, image_fire, name_store) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  connection.query(sql, [name, old_price, new_price, sale_price, sold_quantity, href,
    is_checklike === 'true' ? 1 : 0, star, review, noi, loaisanpham, mota,
    image, image_one, image_two, image_three, image_four, image_fire, name_store], (err) => {
    if (err) return res.status(500).send('Lỗi thêm sản phẩm');
    res.send('Thêm sản phẩm thành công');
  });
});
// Lấy danh sách sản phẩm
app.get('/products', (req, res) => {
  connection.query('SELECT * FROM listProducts', (err, results) => {
    if (err) return res.status(500).send('Lỗi lấy sản phẩm');
    res.json(results);
  });
});
app.get('/products/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'SELECT * FROM listProducts WHERE id = ?'; // Đảm bảo tên bảng đúng
  connection.query(sql, [id], (err, results) => {
    if (err) return res.status(500).send('Lỗi lấy dữ liệu');
    if (results.length === 0) return res.status(404).send('Không tìm thấy sản phẩm');
    res.json(results[0]); // Trả về object thay vì array
  });
});

app.put('/update-products/:id', upload.fields([
  { name: 'image' }, { name: 'image_one' }, { name: 'image_two' },
  { name: 'image_three' }, { name: 'image_four' }, { name: 'image_fire' }
]), (req, res) => {
  const id = req.params.id;
  const data = {
    name: req.body.name,
    old_price: req.body.old_price,
    new_price: req.body.new_price,
    sale_price: req.body.sale_price,
    sold_quantity: req.body.sold_quantity,
    href: req.body.href,
    is_checklike: req.body.is_checklike === 'true' ? 1 : 0,
    star: req.body.star,
    review: req.body.review,
    noi: req.body.noi,
    loaisanpham: req.body.loaisanpham,
    mota: req.body.mota,
    name_store: req.body.name_store
  };

  const files = req.files;
  ['image', 'image_one', 'image_two', 'image_three', 'image_four', 'image_fire'].forEach(field => {
    if (files[field]?.[0]) data[field] = files[field][0].filename;
  });

  const updates = Object.keys(data).map(key => `${key} = ?`).join(', ');
  const values = Object.values(data);

  const sql = `UPDATE listProducts SET ${updates} WHERE id = ?`;
  values.push(id);

  connection.query(sql, values, err => {
    if (err) return res.status(500).send('Lỗi cập nhật sản phẩm');
    res.send('Cập nhật thành công');
  });
});


app.delete('/delete-products/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'DELETE FROM listProducts WHERE id = ?';

  connection.query(sql, [id], (err, result) => {
    if (err) return res.status(500).send('Lỗi xóa sản phẩm');
    if (result.affectedRows === 0) {
      return res.status(404).send('Không tìm thấy sản phẩm để xóa');
    }
    res.send('Xóa thành công');
  });
});

//DanhMuc 

app.post('/add-danhmuc', (req, res) => {
  const { phanloai } = req.body;

  if (!phanloai) {
    return res.status(400).send('Thiếu thông tin phân loại');
  }

  const sql = 'INSERT INTO danhmuc (phanloai) VALUES (?)';
  connection.query(sql, [phanloai], (err) => {
    if (err) {
      console.error('Lỗi thêm phân loại:', err);
      return res.status(500).send('Lỗi thêm phân loại');
    }
    res.send('Thêm phân loại thành công');
  });
});


app.get('/danhmuc', (req, res) => {
  connection.query('SELECT * FROM danhmuc', (err, results) => {
    if (err) return res.status(500).send('Lỗi khi lấy user');
    res.json(results);
  });
});
app.get('/danhmuc/:id', (req, res) => {
  const id = req.params.id; // Lấy id từ URL
  const sql = 'SELECT * FROM danhmuc WHERE id = ?'; // Truy vấn SQL
  connection.query(sql, [id], (err, results) => {
    if (err) {
      return res.status(500).send('Lỗi khi tìm kiếm người dùng');
    }
    if (results.length === 0) {
      return res.status(404).send('Không tìm thấy người dùng');
    }
    res.json(results[0]); // Trả về người dùng tìm được
  });
});
app.put('/update-danhmuc/:id', (req, res) => {
  const id = req.params.id;
  const {phanloai } = req.body;
  
  const sql = 'UPDATE danhmuc SET phanloai = ? WHERE id = ?';
  const params = [phanloai, id];

  connection.query(sql, params, (err, result) => {
    if (err) {
      console.error('Lỗi khi cập nhật user:', err);
      return res.status(500).send('Cập nhật thất bại!');
    }
    res.send('Cập nhật user thành công!');
  });
});
app.delete('/delete-danhmuc/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'DELETE FROM danhmuc WHERE id = ?';

  connection.query(sql, [id], (err) => {
    if (err) return res.status(500).send('Lỗi xóa sản phẩm');
    res.send('Xóa thành công');
  });
});


// size 
app.post('/add-size', (req, res) => {
  const { size_s, size_m, size_l, size_xl, size_xxl, size_xxxl } = req.body;
  const sql = `INSERT INTO size (size_s, size_m, size_l, size_xl, size_xxl, size_xxxl) VALUES (?, ?, ?, ?, ?, ?)`;
  connection.query(sql, [size_s, size_m, size_l, size_xl, size_xxl, size_xxxl], (err, result) => {
    if (err) {
      console.error('Lỗi khi thêm size:', err);
      return res.status(500).send('Lỗi khi thêm size');
    }
    res.send('Thêm size thành công');
  });
});

app.get('/size', (req, res) => {
  connection.query('SELECT * FROM size', (err, results) => {
    if (err) {
      return res.status(500).send('Lỗi khi lấy danh sách size');
    }
    res.json(results);
  });
});
app.get('/size/:id', (req, res) => {
  const id = req.params.id; // Lấy id từ URL
  const sql = 'SELECT * FROM size WHERE id = ?'; // Truy vấn SQL
  connection.query(sql, [id], (err, results) => {
    if (err) {
      return res.status(500).send('Lỗi khi tìm kiếm người dùng');
    }
    if (results.length === 0) {
      return res.status(404).send('Không tìm thấy người dùng');
    }
    res.json(results[0]); // Trả về người dùng tìm được
  });
});
app.put('/update-size/:id', (req, res) => {
  const id = req.params.id;
  const { size_s, size_m, size_l, size_xl, size_xxl, size_xxxl } = req.body;

  // Kiểm tra xem tất cả các trường kích cỡ có được gửi đầy đủ không
  if (size_s === undefined || size_m === undefined || size_l === undefined ||
      size_xl === undefined || size_xxl === undefined || size_xxxl === undefined) {
    return res.status(400).send('Vui lòng cung cấp đầy đủ thông tin kích cỡ.');
  }

  const sql = `
    UPDATE size
    SET size_s = ?, size_m = ?, size_l = ?, size_xl = ?, size_xxl = ?, size_xxxl = ?
    WHERE id = ?`;
  const params = [size_s, size_m, size_l, size_xl, size_xxl, size_xxxl, id];

  connection.query(sql, params, (err, result) => {
    if (err) {
      console.error('Lỗi khi cập nhật kích cỡ:', err);
      return res.status(500).send('Cập nhật thất bại!');
    }
    res.send('Cập nhật kích cỡ thành công!');
  });
});


app.delete('/delete-size/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'DELETE FROM size WHERE id = ?';

  connection.query(sql, [id], (err) => {
    if (err) return res.status(500).send('Lỗi xóa sản phẩm');
    res.send('Xóa thành công');
  });
});



// ====PhanLoai====
app.get('/phanloai', (req, res) => {
  connection.query('SELECT * FROM phanloai', (err, results) => {
    if (err) return res.status(500).send("Lỗi khi lấy dữ liệu");
    res.json(results);
  });
});
app.get('/phanloai/:id', (req, res) => {
  const id = req.params.id;
  connection.query('SELECT * FROM phanloai WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).send("Lỗi khi truy vấn");
    if (results.length === 0) return res.status(404).send("Không tìm thấy phân loại");
    res.json(results[0]);
  });
});
app.post('/add-phanloai', (req, res) => {
  console.log(req.body);  // In ra dữ liệu nhận từ frontend
  const { loai, tensp_one, tensp_two, tensp_three, tensp_four } = req.body;
  if (!loai || !tensp_one || !tensp_two || !tensp_three || !tensp_four) {
    return res.status(400).send("Thiếu thông tin");
  }

  const sql = `INSERT INTO phanloai (loai, tensp_one, tensp_two, tensp_three, tensp_four) VALUES (?, ?, ?, ?, ?)`;
  connection.query(sql, [loai, tensp_one, tensp_two, tensp_three, tensp_four], (err, result) => {
    if (err) {
      console.error("Lỗi khi thêm phân loại:", err);
      return res.status(500).send("Lỗi khi thêm phân loại");
    }
    res.send("Thêm phân loại thành công");
  });
});
app.put('/update-phanloai/:id', (req, res) => {
  const id = req.params.id;
  const { loai, tensp_one, tensp_two, tensp_three, tensp_four  } = req.body;

  if (!loai || !tensp_one || !tensp_two || !tensp_three || !tensp_four ) {
    return res.status(400).send("Thiếu thông tin");
  }

  const sql = `
    UPDATE phanloai SET 
      loai = ?, 
      tensp_one = ?, 
      tensp_two = ?, 
      tensp_three = ?, 
      tensp_four = ?
    WHERE id = ?`;

  connection.query(sql, [loai, tensp_one, tensp_two, tensp_three, tensp_four , id], (err, result) => {
    if (err) {
      console.error("Lỗi khi cập nhật:", err);
      return res.status(500).send("Cập nhật thất bại");
    }
    res.send("Cập nhật phân loại thành công");
  });
});
app.delete('/delete-phanloai/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'DELETE FROM phanloai WHERE id = ?';
  connection.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Lỗi khi xóa:", err);
      return res.status(500).send("Xóa thất bại");
    }
    res.send("Xóa phân loại thành công");
  });
});

// ====Reduce====
app.get('/Reduce', (req, res) => {
  connection.query('SELECT * FROM Reduce', (err, results) => {
    if (err) return res.status(500).send("Lỗi khi lấy dữ liệu");
    res.json(results);
  });
});
app.get('/Reduce/:id', (req, res) => {
  const id = req.params.id;
  connection.query('SELECT * FROM Reduce WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).send("Lỗi khi truy vấn");
    if (results.length === 0) return res.status(404).send("Không tìm thấy phân loại");
    res.json(results[0]);
  });
});
app.post('/add-Reduce', (req, res) => {
  console.log(req.body);  // In ra dữ liệu nhận từ frontend
  const {one, two, three, four, fire} = req.body;
  if (!one || !two || !three || !four || !fire) {
    return res.status(400).send("Thiếu thông tin");
  }

  const sql = `INSERT INTO Reduce  (one, two, three, four, fire) VALUES (?, ?, ?, ?, ?)`;
  connection.query(sql, [one, two, three, four, fire], (err, result) => {
    if (err) {
      console.error("Lỗi khi thêm phân loại:", err);
      return res.status(500).send("Lỗi khi thêm phân loại");
    }
    res.send("Thêm phân loại thành công");
  });
});
app.put('/update-Reduce/:id', (req, res) => {
  const id = req.params.id;
  const {one, two, three, four, fire} = req.body;

  if (!one || !two || !three || !four || !fire) {
    return res.status(400).send("Thiếu thông tin");
  }

  const sql = `
    UPDATE Reduce SET 
      one = ?, 
      two = ?, 
      three = ?, 
      four = ?,
      fire = ? 
    WHERE id = ?`;

  connection.query(sql, [ one, two, three, four, fire, id], (err, result) => {
    if (err) {
      console.error("Lỗi khi cập nhật:", err);
      return res.status(500).send("Cập nhật thất bại");
    }
    res.send("Cập nhật phân loại thành công");
  });
});
app.delete('/delete-Reduce/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'DELETE FROM reduce WHERE id = ?';
  connection.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Lỗi khi xóa:", err);
      return res.status(500).send("Xóa thất bại");
    }
    res.send("Xóa phân loại thành công");
  });
});










// =====LiLinkTwo=====
app.post('/add-liLinktwo', upload.single('image'), (req, res) => {
  const {title, href} = req.body;
  const image = req.file ? req.file.filename : null;

  const sql = 'INSERT INTO listlinktwo (image, title, href) VALUES ( ?, ?, ?)';
  connection.query(sql, [image, title, href], (err) => {
    if (err) return res.status(500).send('Lỗi thêm sản phẩm');
    res.send('Thêm sản phẩm thành công');
  });
});
app.get('/liLinktwo', (req, res) => {
  const sql = 'SELECT * FROM listlinktwo';
  connection.query(sql, (err, results) => {
    if (err) return res.status(500).send('Lỗi lấy LiLink');
    res.json(results);
  });
});
app.get('/liLinktwo/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'SELECT * FROM listlinktwo WHERE id = ?'; // Đảm bảo tên bảng đúng
  connection.query(sql, [id], (err, results) => {
    if (err) return res.status(500).send('Lỗi lấy dữ liệu');
    if (results.length === 0) return res.status(404).send('Không tìm thấy sản phẩm');
    res.json(results[0]); // Trả về object thay vì array
  });
});

app.put('/update-liLinktwo/:id', upload.single('image'), (req, res) => {
  const id = req.params.id;
  const { title, href } = req.body;
  const image = req.file ? req.file.filename : null;

  let sql, params;
  if (image) {
    sql = 'UPDATE listlinktwo SET image = ?, title = ?, href = ? WHERE id = ?';
    params = [image, title, href ];
  } else {
    sql = 'UPDATE listlinktwo SET title = ?, href = ? WHERE id = ?';
    params = [title, href];
  }

  connection.query(sql, params, (err) => {
    if (err) return res.status(500).send('Lỗi cập nhật sản phẩm');
    res.send('Cập nhật thành công');
  });
});

// Xóa
app.delete('/delete-liLinktwo/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'DELETE FROM listlinktwo WHERE id = ?';

  connection.query(sql, [id], (err) => {
    if (err) return res.status(500).send('Lỗi xóa sản phẩm');
    res.send('Xóa thành công');
  });
});




// =====LiLinkThree=====

app.post('/add-liLinkthree', upload.fields([
  { name: 'image_one', maxCount: 1 },
  { name: 'image_two', maxCount: 1 }
]), (req, res) => {
  const {title, href } = req.body;
  const image_one = req.files['image_one'] ? req.files['image_one'][0].filename : null;
  const image_two = req.files['image_two'] ? req.files['image_two'][0].filename : null;
  const sql = 'INSERT INTO listlinkthree (image_one, image_two, title, href) VALUES (?, ?, ?, ?)';
  connection.query(sql, [image_one, image_two, title, href], (err) => {
    if (err) return res.status(500).send('Lỗi thêm sản phẩm');
    res.send('Thêm sản phẩm thành công');
  });
});
app.get('/liLinkthree', (req, res) => {
  const sql = 'SELECT * FROM listlinkthree';
  connection.query(sql, (err, results) => {
    if (err) return res.status(500).send('Lỗi lấy LiLink');
    res.json(results);
  });
});
app.get('/liLinkthree/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'SELECT * FROM listlinkthree WHERE id = ?'; // Đảm bảo tên bảng đúng
  connection.query(sql, [id], (err, results) => {
    if (err) return res.status(500).send('Lỗi lấy dữ liệu');
    if (results.length === 0) return res.status(404).send('Không tìm thấy sản phẩm');
    res.json(results[0]); // Trả về object thay vì array
  });
});

app.put('/update-liLinkthree/:id', upload.fields([
  { name: 'image_one', maxCount: 1 },
  { name: 'image_two', maxCount: 1 }
]), (req, res) => {
  const id = req.params.id;
  const { title, href} = req.body;
  const image_one = req.files['image_one'] ? req.files['image_one'][0].filename : null;
  const image_two = req.files['image_two'] ? req.files['image_two'][0].filename : null;

  let sql = 'UPDATE listlinkthree SET';
  let fields = [];
  let params = [];

  // Chỉ cập nhật ảnh nếu có file mới gửi lên
  if (image_one) {
    fields.push(' image_one = ?');
    params.push(image_one);
  }

  if (image_two) {
    fields.push(' image_two = ?');
    params.push(image_two);
  }

  // Luôn cập nhật các trường khác
  fields.push(' title = ?', ' href = ?');
  params.push(title, href);

  // Thêm điều kiện WHERE
  sql += fields.join(',') + ' WHERE id = ?';
  params.push(id);

  connection.query(sql, params, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Lỗi cập nhật sản phẩm');
    }
    res.send('Cập nhật thành công');
  });
});
app.delete('/delete-liLinkthree/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'DELETE FROM listlinkthree WHERE id = ?';

  connection.query(sql, [id], (err) => {
    if (err) return res.status(500).send('Lỗi xóa sản phẩm');
    res.send('Xóa thành công');
  });
});





// ====fashsale===
app.post('/add-fashsale', upload.single('image'), (req, res) => {
  const {money, sale, title, href } = req.body;
  const image = req.file ? req.file.filename : null;

  const sql = 'INSERT INTO listfashsale (image, money, sale, title, href) VALUES ( ?, ?, ?, ?, ?)';
  connection.query(sql, [image, money, sale, title, href], (err) => {
    if (err) return res.status(500).send('Lỗi thêm sản phẩm');
    res.send('Thêm sản phẩm thành công');
  });
});
app.get('/fashsale', (req, res) => {
  const sql = 'SELECT * FROM listfashsale';
  connection.query(sql, (err, results) => {
    if (err) return res.status(500).send('Lỗi lấy LiLink');
    res.json(results);
  });
});
app.get('/fashsale/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'SELECT * FROM listfashsale WHERE id = ?'; // Đảm bảo tên bảng đúng
  connection.query(sql, [id], (err, results) => {
    if (err) return res.status(500).send('Lỗi lấy dữ liệu');
    if (results.length === 0) return res.status(404).send('Không tìm thấy sản phẩm');
    res.json(results[0]); // Trả về object thay vì array
  });
});

app.put('/update-fashsale/:id', upload.single('image'), (req, res) => {
  const id = req.params.id;
  const { title, money, href , sale} = req.body;
  const image = req.file ? req.file.filename : null;

  let sql, params;
  if (image) {
    sql = 'UPDATE listfashsale SET image = ?, money = ?, title = ?, href = ? , sale = ?  WHERE id = ?';
    params = [image, title, money, href , sale];
  } else {
    sql = 'UPDATE listfashsale SET money = ?, title = ?, href = ? , sale = ?  WHERE id = ?';
    params = [title, money, href , sale];
  }

  connection.query(sql, params, (err) => {
    if (err) return res.status(500).send('Lỗi cập nhật sản phẩm');
    res.send('Cập nhật thành công');
  });
});

// Xóa
app.delete('/delete-fashsale/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'DELETE FROM listfashsale WHERE id = ?';

  connection.query(sql, [id], (err) => {
    if (err) return res.status(500).send('Lỗi xóa sản phẩm');
    res.send('Xóa thành công');
  });
});





// ====SearchTop====
// Thêm mới
app.post('/add-searchTop', upload.single('image'), (req, res) => {
  const { title, soluong, href } = req.body;
  const image = req.file ? req.file.filename : null;

  const sql = 'INSERT INTO listsearchTop (image, soluong, title, href) VALUES (?, ?, ?, ?)';
  connection.query(sql, [image, soluong, title, href], (err) => {
    if (err) return res.status(500).send('Lỗi thêm sản phẩm');
    res.send('Thêm sản phẩm thành công');
  });
});

// Lấy 1 item theo ID
app.get('/searchTop/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'SELECT * FROM listsearchTop WHERE id = ?';
  connection.query(sql, [id], (err, results) => {
    if (err) return res.status(500).send('Lỗi lấy dữ liệu');
    if (results.length === 0) return res.status(404).send('Không tìm thấy sản phẩm');
    res.json(results[0]); // Trả về object thay vì array
  });
});

// Lấy danh sách
app.get('/searchTop', (req, res) => {
  const sql = 'SELECT * FROM listsearchTop';
  connection.query(sql, (err, results) => {
    if (err) return res.status(500).send('Lỗi lấy danh sách');
    res.json(results);
  });
});

// Sửa
app.put('/update-searchTop/:id', upload.single('image'), (req, res) => {
  const id = req.params.id;
  const { title, soluong, href } = req.body;
  const image = req.file ? req.file.filename : null;

  let sql, params;
  if (image) {
    sql = 'UPDATE listsearchTop SET image = ?, soluong = ?, title = ?, href = ? WHERE id = ?';
    params = [image, soluong, title, href, id];
  } else {
    sql = 'UPDATE listsearchTop SET soluong = ?, title = ?, href = ? WHERE id = ?';
    params = [soluong, title, href, id];
  }

  connection.query(sql, params, (err) => {
    if (err) return res.status(500).send('Lỗi cập nhật sản phẩm');
    res.send('Cập nhật thành công');
  });
});

// Xóa
app.delete('/delete-searchTop/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'DELETE FROM listsearchTop WHERE id = ?';

  connection.query(sql, [id], (err) => {
    if (err) return res.status(500).send('Lỗi xóa sản phẩm');
    res.send('Xóa thành công');
  });
});



/// ====pay====
app.post('/add-pay', (req, res) => {
  const { name, size, price, image, quantity, name_store } = req.body;

  const sql = 'INSERT INTO listproductpay (name, size, price, image, quantity,name_store) VALUES (?, ?, ?, ?, ?, ?)';
  connection.query(sql, [name, size, price, image, quantity, name_store], (err) => {
    if (err) return res.status(500).send('Lỗi thêm sản phẩm');
    res.send('Thêm sản phẩm thành công');
  });
});
app.get('/pay', (req, res) => {
  const sql = 'SELECT * FROM listproductpay';
  connection.query(sql, (err, results) => {
    if (err) return res.status(500).send('Lỗi lấy LiLink');
    res.json(results);
  });
});
// Xóa
app.delete('/delete-Pay/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'DELETE FROM listproductpay WHERE id = ?';

  connection.query(sql, [id], (err) => {
    if (err) return res.status(500).send('Lỗi xóa sản phẩm');
    res.send('Xóa thành công');
  });
});
app.delete('/delete-all-Pay', (req, res) => {
  const sql = 'DELETE FROM listproductpay'; // Xóa hết bảng 'pay'
  connection.query(sql, (err, result) => {
      if (err) {
          console.error(err);
          res.status(500).send('Xóa thất bại');
      } else {
          res.send('Đã xóa tất cả sản phẩm trong giỏ hàng');
      }
  });
});


// ===Store====
app.post('/add-Store', upload.single('avatar'), (req, res) => {
  const { name_store, follower, join, time_feedback, ratio_feedback, product, review } = req.body;
  const avatar = req.file ? req.file.filename : null;

  // Log thêm thông tin để kiểm tra dữ liệu
  console.log('Received data:', req.body);
  console.log('Avatar:', avatar);
  console.log('File info:', req.file);

  const sql = 'INSERT INTO store (avatar, name_store, follower, \`join\`, time_feedback, ratio_feedback, product, review) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  connection.query(sql, [avatar, name_store, follower, join, time_feedback, ratio_feedback, product, review], (err, results) => {
    if (err) {
      console.error('Database error:', err);  // Log lỗi database
      return res.status(500).send('Lỗi thêm sản phẩm');
    }
    res.send('Thêm sản phẩm thành công');
  });
});

app.get('/Store', (req, res) => {
  const sql = 'SELECT * FROM store';
  connection.query(sql, (err, results) => {
    if (err) return res.status(500).send('Lỗi lấy LiLink');
    res.json(results);
  });
});
app.get('/Store/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'SELECT * FROM store WHERE id = ?'; // Đảm bảo tên bảng đúng
  connection.query(sql, [id], (err, results) => {
    if (err) return res.status(500).send('Lỗi lấy dữ liệu');
    if (results.length === 0) return res.status(404).send('Không tìm thấy sản phẩm');
    res.json(results[0]); // Trả về object thay vì array
  });
});

app.put('/update-Store/:id', upload.single('avatar'), (req, res) => {
  const id = req.params.id;
  const { name_store, follower, join, time_feedback, ratio_feedback, product, review } = req.body;
  const avatar = req.file ? req.file.filename : null;
  let sql, params;
  if (avatar) {
    sql = 'UPDATE store SET avatar = ?, name_store = ?, follower = ?, `join` = ?, time_feedback = ?, ratio_feedback = ?, product = ?, review = ? WHERE id = ?';
    params = [avatar, name_store, follower, join, time_feedback, ratio_feedback, product, review, id];
  } else {
    sql = 'UPDATE store SET name_store = ?, follower = ?, `join` = ?, time_feedback = ?, ratio_feedback = ?, product = ?, review = ? WHERE id = ?';
    params = [name_store, follower, join, time_feedback, ratio_feedback, product, review, id];
  }

  connection.query(sql, params, (err) => {
    if (err) {
      console.error('Lỗi cập nhật trong query:', err); // Log lỗi
      return res.status(500).send('Lỗi cập nhật cửa hàng');
    }
    res.send('Cập nhật thành công');
  });
});



// Xóa
app.delete('/delete-Store/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'DELETE FROM store WHERE id = ?';

  connection.query(sql, [id], (err) => {
    if (err) return res.status(500).send('Lỗi xóa sản phẩm');
    res.send('Xóa thành công');
  });
});



// Khởi động server
app.listen(port, () => {
  console.log(`Server chạy tại http://localhost:${port}`);
});




