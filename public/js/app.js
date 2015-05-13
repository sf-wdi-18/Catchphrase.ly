// on page load
$(function(){
  // get and render the food
  Food.all();
  // initialize the view
  View.init();
});

// // // // // // //

// VIEW OBJECT
function View() {};
// a 'class method' aka static method for the View object
View.render = function(items, parentId, templateId) {
  // get food template
  var template = _.template($("#" + templateId).html());
  // input data into template and append to parent
  $("#" + parentId).html(template({collection: items}));
};
View.clear = function(id) {
  // clear everything inside an element
  $("#" + id).html("");
};
View.init = function() {
  // food form submit event listener
  $("#food-form").on("submit", function(e){
    // stop page reload
    e.preventDefault();
    // format form data into a query string
    var foodParams = $(this).serialize();
    Food.create(foodParams);
  });
}

// FOOD OBJECT
function Food() {};
Food.all = function() {
  $.get("/foods", function(res){ 
    // parse the response
    var foods = JSON.parse(res);
    // render the results
    View.render(foods, "food-ul", "foods-template");
  });
}
Food.create = function(foodParams) {
  $.post("/foods", foodParams).done(function(res){
    console.log(res);
  });
}