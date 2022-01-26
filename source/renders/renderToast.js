import { Toast } from 'bootstrap';

export default (element) => {
  const toast = new Toast(element, { animation: true, autohide: true, delay: 5000 });
  toast.show();
};
