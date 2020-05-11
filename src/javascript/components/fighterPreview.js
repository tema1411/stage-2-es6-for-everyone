import { createElement } from '../helpers/domHelper';

export function createFighterPreview(fighter, position) {
  const positionClassName = position === 'right' ? 'fighter-preview___right' : 'fighter-preview___left';
  const fighterElement = createElement({
    tagName: 'div',
    className: `fighter-preview___root ${positionClassName}`,
  });

  if (fighter) {
    const { source, ...mainFighterInfo } = fighter;
    fighterElement.append(createFighterImage(fighter));
    fighterElement.append(createInfoFighterRows(mainFighterInfo));
  }

  return fighterElement;
}

function createInfoTableData(nameParam) {
  const rowInfo = createElement({
    tagName: 'td',
    className: 'fighter-preview___data',
  });

  rowInfo.textContent = nameParam;
  return rowInfo;
}

function createInfoFighterRow(nameParam, valueParam) {
  const rowInfo = createElement({
    tagName: 'tr',
    className: 'fighter-preview___row',
  });

  rowInfo.append(createInfoTableData(nameParam));
  rowInfo.append(createInfoTableData(valueParam));

  return rowInfo;
}

function createInfoFighterRows(fighter) {
  const listParamWrp = createElement({
    tagName: 'table',
    className: 'fighter-preview___rows',
  });

  Object.keys(fighter).forEach((nameParam) => listParamWrp.append(createInfoFighterRow(nameParam, fighter[nameParam])));

  return listParamWrp;
}

export function createFighterImage(fighter) {
  const { source, name } = fighter;
  const attributes = {
    src: source,
    title: name,
    alt: name,
  };
  const imgElement = createElement({
    tagName: 'img',
    className: 'fighter-preview___img',
    attributes,
  });

  return imgElement;
}
