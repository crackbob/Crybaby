import Module from "../../module";
import hooks from "../../../hooks";

export default class Chams extends Module {
    constructor () {
        super("Chams", "Visual", null)
    }

    onRender () {
        if (!hooks?.stores?.gameState?.gameWorld?.server) return;
        Object.values(hooks.stores.gameState.gameWorld.server.players).forEach(player => {
            if (player.model && player.model.children[0]?.children[0]?.material) {
                let material = player.model.children[0].children[0].material;
                material.depthTest = false;
                material.transparent = true;
                material.wireframe = true;
            }
        });
    }

    onDisable () {
        if (!hooks?.stores?.gameState?.gameWorld?.server) return;
        Object.values(hooks.stores.gameState.gameWorld.server.players).forEach(player => {
            if (player.model && player.model.children[0]?.children[0]?.material) {
                let material = player.model.children[0].children[0].material;
                material.depthTest = true;
                material.transparent = false;
                material.wireframe = false;
            }
        });
    }
};