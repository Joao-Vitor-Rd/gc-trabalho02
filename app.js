const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3001;

app.use(express.json());

mongoose.connect('mongodb://mongo:27017/meuBanco', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
    console.log('Conectado ao MongoDB');
})
.catch((err) => {
    console.error('Erro ao conectar ao MongoDB', err);
});

const Item = mongoose.model('Item', { name: String, price: Number, category: String, quantity: Number });

app.post('/itens', async (req, res) => {
  const { name, price, category, quantity } = req.body;
  const item = new Item({ name, price, category, quantity });
  await item.save();
  res.status(201).json({ message: 'Item adicionado', item });
});

app.get('/itens', async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

app.get('/itens/:id', async (req, res) => {
    console.log("RETORNO ID:");
    console.log(req.params.id);
    const items = await Item.findById(req.params.id).exec();
    res.json(items);
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});