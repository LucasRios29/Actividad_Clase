# Actividad Clase - Backend y Frontend Básico

## Descripción

Aplicación web para ingresar, visualizar y eliminar conceptos vistos en la materia. Utiliza Node.js puro para el backend y HTML/CSS/JS para el frontend. No se emplean frameworks ni librerías externas.

---

## Instalación y Ejecución

1. Clona el repositorio:
   ```
   git clone https://github.com/LucasRios29/Actividad_Clase.git
   ```
2. Instala dependencias:
   ```
   npm install
   ```
3. Inicia el servidor:
   ```
   npm start
   ```
4. Abre tu navegador y accede a [http://localhost:3000/](http://localhost:3000/)

---

## Funcionalidades

- **Agregar concepto:** Completa el formulario y presiona "Agregar Concepto".
- **Visualizar conceptos:** Se listan todos los conceptos ingresados.
- **Eliminar concepto:** Presiona "Eliminar" junto al concepto deseado.
- **Eliminar todos:** Presiona "Eliminar Todos" para borrar todos los conceptos.

---

## API REST

- `GET /conceptos`  
  Devuelve el listado de todos los conceptos.

- `GET /conceptos/:id`  
  Devuelve la información de un concepto por su id.

- `POST /conceptos`  
  Crea un nuevo concepto.  
  Ejemplo de body:
  ```json
  {
    "nombre": "Node.js",
    "descripcion": "Entorno de ejecución para JavaScript en el servidor"
  }
  ```

- `DELETE /conceptos`  
  Elimina todos los conceptos.

- `DELETE /conceptos/:id`  
  Elimina el concepto con el id indicado.

---

## Pruebas

Las capturas de pantalla de cada caso de prueba solicitado se encuentran en la carpeta [`docs`](docs) del proyecto:

- `docs/agregar_concepto.png` — Agregar concepto
- `docs/eliminar_concepto.png` — Eliminar concepto individual
- `docs/eliminar_todos.png` — Eliminar todos los conceptos
- `docs/get_concepto_id.png` — Obtener concepto por id (API)

---

## Estructura de ramas

- `main`: Rama de producción.
- `test`: Rama para pruebas y desarrollo.

---

## Conclusiones

Para hacer este trabajo me apoyé bastante en inteligencia artificial, que me ayudó a entender cómo armar la API REST y cómo funciona el backend con Node.js. Gracias a eso pude organizar las rutas y conectar el frontend con el servidor.

Todavía me falta practicar y aprender más sobre todo lo que vimos en clase, sobre todo Node.js, Postman, JavaScript y cómo hacer las interfaces con HTML y CSS. Creo que seguir practicando y buscando info extra me va a ayudar a manejar mejor estos temas y poder hacer proyectos por mi cuenta.

---

## Autor