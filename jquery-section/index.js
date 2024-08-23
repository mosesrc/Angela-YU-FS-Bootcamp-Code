$('h1').click(() => {
    $('h1').css('color', 'red');
});

$('button').click(() => {
    $('h1').fadeToggle();
});

// var x = $.ajax({
//     url: "index.html",
//     context: document.body
//   }).done(function() {
//     console.dir(this);
//   });