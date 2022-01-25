import { Modal } from 'bootstrap';
import example from '../components/example.json';

export default (status, elements) => {
  elements.modal.body.innerHTML = '';

  const text = document.createElement('pre');
  text.textContent = JSON.stringify(example, null, '  ');
  elements.modal.body.append(text);

  const modal = new Modal(elements.modal.element);

  switch (status) {
    case 'hidden':
      modal.hide();
      break;

    case 'shown':
      modal.show();
      break;

    default:
      throw new Error(`Unknown status: ${status}`);
  }
};
