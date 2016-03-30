function create(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne,
      escapeXml = __helpers.x,
      forEach = __helpers.f,
      attr = __helpers.a;

  return function render(data, out) {
    out.w("<!doctype html><meta charset=\"UTF-8\"><title>ndnd - login</title><meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">");

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

    out.w("<script src=\"client/application.js\"></script><form ng-app=\"LoginApp\" ng-cloak><div><label>username</label><input name=\"username\" type=\"text\"></div><div><label>password</label><input name=\"password\" type=\"password\"></div><button type=\"submit\">SUBMIT</button></form>");
  };
}

(module.exports = require("marko").c(__filename)).c(create);
