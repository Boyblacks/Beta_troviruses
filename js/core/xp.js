/* TROVIRUSES
   XP Engine
*/

(function () {
    "use strict";

   const LEVEL_THRESHOLDS = [
    0,       // Level 1
    1000,    // Level 2
    2500,    // Level 3
    4500,    // Level 4
    7000,    // Level 5
    10000,   // Level 6
    13500,   // Level 7
    17500,   // Level 8
    22000,   // Level 9
    27000    // Level 10
];

   function getLevelFromXP(xp) {

    if (
        typeof xp !== "number" ||
        !Number.isFinite(xp) ||
        xp < 0
    ) {
        return 1;
    }

    let level = 1;

    for (
        let i = 1;
        i < LEVEL_THRESHOLDS.length;
        i++
    ) {
        if (xp >= LEVEL_THRESHOLDS[i]) {
            level = i + 1;
        } else {
            break;
        }
    }

    return level;
}
   function getXPForLevel(level) {

    if (
        typeof level !== "number" ||
        !Number.isInteger(level) ||
        level < 1
    ) {
        return 0;
    }

    if (
        level > LEVEL_THRESHOLDS.length
    ) {
        return LEVEL_THRESHOLDS[
            LEVEL_THRESHOLDS.length - 1
        ];
    }

    return LEVEL_THRESHOLDS[level - 1];
}

  function getNextLevelXP(xp) {

    const level =
        getLevelFromXP(xp);

    if (
        level >= LEVEL_THRESHOLDS.length
    ) {
        return null;
    }

    return LEVEL_THRESHOLDS[level];
}

  function getProgress(xp) {

    const level =
        getLevelFromXP(xp);

    const currentLevelXP =
        LEVEL_THRESHOLDS[level - 1];

    const nextLevelXP =
        getNextLevelXP(xp);

    if (nextLevelXP === null) {
        return 100;
    }

    const progress =
        (
            (xp - currentLevelXP) /
            (nextLevelXP - currentLevelXP)
        ) * 100;

    return Math.max(
        0,
        Math.min(
            100,
            Math.floor(progress)
        )
    );
}

    function addXP(worldId, amount) {

        if (
            !window.TROVIRUSES ||
            !window.TROVIRUSES.worlds
        ) {
            return false;
        }

        const world =
            window.TROVIRUSES.worlds.getWorld(
                worldId
            );

        if (!world) {
            return false;
        }

        if (
            typeof amount !== "number" ||
            !Number.isFinite(amount) ||
            amount <= 0
        ) {
            return false;
        }

        world.xp += amount;

        world.level =
            getLevelFromXP(world.xp);

        world.progress =
            getProgress(world.xp);

if (
    window.TROVIRUSES.storage &&
    typeof window.TROVIRUSES.storage.saveAppState ===
        "function"
) {
    window.TROVIRUSES.storage.saveAppState();
}

        return true;
    }

    window.TROVIRUSES =
        window.TROVIRUSES || {};

function getXP(worldId) {
    if (
        typeof worldId !== "string"
    ) {
        return 0;
    }

    if (
        !window.TROVIRUSES ||
        !window.TROVIRUSES.worlds
    ) {
        return 0;
    }

    const world =
        window.TROVIRUSES.worlds.getWorld(
            worldId
        );

    if (!world) {
        return 0;
    }

    if (
        typeof world.xp !== "number" ||
        !Number.isFinite(world.xp)
    ) {
        return 0;
    }

    return world.xp;
}

        window.TROVIRUSES.xp = {

        getXP,

        getLevelFromXP,

        getXPForLevel,

        getNextLevelXP,

        getProgress,

        addXP

    };

    console.log(
        "TROVIRUSES: XP Engine loaded."
    );

})();
