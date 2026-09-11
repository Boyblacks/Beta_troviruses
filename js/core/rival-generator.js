/* TROVIRUSES
   Rival Generator
*/

(function () {
    "use strict";

    const FIRST_NAMES = [
        "Alex",
        "Mason",
        "Ethan",
        "Liam",
        "Noah",
        "Lucas",
        "Leo",
        "Ryan",
        "Evan",
        "Dylan",
        "Owen",
        "Kai",
        "Zane",
        "Max",
        "Nolan",
        "Aiden",
        "Logan",
        "Caleb",
        "Jack",
        "Adam",
        "Cole",
        "Jace",
        "Finn",
        "Miles",
        "Chase"
    ];

    const LAST_NAMES = [
        "Hunter",
        "Storm",
        "Knight",
        "Wolf",
        "Shadow",
        "Blaze",
        "Raven",
        "Fox",
        "Ghost",
        "Steel",
        "Frost",
        "Viper",
        "Drake",
        "Nova",
        "Reaper",
        "Ace",
        "Phantom",
        "Zero",
        "Hawk",
        "Titan",
        "Flare",
        "Byte",
        "Pulse",
        "Orbit",
        "Spark"
    ];

    const DIFFICULTY = {
        easy: {
            spread: 0.55,
            strength: 0.80
        },

        normal: {
            spread: 0.35,
            strength: 1.00
        },

        hard: {
            spread: 0.20,
            strength: 1.15
        }
    };

    function getDifficulty(
        worldId
    ) {
        if (
            typeof worldId !==
            "string"
        ) {
            return "normal";
        }

        if (
            window.TROVIRUSES &&
            window.TROVIRUSES.settings &&
            typeof window.TROVIRUSES.settings
                .get === "function"
        ) {
            const value =
                window.TROVIRUSES.settings.get(
                    "worldDifficulty",
                    worldId
                );

            if (
                DIFFICULTY[value]
            ) {
                return value;
            }
        }

        return "normal";
    }

    function randomInt(
        min,
        max
    ) {
        return Math.floor(
            Math.random() *
            (max - min + 1)
        ) + min;
    }

    function randomItem(
        array
    ) {
        return array[
            randomInt(
                0,
                array.length - 1
            )
        ];
    }

    function generateName(
        index
    ) {
        const first =
            randomItem(
                FIRST_NAMES
            );

        const last =
            randomItem(
                LAST_NAMES
            );

        return (
            first +
            " " +
            last +
            " " +
            (index + 1)
        );
    }

    function getLeagueInfo(
        cups
    ) {
        if (
            !window.TROVIRUSES ||
            !window.TROVIRUSES.league
        ) {
            return null;
        }

        return window.TROVIRUSES.league
            .getLeagueInfo(cups);
    }

    function generateCups(
        playerCups,
        difficulty
    ) {
        const config =
            DIFFICULTY[
                difficulty
            ];

        const variation =
            Math.max(
                50,
                Math.round(
                    playerCups *
                    config.spread
                )
            );

        const center =
            Math.round(
                playerCups *
                config.strength
            );

        return Math.max(
            0,
            randomInt(
                center - variation,
                center + variation
            )
        );
    }

    function generateRivals(
        worldId,
        count
    ) {
        if (
            typeof worldId !==
            "string"
        ) {
            return [];
        }

        if (
            !window.TROVIRUSES ||
            !window.TROVIRUSES.cup ||
            typeof window.TROVIRUSES.cup
                .getCups !== "function"
        ) {
            return [];
        }

        const playerCups =
            window.TROVIRUSES.cup
                .getCups(
                    worldId
                );

        if (
            typeof playerCups !==
            "number"
        ) {
            return [];
        }

        const difficulty =
            getDifficulty(
                worldId
            );

        const rivals = [];

        for (
            let i = 0;
            i < count;
            i++
        ) {
            rivals.push({
                id:
                    worldId +
                    "-rival-" +
                    i,

                worldId,

                name:
                    generateName(
                        i
                    ),

                cups:
                    generateCups(
                        playerCups,
                        difficulty
                    )
            });
        }

        return rivals;
    }

   function getRecommendedCount(
    cups,
    worldId
) {
    const info =
        getLeagueInfo(
            cups
        );

    if (!info) {
        return 10;
    }

    let baseCount =
        info.capacity;

    let rivalCount =
        "normal";

    if (
        window.TROVIRUSES &&
        window.TROVIRUSES.settings &&
        typeof window.TROVIRUSES.settings.get ===
            "function"
    ) {
        rivalCount =
            window.TROVIRUSES.settings.get(
                "rivalCount",
                worldId
            );
    }

    if (rivalCount === "low") {
        baseCount =
            Math.max(
                1,
                Math.floor(
                    baseCount * 0.5
                )
            );
    }

    if (rivalCount === "high") {
        baseCount =
            Math.max(
                1,
                Math.floor(
                    baseCount * 1.5
                )
            );
    }

    return baseCount;
}

    function generateForWorld(
        worldId
    ) {
        if (
            !window.TROVIRUSES ||
            !window.TROVIRUSES.cup
        ) {
            return [];
        }

        const cups =
            window.TROVIRUSES.cup
                .getCups(
                    worldId
                );

        if (
            typeof cups !==
            "number"
        ) {
            return [];
        }

        const count =
    getRecommendedCount(
        cups,
        worldId
    );

        return generateRivals(
            worldId,
            count
        );
    }

    window.TROVIRUSES =
        window.TROVIRUSES || {};

    window.TROVIRUSES.rivals = {

        generateRivals,

        generateForWorld,

        generateName,

        getRecommendedCount,

        getDifficulty

    };

    console.log(
        "TROVIRUSES: Rival Generator loaded."
    );

})();
