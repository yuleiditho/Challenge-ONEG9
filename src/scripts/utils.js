let messageTimeout = null;

export function validarInput(texto) {
    return /^[A-Za-zÀ-ÿ\u00f1\u00d1\s]+$/.test(texto);
}

export function capitalCase(texto) {
    return texto
        .split(" ")
        .map(palabra =>
            palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase()
        )
        .join(" ");
}

export function mostrarMensaje(mensaje, texto, tipo) {
    clearMessageTimeout();

    mensaje.textContent = texto;
    mensaje.className = `mensaje ${tipo}`;
    mensaje.classList.remove('hidden');

    messageTimeout = setTimeout(() => {
        mensaje.classList.add('hidden');
    }, 3000);
}

export function clearMessageTimeout() {
    if (messageTimeout) {
        clearTimeout(messageTimeout);
        messageTimeout = null;
    }
}
