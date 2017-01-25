var title = 'Express.js Todos'


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

casper.test.begin('app - create', 2, function(test) {
    casper.then(function() {
        this
            .fillSelectors('#todoapp', {'#new-todo': 'buy some milk'})
            .sendKeys('#new-todo', this.page.event.key.Enter, {
                keepFocus: true
            })
            .waitFor(function() {
                return this.evaluate(function() {
                    return $('#todo-list').length > 0;
                });
            }, function() {
                test.assertEquals(this.fetchText('#todo-list li:first-child label'), 'buy some milk');
                test.assertEquals(this.fetchText('.todo-count>b'), '1');
            });
    });

    casper.run(function() {
        test.done();
    });
});

casper.test.begin('app - remove', 0, function(test) {
    casper.then(function() {
        this
            .evaluate(function () { return $('.destroy').show(); });

        this
            .capture('capture2.jpg', undefined, { format: 'jpg', quality: 100 });

        this
            .click('.destroy');
            test.assertDoesntExist('#todo-list li');

        this
            .capture('capture3.jpg', undefined, { format: 'jpg', quality: 100 });




    });

    casper.run(function() {
        test.done();
    });
});
