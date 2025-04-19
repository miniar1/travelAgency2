const express = require('express');
const cors = require('cors');
const voyageRoutes = require('./routes/voyageRoutes');

const app = express(); // <= tu avais oublié ça !

app.use(cors());
app.use(express.json());
app.use('/api/voyages', voyageRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
