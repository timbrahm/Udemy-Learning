var $nav = $("#navbarMain");
var $navHome = $("#navHome");
if ($(document).scrollTop() > $nav.height()) {
  $nav.toggleClass("scrolled");
  $navHome.toggleClass("scrolledHome");
}


$(function () {
  $(document).scroll(function () {
    var $nav = $("#navbarMain");
    var $navHome = $("#navHome");
    $nav.toggleClass("scrolled", $(this).scrollTop() > $nav.height());
    $navHome.toggleClass("scrolledHome", $(this).scrollTop() > $nav.height());
  });
});
