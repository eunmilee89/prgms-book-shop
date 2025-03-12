const conn = require('../mariadb');
const { StatusCodes } = require('http-status-codes');

const allBooks = (req, res) => {
  const { categoryId } = req.query;

  if (categoryId) {
    const sql = 'SELECT * FROM books WHERE category_id = ?';
    conn.query(sql, categoryId, (err, result) => {
      if (err) {
        return res.status(StatusCodes.BAD_REQUEST).end();
      }
      if (result.length) {
        return res.status(StatusCodes.OK).json(result);
      } else {
        return res.status(StatusCodes.NOT_FOUND).end();
      }
    });
  } else {
    const sql = 'SELECT * FROM books';
    conn.query(sql, (err, result) => {
      if (err) {
        return res.status(StatusCodes.BAD_REQUEST).end();
      }

      return res.status(StatusCodes.OK).json(result);
    });
  }
};

const bookDetail = (req, res) => {
  const id = parseInt(req.params.id);

  const sql = 'SELECT * FROM books WHERE id = ?';
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
