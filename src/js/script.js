(function ($) {
  $(document).ready(function () {

    $.ajax({
      url: 'modal.html',
      method: 'GET'
    }).then(function (res) {
      $('.modal').html(res);
    }).catch(function (err) {
      console.log(err);
    });

    $(".owl-carousel").owlCarousel({
      items: 1,
      nav: true,
      navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
      navSpeed: 1000,
      dotsSpeed: 1000,
      dragEndSpeed: 1000
    });

    const createNews = (info) => {
      info.forEach((item, i, info) => {
        $('.news_block').append(`<div class="news_block_item" style="background-image: url(${info[i].src})">
        <div class="news_block_item_wrap">
          <div><a href="#">${info[i].text}</a></div>
          <div class="news_block_item_date">${info[i].date}</div>
        </div>
      </div>`);
      });
    }

    $.ajax({
      url: 'news.json',
      method: 'GET'
    }).then(function (res) {
      createNews(res);
      let newsToHide = $('.news_block_item').each(function () {
        if ($(this).index() > 2) {
          $(this).addClass('hide').css('display', 'none');

        }
      });
    });

    $('#1').on('click', function () {
      $('.news_block_item.hide').slideToggle();
    });

    $('.owl-carousel').each(function () {
      $(this).magnificPopup({
        delegate: 'a',
        type: 'image',
        gallery: {
          enabled: true
        }
      });
    });

    $('.modal-pop-up').magnificPopup({
      type: 'inline'
    });

    $('.rooms_count').on('click', function () {
      console.log('.rooms_count');
    });

    $('.menu-item, #sub-menu.menu-item').on('click', function () {
      $('header .menu-item.active').removeClass('active');
      $($(this)).toggleClass('active');
    });

    $('#sub-menu .menu-item-href').on('click', function (e) {
      $('.to-hide-item').toggle();
      $('.to-hide').toggle();
      e.stopPropagation();
    });

    $('.to-hide-item a').on('click', function () {
      $('#sub-menu.menu-item').unbind('click');
    });

    $('#menu .menu li').clone(true).appendTo('.block-for-mob-menu-nav');
    $('#menu .to-call li').clone(true).appendTo('.block-for-mob-menu-call');

    $('.mob-menu').on('click', function () {
      $('.block-for-mob-menu').slideToggle();
      $('.burger-open-close').toggle();
    });

  });
})(jQuery);

