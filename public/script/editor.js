define(["bacon.jquery", "parsestack"], function(bjq, parseStack) {
  return function Editor(root, jsEnv, repl) {
    var editorElement = root.find(".editor")
    var editorArea = editorElement.find("textarea")
    var runBus = new Bacon.Bus()

    codeMirror = CodeMirror.fromTextArea(editorArea.get(0), { 
      lineNumbers: true,
      mode: "javascript",
      theme: "solarized dark",
      extraKeys: {
        "Ctrl-Space": function() { runBus.push() }
      }
    })
  
    code = Bacon.fromEventTarget(codeMirror, "change")
      .map(".getValue")
      .toProperty(codeMirror.getValue())

    repl.history.onValue(function(line) {
      codeMirror.setValue(codeMirror.getValue() ? codeMirror.getValue() + "\n" + line : line)
    })

    root.find(".run-link").asEventStream("click").merge(runBus).map(code).onValue(function(program) {
      clearError()
      try {
        jsEnv.eval(program)
      } catch(e) {
        var parsed = parseStack(e)
        showError(parsed)
      }
    })

    code.changes().onValue(clearError)

    return {
      code: code,
      refresh: function() {
        codeMirror.refresh()
      },
      reset: function() {
        codeMirror.setValue("")
      }
    }

    var errorLine = undefined

    function clearError() {
      showErrorText("")
      if (errorLine !== undefined) { 
        codeMirror.removeLineClass(errorLine, 'gutter', 'line-error')
        errorLine = undefined
      }
    }

    function showError(error) {
      if (error.lineNumber > codeMirror.lineCount()) {
        error.lineNumber = undefined
      }
      if (error.lineNumber) {
        errorLine = error.lineNumber - 1
        codeMirror.addLineClass(errorLine, 'gutter', 'line-error');
        showErrorText("Error on line " + error.lineNumber + ": " + error.message)
      } else {
        showErrorText("Error: " + error.message)
      }
    }
    
    function showErrorText(text) {
      editorElement.find(".error").text(text)
    }
  }
})
