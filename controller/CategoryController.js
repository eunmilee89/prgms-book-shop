const conn = require('../mariadb');
const { StatusCodes } = require('http-status-codes');

const allCategory = (req, res) => {
  const sql = 'SELECT * FROM categories';
  conn.query(sql, (err, result) => {
    if (err) {
      return res.status(StatusCodes.BAD_REQUEST).end();
    }

    return res.status(StatusCodes.OK).json(result);
  });
};

module.exports = { allCategory };
