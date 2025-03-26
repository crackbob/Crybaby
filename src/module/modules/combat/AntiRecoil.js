import Module from "../../module";
import hooks from "../../../hooks";

export default class AntiRecoil extends Module {
    constructor() {
        super("AntiRecoil", "Combat");
    }

    onEnable() {
        if (!hooks?.stores?.gameState?.gameWorld?.server) return;
        let shooter = hooks.stores.gameState.gameWorld.player.shooter;
        let currentWeapon = shooter.currPlayerWeaponSpec;
        currentWeapon._recoilAttackX = currentWeapon.recoilAttackX;
        currentWeapon._recoilAttackY = currentWeapon.recoilAttackY;
        currentWeapon.recoilAttackX = 0;
        currentWeapon.recoilAttackY = 0;

        shooter.spread._x = shooter.spread.x;
        shooter.spread._y = shooter.spread.y;
        shooter.spread.x = 0;
        shooter.spread.y = 0;
    }

    onDisable() {
        if (!hooks?.stores?.gameState?.gameWorld?.server) return;
        let shooter = hooks.stores.gameState.gameWorld.player.shooter;
        let currentWeapon = shooter.currPlayerWeaponSpec;

        currentWeapon.recoilAttackX = currentWeapon?._recoilAttackX  || currentWeapon.recoilAttackX;
        currentWeapon.recoilAttackY = currentWeapon?._recoilAttackY || currentWeapon.recoilAttackY;

        shooter.spread.x = shooter.spread?._x || shooter.spread.x;
        shooter.spread.y = shooter.spread?._y || shooter.spread.y;
    }

    onRender () {
        if (hooks?.stores?.gameState?.gameWorld?.server && hooks.stores.gameState.gameWorld.player.shooter.spread.y > 0) {
            this.onEnable();
        };
    }
}