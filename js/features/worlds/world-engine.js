/* TROVIRUSES
   World Engine
*/

(function () {
    "use strict";

    const WORLD_IDS = [
        "world1",
        "world2",
        "world3",
        "world4"
    ];

    function isValidWorldId(worldId) {
        return WORLD_IDS.includes(worldId);
    }

    function getWorldIds() {
        return [...WORLD_IDS];
    }

    function getWorldData(worldId) {
        if (
            !window.TROVIRUSES ||
            !window.TROVIRUSES.worldData
        ) {
            console.error(
                "TROVIRUSES: World Data is not available."
            );

            return null;
        }

        return window.TROVIRUSES.worldData.getWorldData(
            worldId
        );
    }

    function saveState() {
        if (
            window.TROVIRUSES &&
            window.TROVIRUSES.storage &&
            typeof window.TROVIRUSES.storage.saveAppState ===
                "function"
        ) {
            return window.TROVIRUSES.storage.saveAppState();
        }

        return false;
    }

    function createWorldState(worldId) {
        if (!isValidWorldId(worldId)) {
            return null;
        }

        const data =
            getWorldData(worldId);

        if (!data) {
            return null;
        }

        return {
            id: worldId,

            name: data.name,

            description: data.description,

            xp: 0,

            cups: 0,

            level: 1,

            progress: 0,

            rivals: [...data.rivals],

            flashcards: {
                cards: [...data.flashcards],
                collections: [],
                progress: {},
                statistics: {}
            }
        };
    }

    function initializeWorlds() {
        const worlds = {};

        WORLD_IDS.forEach((worldId) => {
            worlds[worldId] =
                createWorldState(worldId);
        });

        return worlds;
    }

    function getWorld(worldId) {
        if (!isValidWorldId(worldId)) {
            return null;
        }

        if (
            !AppState.worlds ||
            typeof AppState.worlds !== "object"
        ) {
            AppState.worlds = {};

            saveState();
        }

        if (!AppState.worlds[worldId]) {
            AppState.worlds[worldId] =
                createWorldState(worldId);

           
        }

        return AppState.worlds[worldId];
    }

    function init() {
        if (
            !AppState.worlds ||
            typeof AppState.worlds !== "object"
        ) {
            AppState.worlds = {};
        }

        let stateChanged = false;

        WORLD_IDS.forEach((worldId) => {

            if (!AppState.worlds[worldId]) {

                AppState.worlds[worldId] =
                    createWorldState(worldId);

                stateChanged = true;

                return;
            }

            const data =
                getWorldData(worldId);

            if (!data) {
                return;
            }

            if (
                AppState.worlds[worldId].name !==
                data.name
            ) {
                AppState.worlds[worldId].name =
                    data.name;

                stateChanged = true;
            }

            if (
                AppState.worlds[worldId].description !==
                data.description
            ) {
                AppState.worlds[worldId].description =
                    data.description;

                stateChanged = true;
            }

          const world =
    AppState.worlds[worldId];

if (
    window.TROVIRUSES &&
    window.TROVIRUSES.xp
) {
    const calculatedLevel =
        window.TROVIRUSES.xp.getLevelFromXP(
            world.xp
        );

    const calculatedProgress =
        window.TROVIRUSES.xp.getProgress(
            world.xp
        );

    if (world.level !== calculatedLevel) {
        world.level = calculatedLevel;
        stateChanged = true;
    }

    if (world.progress !== calculatedProgress) {
        world.progress = calculatedProgress;
        stateChanged = true;
    }
}

            if (
                typeof AppState.worlds[worldId].xp !==
                "number"
            ) {
                AppState.worlds[worldId].xp = 0;

                stateChanged = true;
            }

            if (
                typeof AppState.worlds[worldId].level !==
                "number"
            ) {
                AppState.worlds[worldId].level = 1;

                stateChanged = true;
            }

            if (
                typeof AppState.worlds[worldId].progress !==
                "number"
            ) {
                AppState.worlds[worldId].progress = 0;

                stateChanged = true;
            }

            if (
                !Array.isArray(
                    AppState.worlds[worldId].rivals
                )
            ) {
                AppState.worlds[worldId].rivals =
                    [...data.rivals];

                stateChanged = true;
            }

            if (
                !AppState.worlds[worldId].flashcards ||
                typeof AppState.worlds[worldId].flashcards !==
                    "object"
            ) {
                AppState.worlds[worldId].flashcards = {
                    cards: [...data.flashcards],
                    collections: [],
                    progress: {},
                    statistics: {}
                };

                stateChanged = true;
            }
        });

        if (stateChanged) {
            saveState();
        }

        console.log(
            "TROVIRUSES: World Engine initialized."
        );
    }

    window.TROVIRUSES =
        window.TROVIRUSES || {};

    window.TROVIRUSES.worlds = {
        init,
        getWorldIds,
        getWorld,
        createWorldState,
        initializeWorlds,
        isValidWorldId
    };

})();
