$(document).ready(function () {
          ///////////////////////
          /*  Slick content   */
          //////////////////////
  $(".right_content").stick_in_parent({
  });
          /////////////////////
          /*    UP-arrow    */
          ///////////////////
  $(".icon-up-arrow").click(function(e) {
    e.preventDefault();
    $('html, body').animate({
      scrollTop: $("body").offset().top
    }, 1500);
  });
});
(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s);
  js.id = id;
  js.src = "//connect.facebook.net/uk_UA/sdk.js#xfbml=1&version=v2.7&appId=1715014728749508";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
