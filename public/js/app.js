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
    // send a post request to put this food in db
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
  $.ajax({
    url: '/foods/' + foodId,
    type: 'DELETE',
    success: function(res) {
      // once successfull, re-render all foods
      Food.all();
    }
  });
};

Food.update = function(e, form){
  e.preventDefault();
  // pull the values we want out of form
  var $form = $(form);
  var foodId = $form.data().foodid;
  var newName = $form.find("input[name='name']").val();
  var newYumminess = $form.find("input[name='yumminess']").val();
  // send a POST request with the form values
  $.post("/update", {id: foodId, name: newName, yumminess: newYumminess})
  .done(function(res){
    // once done, re-render everything
    Food.all();
  });
}