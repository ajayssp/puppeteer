export const RequestHandler = {
  promiseResponseByUrl: (page, url) =>
    new Promise(function(resolve) {
      page.on("response", response => {
        if (response.url().endsWith(url)) {
          console.log("request promise fulfilled");
        }
        resolve(response);
      });
    })
};

export default RequestHandler;
