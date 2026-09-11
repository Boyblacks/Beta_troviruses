/* TROVIRUSES
   Application Router
*/

(function () {
    "use strict";

    const VALID_SECTIONS = [
        "worlds",
        "others",
        "home",
        "sidebar",
        "settings"
    ];

    function getSections() {
        return document.querySelectorAll(".app-section");
    }

    function getNavigationItems() {
        return document.querySelectorAll(".nav-item");
    }

    function showSection(sectionName) {
        if (!VALID_SECTIONS.includes(sectionName)) {
            sectionName = "home";
        }

        getSections().forEach((section) => {
            const isActive =
                section.dataset.section === sectionName;

            section.hidden = !isActive;
            section.classList.toggle(
                "active-section",
                isActive
            );
        });

        getNavigationItems().forEach((item) => {
            const isActive =
                item.dataset.section === sectionName;

            item.classList.toggle(
                "active",
                isActive
            );

            item.setAttribute(
                "aria-current",
                isActive ? "page" : "false"
            );
        });

        window.dispatchEvent(
            new CustomEvent("troviruses:navigation", {
                detail: {
                    section: sectionName
                }
            })
        );
    }

    function navigate(sectionName) {
        showSection(sectionName);

        const url =
            new URL(window.location.href);

        url.hash = sectionName;

        window.history.replaceState(
            null,
            "",
            url
        );
    }

    function getInitialSection() {
        const hash =
            window.location.hash
                .replace("#", "")
                .toLowerCase();

        if (VALID_SECTIONS.includes(hash)) {
            return hash;
        }

        return "home";
    }

    function initRouter() {

        getNavigationItems().forEach((item) => {

            item.addEventListener(
                "click",
                () => {
                    navigate(
                        item.dataset.section
                    );
                }
            );

        });

        window.addEventListener(
            "popstate",
            () => {
                showSection(
                    getInitialSection()
                );
            }
        );

        showSection(
            getInitialSection()
        );
    }

    window.TROVIRUSES = window.TROVIRUSES || {};

    window.TROVIRUSES.router = {
        init: initRouter,
        navigate,
        showSection
    };

})();
