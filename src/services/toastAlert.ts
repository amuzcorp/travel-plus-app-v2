import LS2Request from "@enact/webos/LS2Request";
const request = new LS2Request();

export const toastAlert = (message: string) => {
  request.send({
    service: "luna://com.webos.notification",
    method: "createToast",
    parameters: {
      message,
    },
    onSuccess: (res: Record<string, unknown>) => {
      console.log("Toast created:", res);
    },
    onFailure: (err: Error) => {
      console.error("Failed to create toast:", err);
    },
  });
};
