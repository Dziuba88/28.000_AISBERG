(function ($) {

  $('[data-mds]').on('click', function (e) {
    var src = $(this).data('mds');
    var modal = $('[data-modal=' + src + ']')
    modal.addClass('show')
  });

  $('[data-close=modal]').on('click', function (e) {
    var modal = $(this).parents('[data-modal]');
    modal.removeClass('show')
  });

}(jQuery));
