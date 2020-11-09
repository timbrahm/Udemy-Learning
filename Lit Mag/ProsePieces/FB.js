var pinyinChoice = document.querySelector("#pinyinChoice");
var englishChoice = document.querySelector("#englishChoice");

var pinyinText = document.querySelectorAll(".Pinyin");
var englishText = document.querySelectorAll(".English");

var pinyinDiv = document.querySelector("#pinyinDiv");

var $nav = $("#navbarMain");
var $navHome = $("#navHome");
if ($(document).scrollTop() > $nav.height()) {
  $nav.toggleClass("scrolled");
  $navHome.toggleClass("scrolledHome");
}



function togglePinyin() {
  for (var i = 0; i < pinyinText.length; i++) {
    pinyinText[i].classList.add("d-block");
    pinyinText[i].classList.remove("d-none");
  }

  for (var j = 0; j < englishText.length; j++) {
    englishText[j].classList.add("d-none");
    englishText[j].classList.remove("d-block");
  }
  pinyinDiv.classList.remove("d-block");
  pinyinDiv.classList.add("d-none");
}

function toggleEnglish() {
  for (var i = 0; i < pinyinText.length; i++) {
    pinyinText[i].classList.add("d-none");
    pinyinText[i].classList.remove("d-block");
  }

  for (var j = 0; j < englishText.length; j++) {
    englishText[j].classList.add("d-block");
    englishText[j].classList.remove("d-none");
  }
  pinyinDiv.classList.remove("d-block");
  pinyinDiv.classList.add("d-none");
}

function toggleBoth() {
  for (var i = 0; i < pinyinText.length; i++) {
    pinyinText[i].classList.add("d-block");
    pinyinText[i].classList.remove("d-none");
  }

  for (var j = 0; j < englishText.length; j++) {
    englishText[j].classList.add("d-block");
    englishText[j].classList.remove("d-none");
  }
  pinyinDiv.classList.add("d-block");
  pinyinDiv.classList.remove("d-none");

}

$( document ).ready(function() {
    $('.dropdown').each(function (key, dropdown) {
        var $dropdown = $(dropdown);
        $dropdown.find('.dropdown-menu a').on('click', function () {
            $dropdown.find('button').text($(this).text()).append(' <span class="caret"></span>');
        });
    });
});

$(function () {
  $(document).scroll(function () {
    var $nav = $("#navbarMain");
    var $navHome = $("#navHome");
    $nav.toggleClass("scrolled", $(this).scrollTop() > $nav.height());
    $navHome.toggleClass("scrolledHome", $(this).scrollTop() > $nav.height());
  });
});
