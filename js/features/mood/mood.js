console.log("TROVIRUSES MOOD.JS LOADED");

/* TROVIRUSES
   Daily Mood Check
*/

(function () {
    "use strict";

    const STORAGE_KEY = "troviruses_daily_mood";

    let overlay = null;
    let buttons = [];

    function getTodayKey() {
        const today = new Date();

        const year = today.getFullYear();
        const month = String(
            today.getMonth() + 1
        ).padStart(2, "0");

        const day = String(
            today.getDate()
        ).padStart(2, "0");

        return `${year}-${month}-${day}`;
    }

    function hasCheckedToday() {
        const saved =
            localStorage.getItem(STORAGE_KEY);

        if (!saved) {
            return false;
        }

        try {
            const data = JSON.parse(saved);

            return data.date === getTodayKey();

        } catch {
            return false;
        }
    }

    function saveMood(value) {

        const moodData = {
            date: getTodayKey(),
            value: Number(value),
            timestamp: Date.now()
        };

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(moodData)
        );

        window.dispatchEvent(
            new CustomEvent(
                "troviruses:mood-selected",
                {
                    detail: moodData
                }
            )
        );
    }

    function open() {

        if (!overlay) {
            return;
        }

        overlay.hidden = false;
        overlay.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.classList.add(
            "mood-open"
        );
    }

    function close() {

        if (!overlay) {
            return;
        }

        overlay.hidden = true;
        overlay.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.classList.remove(
            "mood-open"
        );
    }

    function handleMoodSelection(event) {

        const button =
            event.currentTarget;

        const value =
            button.dataset.mood;

        if (!value) {
            return;
        }

        saveMood(value);

        close();
    }

    function init() {

        overlay =
            document.getElementById(
                "mood-overlay"
            );

        if (!overlay) {
            console.warn(
                "TROVIRUSES: Mood overlay not found."
            );

            return;
        }

        buttons =
            overlay.querySelectorAll(
                ".mood-button"
            );

        buttons.forEach((button) => {
            button.addEventListener(
                "click",
                handleMoodSelection
            );
        });

        /*
         * Show the mood check only once per day.
         */

        if (!hasCheckedToday()) {
            open();
        }
    }

    window.TROVIRUSES =
        window.TROVIRUSES || {};

    window.TROVIRUSES.mood = {
        init,
        open,
        close,
        hasCheckedToday
    };

})();
