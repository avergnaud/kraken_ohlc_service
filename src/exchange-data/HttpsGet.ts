import * as https from "https";

export default function retrieveMarketData(url): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const request = https.get(url, response => {
      // handle http errors
      if (response.statusCode < 200 || response.statusCode > 299) {
        reject(
          new Error("Failed to load page, status code: " + response.statusCode)
        );
      }
      // temporary data holder
      let body = "";
      // on every content chunk, push it to the data array
      response.on("data", chunk => (body += chunk));
      // we are done, resolve promise with those joined chunks
      response.on("end", () => resolve(JSON.parse(body)));
    });
    // handle connection errors of the request
    request.on("error", err => reject(err));
  });
}
