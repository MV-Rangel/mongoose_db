const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.static('.'));

// Modelo do usuário
const Usuario = mongoose.model('Usuario', {
    nome: String
});

// Conexão com MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Conectado ao MongoDB'))
    .catch(err => console.error('Erro de conexão:', err));

// Rotas
app.post('/api/usuarios', async (req, res) => {
    try {
        const usuario = new Usuario(req.body);
        await usuario.save();
        res.status(201).json(usuario);
    } catch (error) {
        res.status(400).json({ error: error.message });
    } // Faltava esta chave
});

app.get('/api/usuarios', async (req, res) => {
    try {
        const usuarios = await Usuario.find();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ error: error.message });
    } // Faltava esta chave
});

app.delete('/api/usuarios/:id', async (req, res) => {
    try {
        await Usuario.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Usuário deletado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    } // Faltava esta chave
});

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
