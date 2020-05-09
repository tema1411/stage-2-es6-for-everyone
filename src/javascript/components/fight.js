import { controls } from '../../constants/controls';
import { getRandomNumber } from '../helpers/mathHelper';

export async function fight(firstFighter, secondFighter) {
  console.log('firstFighter', firstFighter);
  return new Promise((resolve) => {
    let { health: firstFighterHeals } = firstFighter;
    let { health: secondFighterHeals } = secondFighter;

    window.addEventListener('keydown', function (e) {
      switch (e.code) {
        case controls.PlayerOneAttack:
          //const hitPower = getHitPower(firstFighter);
          const blockPower = getBlockPower(firstFighter);
      }
    });
    // resolve the promise with the winner when fight is over
  });
}

function addControlFight() {}

export function getDamage(attacker, defender) {}

export function getHitPower(fighter) {
  const criticalHitChance = getRandomNumber(1, 2);
  return fighter.attack * criticalHitChance;
}

export function getBlockPower(fighter) {
  const dodgeChance = getRandomNumber(1, 2);
  return fighter.defense * dodgeChance;
}
