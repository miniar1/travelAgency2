const voyageModel = require('../models/voyageModel');

exports.getVoyages = async (req, res) => {
  try {
    const voyages = await voyageModel.getAllVoyages();
    res.json(voyages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createVoyage = async (req, res) => {
  try {
    const data = req.body;
    console.log("CHECK REQ BODY", req.body, req.data , req.error);
    const voyage = await voyageModel.createVoyage(data);
    res.json(voyage);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteVoyage = async (req, res) => {
  try {
    const { id } = req.params;
    await voyageModel.deleteVoyage(id);
    res.json({ message: "Voyage supprimé" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateVoyage = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const updated = await voyageModel.updateVoyage(id, data);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
