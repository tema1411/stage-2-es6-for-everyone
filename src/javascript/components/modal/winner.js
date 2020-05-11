import { showModal } from './modal';
import App from '../../app';

export function showWinnerModal(fighter) {
  const { name } = fighter;

  showModal({
    title: 'Fight finished',
    bodyElement: `<b>${name}</b> won!!!`,
    onClose: () => {
      document.getElementById('root').innerHTML = '';
      new App();
    },
  });
}
