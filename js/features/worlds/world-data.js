/* TROVIRUSES
   World Data
*/

(function () {
    "use strict";

    const WORLD_DATA = {
        world1: {
            id: "world1",
            name: "Eng",
            description: "",
            rivals: [],
            flashcards: []
        },

        world2: {
            id: "world2",
            name: "Cyber",
            description: "",
            rivals: [],
            flashcards: []
        },

        world3: {
            id: "world3",
            name: "Spanish",
            description: "",
            rivals: [],
            flashcards: []
        },

        world4: {
            id: "world4",
            name: "Hack urself",
            description: "",
            rivals: [],
            flashcards: []
        }
    };

    function getWorldData(worldId) {
        if (!WORLD_DATA[worldId]) {
            return null;
        }

        return WORLD_DATA[worldId];
    }

    function getAllWorldData() {
        return {
            ...WORLD_DATA
        };
    }

    window.TROVIRUSES =
        window.TROVIRUSES || {};

    window.TROVIRUSES.worldData = {
        getWorldData,
        getAllWorldData
    };

})();
