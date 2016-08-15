$(document).ready(function () {
  ///////////////////////
  /*  Slick content   */
  //////////////////////
      // $(".right_content").stick_in_parent({});
  /////////////////////
  /*    UP-arrow    */
  ///////////////////
  $(".icon-up-arrow").click(function (e) {
    e.preventDefault();
    $('html, body').animate({
      scrollTop: $("body").offset().top
    }, 1500);
  });
  /////////////////////
  /*    slider   */
  ///////////////////
  var $sync1 = $(".slider"),
    $sync2 = $(".slider-content"),
    flag = false,
    duration = 500;

  $sync1
    .owlCarousel({
      items: 1,
      margin: 10,
      loop: true,
      autoplay: true,
      autoplayTimeout: 3000
    })
    .on('changed.owl.carousel', function (e) {
      if (!flag) {
        flag = true;
        $sync2.trigger('to.owl.carousel', [e.item.index + 1, duration, false]);
        flag = false;
      }
    });

  $sync2
    .owlCarousel({
      margin: 20,
      items: 1,
      touchDrag: false,
      pullDrag: false,
      mouseDrag: false,
    })
    .on('changed.owl.carousel', function (e) {
      if (!flag) {
        flag = true;
        $sync1.trigger('to.owl.carousel', [e.item.index, duration, false]);
        flag = false;
      }
    });


  $sync1.trigger('autoplay.play.owl', [1000])

  $('.customNextBtn').click(function () {
    $sync1.trigger('next.owl.carousel');
  })
  // Go to the previous item
  $('.customPrevBtn').click(function () {
    // With optional speed parameter
    // Parameters has to be in square bracket '[]'
    $sync1.trigger('prev.owl.carousel', [300]);
  });

});
(function (d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s);
  js.id = id;
  js.src = "//connect.facebook.net/uk_UA/sdk.js#xfbml=1&version=v2.7&appId=1715014728749508";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
