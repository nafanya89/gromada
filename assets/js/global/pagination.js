var paginationBtn = $('.pagination__circle'),
    //modifier
    paginationBtnActive = 'pagination__circle--active';

    paginationBtn.click(function () {
      $.each(paginationBtn, function () {
        paginationBtn.removeClass(paginationBtnActive);
      });
      $(this).addClass(paginationBtnActive);
    });