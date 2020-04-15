const AddRunMiddleware = require("run-middleware"),
  listEndpoints = require("express-list-endpoints");

function routeCaller(app) {
  if (typeof app == "function" && app.hasOwnProperty("_router")) {
    this.app = app;
    this.loadedRoutes = listEndpoints(app);
    AddRunMiddleware(app);
  } else {
    throw new Error("Not a Valid Express APP");
  }
}

/**
 *
 *
 * @param {String} path
 * @param {Object} payload
 * @returns
 */
routeCaller.prototype.runMiddleware = function runMiddleware(path, payload) {
  let self = this;

  return new Promise((resolve, reject) => {
    let routesArray = self.loadedRoutes.map((o) => o.path),
      routeIndex = routesArray.lastIndexOf(path);

    if (routeIndex > -1) {
      payload = Object.assign(payload, {
        method: self.loadedRoutes[routeIndex].methods[0],
      });

      self.app.runMiddleware(path, payload, function callback(
        statusCode,
        data,
        headers
      ) {
        resolve({ statusCode, data, headers });
      });
    } else {
      throw new Error(
        `Path ${path} does not exist!\nValid paths include ${JSON.stringify(
          self.loadedRoutes,
          0,
          4
        )}`
      );
    }
  });
};

module.exports = function (app) {
  return new routeCaller(app);
};
