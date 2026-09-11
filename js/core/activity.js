/* TROVIRUSES
   Activity Engine
*/

(function () {
    "use strict";

    const ACTIVITY_REWARDS = {
        flashcard_new: {
            xp: 20,
            cups: 5
        },

        flashcard_review: {
            xp: 15,
            cups: 8
        }
    };

    function isValidRewardType(type) {
        return Object.prototype.hasOwnProperty.call(
            ACTIVITY_REWARDS,
            type
        );
    }

    function getReward(type) {
        if (!isValidRewardType(type)) {
            return null;
        }

        return {
            ...ACTIVITY_REWARDS[type]
        };
    }

    function applyActivity(worldId, type) {

        if (!isValidRewardType(type)) {
            return false;
        }

        if (
            !window.TROVIRUSES ||
            !window.TROVIRUSES.xp
        ) {
            return false;
        }

        if (
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

        const reward =
            getReward(type);

        if (!reward) {
            return false;
        }

        const xpAdded =
            window.TROVIRUSES.xp.addXP(
                worldId,
                reward.xp
            );

        if (!xpAdded) {
            return false;
        }

        if (
            !window.TROVIRUSES.cup ||
            typeof window.TROVIRUSES.cup.addCups !== "function"
        ) {
            return false;
        }

        const cupsAdded =
            window.TROVIRUSES.cup.addCups(
                worldId,
                reward.cups
            );

        if (!cupsAdded) {
            return false;
        }

        if (
            window.TROVIRUSES &&
            window.TROVIRUSES.storage &&
            typeof window.TROVIRUSES.storage.saveAppState ===
                "function"
        ) {
            window.TROVIRUSES.storage.saveAppState();
        } else {
            console.error(
                "TROVIRUSES: Storage Engine is not available."
            );

            return false;
        }

        return true;
    }

    function getActivityRewards() {
        return {
            ...ACTIVITY_REWARDS
        };
    }

    window.TROVIRUSES =
        window.TROVIRUSES || {};

    window.TROVIRUSES.activity = {

        isValidRewardType,

        getReward,

        applyActivity,

        getActivityRewards

    };

    console.log(
        "TROVIRUSES: Activity Engine loaded."
    );

})();
