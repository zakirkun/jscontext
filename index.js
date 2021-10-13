const { AsyncLocalStorage } = require('async_hooks');
const als = new AsyncLocalStorage();

const cls = require('cls-hooked');

const createNamespace = cls.createNamespace;
const getNamespace = cls.getNamespace;

const namespace = createNamespace('jscontext');
const session = getNamespace('jscontext');

function context() {
  return {
    value: new Map(),
    addContext: function (key, value){
      const _self = this;
      session.set(key, value);          
      _self.value.set(key, value);
    },
    getContext: function (key){
      const _self = this;
      _self.value.set(key, session.get(key));
      return _self.value.get(key);
    }
  }
}

function runContext(context, fn) {
  var value = {};
  session.run(function() {
    value = fn(context);
  });
  return value;
}

// example
runContext(context(), (ctx) => {
  ctx.addContext("key", "value");

  console.log(ctx.getContext("key"));
});
