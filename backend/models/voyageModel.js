const pool = require('../config/db');

//const getAllVoyages = async () => {
  //  const result = await pool.query('SELECT * FROM voyage ORDER BY idVoyage DESC')

//return result.rows;
//};

const createVoyage = async (data) => {
  const { nomVoyage, description, prix, dateDepart, dateRetour, typeVoyage, image,promotion}=data;
  const result = await pool.query(
    `INSERT INTO voyage(nomVoyage, description, prix, typeVoyage, dateDepart, dateRetour, image, promotion, created_at, updated_at)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW(), NOW()) RETURNING *`
    [nomVoyage, description, prix, typeVoyage, dateDepart, dateRetour, image, promotion]
  );
  return result.rows[0];
};

const deleteVoyage = async (id) => {
  await pool.query('DELETE FROM voyage WHERE idVoyage = $1', [id]);
};

const updateVoyage = async (id, data) => {
  const { nomVoyage, description, prix, dateDepart, dateRetour, typeVoyage, promotion}=data;
  const result = await pool.query(
    `UPDATE voyage SET nomVoyage = $1, description = $2, prix = $3, dateDepart = $4, dateRetour = $5, typeVoyage = $6, promotion = $7
     WHERE idVoyage= $8 RETURNING *`,
    [nomVoyage, description, prix, dateDepart, dateRetour, typeVoyage, promotion, id]
  );
  return result.rows[0];
};

module.exports = {
 // getAllVoyages,
  createVoyage,
  deleteVoyage,
  updateVoyage
};
