const API_URL = 'http://localhost:4000/api/peliculas';

const form = document.getElementById('form-pelicula');
const lista = document.getElementById('lista-peliculas');
const formTitulo = document.getElementById('form-titulo');
const btnGuardar = document.getElementById('btn-guardar');
const btnCancelar = document.getElementById('btn-cancelar');
const cajaMensaje = document.getElementById('mensaje');
const inputId = document.getElementById('pelicula-id');

const campos = ['titulo', 'genero', 'anio', 'director', 'calificacion'];

// ---------- Utilidades ----------

// Muestra un mensaje de éxito o error al usuario
let temporizadorMensaje;
const mostrarMensaje = (texto, tipo = 'exito') => {
  cajaMensaje.textContent = texto;
  cajaMensaje.className = `mensaje mensaje-${tipo}`;
  cajaMensaje.hidden = false;
  clearTimeout(temporizadorMensaje);
  temporizadorMensaje = setTimeout(() => (cajaMensaje.hidden = true), 4000);
};

// Hace la petición y devuelve `data`, o lanza un error con el mensaje de la API
const peticion = async (url, opciones = {}) => {
  let respuesta;
  try {
    respuesta = await fetch(url, {
      headers: { 'Content-Type': 'application/json' },
      ...opciones,
    });
  } catch {
    throw new Error('No se pudo conectar con la API. ¿Está el servidor encendido en el puerto 4000?');
  }

  const resultado = await respuesta.json().catch(() => null);
  if (!respuesta.ok || !resultado || !resultado.ok) {
    throw new Error(resultado?.mensaje || `Error inesperado (código ${respuesta.status})`);
  }
  return resultado.data;
};

// ---------- Leer ----------

const obtenerPeliculas = async () => {
  try {
    const peliculas = await peticion(API_URL);
    renderizar(peliculas);
  } catch (error) {
    lista.innerHTML = '';
    mostrarMensaje(error.message, 'error');
  }
};

// Pinta la lista en el HTML (con textContent para evitar inyección de HTML)
const renderizar = (peliculas) => {
  lista.innerHTML = '';

  if (peliculas.length === 0) {
    const vacio = document.createElement('li');
    vacio.className = 'vacio';
    vacio.textContent = 'No hay películas registradas todavía.';
    lista.appendChild(vacio);
    return;
  }

  peliculas.forEach((pelicula) => {
    const li = document.createElement('li');
    li.className = 'card pelicula';

    const titulo = document.createElement('h3');
    titulo.textContent = `${pelicula.titulo} (${pelicula.anio})`;

    const genero = document.createElement('span');
    genero.className = 'etiqueta';
    genero.textContent = pelicula.genero;

    const detalle = document.createElement('p');
    detalle.textContent = `Director: ${pelicula.director} | Calificación: ⭐ ${pelicula.calificacion}/10`;

    const acciones = document.createElement('div');
    acciones.className = 'actions';

    const btnEditar = document.createElement('button');
    btnEditar.className = 'btn btn-secondary';
    btnEditar.textContent = 'Editar';
    btnEditar.addEventListener('click', () => editarPelicula(pelicula._id));

    const btnEliminar = document.createElement('button');
    btnEliminar.className = 'btn btn-danger';
    btnEliminar.textContent = 'Eliminar';
    btnEliminar.addEventListener('click', () => eliminarPelicula(pelicula._id, pelicula.titulo));

    acciones.append(btnEditar, btnEliminar);
    li.append(titulo, genero, detalle, acciones);
    lista.appendChild(li);
  });
};

// ---------- Crear / Actualizar ----------

const salirModoEdicion = () => {
  form.reset();
  inputId.value = '';
  formTitulo.textContent = 'Agregar Película';
  btnGuardar.textContent = 'Guardar Película';
  btnCancelar.style.display = 'none';
};

form.addEventListener('submit', async (evento) => {
  evento.preventDefault();

  const id = inputId.value;
  const datos = {
    titulo: document.getElementById('titulo').value.trim(),
    genero: document.getElementById('genero').value.trim(),
    anio: Number(document.getElementById('anio').value),
    director: document.getElementById('director').value.trim(),
    calificacion: Number(document.getElementById('calificacion').value),
  };

  btnGuardar.disabled = true;
  try {
    if (id) {
      await peticion(`${API_URL}/${id}`, { method: 'PUT', body: JSON.stringify(datos) });
      mostrarMensaje(`"${datos.titulo}" se actualizó correctamente.`);
    } else {
      await peticion(API_URL, { method: 'POST', body: JSON.stringify(datos) });
      mostrarMensaje(`"${datos.titulo}" se agregó al catálogo.`);
    }
    salirModoEdicion();
    obtenerPeliculas();
  } catch (error) {
    mostrarMensaje(error.message, 'error');
  } finally {
    btnGuardar.disabled = false;
  }
});

btnCancelar.addEventListener('click', salirModoEdicion);

// Carga los datos de una película en el formulario para editarla
const editarPelicula = async (id) => {
  try {
    const pelicula = await peticion(`${API_URL}/${id}`);
    inputId.value = pelicula._id;
    campos.forEach((campo) => {
      document.getElementById(campo).value = pelicula[campo];
    });
    formTitulo.textContent = 'Editar Película';
    btnGuardar.textContent = 'Actualizar Película';
    btnCancelar.style.display = 'inline-block';
    form.scrollIntoView({ behavior: 'smooth' });
  } catch (error) {
    mostrarMensaje(error.message, 'error');
  }
};

// ---------- Eliminar ----------

const eliminarPelicula = async (id, titulo) => {
  if (!confirm(`¿Seguro que deseas eliminar "${titulo}"?`)) return;
  try {
    await peticion(`${API_URL}/${id}`, { method: 'DELETE' });
    mostrarMensaje(`"${titulo}" fue eliminada.`);
    if (inputId.value === id) salirModoEdicion();
    obtenerPeliculas();
  } catch (error) {
    mostrarMensaje(error.message, 'error');
  }
};

// Carga inicial
obtenerPeliculas();
