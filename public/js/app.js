// on page load
$(function(){
  // get and render the food
  Food.all();
  // set the view's behaviors
  View.init();
});

// // // // // // //

// VIEW OBJECT
function View() {};
View.init = function() {
  // food form submit event listener
  $("#food-form").on("submit", function(e){
    // stop page reload
    e.preventDefault();
    // format form data into a query string
    var foodParams = $(this).serialize();
    console.log("createfood foodparams",foodParams, "!")
    Food.create(foodParams);
    // reset the form
    $("#food-form")[0].reset();
    // give focus back to the food name input element
    // (instead of whichever was focused when submit event happened)
    $("#new-food").focus();
  });
}
View.render = function(items, parentId, templateId) {
  // render a template
  var template = _.template($("#" + templateId).html());
  // input data into template and append to parent
  $("#" + parentId).html(template({collection: items}));
};

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
    // once done, re-render all foods
    Food.all();
  });
}
Food.delete = function(food) {
  var foodId = $(food).data().id;
  console.log(foodId);
  $.ajax({
    url: '/foods/' + foodId,
    type: 'DELETE',
    success: function(res) {
      // once successfull, re-render all foods
      Food.all();
    }
  });
};

Food.update = function(event, arg2){
  console.log("hi)")
  console.log("event", event);
  console.log("this, ", arg2)
  //var foodParams = $(this).serialize();
  // parsing the event out  
  var foodParams = {};
  var foodId = event.target.id.split("").slice(12).join("");
  var newName = event.target[0].value;
  var newYumminess = event.target[1].value;

  $.post("/update", {id: foodId, name: newName, yumminess: newYumminess})
  .done(function(res){
    console.log("updated, yay!");
   // Food.all();
  });
  console.log("after response;")
  return false;
}