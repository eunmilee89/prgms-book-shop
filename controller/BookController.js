const conn = require('../mariadb');
const { StatusCodes } = require('http-status-codes');

const allBooks = (req, res) => {
  const { news, limit, currentPage, categoryId } = req.query;

  const offset = limit * (currentPage - 1);
  let sql = 'SELECT * FROM books';
  let values = [];

  if (categoryId && news) {
    sql +=
      ' WHERE category_id = ? AND pub_date BETWEEN DATE_SUB(NOW(), INTERVAL 1 MONTH) AND NOW()';
    values.push(categoryId);
  } else if (categoryId) {
    sql += ' WHERE category_id = ?';
    values.push(categoryId);
  } else if (news) {
    sql +=
      ' WHERE pub_date BETWEEN DATE_SUB(NOW(), INTERVAL 1 MONTH) AND NOW()';
  }

  sql += ' LIMIT ? OFFSET ?';
  values.push(parseInt(limit), offset);

  conn.query(sql, values, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }
    if (result.length) {
      return res.status(StatusCodes.OK).json(result);
    } else {
      return res.status(StatusCodes.NOT_FOUND).end();
    }
  });
};

const bookDetail = (req, res) => {
  const id = parseInt(req.params.id);

  const sql =
    'SELECT * FROM books LEFT JOIN categories ON books.category_id = categories.id  WHERE books.id = ?';
  conn.query(sql, id, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }

    if (result[0]) {
      return res.status(StatusCodes.OK).json(result);
    } else {
      return res.status(StatusCodes.NOT_FOUND).end();
    }
  });
};

module.exports = {
  allBooks,
  bookDetail,
};
