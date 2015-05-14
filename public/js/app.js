/****************************************
                CLIENT
****************************************/


// on page load
$(function(){
  // get and render the phrase
  Phrases.all();
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


// PHRASES OBJECT
function Phrases() {};
Phrases.all = function() {
  $.get("/phrases", function(res){ 
    // parse the response
    var phrases = JSON.parse(res);
    // render the results
    View.render(phrases, "phrases-ul", "phrases-template");
  });
};