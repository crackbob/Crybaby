import Module from "../../module";
import hooks from "../../../hooks";

export default class AdBypass extends Module {
    constructor() {
        super("AdBypass", "Misc");
    }

    onEnable() {
        this._reward = this._reward || hooks.stores.ads.rewardCommercialVideoWrapper;
        hooks.stores.ads.rewardCommercialVideoWrapper = () => true;
    }

    onDisable() {
        hooks.stores.ads.rewardCommercialVideoWrapper = () => this._reward;
    }
}