const database = require('./index');

const rowExists = (table, id, keyId='id') => {
  return new Promise((resolve, reject) => {
    database.query(`SELECT * FROM ${table} WHERE ${keyId}="${id} LIMIT 1";`, (error, results) => {
      if (error)
        return reject(error);

      resolve(results.length > 0);
    });
  });
}

module.exports = {
  rowExists,
};
