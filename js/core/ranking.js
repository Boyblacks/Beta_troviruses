/* TROVIRUSES
   Ranking Engine
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

    function getPlayerCups(worldId) {
        if (
            !window.TROVIRUSES ||
            !window.TROVIRUSES.cup ||
            typeof window.TROVIRUSES.cup.getCups !== "function"
        ) {
            return null;
        }

        return window.TROVIRUSES.cup.getCups(
            worldId
        );
    }

    function getLeagueInfo(worldId) {
        if (
            !window.TROVIRUSES ||
            !window.TROVIRUSES.league ||
            typeof window.TROVIRUSES.league.getLeagueInfo !== "function"
        ) {
            return null;
        }

        const cups =
            getPlayerCups(worldId);

        if (cups === null) {
            return null;
        }

        return window.TROVIRUSES.league.getLeagueInfo(
            cups
        );
    }

    function createPlayerEntry(
        worldId,
        name,
        cups,
        isPlayer
    ) {
        return {
            id: isPlayer
                ? "player"
                : null,

            worldId,

            name,

            cups,

            isPlayer: Boolean(
                isPlayer
            ),

            rank: null
        };
    }

    function sortEntries(entries) {
        return [...entries].sort(
            (a, b) => {

                if (
                    b.cups !==
                    a.cups
                ) {
                    return (
                        b.cups -
                        a.cups
                    );
                }

                if (
                    a.isPlayer &&
                    !b.isPlayer
                ) {
                    return -1;
                }

                if (
                    !a.isPlayer &&
                    b.isPlayer
                ) {
                    return 1;
                }

                return a.name.localeCompare(
                    b.name
                );
            }
        );
    }

    function assignRanks(entries) {
        return entries.map(
            (entry, index) => ({
                ...entry,
                rank: index + 1
            })
        );
    }

    function createRanking(
        worldId,
        rivals
    ) {
        const world =
            getWorld(worldId);

        if (!world) {
            return null;
        }

        const leagueInfo =
            getLeagueInfo(worldId);

        if (!leagueInfo) {
            return null;
        }

        const playerCups =
            getPlayerCups(worldId);

        const entries = [
            createPlayerEntry(
                worldId,
                "You",
                playerCups,
                true
            )
        ];

        if (Array.isArray(rivals)) {

            rivals.forEach(
                (rival) => {

                    if (
                        !rival ||
                        typeof rival !==
                            "object"
                    ) {
                        return;
                    }

                    if (
                        typeof rival.name !==
                            "string"
                    ) {
                        return;
                    }

                    if (
                        typeof rival.cups !==
                            "number"
                    ) {
                        return;
                    }

                    entries.push(
                        createPlayerEntry(
                            worldId,
                            rival.name,
                            rival.cups,
                            false
                        )
                    );
                }
            );
        }

        const sorted =
            sortEntries(entries);

        const ranked =
            assignRanks(sorted);

        return {
            worldId,

            leagueId:
                leagueInfo.leagueId,

            leagueName:
                leagueInfo.leagueName,

            zone:
                leagueInfo.zone,

            zoneName:
                leagueInfo.zoneName,

            capacity:
                leagueInfo.capacity,

            entries:
                ranked
        };
    }

    function getPlayerRank(
        worldId,
        rivals
    ) {
        const ranking =
            createRanking(
                worldId,
                rivals
            );

        if (!ranking) {
            return null;
        }

        const player =
            ranking.entries.find(
                (entry) =>
                    entry.isPlayer
            );

        if (!player) {
            return null;
        }

        return player.rank;
    }

    function getRanking(
        worldId,
        rivals
    ) {
        return createRanking(
            worldId,
            rivals
        );
    }

    window.TROVIRUSES =
        window.TROVIRUSES || {};

    window.TROVIRUSES.ranking = {

        getRanking,

        getPlayerRank,

        createRanking,

        sortEntries,

        assignRanks

    };

    console.log(
        "TROVIRUSES: Ranking Engine loaded."
    );

})();
