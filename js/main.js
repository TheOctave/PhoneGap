var app = {

    renderHomeView: function(){
        var html =
                "<div id = 'loginHeader'>" +
                    "<form name = 'loginForm'>" +
                        "<input type='text' placeholder='Your .edu email' class='textInput' /><br />" +
                        "<input type='password' placeholder='Password' /><br />" +
                        "<input type='submit' value='Login' />" +
                    "</form><br />" +
                    "<div>" +
                        "<a href='#'>Or Click here to Register</a>" +
                    "</div>" +
                "</div>";

        $('body').html(html);
        //$('.search-key').on('keyup', $.proxy(this.findByName, this));
    },

    findByName: function() {
        console.log('findByName');
        this.store.findByName($('.search-key').val(), function(employees) {
            var l = employees.length;
            var e;
            $('.employee-list').empty();
            for (var i=0; i<l; i++) {
                e = employees[i];
                $('.employee-list').append('<li><a href="#employees/' + e.id + '">' + e.firstName + ' ' + e.lastName + '</a></li>');
            }
        });
    },

    initialize: function() {
        var self = this;
        this.store = new MemoryStore(function() {
           self.renderHomeView();
        });
    }

};

app.initialize();