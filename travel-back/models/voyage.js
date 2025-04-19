// models/voyage.js
const pool = require('../config/db');

const voyageModel = {
    getAllVoyages: async () => {
        const result = await pool.query('SELECT * FROM voyage ORDER BY created_at DESC');
        return result.rows;
    },

    getVoyageById: async (id) => {
        const result = await pool.query('SELECT * FROM voyage WHERE id = $1', [id]);
        return result.rows[0];
    },

    createVoyage: async (data) => {
        const { nomVoyage, description, prix, dateDepart, dateRetour, typeVoyage, image, promotion } = data;
        const result = await pool.query(
            `INSERT INTO voyage(nomVoyage, description, prix, typeVoyage, dateDepart, dateRetour, image, promotion, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW(), NOW()) RETURNING *`,
            [nomVoyage, description, prix, typeVoyage, dateDepart, dateRetour, image, promotion]
        );
        return result.rows[0];
    },

    updateVoyage: async (id, data) => {
        const { nomVoyage, description, prix, dateDepart, dateRetour, typeVoyage, image, promotion } = data;
        const result = await pool.query(
            `UPDATE voyage SET 
               nomVoyage = $1, 
               description = $2, 
               prix = $3, 
               typeVoyage = $4, 
               dateDepart = $5, 
               dateRetour = $6, 
               image = $7, 
               promotion = $8, 
               updated_at = NOW() 
               WHERE id = $9 RETURNING *`,
            [nomVoyage, description, prix, typeVoyage, dateDepart, dateRetour, image, promotion, id]
        );
        return result.rows[0];
    },

    deleteVoyage: async (id) => {
        const result = await pool.query('DELETE FROM voyage WHERE id = $1 RETURNING *', [id]);
        return result.rows[0];
    }
};

module.exports = voyageModel;