const pool = require("../db");
const VisitorModel = {
    async getVisitorStats() {
        const result = await pool.query(
            "SELECT month, year, visitors FROM visitor_stats ORDER BY year DESC, month ASC"
        );
        return result.rows;
    },
    async addVisit(month, year){
        const checkMonth = await pool.query(
            "SELECT * FROM visitor_stats WHERE month = $1 AND year =$2",
             [month,year]
        );
        if(checkMonth.rows.length > 0) {
            await pool.query(
             "UPDATE visitor_stats SET visitors = visitors + 1 WHERE month = $1 AND year = $2",
                [month,year]
            );
        }else{
            await pool.query(
                "INSERT INTO visitor_stats (month, year, visitors) VALUES ($1, $2, 1)",
        [month, year] 
            );
        }

    },

};
module.exports = VisitorModel;