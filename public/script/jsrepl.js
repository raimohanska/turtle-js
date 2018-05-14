"use strict";
define(["bacon","jq-console"], function(Bacon) {
  var welcomeMessage = "Welcome to Code180's workshop.\nClick 'lessons' below to begin.\n"
  var promptLabel = '> '
  function fmt(value, className) {
    return {msg: value, className: "jqconsole-" + className};
  }

  function fmtValue(value) { return fmt(value, "value"); }
  function fmtType(value) { return fmt(value, "type"); }
  function fmtCommand(value) { return fmt(promptLabel + value, "command"); }
  function fmtError(value) { 
    if (value.statusText) {
      value = value.statusText
    }
    return fmt(value, "error"); 
  }

  function init(consoleElement, jsEnv) {
    var history = new Bacon.Bus()
    var error = new Bacon.Bus()
    var skipHistory
    var cs = consoleElement.jqconsole(welcomeMessage, promptLabel)
    setInterval(function() {$(".jqconsole-cursor").toggleClass("blink")}, 500)

    function sendToConsole(msg) {
      cs.Write(msg.msg + '\n', msg.className);
    }

    function evalLine(line) {
      return evalUsing(line, jsEnv.eval)
    }

    function evalUsing(line, evalFunc) {
      try {
        var evaled = evalFunc(line)
        if (skipHistory) {
          skipHistory = false
        } else {
          history.push(line)
        }
        error.push("")
        if (evaled != undefined && evaled.result != null) {
          var observableResult = (evaled.result instanceof Bacon.Observable) ?
            evaled.result :
            Bacon.once(evaled.result)
          return observableResult.map(function(value) {
            return fmtValue(value)
          })
        } else {
          return Bacon.never();
        }
      } catch(e) {
        var msg = fmtError(e.toString())
        error.push(msg.msg)
        return Bacon.once(msg);
      }
    }
    function prompt() {
      cs.Prompt(true, function(line) {
        var response = evalLine(line)
        response.onValue(sendToConsole)
        response.errors().mapError(fmtError).onValue(sendToConsole)
        response.onEnd(prompt)
      })  
    }
    prompt()
    return {
      history: history,
      paste: function(line) {
        sendToConsole(fmtCommand(line))
        evalLine(line).onValue(sendToConsole)
      },
      error: error.toProperty(),
      skipHistory: function() {
        skipHistory = true
      },
      focus: function() {
        cs.Focus()
      },
      print: function(text) {
        sendToConsole(fmtValue(text))
      },
      prompt: function(text, handler) {
        sendToConsole(fmt(text, "command"))
        cs.Prompt(true, function(line) {
          handler(line)
        })
      }
    }
  }

  return {
    init: function(element, jsEnv) { return init(element, jsEnv) }
  }
})
