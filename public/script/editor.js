define(["bacon.jquery", "parsestack"], function(bjq, parseStack) {
  return function Editor(root, jsEnv, repl) {
    var editorElement = root.find(".editor")
    var editorArea = editorElement.find("textarea")
    code = Bacon.$.textFieldValue(editorArea)

    repl.history.onValue(function(line) {
      editorArea.val(editorArea.val() ? editorArea.val() + "\n" + line : line)
      editorArea.trigger("paste")
    })

    var ctrlSpace = editorArea.asEventStream("keyup")
      .filter(function(e) { return e.ctrlKey && e.keyCode == 32})
      .doAction(".preventDefault")
    root.find(".run-link").asEventStream("click").merge(ctrlSpace).map(code).onValue(function(program) {
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
      reset: function() {
        editorArea.val("")
        editorArea.trigger("paste")
        clearError()
      }
    }

    function clearError() {
      showErrorText("")
    }

    function showError(error) {
      showErrorText("Error on line " + error.lineNumber + ": " + error.message)
    }
    
    function showErrorText(text) {
      editorElement.find(".error").text(text)
    }
  }
})
