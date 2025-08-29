require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();
const port = 5001;

app.use(cors());
app.use(express.json());

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
};

app.get('/api/products', async (req, res) => {
    try {
        const connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute('SELECT * FROM name');
        await connection.end();
        res.json(rows)
    } catch (error){
        console.error('Gagal mengambil data: ', error);
        res.status(500).json({ message: 'terjadi kesalahan pada server' });
    }
});

app.post('/api/products', async (req, res) => {
    try {
        const {name, price, stock, id_category} = req.body;
        const connection = await mysql.createConnection(dbConfig);
        const [result] = await connection.execute(
            'INSERT INTO name (name, price, stock, id_category) VALUES (?, ?, ?, ?)',
            [name, price, stock, id_category]
        );
        await connection.end();
        res.status(201).json({name, price, stock, id_category});
    }catch(error){
        console.error('Gagal mengirim data: ', error)
        res.status(500).json({message: 'terjadi kesalahan pada server'})
    }
});

app.put('/api/products/:id', async (req, res) => {
    try {
        const {name, price, stock, id_category} = req.body;
        const {id} = req.params;
        const connection = await mysql.createConnection(dbConfig);
        await connection.execute(
            'UPDATE name SET name = ?, price = ?, stock = ?, id_category = ? WHERE id = ?',
            [name, price, stock, id_category, id]
        );
        await connection.end();
        res.json({id, name, price, stock, id_category})
    } catch(error) {
        console.error('Gagal mengubah data: ', error)
        res.status(500).json({message: 'terjadi kesalahan pada server'})
    }
});

app.delete('/api/products/:id', async(req, res) => {
    try{
        const {id} = req.params;
        const connection = await mysql.createConnection(dbConfig);
        await connection.execute('DELETE FROM name WHERE id =?', [id]);
        await connection.end();
        res.status(200).json({message: `data dengan id ${id} telah dihapus`});
    }catch (error){
        console.error('Gagal menghapus data: ', error)
        res.status(500).json({message: 'terjadi kesalahan pada server'})
    }
});

app.get('/api/products/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute('SELECT * FROM name WHERE id = ?', [id]);
        await connection.end();
        if (rows.length > 0) {
            res.json(rows[0]);
        } else {
            res.status(404).json({ message: 'data tidak ditemukan' });
        }
    } catch (error) {
        res.status(500).json({ message: 'terjadi kesalahan pada server' })
    }
});

app.listen(port, () => {
    console.log(`server berjalan`)
});