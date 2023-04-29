import { toast } from "react-toastify";

export const successNotification = (msg , duration = 3000) => {
    toast.success(msg, {
        position: "bottom-right",
        autoClose: duration,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
}
export const errorNotification = (msg , duration) => {
    toast.error(msg, {
        position: "bottom-right",
        autoClose: duration,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
}