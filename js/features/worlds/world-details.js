/* TROVIRUSES
   World Details
*/

(function () {
    "use strict";

    let section = null;

    let currentWorldId = null;

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

    function render(worldId) {
        if (!section) {
            return false;
        }

        const world = getWorld(worldId);

        if (!world) {
            return false;
        }

        currentWorldId = worldId;

        section.innerHTML = `
            <div class="world-details">

                <button
                    type="button"
                    class="world-details-back"
                    id="world-details-back"
                >
                    Back to Worlds
                </button>

                <div class="world-details-header">

                    <div>
                        <p class="world-details-label">
                            WORLD
                        </p>

                        <h1>
                            ${world.name}
                        </h1>

                        <p class="world-details-description">
                            ${world.description || "No description yet."}
                        </p>
                    </div>

                    <div class="world-details-level">
                        Level ${world.level}
                    </div>

                </div>

                <div class="world-details-stats">

                    <div class="world-stat">
                        <span>XP</span>
                        <strong>${world.xp}</strong>
                    </div>

                    <div class="world-stat">
                        <span>Progress</span>
                        <strong>${world.progress}%</strong>
                    </div>

                </div>

                ${renderLeague(world)}


                <div class="world-details-progress">

                    <div class="world-details-progress-header">
                        <span>World Progress</span>
                        <span>${world.progress}%</span>
                    </div>

                    <div class="world-progress-track">
                        <div
                            class="world-progress-bar"
                            style="width: ${world.progress}%"
                        ></div>
                    </div>

                </div>

                <div class="world-details-actions">

                    <button
                        type="button"
                        class="world-detail-action"
                        id="world-detail-rivals"
                    >
                        Rivals
                    </button>

                    <div
                        id="world-rivals-container"
                        class="world-rivals-container"
                        hidden
                    ></div>

                   <button
    type="button"
    class="world-detail-action"
    id="world-detail-flashcards"
>
    Flashcards
</button>

                </div>

            </div>
        `;

        const challengeContainer =
            document.getElementById(
                "challenge-container"
            );

        if (challengeContainer) {
            challengeContainer.hidden = true;
            challengeContainer.innerHTML = "";
        }

        const backButton =
            document.getElementById(
                "world-details-back"
            );

        if (backButton) {
            backButton.addEventListener(
                "click",
                () => {
                    close();
                }
            );
        }

        const rivalsButton =
            document.getElementById(
                "world-detail-rivals"
            );

        if (rivalsButton) {
            rivalsButton.addEventListener(
                "click",
                () => {
                    renderRivals();
                }
            );
        }

        const flashcardsButton =
            document.getElementById(
                "world-detail-flashcards"
            );

        if (flashcardsButton) {
            flashcardsButton.addEventListener(
                "click",
                () => {
                    console.log(
                        "TROVIRUSES: Flashcards button clicked.",
                        currentWorldId
                    );

                    if (
                        window.TROVIRUSES &&
                        window.TROVIRUSES.flashcardUI
                    ) {
                        window.TROVIRUSES.flashcardUI.setWorld(
                            currentWorldId
                        );

                        window.TROVIRUSES.flashcardUI.open();
                    } else {
                        console.warn(
                            "TROVIRUSES: flashcardUI is not available."
                        );
                    }
                }
            );
        }


        return true;
    }

    function renderLeague(world) {

        if (
            !window.TROVIRUSES ||
            !window.TROVIRUSES.league ||
            typeof window.TROVIRUSES.league.getLeagueInfo !==
                "function"
        ) {
            return "";
        }

        const cups =
            window.TROVIRUSES.cup &&
            typeof window.TROVIRUSES.cup.getCups ===
                "function"
                ? window.TROVIRUSES.cup.getCups(world.id)
                : 0;

        const leagueInfo =
            window.TROVIRUSES.league.getLeagueInfo(cups);

        if (!leagueInfo) {
            return "";
        }

        const nextThreshold =
            leagueInfo.nextThreshold;

        const progress =
            nextThreshold === null
                ? 100
                : Math.min(
                    100,
                    Math.max(
                        0,
                        (
                            (
                                cups -
                                leagueInfo.currentThreshold
                            ) /
                            (
                                nextThreshold -
                                leagueInfo.currentThreshold
                            )
                        ) * 100
                    )
                );

        return `
            <div class="world-league">

                <div class="world-league-header">

                    <div>
                        <p class="world-details-label">
                            LEAGUE
                        </p>

                        <h2>
                            ${leagueInfo.leagueName}
                            ·
                            ${leagueInfo.zoneName}
                        </h2>
                    </div>

                    <span>
                        ${cups} Cups
                    </span>

                </div>

                <div class="world-league-progress">

                    <div class="world-league-progress-track">
                        <div
                            class="world-league-progress-bar"
                            style="width: ${progress}%"
                        ></div>
                    </div>

                </div>

                <div class="world-league-footer">

                    <span>
                        ${
                            leagueInfo.isMaxLeague
                                ? "Maximum League"
                                : `${cups} / ${nextThreshold} Cups`
                        }
                    </span>

                    ${
                        leagueInfo.isMaxLeague
                            ? ""
                            : `<span>${nextThreshold - cups} to next</span>`
                    }

                </div>

            </div>
        `;
    }

    function renderRivals() {
        const container =
            document.getElementById(
                "world-rivals-container"
            );

        if (!container) {
            console.warn(
                "TROVIRUSES: World Rivals container not found."
            );
            return false;
        }

        const world =
            getWorld(currentWorldId);

        if (!world) {
            return false;
        }

        let rivals =
            Array.isArray(world.rivals)
                ? [...world.rivals]
                : [];

        if (
            rivals.length === 0 &&
            window.TROVIRUSES &&
            window.TROVIRUSES.rivals &&
            typeof window.TROVIRUSES.rivals.generateForWorld ===
                "function"
        ) {
            rivals =
                window.TROVIRUSES.rivals.generateForWorld(
                    currentWorldId
                );

            if (Array.isArray(rivals)) {
                world.rivals = [...rivals];

                if (
                    window.TROVIRUSES.storage &&
                    typeof window.TROVIRUSES.storage.saveAppState ===
                        "function"
                ) {
                    window.TROVIRUSES.storage.saveAppState();
                }
            }
        }

        if (
            !window.TROVIRUSES ||
            !window.TROVIRUSES.ranking ||
            typeof window.TROVIRUSES.ranking.getRanking !==
                "function"
        ) {
            console.warn(
                "TROVIRUSES: Ranking Engine is not available."
            );
            return false;
        }

        const ranking =
            window.TROVIRUSES.ranking.getRanking(
                currentWorldId,
                rivals
            );

        if (!ranking) {
            console.warn(
                "TROVIRUSES: Failed to create ranking."
            );
            return false;
        }

        const rows =
            ranking.entries
                .map(
                    (entry) => `
                        <div class="world-rival-row">
                            <span class="world-rival-rank">
                                #${entry.rank}
                            </span>

                            <span class="world-rival-name">
                                ${entry.name}
                            </span>

                            <span class="world-rival-cups">
                                ${entry.cups} Cups
                            </span>
                        </div>
                    `
                )
                .join("");

        container.innerHTML = `
            <div class="world-rivals-header">
                <div>
                    <p class="world-details-label">
                        RIVALS
                    </p>

                    <h2>
                        ${ranking.leagueName}
                    </h2>
                </div>

                <span>
                    ${ranking.entries.length}
                    Players
                </span>
            </div>

            <div class="world-rivals-list">
                ${
                    rows ||
                    `<p>No rivals available yet.</p>`
                }
            </div>
        `;

        container.hidden = false;

        return true;
    }

   function renderChallenge(challenge) {
    const challengeContainer =
        document.getElementById(
            "challenge-container"
        );

    if (!challengeContainer) {
        console.warn(
            "TROVIRUSES: challenge-container not found."
        );
        return false;
    }

    if (
        !challenge ||
        typeof challenge !== "object" ||
        typeof challenge.worldId !== "string" ||
        typeof challenge.cardId !== "string"
    ) {
        challengeContainer.hidden = true;
        challengeContainer.innerHTML = "";
        return false;
    }

    if (
        !window.TROVIRUSES ||
        !window.TROVIRUSES.challengeUI ||
        typeof window.TROVIRUSES.challengeUI.showChallenge !==
            "function"
    ) {
        console.warn(
            "TROVIRUSES: Challenge UI is not available."
        );
        return false;
    }

    return window.TROVIRUSES.challengeUI.showChallenge(
        challenge
    );
}
  function open(worldId) {
    if (typeof worldId !== "string") {
        return false;
    }

    const success = render(worldId);

    if (!success) {
        console.warn(
            "TROVIRUSES: Failed to render world:",
            worldId
        );
        return false;
    }

    const worldsContainer =
        document.getElementById(
            "worlds-container"
        );

    if (worldsContainer) {
        worldsContainer.hidden = true;
    }

    if (section) {
        section.hidden = false;
    }

    if (
        window.TROVIRUSES &&
        window.TROVIRUSES.challenge &&
        typeof window.TROVIRUSES.challenge.shouldTrigger ===
            "function" &&
        typeof window.TROVIRUSES.challenge.generateChallenge ===
            "function"
    ) {
        const challengeTriggered =
            window.TROVIRUSES.challenge.shouldTrigger(
                worldId
            );

        console.log(
            "TROVIRUSES Challenge Trigger:",
            worldId,
            challengeTriggered
        );

        if (challengeTriggered) {
            const challenge =
                window.TROVIRUSES.challenge.generateChallenge(
                    worldId
                );

            console.log(
                "TROVIRUSES Challenge Generated:",
                challenge
            );

            if (challenge) {
                renderChallenge(challenge);
            }
        }
    }

    return true;
}

    function getCurrentWorldId() {
        return currentWorldId;
    }

function close() {
    const worldsContainer =
        document.getElementById(
            "worlds-container"
        );

    const challengeContainer =
        document.getElementById(
            "challenge-container"
        );

    if (challengeContainer) {
        challengeContainer.hidden = true;
        challengeContainer.innerHTML = "";
    }

    if (section) {
        section.hidden = true;
    }

    if (worldsContainer) {
        worldsContainer.hidden = false;
    }

    currentWorldId = null;

    return true;
}

    function init() {
        section =
            document.getElementById(
                "world-details-container"
            );

        if (!section) {
            console.warn(
                "TROVIRUSES: World Details container not found."
            );

            return;
        }

        console.log(
            "TROVIRUSES: World Details initialized."
        );
    }

    window.TROVIRUSES =
        window.TROVIRUSES || {};

    window.TROVIRUSES.worldDetails = {
        init,
        open,
        close,
        render,
        getCurrentWorldId,
        renderChallenge
    };

})();
