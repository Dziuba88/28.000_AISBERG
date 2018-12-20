(function ($) {
  var Dropdown = function () {
    this.toggle = function (event) {
      var that = $(this);
      var parent = that.parents('.dropdown')
      event.stopPropagation();

      $('[data-dropdown=toggle]').not(that).parents('.dropdown').removeClass('open');
      parent.toggleClass('open')
      
    }
    this.close = function () {
      $('.dropdown').removeClass('open')
    }
  }
  var dropdown = new Dropdown();
  $('[data-dropdown=toggle]').on('click', dropdown.toggle);
  $(document).on('click', dropdown.close)



  var showElement = function (event) {
    event.stopPropagation();
    var target = $(this).data('show');
    $('[data-collapse=' + target +']').toggleClass('open')
  }
  $('[data-show]').on('click', showElement)




})(jQuery);