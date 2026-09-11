/* TROVIRUSES
   Backup System
*/

(function () {
    "use strict";

    const BACKUP_FORMAT = "troviruses-backup";
    const BACKUP_VERSION = 1;

    function createBackup() {
        return {
            app: {
                name: "TROVIRUSES",
                format: BACKUP_FORMAT,
                version: BACKUP_VERSION
            },

            createdAt: new Date().toISOString(),

            data: {
                user: AppState.user,
                character: AppState.character,
                xp: AppState.xp,
                worlds: AppState.worlds,
                settings: AppState.settings,
                ui: AppState.ui
            }
        };
    }

    function exportBackup() {
        try {
            const backup = createBackup();

            const json = JSON.stringify(
                backup,
                null,
                4
            );

            const blob = new Blob(
                [json],
                {
                    type: "application/json"
                }
            );

            const url =
                URL.createObjectURL(blob);

            const link =
                document.createElement("a");

            const date =
                new Date()
                    .toISOString()
                    .slice(0, 10);

            link.href = url;

            link.download =
                `troviruses-backup-${date}.json`;

            document.body.appendChild(link);

            link.click();

            link.remove();

            URL.revokeObjectURL(url);

            console.log(
                "TROVIRUSES: Backup exported."
            );

            return true;

        } catch (error) {

            console.error(
                "TROVIRUSES: Backup export failed.",
                error
            );

            return false;
        }
    }

    function validateBackup(backup) {

        if (!backup || typeof backup !== "object") {
            return false;
        }

        if (!backup.app) {
            return false;
        }

        if (
            backup.app.name !== "TROVIRUSES"
        ) {
            return false;
        }

        if (
            backup.app.format !== BACKUP_FORMAT
        ) {
            return false;
        }

        if (
            !backup.data ||
            typeof backup.data !== "object"
        ) {
            return false;
        }

        return true;
    }

    async function importBackup(file) {

        if (!file) {
            return false;
        }

        try {

            const text =
                await file.text();

            const backup =
                JSON.parse(text);

            if (!validateBackup(backup)) {

                console.error(
                    "TROVIRUSES: Invalid backup file."
                );

                return false;
            }

            AppState.user =
                backup.data.user || {};

            AppState.character =
                backup.data.character || {};

            AppState.xp =
                backup.data.xp || {};

            AppState.worlds =
                backup.data.worlds || {};

            AppState.settings =
                backup.data.settings || {};

            AppState.ui =
                backup.data.ui || {};

if (
    window.TROVIRUSES &&
    window.TROVIRUSES.storage &&
    typeof window.TROVIRUSES.storage.saveAppState ===
        "function"
) {
    window.TROVIRUSES.storage.saveAppState();
} else {
    console.error(
        "TROVIRUSES: Storage Engine is not available."
    );

    return false;
}

            console.log(
                "TROVIRUSES: Backup imported."
            );

            return true;

        } catch (error) {

            console.error(
                "TROVIRUSES: Backup import failed.",
                error
            );

            return false;
        }
    }

    window.TROVIRUSES =
        window.TROVIRUSES || {};

    window.TROVIRUSES.backup = {

        createBackup,

        exportBackup,

        importBackup,

        validateBackup

    };

})();
