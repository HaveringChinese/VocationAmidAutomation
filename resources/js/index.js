//causes text boxes to appear as their location enters the viewport
function isElementInViewport(el) {
  var rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
    (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

var items = document.querySelectorAll("body div");

function callbackFunc() {
  for (var i = 0; i < items.length; i++) {
    if (isElementInViewport(items[i])) {
      items[i].classList.add("in-view");
    }   
  }
}
//finds where viewport is currrently
window.addEventListener("load", callbackFunc);
window.addEventListener("scroll", callbackFunc);

document.querySelector("button").addEventListener("click", function (event) {
  document.querySelector("body").classList.add("darken");

  setTimeout(function () {
    window.open("signup.html");
  }, 1000);

  setTimeout(function () {
    document.querySelector("body").classList.remove("darken");
  }, 2000);
});

