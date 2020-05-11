import { controls } from '../../constants/controls';
import { getRandomNumber } from '../helpers/mathHelper';
import PlayerControl from './PlayerControl';

export async function fight(firstFighter, secondFighter) {
  return new Promise((resolve) => {
    const {
      PlayerOneAttack,
      PlayerOneBlock,
      PlayerOneCriticalHitCombination,
      PlayerTwoAttack,
      PlayerTwoBlock,
      PlayerTwoCriticalHitCombination,
    } = controls;

    const controlFirstPlayer = new PlayerControl({
      attackerFighter: firstFighter,
      defendingFighter: secondFighter,
      attackBtnKey: PlayerOneAttack,
      blockAttackBtnKey: PlayerOneBlock,
      criticalAttackKey: PlayerOneCriticalHitCombination,
      getWinnerFighterCallback: resolve,
      selectorHealthIndicator: 'left-fighter-indicator',
    });

    const controlSecondPlayer = new PlayerControl({
      attackerFighter: secondFighter,
      defendingFighter: firstFighter,
      attackBtnKey: PlayerTwoAttack,
      blockAttackBtnKey: PlayerTwoBlock,
      criticalAttackKey: PlayerTwoCriticalHitCombination,
      getWinnerFighterCallback: resolve,
      selectorHealthIndicator: 'right-fighter-indicator',
    });

    controlFirstPlayer.init(controlSecondPlayer);
    controlSecondPlayer.init(controlFirstPlayer);
  });
}

export function getCriticalDamage(attack) {
  const gain = 2;
  return gain * attack;
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
