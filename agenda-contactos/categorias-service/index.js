const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 3001;
const DATA_FILE = 'data.json';

app.use(cors());
app.use(bodyParser.json());

function readData() {
  const raw = fs.readFileSync(DATA_FILE);
  return JSON.parse(raw);
}

function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

// GET /categorias
app.get('/categorias', (req, res) => {
  const data = readData();
  res.json(data.categorias);
});

// POST /categorias
app.post('/categorias', (req, res) => {
  const { nombre } = req.body;
  if (!nombre) return res.status(400).json({ error: 'Nombre es requerido' });

  const data = readData();
  const nuevaCategoria = { id: uuidv4(), nombre };
  data.categorias.push(nuevaCategoria);
  writeData(data);

  res.status(201).json(nuevaCategoria);
});

// PUT /categorias/:id
app.put('/categorias/:id', (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;

  const data = readData();
  const categoria = data.categorias.find(c => c.id === id);
  if (!categoria) return res.status(404).json({ error: 'Categoría no encontrada' });

  categoria.nombre = nombre;
  writeData(data);
  res.json(categoria);
});

// DELETE /categorias/:id
app.delete('/categorias/:id', (req, res) => {
  const { id } = req.params;
  const data = readData();

  const index = data.categorias.findIndex(c => c.id === id);
  if (index === -1) return res.status(404).json({ error: 'Categoría no encontrada' });

  const eliminada = data.categorias.splice(index, 1);
  writeData(data);

  res.json(eliminada[0]);
});

app.listen(PORT, () => {
  console.log(`categorias-service corriendo en http://localhost:${PORT}`);
});