/* TROVIRUSES
   League Config
*/

(function () {
    "use strict";

    const LEAGUES = [
        {
            id: "iron",
            name: "Iron",
            zones: [
                { id: "zone3", name: "Zone³", threshold: 0 },
                { id: "zone2", name: "Zone²", threshold: 350 },
                { id: "zone1", name: "Zone¹", threshold: 850 }
            ]
        },

        {
            id: "steel",
            name: "Steel",
            zones: [
                { id: "zone3", name: "Zone³", threshold: 1400 },
                { id: "zone2", name: "Zone²", threshold: 1900 },
                { id: "zone1", name: "Zone¹", threshold: 2400 }
            ]
        },

        {
            id: "chrome",
            name: "Chrome",
            zones: [
                { id: "zone3", name: "Zone³", threshold: 3000 },
                { id: "zone2", name: "Zone²", threshold: 3400 },
                { id: "zone1", name: "Zone¹", threshold: 3950 }
            ]
        },

        {
            id: "titanium",
            name: "Titanium",
            zones: [
                { id: "zone3", name: "Zone³", threshold: 4700 },
                { id: "zone2", name: "Zone²", threshold: 5100 },
                { id: "zone1", name: "Zone¹", threshold: 5700 }
            ]
        },

        {
            id: "obsidian",
            name: "Obsidian",
            zones: [
                { id: "zone3", name: "Zone³", threshold: 6500 },
                { id: "zone2", name: "Zone²", threshold: 7100 },
                { id: "zone1", name: "Zone¹", threshold: 7600 }
            ]
        },

        {
            id: "void",
            name: "Void",
            zones: [
                { id: "zone3", name: "Zone³", threshold: 8500 },
                { id: "zone2", name: "Zone²", threshold: 9000 },
                { id: "zone1", name: "Zone¹", threshold: 9700 }
            ]
        },

        {
            id: "eclipse",
            name: "Eclipse",
            zones: [
                { id: "zone3", name: "Zone³", threshold: 10800 },
                { id: "zone2", name: "Zone²", threshold: 11300 },
                { id: "zone1", name: "Zone¹", threshold: 11900 }
            ]
        },

        {
            id: "phantom",
            name: "Phantom",
            zones: [
                { id: "zone3", name: "Zone³", threshold: 13200 },
                { id: "zone2", name: "Zone²", threshold: 13800 },
                { id: "zone1", name: "Zone¹", threshold: 14400 }
            ]
        },

        {
            id: "abyss",
            name: "Abyss",
            zones: [
                { id: "zone3", name: "Zone³", threshold: 15800 },
                { id: "zone2", name: "Zone²", threshold: 16300 },
                { id: "zone1", name: "Zone¹", threshold: 17000 }
            ]
        },

        {
            id: "eternal",
            name: "Eternal",
            zones: [
                { id: "zone3", name: "Zone³", threshold: 18500 },
                { id: "zone2", name: "Zone²", threshold: 19100 },
                { id: "zone1", name: "Zone¹", threshold: 19800 }
            ]
        },

        {
            id: "dominion",
            name: "Dominion",
            zones: [
                { id: "zone3", name: "Zone³", threshold: 21500 },
                { id: "zone2", name: "Zone²", threshold: 22200 },
                { id: "zone1", name: "Zone¹", threshold: 22900 }
            ]
        },

        {
            id: "ascendant",
            name: "Ascendant",
            zones: [
                { id: "zone3", name: "Zone³", threshold: 24800 },
                { id: "zone2", name: "Zone²", threshold: 25500 },
                { id: "zone1", name: "Zone¹", threshold: 26300 }
            ]
        },

        {
            id: "zenith",
            name: "Zenith",
            zones: [
                { id: "zone3", name: "Zone³", threshold: 28200 },
                { id: "zone2", name: "Zone²", threshold: 29000 },
                { id: "zone1", name: "Zone¹", threshold: 29900 }
            ]
        },

        {
            id: "star-boy",
            name: "Star Boy",
            zones: [
                { id: "zone3", name: "Zone³", threshold: 32000 },
                { id: "zone2", name: "Zone²", threshold: 33000 },
                { id: "zone1", name: "Zone¹", threshold: 34000 }
            ]
        },

        {
            id: "girls-zone",
            name: "Girls Zone",
            zones: [
                { id: "zone3", name: "Zone³", threshold: 36500 },
                { id: "zone2", name: "Zone²", threshold: 37500 },
                { id: "zone1", name: "Zone¹", threshold: 38500 }
            ]
        },

        {
            id: "cheaters-zone",
            name: "Cheaters Zone",
            zones: [
                { id: "zone3", name: "Zone³", threshold: 41500 },
                { id: "zone2", name: "Zone²", threshold: 43000 },
                { id: "zone1", name: "Zone¹", threshold: 45000 }
            ]
        }
    ];

    function getLeagues() {
        return LEAGUES.map(
            (league) => ({
                ...league,
                zones: league.zones.map(
                    (zone) => ({ ...zone })
                )
            })
        );
    }

    function getLeague(leagueId) {
        const league =
            LEAGUES.find(
                (item) =>
                    item.id === leagueId
            );

        if (!league) {
            return null;
        }

        return {
            ...league,
            zones: league.zones.map(
                (zone) => ({ ...zone })
            )
        };
    }

    window.TROVIRUSES =
        window.TROVIRUSES || {};

    window.TROVIRUSES.leagueConfig = {
        getLeagues,
        getLeague
    };

    console.log(
        "TROVIRUSES: League Config loaded."
    );

})();
