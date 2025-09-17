// Backend básico en Node.js para manejo de conceptos

const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

// Almacenamiento en memoria de los conceptos
let conceptos = [];
let nextId = 1;

// Función para enviar respuestas JSON
function sendJSON(res, status, data) {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
}

// Servidor HTTP
const server = http.createServer((req, res) => {
  // Agregar headers CORS para permitir peticiones desde el navegador
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Manejar preflight OPTIONS
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const parsedUrl = url.parse(req.url, true);
  const pathUrl = parsedUrl.pathname;
  const method = req.method;

  // Servir archivos estáticos
  if (method === 'GET' && (pathUrl === '/' || pathUrl === '/index.html')) {
    const filePath = path.join(__dirname, 'index.html');
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end('Error interno');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      }
    });
    return;
  }
  if (method === 'GET' && pathUrl === '/style.css') {
    const filePath = path.join(__dirname, 'style.css');
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end('No encontrado');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/css' });
        res.end(data);
      }
    });
    return;
  }
  if (method === 'GET' && pathUrl === '/main.js') {
    const filePath = path.join(__dirname, 'main.js');
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end('No encontrado');
      } else {
        res.writeHead(200, { 'Content-Type': 'application/javascript' });
        res.end(data);
      }
    });
    return;
  }

  // GET /conceptos - Listar todos los conceptos
  if (method === 'GET' && pathUrl === '/conceptos') {
    sendJSON(res, 200, conceptos);
    return;
  }

  // GET /conceptos/:id - Obtener un concepto por id
  if (method === 'GET' && pathUrl.startsWith('/conceptos/')) {
    const id = parseInt(pathUrl.split('/')[2]);
    const concepto = conceptos.find(c => c.id === id);
    if (concepto) {
      sendJSON(res, 200, concepto);
    } else {
      sendJSON(res, 404, { error: 'Concepto no encontrado' });
    }
    return;
  }

  // POST /conceptos - Crear un nuevo concepto
  if (method === 'POST' && pathUrl === '/conceptos') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        if (data.nombre && data.descripcion) {
          const concepto = {
            id: nextId++,
            nombre: data.nombre,
            descripcion: data.descripcion
          };
          conceptos.push(concepto);
          sendJSON(res, 201, concepto);
        } else {
          sendJSON(res, 400, { error: 'Datos incompletos' });
        }
      } catch (e) {
        sendJSON(res, 400, { error: 'JSON inválido' });
      }
    });
    return;
  }

  // DELETE /conceptos - Eliminar todos los conceptos
  if (method === 'DELETE' && pathUrl === '/conceptos') {
    conceptos = [];
    sendJSON(res, 200, { mensaje: 'Todos los conceptos eliminados' });
    return;
  }

  // DELETE /conceptos/:id - Eliminar un concepto por id
  if (method === 'DELETE' && pathUrl.startsWith('/conceptos/')) {
    const id = parseInt(pathUrl.split('/')[2]);
    const index = conceptos.findIndex(c => c.id === id);
    if (index !== -1) {
      conceptos.splice(index, 1);
      sendJSON(res, 200, { mensaje: 'Concepto eliminado' });
    } else {
      sendJSON(res, 404, { error: 'Concepto no encontrado' });
    }
    return;
  }

  // Ruta no encontrada
  sendJSON(res, 404, { error: 'Ruta no encontrada' });
});

// Puerto de escucha
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});