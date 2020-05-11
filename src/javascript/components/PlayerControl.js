import { getDamage, getCriticalDamage } from './fight';

class PlayerControl {
  constructor({
    attackerFighter,
    defendingFighter,
    attackBtnKey,
    blockAttackBtnKey,
    criticalAttackKey,
    getWinnerFighterCallback,
    selectorHealthIndicator,
  }) {
    this.health = attackerFighter.health;
    this.attackingFighter = attackerFighter;
    this.attackBtnKey = attackBtnKey;
    this.blockAttackBtnKey = blockAttackBtnKey;
    this.criticalAttackKeys = criticalAttackKey;

    this.state = {
      isImpactBlock: false,
      isCanUseCritical: true,
    };

    this.defendingFighter = defendingFighter;
    this.defendingPlayerControl = null;

    this.pressed = new Set();
    this.getWinnerFighter = getWinnerFighterCallback;

    this._controlHit = this._controlHit.bind(this);
    this._deletePressedKey = this._deletePressedKey.bind(this);
    this.$healthIndicator = document.getElementById(selectorHealthIndicator);
  }

  _defaultHit() {
    if (!this.pressed.has(this.attackBtnKey)) {
      const damage = getDamage(this.attackingFighter, this.defendingFighter);
      this.defendingPlayerControl.takeDamage(damage);
    }
  }

  _criticalHit() {
    this.state.isCanUseCritical = false;
    const intervalUseCriticalHit = 10000;

    const damage = getCriticalDamage(this.attackingFighter.attack);
    this.defendingPlayerControl.takeDamage(damage, true);

    setTimeout(() => (this.state.isCanUseCritical = true), intervalUseCriticalHit);
  }

  takeDamage(damage, isCritical) {
    if (isCritical || !this.state.isImpactBlock) {
      return this._downHealth(damage);
    }
  }

  _controlHit({ code }) {
    if (code === this.attackBtnKey) {
      this._defaultHit();
    }

    if (code === this.blockAttackBtnKey) {
      this.state.isImpactBlock = true;
    }

    if (this._isCriticalKey() && this.state.isCanUseCritical) {
      this._criticalHit();
    }

    this._addPressedKey(code);
  }

  _checkDeath() {
    if (this.health <= 0) {
      this.getWinnerFighter(this.defendingFighter);
      this.offPlayerControl();
      this.defendingPlayerControl.offPlayerControl();
      console.log('Player Win', this.defendingFighter);
    }
  }

  _getNewWidthHealthIndicator() {
    const maxHealth = this.attackingFighter.health;
    const currentHealth = this.health;

    const newWidthIndicator = (currentHealth / maxHealth) * 100;
    return newWidthIndicator < 0 ? 0 : newWidthIndicator;
  }

  _updateHealthIndicator() {
    const newWidthIndicator = this._getNewWidthHealthIndicator();
    this.$healthIndicator.style.width = `${newWidthIndicator}%`;
  }

  _downHealth(damage) {
    this.health -= damage;
    this._updateHealthIndicator();
    console.log(' this.health', this.health);
    this._checkDeath();
  }

  _isCriticalKey() {
    return this.criticalAttackKeys.every((btnCode) => this.pressed.has(btnCode));
  }

  _addPressedKey(code) {
    this.pressed.add(code);
  }

  _deletePressedKey({ code }) {
    this.pressed.delete(code);
  }

  _onPlayerControl() {
    window.addEventListener('keydown', this._controlHit);
    window.addEventListener('keyup', this._deletePressedKey);
  }

  offPlayerControl() {
    window.removeEventListener('keydown', this._controlHit);
    window.removeEventListener('keyup', this._deletePressedKey);
  }

  init(defendingPlayerControl) {
    this.defendingPlayerControl = defendingPlayerControl;
    this._onPlayerControl();
  }
}

export default PlayerControl;
