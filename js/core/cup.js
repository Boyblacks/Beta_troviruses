/* TROVIRUSES
   Cup Engine
*/

(function () {
    "use strict";

    const DEFAULT_CUP_MIN = 1;
    const DEFAULT_CUP_MAX = 50;

    function getWorld(worldId) {
        if (
            !window.TROVIRUSES ||
            !window.TROVIRUSES.worlds
        ) {
            return null;
        }

        return window.TROVIRUSES.worlds.getWorld(
            worldId
        );
    }

    function getCups(worldId) {
        const world = getWorld(worldId);

        if (!world) {
            return null;
        }

        if (typeof world.cups !== "number") {
            world.cups = 0;
        }

        return world.cups;
    }

    function addCups(worldId, amount) {
        const world = getWorld(worldId);

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

        if (typeof world.cups !== "number") {
            world.cups = 0;
        }

        world.cups += amount;

        return true;
    }

    function removeCups(worldId, amount) {
        const world = getWorld(worldId);

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

        if (typeof world.cups !== "number") {
            world.cups = 0;
        }

        world.cups = Math.max(
            0,
            world.cups - amount
        );

        return true;
    }

    function getRandomLoss(
        min = DEFAULT_CUP_MIN,
        max = DEFAULT_CUP_MAX
    ) {
        if (
            typeof min !== "number" ||
            typeof max !== "number" ||
            min < 0 ||
            max < min
        ) {
            return 0;
        }

        return (
            Math.floor(
                Math.random() *
                    (max - min + 1)
            ) + min
        );
    }

    function applyRandomLoss(
        worldId,
        min = DEFAULT_CUP_MIN,
        max = DEFAULT_CUP_MAX
    ) {
        const loss =
            getRandomLoss(min, max);

        if (loss <= 0) {
            return false;
        }

        const success =
            removeCups(
                worldId,
                loss
            );

        if (!success) {
            return false;
        }

        return loss;
    }

    window.TROVIRUSES =
        window.TROVIRUSES || {};

    window.TROVIRUSES.cup = {

        getCups,

        addCups,

        removeCups,

        getRandomLoss,

        applyRandomLoss

    };

    console.log(
        "TROVIRUSES: Cup Engine loaded."
    );

})();
