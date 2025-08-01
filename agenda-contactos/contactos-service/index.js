const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 3002;
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

// GET /contactos
app.get('/contactos', (req, res) => {
  const data = readData();
  res.json(data.contactos);
});

// POST /contactos
app.post('/contactos', (req, res) => {
  const { nombre, telefono, email, idCategoria } = req.body;
  if (!nombre || !telefono || !idCategoria) {
    return res.status(400).json({ error: 'Nombre, teléfono e idCategoria son obligatorios' });
  }

  const data = readData();
  const nuevoContacto = {
    id: uuidv4(),
    nombre,
    telefono,
    email: email || '',
    idCategoria
  };

  data.contactos.push(nuevoContacto);
  writeData(data);

  res.status(201).json(nuevoContacto);
});

// PUT /contactos/:id
app.put('/contactos/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, telefono, email, idCategoria } = req.body;

  const data = readData();
  const contacto = data.contactos.find(c => c.id === id);
  if (!contacto) return res.status(404).json({ error: 'Contacto no encontrado' });

  contacto.nombre = nombre || contacto.nombre;
  contacto.telefono = telefono || contacto.telefono;
  contacto.email = email || contacto.email;
  contacto.idCategoria = idCategoria || contacto.idCategoria;

  writeData(data);
  res.json(contacto);
});

// DELETE /contactos/:id
app.delete('/contactos/:id', (req, res) => {
  const { id } = req.params;
  const data = readData();

  const index = data.contactos.findIndex(c => c.id === id);
  if (index === -1) return res.status(404).json({ error: 'Contacto no encontrado' });

  const eliminado = data.contactos.splice(index, 1);
  writeData(data);

  res.json(eliminado[0]);
});

app.listen(PORT, () => {
  console.log(`contactos-service corriendo en http://localhost:${PORT}`);
});