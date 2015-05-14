// on page load
$(function(){
  // get and render the food
  Food.all();
});

// // // // // // //

// VIEW OBJECT
function View() {};
View.render = function(items, parentId, templateId) {
  // render a template
  var template = _.template($("#" + templateId).html());
  // input data into template and append to parent
  $("#" + parentId).html(template({collection: items}));
};
View.init = function() {
  // prevent form submission
  $("#new-food-form").on("submit", function(e){
    e.preventDefault();
    // post to food#create
    $.post("/foods", $(this).serialize())
      .done(function(res){
        // append new food to the page
        Food.all();
        $("#new-food-form")[0].reset();
      });
    // also send data as AJAX post request

    // $.post()
  });
  // delete button event listener
  $("button").on("click", function(){
    Food.delete(this);
  })
};
View.reset = function() {
  // clear the event listeners
}

// FOOD OBJECT
function Food() {};
Food.all = function() {
  $.get("/foods", function(res){ 
    // parse the response
    var foods = JSON.parse(res);
    // render the results
    View.render(foods, "food-ul", "foods-template");
  }).done(function(res){
    // clear all event listeners
    View.reset();
    // sets event listeners
    View.init();
  });
};

Food.delete = function(context) {
  var id = $(context).data("id");
  // format a delete request
  // ajax object
  // url: /foods + id
  // .done which called Food.all()
}



















