// Frontend para interactuar con el backend de conceptos

const API = 'http://localhost:3000/conceptos';

const lista = document.getElementById('listaConceptos');
const form = document.getElementById('conceptoForm');
const eliminarTodosBtn = document.getElementById('eliminarTodos');

// Mostrar conceptos
async function cargarConceptos() {
  lista.innerHTML = '';
  const res = await fetch(API);
  const conceptos = await res.json();
  conceptos.forEach(c => {
    const li = document.createElement('li');
    li.innerHTML = `<span><strong>${c.nombre}:</strong> ${c.descripcion}</span>
      <button onclick="eliminarConcepto(${c.id})">Eliminar</button>`;
    lista.appendChild(li);
  });
}

// Agregar concepto
form.onsubmit = async e => {
  e.preventDefault();
  const nombre = document.getElementById('nombre').value.trim();
  const descripcion = document.getElementById('descripcion').value.trim();
  if (!nombre || !descripcion) return;
  await fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre, descripcion })
  });
  form.reset();
  cargarConceptos();
};

// Eliminar todos
eliminarTodosBtn.onclick = async () => {
  await fetch(API, { method: 'DELETE' });
  cargarConceptos();
};

// Eliminar uno
window.eliminarConcepto = async id => {
  await fetch(`${API}/${id}`, { method: 'DELETE' });
  cargarConceptos();
};

// Inicializar
cargarConceptos();