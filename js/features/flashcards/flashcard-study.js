/* TROVIRUSES
   Flashcard Study Engine
*/

(function () {
    "use strict";

    const REVIEW_STATES = {
        NEW: "new",
        LEARNING: "learning",
        REVIEW: "review"
    };

    const REVIEW_INTERVALS = {
        AGAIN: 0,
        HARD: 10 * 60 * 1000,
        GOOD: 24 * 60 * 60 * 1000,
        EASY: 4 * 24 * 60 * 60 * 1000,
        FIFTEEN_MIN: 15 * 60 * 1000,
        ONE_HOUR: 60 * 60 * 1000,
        THREE_DAYS: 3 * 24 * 60 * 60 * 1000
    };

function getReviewPreview(result) {
    if (!REVIEW_INTERVALS.hasOwnProperty(result)) {
        return null;
    }

    const interval = REVIEW_INTERVALS[result];

    const dueAt =
        new Date(
            Date.now() + interval
        );

    return {
        interval,
        dueAt: dueAt.toISOString()
    };
}

    function getCard(worldId, cardId) {
        if (
            !window.TROVIRUSES ||
            !window.TROVIRUSES.flashcards
        ) {
            return null;
        }

        return window.TROVIRUSES.flashcards.getCard(
            worldId,
            cardId
        );
    }

    function isDue(card) {
        if (!card || !card.review) {
            return false;
        }

        if (!card.review.dueAt) {
            return true;
        }

        return (
            new Date(
                card.review.dueAt
            ).getTime() <= Date.now()
        );
    }

    function getDueCards(
        worldId,
        collectionId
    ) {
        if (
            !window.TROVIRUSES ||
            !window.TROVIRUSES.flashcards
        ) {
            return [];
        }

        const cards =
            window.TROVIRUSES.flashcards
                .getCardsForCollection(
                    worldId,
                    collectionId
                );

        return cards.filter(
            (card) => isDue(card)
        );
    }

    function getReviewState(card) {
        if (
            !card ||
            !card.review
        ) {
            return REVIEW_STATES.NEW;
        }

        return (
            card.review.state ||
            REVIEW_STATES.NEW
        );
    }

    function setNextReview(
        card,
        result,
        customInterval = null
    ) {
        if (!card || !card.review) {
            return false;
        }

        const now = Date.now();

        let interval =
            REVIEW_INTERVALS.GOOD;

        if (result === "again") {
            card.review.state =
                REVIEW_STATES.LEARNING;

            card.review.lapses += 1;

            interval =
                REVIEW_INTERVALS.AGAIN;
        }

        if (result === "hard") {
            card.review.state =
                REVIEW_STATES.LEARNING;

            interval =
                REVIEW_INTERVALS.HARD;
        }

        if (result === "good") {
            card.review.state =
                REVIEW_STATES.REVIEW;

            interval =
                REVIEW_INTERVALS.GOOD;
        }

        if (result === "easy") {
            card.review.state =
                REVIEW_STATES.REVIEW;

            interval =
                REVIEW_INTERVALS.EASY;
        }

        if (result === "15min") {
            card.review.state =
                REVIEW_STATES.REVIEW;

            interval =
                REVIEW_INTERVALS.FIFTEEN_MIN;
        }

        if (result === "1hour") {
            card.review.state =
                REVIEW_STATES.REVIEW;

            interval =
                REVIEW_INTERVALS.ONE_HOUR;
        }

        if (result === "3days") {
            card.review.state =
                REVIEW_STATES.REVIEW;

            interval =
                REVIEW_INTERVALS.THREE_DAYS;
        }

        if (result === "custom") {
            if (
                typeof customInterval !== "number" ||
                !Number.isFinite(customInterval) ||
                customInterval <= 0
            ) {
                return false;
            }

            card.review.state =
                REVIEW_STATES.REVIEW;

            interval =
                customInterval;
        }

        card.review.interval =
            interval;

        card.review.dueAt =
            new Date(
                now + interval
            ).toISOString();

        return true;
    }

    function reviewCard(
        worldId,
        cardId,
        result,
        customInterval = null
    ) {
        const card =
            getCard(
                worldId,
                cardId
            );

        if (!card) {
            return false;
        }

        const validResults = [
            "again",
            "hard",
            "good",
            "easy",
            "15min",
            "1hour",
            "3days",
            "custom"
        ];

        if (
            !validResults.includes(result)
        ) {
            return false;
        }

        if (
            result === "custom" &&
            (
                typeof customInterval !== "number" ||
                !Number.isFinite(customInterval) ||
                customInterval <= 0
            )
        ) {
            return false;
        }

        if (
            !window.TROVIRUSES ||
            !window.TROVIRUSES.activity
        ) {
            return false;
        }

        const isFirstStudy =
            card.firstStudiedAt === null;

        const activityType =
            isFirstStudy
                ? "flashcard_new"
                : "flashcard_review";

        const rewarded =
            window.TROVIRUSES.activity
                .applyActivity(
                    worldId,
                    activityType
                );

        if (!rewarded) {
            return false;
        }

        const now =
            new Date().toISOString();

        if (isFirstStudy) {
            card.firstStudiedAt =
                now;
        }

        card.lastReviewedAt =
            now;

        card.reviewCount += 1;

        const reviewUpdated =
            setNextReview(
                card,
                result,
                customInterval
            );

        if (!reviewUpdated) {
            return false;
        }

if (
    window.TROVIRUSES &&
    window.TROVIRUSES.storage &&
    typeof window.TROVIRUSES.storage.saveAppState ===
        "function"
) {
    window.TROVIRUSES.storage.saveAppState();
}

        const reward =
            window.TROVIRUSES.activity
                .getReward(
                    activityType
                );

        return {
            type: activityType,

            result,

            state:
                card.review.state,

            dueAt:
                card.review.dueAt,

            interval:
                card.review.interval,

            xp:
                reward.xp,

            cups:
                reward.cups
        };
    }

    function getReviewSummary(
        worldId,
        collectionId
    ) {
        if (
            !window.TROVIRUSES ||
            !window.TROVIRUSES.flashcards
        ) {
            return null;
        }

        const cards =
            window.TROVIRUSES.flashcards
                .getCardsForCollection(
                    worldId,
                    collectionId
                );

        let newCount = 0;
        let learningCount = 0;
        let reviewCount = 0;
        let dueCount = 0;

        cards.forEach((card) => {
            const state =
                getReviewState(card);

            if (
                state === REVIEW_STATES.NEW
            ) {
                newCount++;
            }

            if (
                state === REVIEW_STATES.LEARNING
            ) {
                learningCount++;
            }

            if (
                state === REVIEW_STATES.REVIEW
            ) {
                reviewCount++;
            }

            if (isDue(card)) {
                dueCount++;
            }
        });

        return {
            total: cards.length,

            newCount,

            learningCount,

            reviewCount,

            dueCount
        };
    }

    window.TROVIRUSES =
        window.TROVIRUSES || {};

    window.TROVIRUSES.flashcardStudy = {

        REVIEW_STATES,

        getCard,

        isDue,

        getDueCards,

        getReviewState,

        getReviewPreview,

        reviewCard,

        getReviewSummary

    };

    console.log(
        "TROVIRUSES: Flashcard Study Engine loaded."
    );

})();
