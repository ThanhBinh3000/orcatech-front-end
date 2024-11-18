////Setting modal dialog
$(document).on('show.bs.modal', '.modal', function (event) {
    var zIndex = 2050 + (10 * $('.modal:visible').length);
    this.style.setProperty('z-index', zIndex, 'important');
    setTimeout(function () {
        $('.modal-backdrop').not('.modal-stack').css('z-index', zIndex - 1).addClass('modal-stack');
    }, 0);
});
////End setting modal dialog

$(document)
  .on('show.bs.modal', '.modal.view-dialog', function (event) {
      $(this).appendTo($('body'));
  })
  .on('shown.bs.modal', '.modal.view-dialog.in', function (event) {
      $('body').addClass('modal-open');
  })
  .on('hidden.bs.modal', '.modal.view-dialog', function (event) {
      $('body').addClass('modal-open');
      if ($('.modal.view-dialog.in').length == 0) {
          $('body').removeClass('modal-open');
      }
  });