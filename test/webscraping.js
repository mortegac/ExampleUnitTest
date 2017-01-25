var title = 'WebScraping'


casper.test.begin('app', 3, function(test) {
    casper.start('http://localhost:8000', function() {
        test.assertHttpStatus(200);
    });

    casper.then(function() {
        test.assertTitle(title, 'doesn\'t show the right title');
        test.assertExists('#todoapp', 'doesn\'t show the todos body');
    });

    casper.run(function() {
        test.done();
    });

});