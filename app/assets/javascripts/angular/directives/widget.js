app.directive("widgetc", ["$compile", function($compile) {

  /*var linkFn = function(scope, element, attrs, gridsterController) {
    gridsterController.add(element, scope.widget);

    // TODO: cleanup, an attribute can't be created in the template with expression
    var elm = element.find(".widget-chart");
    elm.append('<div ' + scope.widget.kind.replace("_", "-") + ' />');
    $compile(elm)(scope);

    element.bind("$destroy", function() {
      gridsterController.remove(element);
    });

    scope.$watch("widget.size_x", function(newValue, oldValue) {
      if (newValue === oldValue) return;
      gridsterController.resize(element, newValue, scope.widget.size_y);
    }, true);
  };*/

  return {    
	restrict: "E",
    controller: "WidgetCtrl",
    template: JST["angular/templates/widget/show"],
    link: linkFn
  };
}]);