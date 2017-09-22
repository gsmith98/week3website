$(document).ready(function() {

  $('#header').on('click', function(evt) {
    $(this).toggleClass('red');
    $(this).toggleClass('blue');
  });

});
