/* TROVIRUSES
   Challenge UI
*/

(function () {
    "use strict";

    let currentChallenge = null;

    function getContainer() {
        return document.getElementById(
            "challenge-container"
        );
    }

    function getCard(
        challenge
    ) {
        if (
            !challenge ||
            typeof challenge.worldId !== "string" ||
            typeof challenge.cardId !== "string"
        ) {
            return null;
        }

        if (
            !window.TROVIRUSES ||
            !window.TROVIRUSES.flashcards ||
            typeof window.TROVIRUSES.flashcards.getCard !==
                "function"
        ) {
            return null;
        }

        return window.TROVIRUSES.flashcards.getCard(
            challenge.worldId,
            challenge.cardId
        );
    }

        function render(
        challenge
    ) {
        const container =
            getContainer();

        if (!container) {
            return false;
        }

        const card =
            getCard(challenge);

        if (!card) {
            return false;
        }

        if (
            !card.data ||
            typeof card.data !== "object"
        ) {
            return false;
        }

        currentChallenge =
            challenge;

        let questionText = "";
        let answerHTML = "";

        if (card.type === "basic") {

            questionText =
                card.data.front || "";

            answerHTML = `
                <p class="challenge-label">
                    Answer
                </p>

                <p class="challenge-answer-text">
                    ${card.data.back || ""}
                </p>
            `;
        }

        else if (card.type === "one-two") {

            questionText =
                card.data.front || "";

            const backs =
                Array.isArray(card.data.backs)
                    ? card.data.backs
                    : [];

            answerHTML = `
                <p class="challenge-label">
                    Answers
                </p>

                <p class="challenge-answer-text">
                    ${backs[0] || ""}
                </p>

                <p class="challenge-answer-text">
                    ${backs[1] || ""}
                </p>
            `;
        }

        else if (
            card.type ===
            "question-answer"
        ) {

            questionText =
                card.data.question || "";

            const parts =
                Array.isArray(
                    card.data.questionParts
                )
                    ? card.data.questionParts
                    : [];

            if (parts.length > 0) {
                questionText +=
                    "<br><br>" +
                    parts.join("<br>");
            }

            answerHTML = `
                <p class="challenge-label">
                    Answer
                </p>

                <p class="challenge-answer-text">
                    ${card.data.answer || ""}
                </p>
            `;
        }

        else {
            return false;
        }

        container.innerHTML = `
            <div class="challenge-card">

                <div class="challenge-header">
                    <h2>Challenge</h2>

                    <span class="challenge-type">
                        Flashcard
                    </span>
                </div>

                <div class="challenge-content">

                    <p class="challenge-label">
                        Question
                    </p>

                    <p class="challenge-question">
                        ${questionText}
                    </p>

                    <div
                        class="challenge-answer"
                        hidden
                    >
                        ${answerHTML}
                    </div>

                </div>

                <div class="challenge-actions">

                    <button
                        type="button"
                        id="challenge-show-answer"
                        class="challenge-button"
                    >
                        Show Answer
                    </button>

                    <button
                        type="button"
                        id="challenge-complete"
                        class="challenge-button"
                        hidden
                    >
                        Complete Challenge
                    </button>

                </div>

            </div>
        `;

        container.hidden = false;

        bindEvents();

        return true;
    }

    function bindEvents() {
        const showAnswer =
            document.getElementById(
                "challenge-show-answer"
            );

        const complete =
            document.getElementById(
                "challenge-complete"
            );

        const answer =
            document.querySelector(
                ".challenge-answer"
            );

        if (
            showAnswer &&
            answer &&
            complete
        ) {
            showAnswer.addEventListener(
                "click",
                () => {
                    answer.hidden = false;
                    showAnswer.hidden = true;
                    complete.hidden = false;
                }
            );
        }

        if (complete) {
            complete.addEventListener(
                "click",
                () => {
                    completeCurrentChallenge();
                }
            );
        }
    }

    function completeCurrentChallenge() {
        if (!currentChallenge) {
            return false;
        }

        if (
            !window.TROVIRUSES ||
            !window.TROVIRUSES.challenge ||
            typeof window.TROVIRUSES.challenge
                .completeChallenge !== "function"
        ) {
            return false;
        }

        const success =
            window.TROVIRUSES.challenge.completeChallenge(
                currentChallenge
            );

        if (!success) {
            return false;
        }

        const container =
            getContainer();

        if (container) {
            container.innerHTML = `
                <div class="challenge-card completed">
                    <h2>Challenge Complete</h2>
                    <p>
                        Great work!
                    </p>
                </div>
            `;
        }

        return true;
    }

    function showChallenge(
        challenge
    ) {
        return render(challenge);
    }

    function hideChallenge() {
        const container =
            getContainer();

        currentChallenge = null;

        if (container) {
            container.hidden = true;
            container.innerHTML = "";
        }

        return true;
    }

    function getCurrentChallenge() {
        return currentChallenge;
    }

    window.TROVIRUSES =
        window.TROVIRUSES || {};

    window.TROVIRUSES.challengeUI = {

        showChallenge,

        hideChallenge,

        getCurrentChallenge,

        completeCurrentChallenge

    };

    console.log(
        "TROVIRUSES: Challenge UI loaded."
    );

})();
