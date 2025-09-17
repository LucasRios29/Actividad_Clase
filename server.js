const http = require('http');
const url = require('url');
const fs = require('fs');

const servidor = http.createServer((req, res) =>{
});

servidor.listen(3000, () => {
    console.log("Servidor ejecutándose");
});