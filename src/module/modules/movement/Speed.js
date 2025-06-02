import Module from "../../module";
import hooks from "../../../hooks";

export default class Speed extends Module {
    constructor() {
        super("Speed", "Movement", {
            "idk": 20
        });
        this.interval = null;
    }

    onEnable() {
        let playerPhysicsSystem = hooks.stores.gameState.gameWorld.systemsManager.activeExecuteSystems.find(system => system?.playerPhysicsSystem)
        if (this.interval) clearInterval(this.interval);
        this.interval = setInterval(playerPhysicsSystem.physicsTick.bind(playerPhysicsSystem), this.options["idk"]);
    }

    onDisable() {
        if (this.interval) clearInterval(this.interval);
    }
}