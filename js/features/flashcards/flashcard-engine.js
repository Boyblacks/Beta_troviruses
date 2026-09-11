/* TROVIRUSES
   Flashcard Engine
*/

(function () {
    "use strict";

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

    function ensureFlashcards(world) {
        if (!world) {
            return false;
        }

        if (
            !world.flashcards ||
            typeof world.flashcards !== "object"
        ) {
            world.flashcards = {};
        }

        if (
            !Array.isArray(
                world.flashcards.cards
            )
        ) {
            world.flashcards.cards = [];
        }

        if (
            !Array.isArray(
                world.flashcards.collections
            )
        ) {
            world.flashcards.collections = [];
        }

        if (
            !world.flashcards.progress ||
            typeof world.flashcards.progress !== "object"
        ) {
            world.flashcards.progress = {};
        }

        if (
            !world.flashcards.statistics ||
            typeof world.flashcards.statistics !== "object"
        ) {
            world.flashcards.statistics = {};
        }

world.flashcards.cards.forEach(
    function (card) {
        if (
            !card.review ||
            typeof card.review !== "object"
        ) {
            card.review = {
                state: "new",
                dueAt: null,
                interval: 0,
                lapses: 0
            };
        }

        if (
            typeof card.review.state !== "string"
        ) {
            card.review.state = "new";
        }

        if (
            typeof card.review.interval !== "number"
        ) {
            card.review.interval = 0;
        }

        if (
            typeof card.review.lapses !== "number"
        ) {
            card.review.lapses = 0;
        }

        if (
            !("dueAt" in card.review)
        ) {
            card.review.dueAt = null;
        }
    }
);

        return true;
    }

    function getFlashcards(worldId) {
        const world = getWorld(worldId);

        if (!ensureFlashcards(world)) {
            return [];
        }

        return world.flashcards.cards;
    }

    function getCollections(worldId) {
        const world = getWorld(worldId);

        if (!ensureFlashcards(world)) {
            return [];
        }

        return world.flashcards.collections;
    }

    function createId(prefix) {
        return (
            prefix +
            "-" +
            Date.now() +
            "-" +
            Math.random()
                .toString(36)
                .slice(2, 8)
        );
    }

    function addCollection(
        worldId,
        name
    ) {
        const world = getWorld(worldId);

        if (!ensureFlashcards(world)) {
            return null;
        }

        if (
            typeof name !== "string" ||
            name.trim() === ""
        ) {
            return null;
        }

        const collection = {
            id: createId("collection"),

            name: name.trim(),

            createdAt:
                new Date().toISOString()
        };

     world.flashcards.collections.push(
    collection
);

saveState();

return collection;
    }

    function getCollection(
        worldId,
        collectionId
    ) {
        const collections =
            getCollections(worldId);

        return (
            collections.find(
                (collection) =>
                    collection.id ===
                    collectionId
            ) || null
        );
    }

    function removeCollection(
        worldId,
        collectionId
    ) {
        const world = getWorld(worldId);

        if (!ensureFlashcards(world)) {
            return false;
        }

        const collectionIndex =
            world.flashcards.collections.findIndex(
                (collection) =>
                    collection.id ===
                    collectionId
            );

        if (collectionIndex === -1) {
            return false;
        }

        world.flashcards.collections.splice(
            collectionIndex,
            1
        );

        world.flashcards.cards =
            world.flashcards.cards.filter(
                (card) =>
                    card.collectionId !==
                    collectionId
            );

        return true;
    }

    function createCardData(
        collectionId,
        type,
        data
    ) {
        return {
            id: createId("card"),

            collectionId,

            type,

            data,

            createdAt:
                new Date().toISOString(),

            firstStudiedAt: null,

            lastReviewedAt: null,

            reviewCount: 0,
            
            review: {
    state: "new",
    dueAt: null,
    interval: 0,
    lapses: 0
               }

           };
      } 

    function addCard(
        worldId,
        collectionId,
        type,
        data
    ) {
        const world = getWorld(worldId);

        if (!ensureFlashcards(world)) {
            return null;
        }

        const collection =
            getCollection(
                worldId,
                collectionId
            );

        if (!collection) {
            return null;
        }

        const validTypes = [
            "basic",
            "one-two",
            "question-answer"
        ];

        if (
            !validTypes.includes(type)
        ) {
            return null;
        }

        if (
            !data ||
            typeof data !== "object"
        ) {
            return null;
        }

        const card =
            createCardData(
                collectionId,
                type,
                data
            );

     world.flashcards.cards.push(
    card
);

saveState();

return card;
    }

    function getCard(
        worldId,
        cardId
    ) {
        const cards =
            getFlashcards(worldId);

        return (
            cards.find(
                (card) =>
                    card.id === cardId
            ) || null
        );
    }

    function getCardsForCollection(
        worldId,
        collectionId
    ) {
        return getFlashcards(
            worldId
        ).filter(
            (card) =>
                card.collectionId ===
                collectionId
        );
    }

   function getCollectionStats(
    worldId,
    collectionId
) {
    const cards =
        getCardsForCollection(
            worldId,
            collectionId
        );

    let dueCards = 0;

    const now =
        Date.now();

    cards.forEach(
        function (card) {
            if (
                !card.review ||
                !card.review.dueAt
            ) {
                dueCards += 1;
                return;
            }

            const dueTime =
                new Date(
                    card.review.dueAt
                ).getTime();

            if (
                dueTime <= now
            ) {
                dueCards += 1;
            }
        }
    );

    return {
        total: cards.length,

        dueCards,

        reviewedCards:
            cards.length -
            dueCards
    };
}

    function removeCard(
        worldId,
        cardId
    ) {
        const world = getWorld(worldId);

        if (!ensureFlashcards(world)) {
            return false;
        }

        const cards =
            world.flashcards.cards;

        const index =
            cards.findIndex(
                (card) =>
                    card.id === cardId
            );

        if (index === -1) {
            return false;
        }

        cards.splice(index, 1);

        delete world.flashcards.progress[
            cardId
        ];

        delete world.flashcards.statistics[
            cardId
        ];

        return true;
    }

    window.TROVIRUSES =
        window.TROVIRUSES || {};

    window.TROVIRUSES.flashcards = {

        getFlashcards,

        getCollections,

        addCollection,

        getCollection,

        removeCollection,

        addCard,

        getCard,

        getCardsForCollection,

        getCollectionStats,

        removeCard

    };

    console.log(
        "TROVIRUSES: Flashcard Engine loaded."
    );

})();
