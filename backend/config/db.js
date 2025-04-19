const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  port: 5433,
  password: 'Mx12?Ry#',
  database: 'travelAgency',
});
pool
  .connect()
  .then(() => {
    console.log('Connexion à la base de données réussie !');
  })
  .catch((err) => {
    console.error('Erreur de connexion à la base de données :', err);
  });
module.exports = pool;
