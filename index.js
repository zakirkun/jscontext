"use strict";

const cls = require("cls-hooked");

const nsid = require("uuid").v4(); // generate random nsid using uuid instead of hard-coded value
const namespace = cls.getNamespace(nsid) || cls.createNamespace(nsid);

/**
 * Create context, will return the method binded to continuation local storage context.
 * @returns {object}
 */
function context() {
  function invokedSet(key, value) {
    if (namespace && namespace.active) {
      namespace.set(key, value);
    }
  }

  function invokedGet(key) {
    if (namespace && namespace.active) {
      return namespace.get(key);
    }
  }

  const newContext = namespace.createContext();

  namespace.context = newContext;

  // solve `null` namespace.active https://github.com/skonves/express-http-context/issues/26
  namespace.active = newContext;

  const set = namespace.bind(invokedSet, newContext);
  const get = namespace.bind(invokedGet, newContext);

  return { set, get, namespace };
}

/**
 * Call the context middleware
 * @param {object} context - object return value of context function call
 * @returns {void}
 */
function contextMiddleware(context) {
  return function contextMiddleware(req, res, next) {
    // make sure context object is not used in request object
    if (req.context) {
      // continue request
      next();
      return;
    }

    // declare the return value of context function value to context object
    // in request object
    req.context = context;

    // continue request
    next();
  };
}

exports = module.exports = {
  context,
  contextMiddleware,
};
