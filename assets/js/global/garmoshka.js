var newsItem = $('.news-item-wrap'),
    relatedBtn = $('.news-item__related-news-button'),
    relatedItemsWrap = $('.news-item__related-items'),

    //modifiers
    newsItemOpened = 'news-item-wrap--active';

relatedBtn.click(function() {
    var y = $(window).scrollTop();  //your current y position on the page

    $(this).closest(newsItem).toggleClass(newsItemOpened);
    $(this).siblings(relatedItemsWrap).slideToggle('fast');

    if ($(this).closest(newsItem).hasClass(newsItemOpened)) {
        // $('html,body').animate({scrollTop: y + 100}, 200);
        $(this).children(":first").html('Закрити');
    } else {
        // $('html,body').animate({scrollTop: y - 100}, 200);
        $(this).children(":first").html('Схожі матеріали');
    }
});
