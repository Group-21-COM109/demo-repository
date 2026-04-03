// FAQ 
// When user clicks a question the answer shows up 
$(".faq-question").click(function(){
    // toggle the answer to show or hide 
    $(this).next(".faq-answer").slideToggle();
});
// Image gallery
// when you click a thumbnail it shows in the main picture
$(".gallery-thumb").click(function(){
// get pictures from the thumbnail
var picture = $(this).attr("src");

// put it in the main display
$("#main-pic").attr("src",picture);

});
// Price Calculator
// adds up the selected flowers

$(".flower-select").click(function(){
    var total=0;
    // loop through all check flowers
    $(".flower-select:checked").each(function(){
        total= total + parseFloat($(this).val());
    });

    // display the total
    $("#bouquet-total").text("£" + total);

});
