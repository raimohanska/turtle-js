"use strict";
define(["lodash", "tco", "barrier", "piano", "commands", "speak"], function(_, tco, barrier, Piano, Commands) {
  // bundles together the scripts that are pre-loaded to turtleroy repl
  return function turtleBundle(jsEnv, turtle, repl, editor) {
    var globals = { repl: repl, turtle: turtle, tco: tco, Barrier: barrier, speak: speak }
    jsEnv.setGlobals(Piano())
    jsEnv.setGlobals(Commands(editor.code, repl))
    jsEnv.setGlobals(globals)
    jsEnv.setGlobals(turtle)
  }
})
