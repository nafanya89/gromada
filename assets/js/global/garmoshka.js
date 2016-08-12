var newsItem = $('.news-item-wrap'),
    relatedBtn = $('.news-item__related-news-button'),
    relatedItemsWrap = $('.news-item__related-items'),

    //modifiers
    newsItemOpened = 'news-item-wrap--active';

relatedBtn.click(function() {
    $(this).closest(newsItem).toggleClass(newsItemOpened);
    $(this).siblings(relatedItemsWrap).slideToggle('fast');

    if ($(this).closest(newsItem).hasClass(newsItemOpened)) {
        $(this).children(":first").html('Закрити');
    } else {
        $(this).children(":first").html('Схожі матеріали');
    }
});
