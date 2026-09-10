/* TROVIRUSES
   Worlds UI
*/

(function () {
    "use strict";

    let container = null;

    function getWorlds() {
        if (
            !window.TROVIRUSES ||
            !window.TROVIRUSES.worlds
        ) {
            return [];
        }

        return window.TROVIRUSES.worlds
            .getWorldIds()
            .map((worldId) =>
                window.TROVIRUSES.worlds.getWorld(worldId)
            )
            .filter(Boolean);
    }

    function createWorldCard(world) {
        const card =
            document.createElement("article");

        card.className = "world-card";

        card.dataset.world =
            world.id;

card.addEventListener(
    "click",
    () => {
        if (
            window.TROVIRUSES &&
            window.TROVIRUSES.worldDetails
        ) {
            window.TROVIRUSES.worldDetails.open(
                world.id
            );
        }
    }
);

        card.innerHTML = `
            <div class="world-card-header">
                <h2>${world.name}</h2>
                <span class="world-level">
                    Level ${world.level}
                </span>
            </div>

            <p class="world-description">
                ${world.description || "No description yet."}
            </p>

            <div class="world-progress">
                <div class="world-progress-info">
                    <span>XP</span>
                    <span>${world.xp}</span>
                </div>

                <div class="world-progress-track">
                    <div
                        class="world-progress-bar"
                        style="width: ${world.progress}%"
                    ></div>
                </div>

                <span class="world-progress-value">
                    ${world.progress}%
                </span>
            </div>
        `;

        return card;
    }

    function render() {
        if (!container) {
            return;
        }

        container.innerHTML = "";

        const worlds =
            getWorlds();

        worlds.forEach((world) => {
            container.appendChild(
                createWorldCard(world)
            );
        });
    }

    function init() {
        container =
            document.getElementById(
                "worlds-container"
            );

        if (!container) {
            console.warn(
                "TROVIRUSES: Worlds container not found."
            );

            return;
        }

        render();

        console.log(
            "TROVIRUSES: Worlds UI initialized."
        );
    }

    window.TROVIRUSES =
        window.TROVIRUSES || {};

    window.TROVIRUSES.worldsUI = {
        init,
        render
    };

})();
