import Module from "../../module";
import hooks from "../../../hooks";

export default class Bhop extends Module {
    constructor() {
        super("Bhop", "Movement");
    }

    onRender () {
        if (hooks?.stores?.gameState?.gameWorld?.server) {
            hooks.stores.gameState.gameWorld.player.inputs.jump = true;
            hooks.stores.gameState.gameWorld.player.inputs.jumpPressed = true;
        };
    }
}