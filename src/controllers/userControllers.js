const database = require("../../database");

const getUsers = (req, res) => {
  let initialSql = "select * from users";
  const sqlValues = [];

  if (req.query.language != null) {
    initialSql += " where language = ?";
    sqlValues.push(req.query.language);

    if (req.query.city != null) {
      initialSql += " and city = ?";
      sqlValues.push(req.query.city);
    }
  } else if (req.query.city != null) {
    initialSql += " where city = ?";
    sqlValues.push(req.query.city);
  }

  database
    .query(initialSql, sqlValues)
    .then(([users]) => {
      if (sqlValues.length < 1) {
        res.sendStatus(200);
      }
      res.status(200).json(users);
    })
    .catch((err) => {
      res.sendStatus(500);
    });
};

const getUserById = (req, res) => {
  const id = parseInt(req.params.id);

  database
    .query("select * from users where id = ?", [id])
    .then(([users]) => {
      if (users[0] != null) {
        res.status(200).json(users[0]);
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  getUsers,
  getUserById,
};
