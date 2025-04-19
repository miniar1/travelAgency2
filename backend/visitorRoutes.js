// routes/visitorRoutes.js
const express = require("express");
const router = express.Router();
const VisitorModel = require("../models/VisitorModel");

// Route GET: retourner les stats
router.get("/visitors", async (req, res) => {
  try {
    const stats = await VisitorModel.getVisitorStats();
    res.json(stats);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// Route POST: ajouter une visite
router.post("/visitors/add", async (req, res) => {
  try {
    const now = new Date();
    const month = now.toLocaleString("default", { month: "long" }); // "April"
    const year = now.getFullYear();

    await VisitorModel.addVisit(month, year);
    res.json({ message: "Visite enregistrée" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

module.exports = router;
