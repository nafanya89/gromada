/* ========================================================
                        MENU
======================================================== */

//~~~~~~~~~~~~~~~~~~ VARRIABLES ~~~~~~~~~~//
var menuBtn = $('.navbar-btn'),
    navbar = $('.navbar'),

    //MODIFIERS
    menuBtnIsActive = 'navbar-btn--is-active';


//~~~~~~~~~~~~~~~~~~ FUNCTIONS ~~~~~~~~~~//
function menuToggle() {
  $(menuBtn).stop().toggleClass(menuBtnIsActive);
  $(navbar).stop().slideToggle();
};

//~~~~~~~~~~~~~~~~~~ EVENTS ~~~~~~~~~~//

$(menuBtn).click(function() {
  menuToggle();
});
