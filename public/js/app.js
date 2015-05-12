// Code Execution

// on page load
$(function(){
  //ajax to foods index
  $.get("/foods", function(res){ 
    // parse the response
    foods = JSON.parse(res);
    // render the results
    View.render(foods, "foods");
  })
});



// Code Definition

// a view object
function View() { };
// a 'class method' aka static method for the View object
View.render = function(items, id) {
   // find the target partent by the id passed in
  var targetParent = $("#" + id);
  // iterate through the collection
  items.forEach(function(item){
    // build each list item
    var child = $("<li class='list-group-item'>" + item + "</li>");
    // append the child to the parent
    targetParent.append(child);
  });
}