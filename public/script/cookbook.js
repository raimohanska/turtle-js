"use strict";
define([], function() {
  return function Cookbook(editor, repl) {
    var square = "function square() {\n  for (var i=1; i <= 4; i++) {\n    fd(50)\n    lt(90)\n  }\n}"
    addExample("Turtle moves", "fd(50)\nlt(45)\nfd(50)\nrt(45)\nfd(50)")
    addExample("Square", square + "\nsquare()")
    addExample("Clear", "clear()")

    $("#cookbook label").click(function() {
      $("#cookbook ul").slideToggle("fast")
    })
    function addExample(name, code) {
      var element = $("<li>").attr("data-code", code).text(name)
      $("#cookbook ul").append(element)
    }
    $("#cookbook li").click(function() {
      var text = $(this).attr("data-code")
      editor.reset()
      repl.paste(text)
      setTimeout(function() {
        $("#cookbook ul").slideUp("fast")
      }, 100)
    })
  }
});
