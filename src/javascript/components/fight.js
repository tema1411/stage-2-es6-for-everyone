import { controls } from '../../constants/controls';
import { getRandomNumber } from '../helpers/mathHelper';

export async function fight(firstFighter, secondFighter) {
  return new Promise((resolve) => {
    const PLAYER_ONE = 'player one';
    const PLAYER_TWO = 'player two';
    const pressedKeys = new Set();

    let { health: firstFighterHealth } = firstFighter;
    let { health: secondFighterHealth } = secondFighter;
    let isCriticalHitOnePlayer = true;
    let isCriticalHitTwoPlayer = true;

    function controlCriticalHit(player) {
      const intervalUseCriticalHit = 10000;
      let timeoutCallback = null;

      if (PLAYER_ONE) {
        isCriticalHitOnePlayer = false;
        timeoutCallback = () => (isCriticalHitOnePlayer = true);
      } else if (PLAYER_TWO) {
        isCriticalHitTwoPlayer = false;
        timeoutCallback = () => (isCriticalHitTwoPlayer = true);
      }

      setTimeout(timeoutCallback, intervalUseCriticalHit);
    }

    function isPressAllBtnFromArray(array) {
      return array.every((btnCode) => pressedKeys.has(btnCode));
    }

    function getIsAttackingOnePlayer() {
      return pressedKeys.has(controls.PlayerOneAttack);
    }

    function getIsAttackingTwoPlayer() {
      return pressedKeys.has(controls.PlayerTwoAttack);
    }

    function getIsBlockingOnePlayer() {
      return pressedKeys.has(controls.PlayerOneBlock);
    }

    function getIsBlockingTwoPlayer() {
      return pressedKeys.has(controls.PlayerTwoBlock);
    }

    window.addEventListener('keydown', function ({ code }) {
      console.log('pressedKeys', pressedKeys);
      if (code === controls.PlayerOneAttack) {
        if (!getIsAttackingOnePlayer() && !getIsBlockingTwoPlayer()) {
          const damage = getDamage(firstFighter, secondFighter);
          secondFighterHealth -= damage;
          console.log('secondFighterHealth', secondFighterHealth);
        }
      }

      if (code === controls.PlayerTwoAttack) {
        if (!getIsAttackingTwoPlayer() && !getIsBlockingOnePlayer()) {
          const damage = getDamage(secondFighter, firstFighter);
          firstFighterHealth -= damage;
          console.log('firstFighterHealth', firstFighterHealth);
        }
      }

      if (isCriticalHitOnePlayer && isPressAllBtnFromArray(controls.PlayerOneCriticalHitCombination)) {
        controlCriticalHit(PLAYER_ONE);

        const damage = getCriticalDamage(firstFighter);
        secondFighterHealth -= damage;
        console.log('secondFighterHealth', secondFighterHealth);
      }

      if (isCriticalHitTwoPlayer && isPressAllBtnFromArray(controls.PlayerTwoCriticalHitCombination)) {
        controlCriticalHit(PLAYER_TWO);

        const damage = getCriticalDamage(secondFighter);
        firstFighterHealth -= damage;
        console.log('firstFighterHealth', firstFighterHealth);
      }

      pressedKeys.add(code);
    });

    window.addEventListener('keyup', function ({ code }) {
      pressedKeys.delete(code);
    });

    // resolve the promise with the winner when fight is over
  });
}

function getCriticalDamage(attacker) {
  const gain = 2;
  return gain * attacker.attack;
}

export function getDamage(attacker, defender) {
  const damage = getHitPower(attacker) - getBlockPower(defender);
  return damage < 0 ? 0 : damage;
}

export function getHitPower(fighter) {
  const criticalHitChance = getRandomNumber(1, 2);
  return fighter.attack * criticalHitChance;
}

export function getBlockPower(fighter) {
  const dodgeChance = getRandomNumber(1, 2);
  return fighter.defense * dodgeChance;
}
