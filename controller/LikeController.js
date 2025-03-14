const conn = require('../mariadb');
const { StatusCodes } = require('http-status-codes');

const addLike = (req, res) => {
  const likedBookId = req.params.id;
  const { userId } = req.body;

  const sql = 'INSERT INTO likes (user_id, liked_book_id) VALUES (?, ?)';
  const values = [userId, likedBookId];
  conn.query(sql, values, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }

    return res.status(StatusCodes.CREATED).json(result);
  });
};

const removeLike = (req, res) => {
  const likedBookId = req.params.id;
  const { userId } = req.body;

  const sql = 'DELETE FROM likes WHERE user_id =? AND liked_book_id = ?';
  const values = [userId, likedBookId];
  conn.query(sql, values, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }

    return res.status(StatusCodes.OK).json(result);
  });
};

module.exports = {
  addLike,
  removeLike,
};
