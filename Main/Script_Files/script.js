// FAQ 
// when user clicks a question the answer shows up 
$(".faq-question").click(function(){
    $(this).next(".faq-answer").slideToggle();
});

// Image gallery
// when you click a thumbnail it shows in the main picture
$(".gallery-thumb").click(function(){
    var picture = $(this).attr("src");
    var altText = $(this).attr("alt");
    $("#main-pic").attr("src",picture);
    $("#flower-name").text(altText);
});

// Favorites button
function toggleFav(btn){
    btn.classList.toggle("favorited");
    if(btn.classList.contains("favorited")){
        btn.style.color = "#ff0000";
    } else {
        btn.style.color = "#999";
    }
}

// Price Calculator
// adds up the selected flowers
$(".flower-select").click(function(){
    var total = 0;
    $(".flower-select:checked").each(function(){
        total = total + parseFloat($(this).val());
    });
    $("#bouquet-total").text("£" + total);
});
