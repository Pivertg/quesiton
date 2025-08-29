const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Sert ton fichier love.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "love.html"));
});

// Sert aussi les fichiers statiques (CSS, JS, images…)
app.use(express.static(__dirname));

// Lancement du serveur
app.listen(PORT, () => {
  console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
});
