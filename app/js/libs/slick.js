var slickSidebar = {
  $doc: $(document),
  $sideBar: $('.news_content[data-slick]'),
  $relativeEl: $('[data-slick-rel]'),
  headerHeight: $('.navbar').height(),
  footerHeight: $('.footer').height(),
  init: function () {
    this.slickLogic();
    this.eventListener(this.$doc, 'scroll', this.slickLogic.bind(this))
  },
  eventListener: function ($el, event, func) {
    $($el).on(event, func);
  },
  slickLogic: function () {
    if(window.innerWidth >= 1080) {
      if($(window).scrollTop() > this.headerHeight - 20 && $(window).scrollTop() < (this.headerHeight + this.$relativeEl.height()) - this.$sideBar.height()) {
        this.slickElement();
      } else if($(window).scrollTop() > (this.headerHeight + this.$relativeEl.height()) - this.$sideBar.height()) {
        this.slickBottom();
      } else {
        this.unslickElement();
      }
    }
  },
  slickElement: function () {
    this.$sideBar.css({
      'width' : this.$sideBar.width(),
      'top' : 40
    }).attr('data-slick', 'on');
  },
  slickBottom: function () {
    this.$sideBar.css({
      'width' : this.$sideBar.width(),
      'top' : this.$doc.height() - this.$sideBar.height() - this.footerHeight - this.headerHeight - 70
    }).attr('data-slick', 'fix');
  },
  unslickElement: function () {
    this.$sideBar.css({
      'width' : 'auto',
      'top' : 'auto'
    }).attr('data-slick', 'off')
  }
};