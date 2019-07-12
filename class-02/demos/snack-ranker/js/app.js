function startApp() {

  loadData();

  attachListeners();

}

function loadData() {

  const success = snacks => displayPage(snacks);

  const failure = error => console.error(error);

  $.get('/data/snacks.json', (snacks) => {
    if (snacks.length) {
      success(snacks);
    } else {
      failure({ 'message': 'something broke' });
    }
  }, 'json');
}

function displayPage(snacks) {

  snacks.forEach(snack => {
    const $newSnack = $('.snack-template').clone();

    $newSnack.find('h2').text(snack.name);
    $newSnack.find('h3').text(snack.rank);
    $newSnack.find('p').text(snack.type);
    $newSnack.removeClass('snack-template');
    $newSnack.attr('data-type', snack.type);

    $('.snacks').append($newSnack);

  });

}

function attachListeners() {

  $('input').on('change', event => {
    const $choice = $(event.target);
    const type = $choice.val();

    if (type === 'all') {

      $('li').not('.snack-template').show();

    } else if (type === 'savory') {

      $('li').hide();

      $('li[data-type="savory"]').show();

    } else {

      $('li').hide();

      $('li[data-type="sweet"]').show();
    }

  });
}

$(startApp);