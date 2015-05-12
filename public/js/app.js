// Code Execution

// on page load
$(function(){
  //ajax to foods index
  $.get("/foods", function(res){ 
    // parse the response
    var foods = JSON.parse(res);
    // render the results
    View.render(foods, "food-ul", "foods-template");
  })
});



// Code Definition

// a view object
function View() {};
// a 'class method' aka static method for the View object
View.render = function(items, parentId, templateId) {
  // get food template
  var foodTemplate = _.template($("#" + templateId).html());
  // input data into template and append to parent
  $("#" + parentId).html(foodTemplate({foods: items}));
};
// target a parent and clear everything inside
View.clear = function(parentId) {
  $("#" + parentId).html("");
};