define(["lodash", "sandbox"], function(_, Sandbox) {
  return function JsEnv() {
    var sandbox = Sandbox()
    var api = {
      setGlobals: sandbox.setGlobals,
      eval: function(code) {
        var result = sandbox.eval.call(this, code)
        return { result: result }
      }
    }
    return api
  }
})
