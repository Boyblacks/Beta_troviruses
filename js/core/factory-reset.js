/* TROVIRUSES
   Factory Reset Engine
*/

(function () {
    "use strict";

    function reset() {
        if (
            !window.TROVIRUSES ||
            !window.TROVIRUSES.storage ||
            typeof window.TROVIRUSES.storage.clearAllData !==
                "function"
        ) {
            console.error(
                "TROVIRUSES: Storage engine is not available."
            );

            return false;
        }

        const cleared =
            window.TROVIRUSES.storage.clearAllData();

        if (!cleared) {
            return false;
        }

        console.log(
            "TROVIRUSES: Factory reset completed."
        );

        return true;
    }

    window.TROVIRUSES =
        window.TROVIRUSES || {};

    window.TROVIRUSES.factoryReset = {
        reset
    };

})();
