import BasicWidget from "./basic_widget.js";
import keyboardActionService from "../services/keyboard_actions.js";
import utils from "../services/utils.js";
import syncService from "../services/sync.js";

const TPL = `
<div class="global-menu-wrapper">
    <style>
    .global-menu-wrapper {
        height: 35px;
        border-bottom: 1px solid var(--main-border-color);
    }
    
    .global-menu button {
        margin-right: 10px;
        height: 33px;
        border-bottom: none;
    }
    
    .global-menu .dropdown-menu {
        width: 20em;
    }
    </style>

    <div class="dropdown global-menu">
        <button type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" class="btn btn-sm dropdown-toggle">
            <span class="bx bx-menu"></span>
            Menu
            <span class="caret"></span>
        </button>
        <div class="dropdown-menu dropdown-menu-right">
            <a class="dropdown-item options-button" data-trigger-event="showOptions">
                <span class="bx bx-slider"></span>
                Options
            </a>

            <a class="dropdown-item sync-now-button" title="Trigger sync">
                <span class="bx bx-recycle"></span>
                Sync (<span id="outstanding-syncs-count">0</span>)
            </a>

            <a class="dropdown-item open-dev-tools-button" data-trigger-event="openDevTools">
                <span class="bx bx-terminal"></span>
                Open Dev Tools
                <kbd data-kb-action="OpenDevTools"></kbd>
            </a>

            <a class="dropdown-item" data-trigger-event="showSQLConsole">
                <span class="bx bx-data"></span>
                Open SQL Console
                <kbd data-kb-action="ShowSQLConsole"></kbd>
            </a>

            <a class="dropdown-item" data-trigger-event="showBackendLog">
                <span class="bx bx-empty"></span>
                Show backend log
                <kbd data-kb-action="ShowBackendLog"></kbd>
            </a>

            <a class="dropdown-item" data-trigger-event="reloadFrontendApp" 
                title="Reload can help with some visual glitches without restarting the whole app.">
                <span class="bx bx-empty"></span>
                Reload frontend
                <kbd data-kb-action="ReloadFrontendApp"></kbd>
            </a>

            <a class="dropdown-item" data-trigger-event="toggleZenMode">
                <span class="bx bx-empty"></span>
                Toggle Zen mode
                <kbd data-kb-action="ToggleZenMode"></kbd>
            </a>

            <a class="dropdown-item" data-trigger-event="toggleFullscreen">
                <span class="bx bx-empty"></span>
                Toggle fullscreen
                <kbd data-kb-action="ToggleFullscreen"></kbd>
            </a>

            <a class="dropdown-item" data-trigger-event="showHelp">
                <span class="bx bx-info-circle"></span>
                Show Help
                <kbd data-kb-action="ShowHelp"></kbd>
            </a>

            <a class="dropdown-item show-about-dialog-button">
                <span class="bx bx-empty"></span>
                About Trilium Notes
            </a>

            <a class="dropdown-item logout-button" data-trigger-event="logout">
                <span class="bx bx-log-out"></span>
                Logout
            </a>
        </div>
    </div>
</div>
`;

export default class GlobalMenuWidget extends BasicWidget {
    doRender() {
        this.$widget = $(TPL);

        this.$widget.find(".show-about-dialog-button").on('click',
            () => import("../dialogs/about.js").then(d => d.showDialog()));

        this.$widget.find(".sync-now-button").on('click', () => syncService.syncNow());

        this.$widget.find(".logout-button").toggle(!utils.isElectron());

        this.$widget.find(".open-dev-tools-button").toggle(utils.isElectron());

        return this.$widget;
    }
}