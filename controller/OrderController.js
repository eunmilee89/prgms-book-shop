const mysql = require('mysql2/promise');
const { StatusCodes } = require('http-status-codes');

const order = async (req, res) => {
  const conn = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'Bookshop',
    dateStrings: true,
  });

  const { items, delivery, totalQuantity, totalPrice, userId, firstBookTitle } =
    req.body;

  let sql =
    'INSERT INTO deliveries (address, receiver, contact) VALUES (?, ?, ?)';
  let values = [delivery.address, delivery.receiver, delivery.contact];
  let [result] = await conn.execute(sql, values);
  const deliveryId = result.insertId;

  sql =
    'INSERT INTO orders (book_title, total_quantity, total_price, user_id, delivery_id) VALUES (?, ?, ?, ?, ?)';
  values = [firstBookTitle, totalQuantity, totalPrice, userId, deliveryId];
  [result] = await conn.execute(sql, values);
  const orderId = result.insertId;

  sql = 'SELECT book_id, quantity FROM cartItems WHERE id IN (?)';
  [orderItems, fields] = await conn.query(sql, [items]);

  sql = 'INSERT INTO orderedBooks (order_id, book_id, quantity) VALUES ?';
  values = [];
  orderItems.forEach((item) => {
    console.log(item);
    values.push([orderId, item.book_id, item.quantity]);
  });

  result = await conn.query(sql, [values]);

  result = await deleteCartItems(conn, items);

  return res.status(StatusCodes.CREATED).json(result[0]);
};

const deleteCartItems = async (conn, items) => {
  let sql = `DELETE FROM cartItems WHERE id IN (?)`;

  let result = await conn.query(sql, [items]);
  return result;
};

const getOrders = async (req, res) => {
  const conn = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'Bookshop',
    dateStrings: true,
  });

  let sql =
    'SELECT orders.id, created_at, address, receiver, contact, book_title, total_quantity, total_price FROM orders LEFT JOIN deliveries ON orders.delivery_id = deliveries.id';
  let [rows, fields] = await conn.query(sql);
  return res.status(StatusCodes.OK).json(rows);
};

const getOrderDetail = async (req, res) => {
  const id = parseInt(req.params.id);
  const conn = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'Bookshop',
    dateStrings: true,
  });

  let sql =
    'SELECT book_id, title, author, price, quantity FROM orderedBooks LEFT JOIN books ON orderedBooks.book_id = books.id WHERE order_id = ?';
  let [rows, fields] = await conn.query(sql, id);
  return res.status(StatusCodes.OK).json(rows);
};

module.exports = {
  order,
  getOrders,
  getOrderDetail,
};
