module("Index", {
  setup: function () {
    Tranquil.reset();
  }
});

test("First H1 contains Tranquil", function () {
  visit('/').then(function () {
    equal($('#ember h1').html(), 'Tranquil', 'Title is Tranquil');
  });
});

