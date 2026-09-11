// TROVIRUSES
// Central application event system.

const AppEvents = new EventTarget();

function emitEvent(name, detail = {}) {
    AppEvents.dispatchEvent(
        new CustomEvent(name, { detail })
    );
}

function onEvent(name, callback) {
    AppEvents.addEventListener(name, callback);
}
