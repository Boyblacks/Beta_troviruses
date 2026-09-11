// TROVIRUSES
// Central storage layer.
//
// Feature modules should use this layer instead of
// directly accessing browser storage.

const STORAGE_PREFIX = "troviruses:";
const APP_STATE_KEY = "app-state";

function saveData(key, value) {
    try {
        const serializedValue =
            JSON.stringify(value);

        localStorage.setItem(
            STORAGE_PREFIX + key,
            serializedValue
        );

        return true;

    } catch (error) {

        console.error(
            "TROVIRUSES: Failed to save data.",
            error
        );

        return false;
    }
}

function loadData(
    key,
    fallback = null
) {
    try {

        const storedValue =
            localStorage.getItem(
                STORAGE_PREFIX + key
            );

        if (storedValue === null) {
            return fallback;
        }

        return JSON.parse(
            storedValue
        );

    } catch (error) {

        console.error(
            "TROVIRUSES: Failed to load data.",
            error
        );

        return fallback;
    }
}

function removeData(key) {
    try {

        localStorage.removeItem(
            STORAGE_PREFIX + key
        );

        return true;

    } catch (error) {

        console.error(
            "TROVIRUSES: Failed to remove data.",
            error
        );

        return false;
    }
}

function clearAllData() {
    try {

        const keysToRemove = [];

        for (
            let i = 0;
            i < localStorage.length;
            i++
        ) {

            const key =
                localStorage.key(i);

            if (
                key &&
                key.startsWith(
                    STORAGE_PREFIX
                )
            ) {
                keysToRemove.push(key);
            }
        }

        keysToRemove.forEach(
            (key) => {
                localStorage.removeItem(key);
            }
        );

        return true;

    } catch (error) {

        console.error(
            "TROVIRUSES: Failed to clear all data.",
            error
        );

        return false;
    }
}


/*
 * AppState persistence
 */

function saveAppState() {

console.trace(
    "SAVE APP STATE — XP:",
    AppState.worlds?.world1?.xp
);

    if (
        typeof AppState ===
        "undefined"
    ) {

        console.error(
            "TROVIRUSES: AppState is not available."
        );

        return false;
    }

    return saveData(
        APP_STATE_KEY,
        AppState
    );
}




function loadAppState() {

    if (
        typeof AppState ===
        "undefined"
    ) {

        console.error(
            "TROVIRUSES: AppState is not available."
        );

        return false;
    }

console.log(
    "LOAD DEBUG — BEFORE:",
    AppState.worlds?.world1?.xp
);

const savedState =
    loadData(
        APP_STATE_KEY,
        null
    );

console.log(
    "LOAD DEBUG — SAVED:",
    savedState?.worlds?.world1?.xp
);

    if (
        !savedState ||
        typeof savedState !== "object"
    ) {

        return false;
    }

    if (
        savedState.user &&
        typeof savedState.user === "object"
    ) {
        AppState.user =
            savedState.user;
    }

    if (
        savedState.character &&
        typeof savedState.character === "object"
    ) {
        AppState.character =
            savedState.character;
    }

    if (
        savedState.xp &&
        typeof savedState.xp === "object"
    ) {
        AppState.xp =
            savedState.xp;
    }

    if (
        savedState.worlds &&
        typeof savedState.worlds === "object"
    ) {
        AppState.worlds =
            savedState.worlds;
    }

console.log(
    "LOAD DEBUG — AFTER WORLDS:",
    AppState.worlds?.world1?.xp
);

    if (
        savedState.settings &&
        typeof savedState.settings === "object"
    ) {
        AppState.settings =
            savedState.settings;
    }

    if (
        savedState.ui &&
        typeof savedState.ui === "object"
    ) {
        AppState.ui =
            savedState.ui;
    }

    console.log(
        "TROVIRUSES: AppState loaded."
    );

    return true;
}


window.TROVIRUSES =
    window.TROVIRUSES || {};

window.TROVIRUSES.storage = {

    saveData,

    loadData,

    removeData,

    clearAllData,

    saveAppState,

    loadAppState
};
