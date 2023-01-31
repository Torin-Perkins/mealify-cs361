(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['scroller'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"scroller\" data-photoURL="
    + alias4(((helper = (helper = lookupProperty(helpers,"photoURL") || (depth0 != null ? lookupProperty(depth0,"photoURL") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"photoURL","hash":{},"data":data,"loc":{"start":{"line":1,"column":36},"end":{"line":1,"column":48}}}) : helper)))
    + " data-title="
    + alias4(((helper = (helper = lookupProperty(helpers,"title") || (depth0 != null ? lookupProperty(depth0,"title") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data,"loc":{"start":{"line":1,"column":60},"end":{"line":1,"column":69}}}) : helper)))
    + " data-description="
    + alias4(((helper = (helper = lookupProperty(helpers,"description") || (depth0 != null ? lookupProperty(depth0,"description") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"description","hash":{},"data":data,"loc":{"start":{"line":1,"column":87},"end":{"line":1,"column":102}}}) : helper)))
    + " data-carbs="
    + alias4(((helper = (helper = lookupProperty(helpers,"carbs") || (depth0 != null ? lookupProperty(depth0,"carbs") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"carbs","hash":{},"data":data,"loc":{"start":{"line":1,"column":114},"end":{"line":1,"column":123}}}) : helper)))
    + " data-fat="
    + alias4(((helper = (helper = lookupProperty(helpers,"fat") || (depth0 != null ? lookupProperty(depth0,"fat") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"fat","hash":{},"data":data,"loc":{"start":{"line":1,"column":133},"end":{"line":1,"column":140}}}) : helper)))
    + " data-protein="
    + alias4(((helper = (helper = lookupProperty(helpers,"protein") || (depth0 != null ? lookupProperty(depth0,"protein") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"protein","hash":{},"data":data,"loc":{"start":{"line":1,"column":154},"end":{"line":1,"column":165}}}) : helper)))
    + ">\r\n    <div class=\"scroller-contents\">\r\n                    <div class=\"scroller-img-box\">\r\n                        <img class=\"scroller-img\" src="
    + alias4(((helper = (helper = lookupProperty(helpers,"photoURL") || (depth0 != null ? lookupProperty(depth0,"photoURL") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"photoURL","hash":{},"data":data,"loc":{"start":{"line":4,"column":54},"end":{"line":4,"column":66}}}) : helper)))
    + " alt="
    + alias4(((helper = (helper = lookupProperty(helpers,"title") || (depth0 != null ? lookupProperty(depth0,"title") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data,"loc":{"start":{"line":4,"column":71},"end":{"line":4,"column":80}}}) : helper)))
    + ">\r\n                    </div>\r\n                    <div class=\"scroller-title-box\">\r\n                        <h2 class=\"scroller-title\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"title") || (depth0 != null ? lookupProperty(depth0,"title") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data,"loc":{"start":{"line":7,"column":51},"end":{"line":7,"column":60}}}) : helper)))
    + "</h2>\r\n                    </div>\r\n                    <div class=\"scroller-description-box\">\r\n                        <p class=\"scroller-description\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"description") || (depth0 != null ? lookupProperty(depth0,"description") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"description","hash":{},"data":data,"loc":{"start":{"line":10,"column":56},"end":{"line":10,"column":71}}}) : helper)))
    + "</p>\r\n                    </div>\r\n                    <div class=\"scroller-macros-box\">\r\n                        <span class=\"macro-span\">C:"
    + alias4(((helper = (helper = lookupProperty(helpers,"carbs") || (depth0 != null ? lookupProperty(depth0,"carbs") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"carbs","hash":{},"data":data,"loc":{"start":{"line":13,"column":51},"end":{"line":13,"column":60}}}) : helper)))
    + "</span>\r\n                        <span class=\"macro-span\">F:"
    + alias4(((helper = (helper = lookupProperty(helpers,"fat") || (depth0 != null ? lookupProperty(depth0,"fat") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"fat","hash":{},"data":data,"loc":{"start":{"line":14,"column":51},"end":{"line":14,"column":58}}}) : helper)))
    + "</span>\r\n                        <span class=\"macro-span\">P:"
    + alias4(((helper = (helper = lookupProperty(helpers,"protein") || (depth0 != null ? lookupProperty(depth0,"protein") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"protein","hash":{},"data":data,"loc":{"start":{"line":15,"column":51},"end":{"line":15,"column":62}}}) : helper)))
    + "</span>\r\n\r\n\r\n                    </div>\r\n    </div>\r\n</div>";
},"useData":true});
})();