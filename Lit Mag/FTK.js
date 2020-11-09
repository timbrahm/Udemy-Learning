var currentIssue = document.querySelector(".Curr-Issue");
var icon = document.querySelector("#clickFontAwesome");

var controlBack = document.querySelector("#carousel-control-prev");
var controlFor = document.querySelector("#carousel-control-next");

// controlBack.addEventListener("click", function() {
//   $("#First").scrollIntoView();
// });

var $nav = $("#navbarMain");
var $navHome = $("#navHome");
if ($(document).scrollTop() > $nav.height()) {
  $nav.toggleClass("scrolled");
  $navHome.toggleClass("scrolledHome");
}

icon.addEventListener("click", function() {
  currentIssue.scrollIntoView({behavior: "smooth"});
});

$(function () {
  $(document).scroll(function () {
    var $nav = $("#navbarMain");
    var $navHome = $("#navHome");
    $nav.toggleClass("scrolled", $(this).scrollTop() > $nav.height());
    $navHome.toggleClass("scrolledHome", $(this).scrollTop() > $nav.height());
  });
});

document.querySelectorAll('.smoothScroll').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});


$('#readMore').hover(
       function(){
         $(this).toggleClass('btn-dark');
         $(this).toggleClass('btn-light');
         $("#downArrow").toggleClass('hovered');
     },
       function(){
         $(this).toggleClass('btn-light');
         $(this).toggleClass('btn-dark');
         $("#downArrow").toggleClass('hovered');
      }
)

$("#downArrow").hover(
        function() {
          $(this).toggleClass('hovered');
          $('#readMore').toggleClass('btn-dark');
          $('#readMore').toggleClass('btn-light');
        },
        function() {
          $(this).toggleClass('hovered');
          $("#readMore").toggleClass('btn-light');
          $("#readMore").toggleClass('btn-dark');
        }
)

function firstIssue() {
  location.href = "./CurrentIssue.html";
}
