const express = require('express');
const db = require('./initdb');
const geoip = require('geoip-lite');
const app = express();
const fs = require('fs')
const path = require('path');
const port = 3000;
const morgan = require('morgan');

app.use(morgan('combined'));

app.use(morgan('combined', {
    stream: fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
  }))

app.get('/', (req, res) => {
    res.send('Hola Mundo');
});

app.get('/imagenes', (req, res) => {
    const ip = req.ip;
    const userAgent = req.get('User-Agent');
    const fecha = new Date().toISOString();
    const Localizacion = geoip.lookup(ip);
    const insert = db.prepare("INSERT INTO usuarios (ip, userAgent, Localizacion, fecha) VALUES (?, ?, ?, ?)");
    insert.run(ip, userAgent, Localizacion.city, fecha);
    const imagenes = [
        "1.jpg",
        "2.jpg",
        "3.jpg",
        "4.jpg",
        "5.jpg"
    ];
    
    const numeroAleatorio = Math.floor(Math.random() * imagenes.length);

    res.sendFile(__dirname + `/${imagenes[numeroAleatorio]}`);
});

app.get('/usuarios', (req, res) => {
    const stmt = "SELECT * FROM usuarios";
    const usuarios = db.prepare(stmt).all();
    res.json(usuarios);
});
    
    app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

