function create(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne,
      escapeXml = __helpers.x,
      forEach = __helpers.f,
      attr = __helpers.a;

  return function render(data, out) {
    out.w("<!doctype html><html lang=\"en\" ng-app=\"ndndLogin\" ng-cloak><head><meta charset=\"UTF-8\"><title>ndnd</title><meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">");

    forEach(data.fonts, function(font) {
      out.w("<link rel=\"stylesheet\" media=\"all\"" +
        attr("href", font) +
        ">");
    });

    forEach(data.styles, function(style) {
      out.w("<link rel=\"stylesheet\" media=\"all\"" +
        attr("href", style) +
        ">");
    });

    out.w("<link rel=\"stylesheet\" media=\"all\" href=\"client/application.css\">");

    forEach(data.scripts, function(script) {
      out.w("<script" +
        attr("src", script) +
        "></script>");
    });

    out.w("<script src=\"client/application.js\"></script><script>window.history.pushState(\"\", document.title, window.location.pathname);</script></head><body layout=\"column\" layout-padding ng-include=\"&#39;client/angular/login/login.html&#39;\"></body></html>");
  };
}

(module.exports = require("marko").c(__filename)).c(create);
