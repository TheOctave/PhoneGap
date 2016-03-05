var app = {

    renderHomeView: function(){
        var html =
                "<div id = 'loginDiv'>" +
                    "<form name = 'loginForm' id ='loginForm'>" +
                        "<input type='text' placeholder='Your .edu email' class='userLoginInput' /><br />" +
                        "<input type='password' placeholder='Password' class='userLoginInput' /><br />" +
                        "<input type='submit' value='Login' class='queryButton' />" +
                    "</form><br />" +
                    "<div id='toRegister'>" +
                        "<a href='#' id = 'registerRedirect'>Or Click here to Register</a>" +
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