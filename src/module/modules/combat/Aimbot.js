import Module from "../../module";
import hooks from "../../../hooks";
import mathUtils from "../../../utils/mathUtils";

export default class Aimbot extends Module {
    constructor() {
        super("Aimbot", "Combat", {
            "On Aim": "false",
            "On Shoot": "false"
        });
        this.lastExecutionTime = null;

        this.isLeftClicking = false;
        this.isRightClicking = false;

        document.addEventListener('mousedown', (event) => {
            if (event.button === 0) {
                this.isLeftClicking = true;
            } else if (event.button === 2) {
                this.isRightClicking = true;
            }
        });

        document.addEventListener('mouseup', (event) => {
            if (event.button === 0) {
                this.isLeftClicking = false;
            } else if (event.button === 2) {
                this.isRightClicking = false;
            }
        });
    }
    
    getClosestEnemy(player, enemies) {
        let closestEnemy = null;
        let closestDistance = Infinity;
    
        Object.values(enemies).forEach(enemy => {
            if (enemy?.model?.position && enemy.isEnemy && !enemy.dead) {
                let distance = mathUtils.calculateDistance(player.position, enemy.model.position);
                if (distance < closestDistance) {
                    closestDistance = distance;
                    closestEnemy = enemy;
                }
            }
        });
    
        return closestEnemy;
    }
    
    // thank bob for shadow i hate math
    aimAtEnemy() {
        let gameState = hooks.stores.gameState;
        let player = gameState.gameWorld.player;
        let enemies = gameState.gameWorld.server.players;
    
        if (!player || !enemies) return;
    
        let closestEnemy = this.getClosestEnemy(player, enemies);
    
        if (closestEnemy) {
            let enemyPos = closestEnemy.model.position;
            let playerPos = player.position;
    
            let direction = {
                x: enemyPos.x - playerPos.x,
                z: enemyPos.z - playerPos.z,
            };
    
            let rotationY = Math.atan2(direction.x, direction.z);
            
            let headOffset = 0.8;
            let verticalDistance = (enemyPos.y + headOffset) - playerPos.y;
            let horizontalDistance = Math.hypot(direction.x, direction.z);
            let rotationX = Math.atan2(verticalDistance, horizontalDistance);
    
            rotationX = Math.max(Math.min(rotationX, Math.PI / 2), -Math.PI / 2);
            let normalizedRotationY = (rotationY + Math.PI) % (2 * Math.PI);
    
            player.rotation.y = normalizedRotationY;
            player.rotation.x = rotationX;
        }
    }
    
    onRender () {
        if (!hooks?.stores?.gameState?.gameWorld?.server) return;

        if (this.options["On Aim"] == "true" && this.isRightClicking) {
            this.aimAtEnemy();
        } else if (this.options["On Shoot"] == "true" && this.isLeftClicking) {
            this.aimAtEnemy();
        } else if (this.options["On Shoot"] !== "true" && this.options["On Aim"] !== "true") {
            this.aimAtEnemy();
        }
    }
}