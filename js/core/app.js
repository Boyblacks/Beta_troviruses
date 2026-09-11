/* TROVIRUSES
   Application Entry Point
*/

(function () {
    "use strict";

    function init() {

        /*
         * Load persisted application state
         * before initializing features.
         */

        if (
            window.TROVIRUSES &&
            window.TROVIRUSES.storage &&
            typeof window.TROVIRUSES.storage.loadAppState ===
                "function"
        ) {

            window.TROVIRUSES.storage.loadAppState();
        }


        if (
            window.TROVIRUSES &&
            window.TROVIRUSES.router
        ) {
            window.TROVIRUSES.router.init();
        }


        if (
            window.TROVIRUSES &&
            window.TROVIRUSES.mood
        ) {
            window.TROVIRUSES.mood.init();
        }


        if (
            window.TROVIRUSES &&
            window.TROVIRUSES.settings
        ) {
            window.TROVIRUSES.settings.init();
        }


        if (
            window.TROVIRUSES &&
            window.TROVIRUSES.worlds
        ) {
            window.TROVIRUSES.worlds.init();
        }


        if (
            window.TROVIRUSES &&
            window.TROVIRUSES.worldDetails
        ) {
            window.TROVIRUSES.worldDetails.init();
        }


        if (
            window.TROVIRUSES &&
            window.TROVIRUSES.worldsUI
        ) {
            window.TROVIRUSES.worldsUI.init();
        }


        /*
         * Save the resulting state after
         * application initialization.
         */

        if (
            window.TROVIRUSES &&
            window.TROVIRUSES.storage &&
            typeof window.TROVIRUSES.storage.saveAppState ===
                "function"
        ) {

            window.TROVIRUSES.storage.saveAppState();
        }


        console.log(
            "TROVIRUSES application initialized."
        );
    }


    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            init
        );

    } else {

        init();
    }

})();
