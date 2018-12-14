
import toastr from 'toastr';


const toast = (status, message) => {
  toastr.clear();
  if (status === 'error') {
    return toastr.error(message);
  }
  return toastr.success(message);
};

export default toast;
