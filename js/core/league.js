/* TROVIRUSES
   League Engine
*/

(function () {
    "use strict";

    const LEAGUE_CAPACITIES = {
        iron: 10,
        steel: 20,
        chrome: 35,
        titanium: 50,
        obsidian: 80,
        void: 120,
        eclipse: 200,
        phantom: 350,
        abyss: 600,
        eternal: 1000,
        dominion: 2000,
        ascendant: 3500,
        zenith: 5000,
        "star-boy": 7500,
        "girls-zone": 9000,
        "cheaters-zone": 10000
    };

    function getLeagues() {
        if (
            !window.TROVIRUSES ||
            !window.TROVIRUSES.leagueConfig
        ) {
            return [];
        }

        return window.TROVIRUSES.leagueConfig
            .getLeagues()
            .map((league) => ({
                ...league,
                capacity:
                    LEAGUE_CAPACITIES[
                        league.id
                    ] || 0
            }));
    }

    function getLeague(cups) {

        const leagues =
            getLeagues();

        if (!leagues.length) {
            return null;
        }

        let currentLeague =
            leagues[0];

        for (const league of leagues) {

            if (
                cups >=
                league.zones[0].threshold
            ) {
                currentLeague = league;
            } else {
                break;
            }
        }

        return currentLeague;
    }

    function getZone(cups) {

        const league =
            getLeague(cups);

        if (!league) {
            return null;
        }

        let currentZone =
            league.zones[0];

        for (const zone of league.zones) {

            if (
                cups >=
                zone.threshold
            ) {
                currentZone = zone;
            }
        }

        return currentZone;
    }

    function getCurrentThreshold(cups) {

        const zone =
            getZone(cups);

        if (!zone) {
            return null;
        }

        return zone.threshold;
    }

    function getNextThreshold(cups) {

        const leagues =
            getLeagues();

        const league =
            getLeague(cups);

        if (!league) {
            return null;
        }

        const zone =
            getZone(cups);

        if (!zone) {
            return null;
        }

        const zoneIndex =
            league.zones.findIndex(
                (item) =>
                    item.id === zone.id
            );

        if (
            zoneIndex <
            league.zones.length - 1
        ) {
            return league.zones[
                zoneIndex + 1
            ].threshold;
        }

        const leagueIndex =
            leagues.findIndex(
                (item) =>
                    item.id === league.id
            );

        if (
            leagueIndex <
            leagues.length - 1
        ) {
            return leagues[
                leagueIndex + 1
            ].zones[0].threshold;
        }

        return null;
    }

    function getLeagueInfo(cups) {

        const league =
            getLeague(cups);

        const zone =
            getZone(cups);

        if (!league || !zone) {
            return null;
        }

        const currentThreshold =
            getCurrentThreshold(cups);

        const nextThreshold =
            getNextThreshold(cups);

        return {
            cups,

            leagueId:
                league.id,

            leagueName:
                league.name,

            zone:
                zone.id,

            zoneName:
                zone.name,

            currentThreshold,

            nextThreshold,

            capacity:
                league.capacity,

            isMaxLeague:
                league.id ===
                getLeagues()[
                    getLeagues().length - 1
                ].id
        };
    }

    function getPlayerCapacity(cups) {

        const league =
            getLeague(cups);

        if (!league) {
            return 0;
        }

        return league.capacity;
    }

    function getAllLeagues() {
        return getLeagues().map(
            (league) => ({
                ...league,
                zones:
                    league.zones.map(
                        (zone) => ({
                            ...zone
                        })
                    )
            })
        );
    }

    window.TROVIRUSES =
        window.TROVIRUSES || {};

    window.TROVIRUSES.league = {

        getLeague,

        getZone,

        getCurrentThreshold,

        getNextThreshold,

        getLeagueInfo,

        getPlayerCapacity,

        getAllLeagues

    };

    console.log(
        "TROVIRUSES: League Engine loaded."
    );

})();
