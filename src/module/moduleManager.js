import events from "../events";

import ArrayList from "./modules/visual/Arraylist";
import Watermark from "./modules/visual/Watermark";
import ClickGUI from "./modules/visual/ClickGUI";
import AdBypass from "./modules/misc/AdBypass";
import Chams from "./modules/visual/Chams";
import Aimbot from "./modules/combat/Aimbot";
import AntiRecoil from "./modules/combat/AntiRecoil";
import Speed from "./modules/movement/Speed";
import Bhop from "./modules/movement/Bhop";

export default {
    modules: {},
    addModules: function (...modules) {
        for(const module of modules) this.modules[module.name] = module;
    },
    addModule: function (module) {
        this.modules[module.name] = module;
    },
    handleKeyPress: function (key) {
        for (let name in this.modules) {
            let module = this.modules[name];

            if (module.waitingForBind) {
                module.keybind = key;
                module.waitingForBind = false;
                
            } else if (module.keybind == key) {
                module.toggle();
            }
        }
    },

    init () {
        this.addModules(
            new ArrayList(),
            new Watermark(),
            new ClickGUI(),
            new Chams(),
            new AdBypass(),
            new Aimbot(),
            new AntiRecoil(),
            new Speed(),
            new Bhop(),
        );

        events.on("render", () => {
            for (let name in this.modules) {
                if (this.modules[name].isEnabled) {
                    this.modules[name].onRender();
                }
            }
        });

        events.on("keydown", this.handleKeyPress.bind(this));
        events.on("setting.update", () => {
            for (let name in this.modules) {
                if (this.modules[name].isEnabled) {
                    this.modules[name].onSettingUpdate();
                }
            }
        });

        
        this.modules["Arraylist"].enable();
        this.modules["Watermark"].enable();
    }
};