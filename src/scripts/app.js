import { validarInput, capitalCase, mostrarMensaje, clearMessageTimeout } from './utils.js';

document.addEventListener('DOMContentLoaded', function () {
    let friends = [];

    // Obtener referencias a los elementos del DOM
    const formAmigo = document.getElementById('formAmigo');
    const inputAmigo = document.getElementById('amigo');
    const btnSortear = document.getElementById('btnSortear');
    const listaAmigos = document.getElementById('listaAmigos');
    const mensaje = document.getElementById('mensaje');
    const resultado = document.getElementById('resultado');
    const amigoSecreto = document.getElementById('amigoSecreto');
    const btnReiniciar = document.getElementById('btnReiniciar');

    // Configurar event listeners
    formAmigo.addEventListener("submit", handleFormSubmit);
    btnSortear.addEventListener("click", sortearAmigo);
    inputAmigo.addEventListener("input", clearMessageOnType);
    btnReiniciar.addEventListener("click", reiniciarApp);

    function handleFormSubmit(e) {
        e.preventDefault();
        agregarAmigo();
    }

    // Función para limpiar mensajes cuando el usuario comienza a escribir
    function clearMessageOnType() {
        if (!mensaje.classList.contains('hidden')) {
            clearMessageTimeout();
            mensaje.classList.add('hidden');
        }
    }

    // Función para actualizar la lista de amigos en la interfaz
    function actualizarListaAmigos() {
        listaAmigos.innerHTML = '';

        if (friends.length === 0) {
            const p = document.createElement('p');
            p.textContent = 'No hay amigos en la lista';
            p.className = 'empty-message';
            listaAmigos.appendChild(p);
            return;
        }

        friends.forEach((friend, index) => {
            const li = document.createElement('li');
            li.className = 'list-item';

            const span = document.createElement('span');
            span.textContent = friend;

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Eliminar';
            deleteBtn.className = 'delete-btn';
            deleteBtn.addEventListener('click', () => eliminarAmigo(index));

            li.appendChild(span);
            li.appendChild(deleteBtn);
            listaAmigos.appendChild(li);
        });

    }

    // Función para eliminar un amigo de la lista
    function eliminarAmigo(index) {
        const deletedFriend = friends[index];
        friends = friends.filter((e, friend) => friend !== index);
        actualizarListaAmigos();
        mostrarMensaje(mensaje, `Amigo "${deletedFriend}" eliminado de la lista`, 'warning');

        // Si no quedan amigos, ocultar el resultado
        if (friends.length === 0) {
            resultado.classList.add('hidden');
        }
    }

    // Función que permite al usuario ingresar un nombre y añade a lista de amigos creada
    function agregarAmigo() {
        const addFriend = capitalCase(inputAmigo.value.trim());

        if (addFriend === '') {
            mostrarMensaje(mensaje, 'El campo no puede estar vacío', 'error');
            inputAmigo.focus();
            return;
        }

        if (friends.includes(addFriend)) {
            mostrarMensaje(mensaje, 'Este amigo ya está en la lista', 'warning');
            inputAmigo.focus();
            return;
        }

        if (!validarInput(addFriend)) {
            mostrarMensaje(mensaje, 'Solo se permiten letras sin números ni símbolos', 'warning');
            inputAmigo.focus();
            return;
        }

        if (addFriend.length <= 2){
            mostrarMensaje(mensaje, 'El nombre debe tener al menos 3 caracteres', 'warning');
            inputAmigo.focus();
            return;
        }

        friends.push(addFriend);
        inputAmigo.value = '';
        actualizarListaAmigos();
        mostrarMensaje(mensaje, `Amigo "${addFriend}" agregado correctamente`, 'success');

        // Ocultar resultado si se agrega un nuevo amigo después del sorteo
        resultado.classList.add('hidden');

        // Enfocar el input para seguir escribiendo
        inputAmigo.focus();
    }

    // Función para sortear el amigo secreto
    function sortearAmigo() {
        if (friends.length < 2) {
            mostrarMensaje(mensaje, 'Debes agregar al menos 2 amigos para sortear', 'error');
            return;
        }

        const randomFriend = Math.floor(Math.random() * friends.length);
        const amigoElegido = friends[randomFriend];

        amigoSecreto.textContent = amigoElegido;
        resultado.classList.remove('hidden');
    
        resultado.scrollIntoView({ behavior: 'smooth' });
    }

    function reiniciarApp() {
        friends = [];
        inputAmigo.value = '';
        actualizarListaAmigos();
        resultado.classList.add('hidden');
        mostrarMensaje(mensaje, 'La lista se ha reiniciado correctamente', 'success');
    }

    // Inicializar la lista de amigos
    actualizarListaAmigos();
});