$(function () {
  //animate scroll menu HEADER
  $(".header-menu, .menu-mobile").on("click", "a", function (event) {
    event.preventDefault();
    var menuId = $(this).attr("href"),
      top = $(menuId).offset().top;
    console.log(top);
    $("html, body").animate({ scrollTop: top }, 1000);
  });

  /* появления кнопки скролл */
  $(window).on("scroll", function () {
    if ($(this).scrollTop() > $(window).height() * 0.7) {
      $(".btn__scroll-top").css("display", "flex");
    } else {
      $(".btn__scroll-top").css("display", "none");
    }
  });

  /* скролл на верх к меню */
  $(".btn__scroll-top").on("click", function () {
    $("html, body").animate({ scrollTop: 0 }, 1000);
  });

  // Открыть/Закрыть окно контактов
  $(".down-arrow").on("click", function () {
    $(this).toggleClass("down-arrow--active");
    $(".open-contacts").fadeToggle();
  });
  // Скрыть блок с контактами, по клику вне блока
  let down = $(".down-arrow"),
    open = $(".open-contacts");

  $(document).on("click", function (e) {
    if (
      !down.is(e.target) &&
      down.has(e.target).length === 0 &&
      !open.is(e.target) &&
      open.has(e.target).length === 0
    ) {
      open.fadeOut();
      down.removeClass("down-arrow--active");
    }
  });

  // Открыть/Закрыть меню с категориями
  $(".header-menu__burger, .menu-mobile--close, .menu-mobile__link").on(
    "click",
    function () {
      $(".menu-mobile").fadeToggle();
    }
  );

  // Скрыть блок с категориями, по клику вне блока
  let btn = $(".header-menu__burger"),
    menu = $(".menu-mobile");

  $(document).on("click", function (e) {
    if (
      !btn.is(e.target) &&
      btn.has(e.target).length === 0 &&
      !menu.is(e.target) &&
      menu.has(e.target).length === 0
    ) {
      menu.fadeOut();
    }
  });

  $(".clients__slider").slick({
    dots: true,
    arrows: false,
  });
});
