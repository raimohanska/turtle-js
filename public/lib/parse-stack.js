define([], function() {
  return function parseStack(error) {
    if (typeof error.stack !== "string") {
      return null;
    }
    return {
      message: error.message,
      lineNumber: parseLineNumber(error.stack)
    }
  };

  function parseLineNumber(stack) {
    stackLines = stack.split("\n")
    for (var i in stackLines) {
      var line = stackLines[i]
      var match = line.match(/\d+:\d+/g)
      if (match) {
        var parsed = match[match.length - 1].match(/\d+/g)
        return parseInt(parsed[0])
      }
    }
  }
})
