/* TROVIRUSES
   Flashcard UI
*/

(function () {
    "use strict";

    let container = null;
    let worldId = "world1";

    function getFlashcards() {
        if (
            !window.TROVIRUSES ||
            !window.TROVIRUSES.flashcards
        ) {
            return null;
        }

        return window.TROVIRUSES.flashcards;
    }

    function getCollections() {
        const flashcards =
            getFlashcards();

        if (!flashcards) {
            return [];
        }

        return flashcards.getCollections(
            worldId
        );
    }

    function getCollectionStats(
        collectionId
    ) {
        const flashcards =
            getFlashcards();

        if (!flashcards) {
            return null;
        }

        return flashcards.getCollectionStats(
            worldId,
            collectionId
        );
    }

    function createElement(
        tag,
        className,
        text
    ) {
        const element =
            document.createElement(tag);

        if (className) {
            element.className =
                className;
        }

        if (
            typeof text === "string"
        ) {
            element.textContent =
                text;
        }

        return element;
    }

function createHeader() {
    const header =
        createElement(
            "div",
            "flashcards-header"
        );

    const backButton =
        createElement(
            "button",
            "flashcards-back-button",
            "← Back to Eng"
        );

    backButton.type =
        "button";

    backButton.addEventListener(
        "click",
        function () {
            close();

            if (
                window.TROVIRUSES &&
                window.TROVIRUSES.worldDetails &&
                typeof window.TROVIRUSES.worldDetails.open ===
                    "function"
            ) {
                window.TROVIRUSES.worldDetails.open(
                    worldId
                );
            }
        }
    );

    const title =
        createElement(
            "h2",
            "flashcards-title",
            "Flashcards"
        );

    const subtitle =
        createElement(
            "p",
            "flashcards-subtitle",
            "Eng"
        );

    header.appendChild(
        backButton
    );

    header.appendChild(
        title
    );

    header.appendChild(
        subtitle
    );

    return header;
}

    function createCollectionCard(
        collection
    ) {
        const card =
            createElement(
                "article",
                "flashcard-collection-card"
            );

        const stats =
            getCollectionStats(
                collection.id
            );

        const title =
            createElement(
                "h3",
                "flashcard-collection-title",
                collection.name
            );

        const total =
            stats
                ? stats.total
                : 0;

        const due =
            stats
                ? stats.dueCards
                : 0;

        const info =
            createElement(
                "div",
                "flashcard-collection-info"
            );

        const cardsText =
            createElement(
                "span",
                "flashcard-card-count",
                total + " cards"
            );

        const reviewText =
            createElement(
                "span",
                "flashcard-review-count",
                due + " reviews due"
            );

        info.appendChild(
            cardsText
        );

        info.appendChild(
            reviewText
        );

        card.appendChild(title);
        card.appendChild(info);

        card.addEventListener(
            "click",
            function () {
                openCollection(
                    collection.id
                );
            }
        );

        return card;
    }

    function createEmptyState() {
        const empty =
            createElement(
                "div",
                "flashcards-empty"
            );

        const title =
            createElement(
                "h3",
                "",
                "No collections yet"
            );

        const text =
            createElement(
                "p",
                "",
                "Create your first collection to start building your flashcards."
            );

        empty.appendChild(title);
        empty.appendChild(text);

        return empty;
    }

    function createActions() {
        const actions =
            createElement(
                "div",
                "flashcards-actions"
            );

        const collectionButton =
            createElement(
                "button",
                "settings-button",
                "Create Collection"
            );

        const cardButton =
            createElement(
                "button",
                "settings-button",
                "Create Card"
            );

        collectionButton.type =
            "button";

        cardButton.type =
            "button";

        collectionButton.addEventListener(
            "click",
            function () {
                createCollection();
            }
        );

        cardButton.addEventListener(
            "click",
            function () {
                createCard();
            }
        );

        actions.appendChild(
            collectionButton
        );

        actions.appendChild(
            cardButton
        );

        return actions;
    }

    function render() {
        if (!container) {
            return;
        }

        container.innerHTML = "";

        const wrapper =
            createElement(
                "div",
                "flashcards-panel"
            );

        wrapper.appendChild(
            createHeader()
        );

        const collections =
            getCollections();

        const list =
            createElement(
                "div",
                "flashcards-collections"
            );

        if (
            collections.length === 0
        ) {
            list.appendChild(
                createEmptyState()
            );
        } else {
            collections.forEach(
                function (collection) {
                    list.appendChild(
                        createCollectionCard(
                            collection
                        )
                    );
                }
            );
        }

        wrapper.appendChild(list);

        wrapper.appendChild(
            createActions()
        );

        container.appendChild(
            wrapper
        );
    }

       function openCollection(
        collectionId
    ) {
        const flashcards =
            getFlashcards();

        if (!flashcards) {
            return;
        }

        const collection =
            flashcards.getCollection(
                worldId,
                collectionId
            );

        if (!collection) {
            return;
        }

        const cards =
            flashcards.getCardsForCollection(
                worldId,
                collectionId
            );

        if (!container) {
            return;
        }

        container.innerHTML = "";

        const wrapper =
            createElement(
                "div",
                "flashcards-panel"
            );

        const header =
            createElement(
                "div",
                "flashcards-header"
            );

        const backButton =
            createElement(
                "button",
                "settings-button",
                "← Back to Collections"
            );

        backButton.type =
            "button";

        const title =
            createElement(
                "h2",
                "flashcards-title",
                collection.name
            );

        const subtitle =
            createElement(
                "p",
                "flashcards-subtitle",
                cards.length + " cards"
            );

        header.appendChild(
            backButton
        );

        header.appendChild(
            title
        );

        header.appendChild(
            subtitle
        );

        wrapper.appendChild(
            header
        );

        const list =
            createElement(
                "div",
                "flashcards-collections"
            );

        if (cards.length === 0) {
            list.appendChild(
                createElement(
                    "div",
                    "flashcards-empty"
                )
            );

            list.firstChild.appendChild(
                createElement(
                    "h3",
                    "",
                    "No cards yet"
                )
            );

            list.firstChild.appendChild(
                createElement(
                    "p",
                    "",
                    "Create a card to start studying."
                )
            );
        } else {
            cards.forEach(
                function (card) {
                    const cardElement =
                        createElement(
                            "article",
                            "flashcard-collection-card"
                        );

                    if (
                        card.type ===
                        "basic"
                    ) {
                        cardElement.appendChild(
                            createElement(
                                "h3",
                                "flashcard-collection-title",
                                card.data.front
                            )
                        );

                        cardElement.appendChild(
                            createElement(
                                "p",
                                "",
                                "Back: " +
                                card.data.back
                            )
                        );
                    }

                    if (
                        card.type ===
                        "one-two"
                    ) {
                        cardElement.appendChild(
                            createElement(
                                "h3",
                                "flashcard-collection-title",
                                card.data.front
                            )
                        );

                        cardElement.appendChild(
                            createElement(
                                "p",
                                "",
                                "Back 1: " +
                                card.data.backs[0]
                            )
                        );

                        cardElement.appendChild(
                            createElement(
                                "p",
                                "",
                                "Back 2: " +
                                card.data.backs[1]
                            )
                        );
                    }

                    if (
                        card.type ===
                        "question-answer"
                    ) {
                        cardElement.appendChild(
                            createElement(
                                "h3",
                                "flashcard-collection-title",
                                card.data.question
                            )
                        );

                        cardElement.appendChild(
                            createElement(
                                "p",
                                "",
                                "Part 1: " +
                                card.data.questionParts[0]
                            )
                        );

                        cardElement.appendChild(
                            createElement(
                                "p",
                                "",
                                "Part 2: " +
                                card.data.questionParts[1]
                            )
                        );

                        cardElement.appendChild(
                            createElement(
                                "p",
                                "",
                                "Answer: " +
                                card.data.answer
                            )
                        );
                    }

                    list.appendChild(
                        cardElement
                    );
                }
            );
        }

        wrapper.appendChild(
            list
        );

        const actions =
            createElement(
                "div",
                "flashcards-actions"
            );

        const reviewSummary =
            window.TROVIRUSES &&
            window.TROVIRUSES.flashcardStudy
                ? window.TROVIRUSES.flashcardStudy
                    .getReviewSummary(
                        worldId,
                        collectionId
                    )
                : null;

        const reviewButton =
            createElement(
                "button",
                "settings-button",
                reviewSummary
                    ? "Start Review (" +
                      reviewSummary.dueCount +
                      ")"
                    : "Start Review"
            );

        reviewButton.type =
            "button";

        reviewButton.addEventListener(
            "click",
            function () {
                startReview(
                    collectionId
                );
            }
        );

        const addCardButton =
            createElement(
                "button",
                "settings-button",
                "Create Card"
            );

        addCardButton.type =
            "button";

        actions.appendChild(
            reviewButton
        );

        addCardButton.addEventListener(
            "click",
            function () {
                createCard();
            }
        );

        actions.appendChild(
            addCardButton
        );

        wrapper.appendChild(
            actions
        );

        container.appendChild(
            wrapper
        );

        backButton.addEventListener(
            "click",
            function () {
                render();
            }
        );

        console.log(
            "TROVIRUSES: Collection opened.",
            collection
        );
    }

    function getCardFront(card) {
        if (!card || !card.data) {
            return "";
        }

        if (card.type === "basic") {
            return card.data.front || "";
        }

        if (card.type === "one-two") {
            return card.data.front || "";
        }

        if (card.type === "question-answer") {
            return card.data.question || "";
        }

        return "";
    }

    function getCardBack(card) {
        if (!card || !card.data) {
            return "";
        }

        if (card.type === "basic") {
            return card.data.back || "";
        }

        if (card.type === "one-two") {
            return (
                (card.data.backs || [])
                    .filter(Boolean)
                    .join("\n\n")
            );
        }

        if (card.type === "question-answer") {
            return card.data.answer || "";
        }

        return "";
    }

function getReviewOptionPreview(result) {
    const now = Date.now();

    let interval = 0;

    if (result === "again") {
        interval = 0;
    }

    if (result === "hard") {
        interval = 10 * 60 * 1000;
    }

    if (result === "good") {
        interval = 24 * 60 * 60 * 1000;
    }

    if (result === "easy") {
        interval = 4 * 24 * 60 * 60 * 1000;
    }

    if (result === "15min") {
        interval = 15 * 60 * 1000;
    }

    if (result === "1hour") {
        interval = 60 * 60 * 1000;
    }

    if (result === "3days") {
        interval = 3 * 24 * 60 * 60 * 1000;
    }

    if (result === "custom") {
        return "Set custom time";
    }

    const dueAt =
        new Date(
            now + interval
        );

    const timeText =
        dueAt.toLocaleTimeString(
            [],
            {
                hour: "2-digit",
                minute: "2-digit"
            }
        );

    if (result === "again") {
        return "Now · " + timeText;
    }

    if (result === "hard") {
        return "10 min later · " + timeText;
    }

    if (result === "good") {
        return "1 day later · " + timeText;
    }

    if (result === "easy") {
        return "4 days later · " + timeText;
    }

    if (result === "15min") {
        return "15 min later · " + timeText;
    }

    if (result === "1hour") {
        return "1 hour later · " + timeText;
    }

    if (result === "3days") {
        return "3 days later · " + timeText;
    }

    return timeText;
}

    function startReview(collectionId) {
        if (
            !window.TROVIRUSES ||
            !window.TROVIRUSES.flashcardStudy
        ) {
            console.warn(
                "TROVIRUSES: Flashcard Study Engine is not available."
            );

            return;
        }

        const dueCards =
            window.TROVIRUSES.flashcardStudy
                .getDueCards(
                    worldId,
                    collectionId
                );

        if (!container) {
            return;
        }

        if (!dueCards.length) {
            container.innerHTML = "";

            const panel =
                createElement(
                    "div",
                    "flashcards-panel"
                );

            const title =
                createElement(
                    "h2",
                    "flashcards-title",
                    "Nothing to review"
                );

            const text =
                createElement(
                    "p",
                    "flashcards-subtitle",
                    "There are no cards due in this collection right now."
                );

            const backButton =
                createElement(
                    "button",
                    "settings-button",
                    "← Back to Collection"
                );

            backButton.type = "button";

            backButton.addEventListener(
                "click",
                function () {
                    openCollection(
                        collectionId
                    );
                }
            );

            panel.appendChild(title);
            panel.appendChild(text);
            panel.appendChild(backButton);

            container.appendChild(panel);

            return;
        }

        let currentIndex = 0;
        let answerVisible = false;

        function renderReviewCard() {
            container.innerHTML = "";

            const panel =
                createElement(
                    "div",
                    "flashcards-panel"
                );

            const card =
                dueCards[currentIndex];

            const header =
                createElement(
                    "div",
                    "flashcards-header"
                );

            header.appendChild(
                createElement(
                    "h2",
                    "flashcards-title",
                    "Review"
                )
            );

            header.appendChild(
                createElement(
                    "p",
                    "flashcards-subtitle",
                    "Card " +
                    (currentIndex + 1) +
                    " of " +
                    dueCards.length
                )
            );

            panel.appendChild(header);

            const reviewCard =
                createElement(
                    "div",
                    "flashcard-review-card"
                );

            reviewCard.appendChild(
                createElement(
                    "p",
                    "flashcard-review-label",
                    "QUESTION"
                )
            );

            reviewCard.appendChild(
                createElement(
                    "div",
                    "flashcard-review-front",
                    getCardFront(card)
                )
            );

            if (answerVisible) {
                reviewCard.appendChild(
                    createElement(
                        "p",
                        "flashcard-review-label",
                        "ANSWER"
                    )
                );

                reviewCard.appendChild(
                    createElement(
                        "div",
                        "flashcard-review-back",
                        getCardBack(card)
                    )
                );
            }

            panel.appendChild(reviewCard);

            const actions =
                createElement(
                    "div",
                    "flashcards-actions"
                );

            if (!answerVisible) {
                const showAnswerButton =
                    createElement(
                        "button",
                        "settings-button",
                        "Show Answer"
                    );

                showAnswerButton.type =
                    "button";

                showAnswerButton.addEventListener(
                    "click",
                    function () {
                        answerVisible = true;
                        renderReviewCard();
                    }
                );

                actions.appendChild(
                    showAnswerButton
                );
                
                function getNextReviewLabel(
    result
) {
    const now = Date.now();

    let interval = 0;

    if (result === "again") {
        interval = 0;
    }

    if (result === "hard") {
        interval = 10 * 60 * 1000;
    }

    if (result === "good") {
        interval = 24 * 60 * 60 * 1000;
    }

    if (result === "easy") {
        interval = 4 * 24 * 60 * 60 * 1000;
    }

    if (interval === 0) {
        return "Now";
    }

    const date =
        new Date(
            now + interval
        );

    return date.toLocaleTimeString(
        [],
        {
            hour: "2-digit",
            minute: "2-digit"
        }
    );
}
                
            } else {
               const results = [
    ["Again", "again"],
    ["Hard", "hard"],
    ["Good", "good"],
    ["Easy", "easy"],
    ["15 min", "15min"],
    ["1 hour", "1hour"],
    ["3 days", "3days"],
    ["Custom Review", "custom"]
];

                results.forEach(
                    function (item) {
                       const button =
    createElement(
        "button",
        "settings-button"
    );

button.type =
    "button";

const buttonTitle =
    createElement(
        "span",
        "flashcard-result-title",
        item[0]
    );

const buttonTime =
    createElement(
        "span",
        "flashcard-result-time",
        getReviewOptionPreview(
            item[1]
        )
    );

button.appendChild(
    buttonTitle
);

button.appendChild(
    buttonTime
);

                        button.addEventListener(
                            "click",
                            function () {

                               if (item[1] === "custom") {

    const customPanel =
        createElement(
            "div",
            "flashcard-custom-review"
        );

    const title =
        createElement(
            "h3",
            "flashcards-title",
            "Custom Review"
        );

    const amountInput =
        createElement(
            "input",
            "flashcard-builder-input"
        );

    amountInput.type = "number";
    amountInput.min = "1";
    amountInput.value = "1";

    const unitSelect =
        createElement(
            "select",
            "flashcard-builder-input"
        );

    [
        ["Minutes", 1],
        ["Hours", 2],
        ["Days", 3]
    ].forEach(function(option){

        const item =
            document.createElement(
                "option"
            );

        item.textContent =
            option[0];

        item.value =
            option[1];

        unitSelect.appendChild(item);

    });

    unitSelect.value = "2";


    const preview =
        createElement(
            "p",
            "flashcards-subtitle",
            "Review in 1 hour"
        );


    function updatePreview(){

        const amount =
            Number(
                amountInput.value
            );

        const unit =
            Number(
                unitSelect.value
            );

        let text =
            "Review in ";

        if (!amount || amount <= 0){
            preview.textContent =
                "Enter a valid amount";

            return;
        }

        if(unit === 1){
            text += amount + " minute(s)";
        }

        if(unit === 2){
            text += amount + " hour(s)";
        }

        if(unit === 3){
            text += amount + " day(s)";
        }

        preview.textContent =
            text;

    }


    amountInput.addEventListener(
        "input",
        updatePreview
    );

    unitSelect.addEventListener(
        "change",
        updatePreview
    );


    const cancel =
        createElement(
            "button",
            "settings-button",
            "Cancel"
        );


    const confirm =
        createElement(
            "button",
            "settings-button",
            "Set Review"
        );


    cancel.onclick =
        function(){
            customPanel.remove();
        };


    confirm.onclick =
        function(){

            const amount =
                Number(
                    amountInput.value
                );

            const unit =
                Number(
                    unitSelect.value
                );


            if(
                !amount ||
                amount <= 0
            ){
                return;
            }


            let multiplier = 0;


            if(unit === 1){
                multiplier =
                    60 * 1000;
            }

            if(unit === 2){
                multiplier =
                    60 * 60 * 1000;
            }

            if(unit === 3){
                multiplier =
                    24 * 60 * 60 * 1000;
            }


            const result =
                window.TROVIRUSES
                .flashcardStudy
                .reviewCard(
                    worldId,
                    card.id,
                    "custom",
                    amount * multiplier
                );


            if(!result){
                return;
            }


            currentIndex++;
            answerVisible = false;


            if(
                currentIndex >=
                dueCards.length
            ){
                renderReviewComplete(
                    collectionId
                );

                return;
            }


            renderReviewCard();

        };


    customPanel.appendChild(title);
    customPanel.appendChild(amountInput);
    customPanel.appendChild(unitSelect);
    customPanel.appendChild(preview);
    customPanel.appendChild(cancel);
    customPanel.appendChild(confirm);


    actions.appendChild(
        customPanel
    );


    return;

}

                                   

                                const result =
                                    window.TROVIRUSES
                                        .flashcardStudy
                                        .reviewCard(
                                            worldId,
                                            card.id,
                                            item[1]
                                        );

                                if (!result) {
                                    console.warn(
                                        "TROVIRUSES: Could not review card.",
                                        card
                                    );

                                    return;
                                }

                                currentIndex += 1;
                                answerVisible = false;

                                if (
                                    currentIndex >=
                                    dueCards.length
                                ) {
                                    renderReviewComplete(
                                        collectionId
                                    );

                                    return;
                                }

                                renderReviewCard();
                            }
                        );

                        actions.appendChild(
                            button
                        );
                    }
                );
            }

            panel.appendChild(actions);

            const exitButton =
                createElement(
                    "button",
                    "settings-button",
                    "Exit Review"
                );

            exitButton.type = "button";

            exitButton.addEventListener(
                "click",
                function () {
                    openCollection(
                        collectionId
                    );
                }
            );

            panel.appendChild(exitButton);

            container.appendChild(panel);
        }

        function renderReviewComplete(
            collectionId
        ) {
            container.innerHTML = "";

            const panel =
                createElement(
                    "div",
                    "flashcards-panel"
                );

            panel.appendChild(
                createElement(
                    "h2",
                    "flashcards-title",
                    "Review Complete"
                )
            );

            panel.appendChild(
                createElement(
                    "p",
                    "flashcards-subtitle",
                    "Nice work. You finished all cards that were due."
                )
            );

            const backButton =
                createElement(
                    "button",
                    "settings-button",
                    "← Back to Collection"
                );

            backButton.type = "button";

            backButton.addEventListener(
                "click",
                function () {
                    openCollection(
                        collectionId
                    );
                }
            );

            panel.appendChild(
                backButton
            );

            container.appendChild(panel);
        }

        renderReviewCard();
    }

    function createCollection() {
        const name =
            window.prompt(
                "Collection name:"
            );

        if (
            typeof name !== "string" ||
            name.trim() === ""
        ) {
            return;
        }

        const flashcards =
            getFlashcards();

        if (!flashcards) {
            return;
        }

        const collection =
            flashcards.addCollection(
                worldId,
                name
            );

        if (!collection) {
            return;
        }

        render();
    }

   function createCard() {
    const collections =
        getCollections();

    if (
        collections.length === 0
    ) {
        window.alert(
            "Create a collection first."
        );

        return;
    }

    const overlay =
        createElement(
            "div",
            "flashcard-builder-overlay"
        );

    const panel =
        createElement(
            "div",
            "flashcard-builder"
        );

    const header =
        createElement(
            "div",
            "flashcard-builder-header"
        );

    const title =
        createElement(
            "h2",
            "flashcard-builder-title",
            "Create Flashcard"
        );

    const closeButton =
        createElement(
            "button",
            "flashcard-builder-close",
            "×"
        );

    closeButton.type =
        "button";

    header.appendChild(title);
    header.appendChild(closeButton);

    const collectionLabel =
        createElement(
            "label",
            "flashcard-builder-label",
            "Collection"
        );

    const collectionSelect =
        document.createElement(
            "select"
        );

    collectionSelect.className =
        "flashcard-builder-input";

    collections.forEach(
        function (collection) {
            const option =
                document.createElement(
                    "option"
                );

            option.value =
                collection.id;

            option.textContent =
                collection.name;

            collectionSelect.appendChild(
                option
            );
        }
    );

    const typeLabel =
        createElement(
            "label",
            "flashcard-builder-label",
            "Card Type"
        );

    const typeSelect =
        document.createElement(
            "select"
        );

    typeSelect.className =
        "flashcard-builder-input";

    const types = [
        {
            value: "basic",
            label: "Basic — Front / Back"
        },
        {
            value: "one-two",
            label: "One Front / Two Backs"
        },
        {
            value: "question-answer",
            label: "Question / Answer"
        }
    ];

    types.forEach(
        function (type) {
            const option =
                document.createElement(
                    "option"
                );

            option.value =
                type.value;

            option.textContent =
                type.label;

            typeSelect.appendChild(
                option
            );
        }
    );

    const fields =
        createElement(
            "div",
            "flashcard-builder-fields"
        );

    function createInput(
        labelText,
        placeholder,
        multiline
    ) {
        const group =
            createElement(
                "div",
                "flashcard-builder-field"
            );

        const label =
            createElement(
                "label",
                "flashcard-builder-label",
                labelText
            );

        const input =
            multiline
                ? document.createElement(
                    "textarea"
                )
                : document.createElement(
                    "input"
                );

        input.className =
            "flashcard-builder-input";

        input.placeholder =
            placeholder;

        if (multiline) {
            input.rows = 4;
        }

        group.appendChild(label);
        group.appendChild(input);

        return {
            group,
            input
        };
    }

    function renderFields() {
        fields.innerHTML = "";

        const type =
            typeSelect.value;

        if (type === "basic") {
            const front =
                createInput(
                    "Front",
                    "Enter the front of the card...",
                    true
                );

            const back =
                createInput(
                    "Back",
                    "Enter the back of the card...",
                    true
                );

            fields.appendChild(
                front.group
            );

            fields.appendChild(
                back.group
            );

            fields.front =
                front.input;

            fields.back =
                back.input;

            return;
        }

        if (type === "one-two") {
            const front =
                createInput(
                    "Front",
                    "Enter the front...",
                    true
                );

            const backOne =
                createInput(
                    "Back 1",
                    "Enter the first answer...",
                    true
                );

            const backTwo =
                createInput(
                    "Back 2",
                    "Enter the second answer...",
                    true
                );

            fields.appendChild(
                front.group
            );

            fields.appendChild(
                backOne.group
            );

            fields.appendChild(
                backTwo.group
            );

            fields.front =
                front.input;

            fields.backOne =
                backOne.input;

            fields.backTwo =
                backTwo.input;

            return;
        }

        if (
            type ===
            "question-answer"
        ) {
            const question =
                createInput(
                    "Question",
                    "Enter the question...",
                    true
                );

            const questionOne =
                createInput(
                    "Question Part 1",
                    "Enter the first question part...",
                    true
                );

            const questionTwo =
                createInput(
                    "Question Part 2",
                    "Enter the second question part...",
                    true
                );

            const answer =
                createInput(
                    "Answer",
                    "Enter the expected answer...",
                    true
                );

            fields.appendChild(
                question.group
            );

            fields.appendChild(
                questionOne.group
            );

            fields.appendChild(
                questionTwo.group
            );

            fields.appendChild(
                answer.group
            );

            fields.question =
                question.input;

            fields.questionOne =
                questionOne.input;

            fields.questionTwo =
                questionTwo.input;

            fields.answer =
                answer.input;
        }
    }

    const actions =
        createElement(
            "div",
            "flashcard-builder-actions"
        );

    const cancelButton =
        createElement(
            "button",
            "settings-button",
            "Cancel"
        );

    const saveButton =
        createElement(
            "button",
            "settings-button",
            "Save Card"
        );

    cancelButton.type =
        "button";

    saveButton.type =
        "button";

    actions.appendChild(
        cancelButton
    );

    actions.appendChild(
        saveButton
    );

    panel.appendChild(
        header
    );

    panel.appendChild(
        collectionLabel
    );

    panel.appendChild(
        collectionSelect
    );

    panel.appendChild(
        typeLabel
    );

    panel.appendChild(
        typeSelect
    );

    panel.appendChild(
        fields
    );

    panel.appendChild(
        actions
    );

    overlay.appendChild(
        panel
    );

    document.body.appendChild(
        overlay
    );

    renderFields();

    typeSelect.addEventListener(
        "change",
        renderFields
    );

    function closeBuilder() {
        overlay.remove();
    }

    closeButton.addEventListener(
        "click",
        closeBuilder
    );

    cancelButton.addEventListener(
        "click",
        closeBuilder
    );

    overlay.addEventListener(
        "click",
        function (event) {
            if (
                event.target ===
                overlay
            ) {
                closeBuilder();
            }
        }
    );

    saveButton.addEventListener(
        "click",
        function () {
            const type =
                typeSelect.value;

            const selectedCollection =
                collectionSelect.value;

            let data = null;

            if (type === "basic") {
                if (
                    !fields.front.value.trim() ||
                    !fields.back.value.trim()
                ) {
                    window.alert(
                        "Please fill in both front and back."
                    );

                    return;
                }

                data = {
                    front:
                        fields.front.value.trim(),

                    back:
                        fields.back.value.trim()
                };
            }

            if (type === "one-two") {
                if (
                    !fields.front.value.trim() ||
                    !fields.backOne.value.trim() ||
                    !fields.backTwo.value.trim()
                ) {
                    window.alert(
                        "Please fill in the front and both backs."
                    );

                    return;
                }

                data = {
                    front:
                        fields.front.value.trim(),

                    backs: [
                        fields.backOne.value.trim(),
                        fields.backTwo.value.trim()
                    ]
                };
            }

            if (
                type ===
                "question-answer"
            ) {
                if (
                    !fields.question.value.trim() ||
                    !fields.questionOne.value.trim() ||
                    !fields.questionTwo.value.trim() ||
                    !fields.answer.value.trim()
                ) {
                    window.alert(
                        "Please fill in all question and answer fields."
                    );

                    return;
                }

                data = {
                    question:
                        fields.question.value.trim(),

                    questionParts: [
                        fields.questionOne.value.trim(),
                        fields.questionTwo.value.trim()
                    ],

                    answer:
                        fields.answer.value.trim()
                };
            }

            const flashcards =
                getFlashcards();

            if (!flashcards) {
                return;
            }

            const card =
                flashcards.addCard(
                    worldId,
                    selectedCollection,
                    type,
                    data
                );

            if (!card) {
                window.alert(
                    "Could not create the flashcard."
                );

                return;
            }

            closeBuilder();

            render();

            console.log(
                "TROVIRUSES: Flashcard created.",
                card
            );
        }
    );
}

    function open() {
        if (!container) {
            return;
        }

        container.hidden = false;

        render();
    }

    function close() {
        if (!container) {
            return;
        }

        container.hidden = true;
    }

    function init() {
        container =
            document.getElementById(
                "flashcards-container"
            );

        if (!container) {
            console.warn(
                "TROVIRUSES: Flashcards container not found."
            );

            return;
        }

        render();

        console.log(
            "TROVIRUSES: Flashcard UI initialized."
        );
    }

    window.TROVIRUSES =
        window.TROVIRUSES || {};

    window.TROVIRUSES.flashcardUI = {

        init,

        open,

        close,

        render,

        setWorld: function (
            newWorldId
        ) {
            if (
                typeof newWorldId !==
                "string"
            ) {
                return;
            }

            worldId =
                newWorldId;

            render();
        }

    };

    init();

})();
