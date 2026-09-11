/* TROVIRUSES
   Challenge Engine
*/

(function () {
    "use strict";

    const CHALLENGE_REWARD = {
        xp: 25,
        cups: 10
    };

    function getFrequency(worldId) {
        if (
            typeof worldId !== "string"
        ) {
            return "normal";
        }


        if (
            !window.TROVIRUSES ||
            !window.TROVIRUSES.settings ||
            typeof window.TROVIRUSES.settings.get !== "function"
        ) {
            return "normal";
        }

        const frequency =
            window.TROVIRUSES.settings.get(
                "challengeFrequency",
                worldId
            );

        if (
            ![
                "rare",
                "normal",
                "frequent"
            ].includes(frequency)
        ) {
            return "normal";
        }

        return frequency;
    }

    function shouldTrigger(worldId) {
        const frequency =
            getFrequency(worldId);

        if (frequency === "rare") {
            return Math.random() < 0.20;
        }

        if (frequency === "frequent") {
            return Math.random() < 0.80;
        }

        return Math.random() < 0.50;
    }

function generateChallenge(worldId) {

    if (
        typeof worldId !== "string"
    ) {
        return null;
    }

    if (
        !window.TROVIRUSES ||
        !window.TROVIRUSES.flashcards ||
        typeof window.TROVIRUSES.flashcards.getFlashcards !==
            "function"
    ) {
        return null;
    }

    const cards =
        window.TROVIRUSES.flashcards.getFlashcards(
            worldId
        );

    if (
        !Array.isArray(cards) ||
        cards.length === 0
    ) {
        return null;
    }

    const randomIndex =
        Math.floor(
            Math.random() *
            cards.length
        );

    const card =
        cards[randomIndex];

    if (
        !card ||
        typeof card.id !== "string"
    ) {
        return null;
    }

    return {
        id:
            "challenge-" +
            Date.now() +
            "-" +
            Math.random()
                .toString(36)
                .slice(2, 8),

        worldId,

        type: "flashcard",

        cardId: card.id,

        createdAt:
            new Date().toISOString(),

        completed: false
    };
}

   function completeChallenge(challenge) {

    if (
        !challenge ||
        typeof challenge !== "object"
    ) {
        return false;
    }

    if (
        typeof challenge.id !== "string" ||
        typeof challenge.worldId !== "string"
    ) {
        return false;
    }

    if (
        challenge.completed === true
    ) {
        return false;
    }

    if (
        challenge.rewarded === true
    ) {
        return false;
    }

    if (
        !window.TROVIRUSES ||
        !window.TROVIRUSES.xp ||
        !window.TROVIRUSES.cup
    ) {
        return false;
    }

    if (
        typeof window.TROVIRUSES.xp.addXP !==
            "function" ||
        typeof window.TROVIRUSES.cup.addCups !==
            "function"
    ) {
        return false;
    }

    const xpAdded =
        window.TROVIRUSES.xp.addXP(
            challenge.worldId,
            CHALLENGE_REWARD.xp
        );

    if (!xpAdded) {
        return false;
    }

    const cupsAdded =
        window.TROVIRUSES.cup.addCups(
            challenge.worldId,
            CHALLENGE_REWARD.cups
        );

    if (!cupsAdded) {
        return false;
    }

    challenge.completed = true;

    challenge.completedAt =
        new Date().toISOString();

    challenge.rewarded = true;

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

    window.TROVIRUSES =
        window.TROVIRUSES || {};

    window.TROVIRUSES.challenge = {

        getFrequency,

        shouldTrigger,

        generateChallenge,

        completeChallenge,

        CHALLENGE_REWARD

    };

    console.log(
        "TROVIRUSES: Challenge Engine loaded."
    );

})();
