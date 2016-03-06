var PARSE_APP = "NygQaHXm2rLnxbKqc8hHKXeQa4Zl3zIvacuwzDm5";
var PARSE_JS = "keuHHMyv8lUwQY1jS5DAuVqU22JD72mRqH7mT29v";

var app = {

    renderHomeView: function(){
        var html =
                "<div id = 'loginDiv'>" +
                    "<form name = 'loginForm' id ='loginForm'>" +
                        "<input type='text' id = 'login' placeholder='Your .edu email' class='userLoginInput' /><br />" +
                        "<input type='password' id ='pass' placeholder='Password' class='userLoginInput' /><br />" +
                        "<input type='button' value='Login' class='queryButton' />" +
                    "</form><br />" +
                    "<div id='toRegister'>" +
                        "<a href='#' id = 'registerRedirect'>Or Click here to Register</a>" +
                    "</div>" +
                "</div>";

        $('body').html(html);
        var self = this;

        /*
        * Authentication
         */
        User = Parse.Object.extend("User");


        $('.queryButton').on('click', function(e) {
            e.preventDefault();

            var login = $('#login').val();

            var query = new Parse.Query(User);
            query.matches("username", login);

            /*
            * Fix password authentication
             */
            query.equalTo("username", login);
            query.first({
                success: function(object) {
                    for (var i = 0; i < object.length; i++)
                    {
                        var entry = object[0];
                        alert(entry);
                        alert(entry.get("username"));
                        console.log(JSON.stringify(object[0]));
                    }
                    if (object.length === 0) {
                        alert("Invalid credentials. Could not log in");
                        return false;
                    }
                    //console.log(object);
                    self.store = new MemoryStore(function() {
                        self.renderLandingView(object.get("username"));
                    });
                },
                error: function(error) {
                    alert("Invalid credentials. Could not log in");
                    console.dir(error);
                }
            });


            return false;
        });


        //$('.search-key').on('keyup', $.proxy(this.findByName, this));
    },

    renderLandingView: function(uname) {

        var html = "<div id = 'title'>" +
                    "<h1>Requests</h1>"+
                    "</div>";
        html += "<div id='container'>" +
                        "<div id ='driver'>" +
                            "<div class='requestDesc'>" +
                                "<h3>Driver</h3>" +
                                "<div class='imgContainer'>" +
                                    "<img src='img/Car.png' />" +
                                "</div>" +
                            "</div>"+
                            "<div class='requestCount'>" +
                                "10" +
                            "</div>" +
                        "</div>"+
                        "<div id ='passenger'>" +
                             "<div class='requestDesc'>" +
                                "<h3>Passenger</h3>" +
                                "<div class='imgContainer'>" +
                                  "<img src='img/Passenger.png' />" +
                                 "</div>" +
                             "</div>"+
                             "<div class='requestCount'>" +
                                "10" +
                             "</div>" +
                        "</div>"+
                    "</div>";

        html += "<div id = 'buttonsContainer'>" +
                    "<button id='carpoolRedirect'>" +
                    "<img src = 'img/Driver.png' />" +
                    "<p>Start a Carpool</p>"+
                    "</button>" +
                    "<button id='liftRedirect'>" +
                    "<img src = 'img/Waving.png' />" +
                    "<p>Request a lift</p>"+
                    "</button>" +
                "</div>";

        $('body').html(html);
        var self = this;
        $('#carpoolRedirect').on('click', function(e) {
            e.preventDefault();
            self.store = new MemoryStore(function() {
                self.startCarpool(uname);
            });
            return false;
        });

        $('#liftRedirect').on('click', function(e) {
            e.preventDefault();
            self.store = new MemoryStore(function() {
                self.requestLift(uname);
            });
            return false;
        });

        $("#driver .requestCount").on('click', function(e) {
            e.preventDefault();
            self.store = new MemoryStore(function() {
                self.nearByCarpools(uname);
            });
            return false;
        });

        $("#passenger .requestCount").on('click', function(e) {
            e.preventDefault();
            self.store = new MemoryStore(function() {
                self.nearByLiftRequests(uname);
            });
            return false;
        });
    },

    nearByCarpools: function() {

        var html = "";

        html +=
    },

    nearByLiftRequests: function() {

    },

    startCarpool: function(uname) {

        var html = "<div id = 'carpoolStartTitle'>" +
            "<h1>Start a Carpool</h1>"+
            "</div>";

        html += "<form id = 'carpoolForm'>" +
                    "<div><label class='startLabel'>Departure City</label>" +
                    "<select id = 'departureCity'>" +
                        "<option value='gainesville'>Gainesville</option>" +
                        "<option value='melbourne'>Melbourne</option>" +
                        "<option value='miami'>Miami FL</option>" +
                        "<option value='tallahasee'>Tallahassee</option>" +
                    "</select></div>" +
                    "<br />" +
                    "<div><label class='startLabel'>Destination</label>" +
                    "<select id = 'destinationCity'>" +
                        "<option value='gainesville'>Gainesville</option>" +
                        "<option value='melbourne'>Melbourne</option>" +
                        "<option value='miami'>Miami FL</option>" +
                        "<option value='tallahasee'>Tallahassee</option>" +
                    "</select></div>" +
                    "<br />" +
                    "<div><label class='startLabel'>Seats Available</label>" +
                    "<select id = 'numOfPassengers'>" +
                        "<option value='1'>1</option>" +
                        "<option value='2'>2</option>" +
                        "<option value='3'>3</option>" +
                        "<option value='4'>4</option>" +
                        "<option value='5'>5</option>" +
                    "</select></div>" +
                    "<br />" +
                    "<div><label class='startLabel'>Gas Money</label>" +
                    "<input type='text' id = 'gasAmount' /></div>" +
                    "<br />" +
                    "<div><label class='startLabel'>Date</label>" +
                    "<input type='date' id = 'departureDate' />" +
                    "<label>Time:</label>"+
                    "<input type='time' id = 'departureTime' /></div>" +
                    "<br />" +
                    "<input type='button' value='Finalize' class='queryButton' />" +
                "</form>";

        $('body').html(html);
        var self = this;
        var CarpoolClass = Parse.Object.extend("CarpoolClass");
        var newCarpool = new CarpoolClass();

        $('.queryButton').on('click', function(e) {
            e.preventDefault();
            alert("Submitted");

            var departureCity = $("#departureCity").val();
            var destinationCity = $("#destinationCity").val();
            var numOfPassengers = $("#numOfPassengers").val();
            var gasAmount = $("#gasAmount").val();
            var departureDate = $("#departureDate").val();
            var parts = departureDate.split('-');
            // new Date(year, month [, day [, hours[, minutes[, seconds[, ms]]]]])
            departureDate = new Date(parts[0], parts[1]-1, parts[2]);
            var departureTime = $("#departureTime").val();

            alert(numOfPassengers + " " + gasAmount + " " + departureTime + " " + departureDate);
            newCarpool.save({
                Departure: departureCity,
                Destination: destinationCity,
                Seats: parseInt(numOfPassengers),
                GasMoney: parseFloat(gasAmount),
                Date: departureDate,
                Time: departureTime
            }, {

                success: function() {

                    self.store = new MemoryStore(function() {
                        self.renderLandingView(uname);
                    });
                },
                error: function() {
                    console.log("Err. something went wrong");
                }
            });

            return false;
        });
    },

    requestLift: function(uname) {

        var html = "<div id = 'liftRequestTitle'>" +
            "<h1>Request a Lift</h1>"+
            "</div>";

        html += "<form id = 'liftRequestForm'>" +
            "<div><label class='startLabel'>Departure City</label>" +
            "<select id = 'departureCity'>" +
            "<option value='gainesville'>Gainesville</option>" +
            "<option value='melbourne'>Melbourne</option>" +
            "<option value='miami'>Miami FL</option>" +
            "<option value='tallahasee'>Tallahassee</option>" +
            "</select></div>" +
            "<br />" +
            "<div><label class='startLabel'>Destination</label>" +
            "<select id = 'destinationCity'>" +
            "<option value='gainesville'>Gainesville</option>" +
            "<option value='melbourne'>Melbourne</option>" +
            "<option value='miami'>Miami FL</option>" +
            "<option value='tallahasee'>Tallahassee</option>" +
            "</select></div>" +
            "<br />" +
            "<div><label class='startLabel'># Passengers</label>" +
            "<select id = 'passengers'>" +
            "<option value='1'>1</option>" +
            "<option value='2'>2</option>" +
            "<option value='3'>3</option>" +
            "<option value='4'>4</option>" +
            "<option value='5'>5</option>" +
            "</select></div>" +
            "<br />" +
            "<div><label class='startLabel'>Gas Money</label>" +
            "<input type='text' id = 'gas' /></div>" +
            "<br />" +
            "<div><label class='startLabel'>Date</label>" +
            "<input type='date' id = 'date' />" +
            "<label>Time:</label>"+
            "<input type='time' id ='time' /></div>" +
            "<br />" +
            "<input type='button' value='Finalize' class='queryButton' />" +
            "</form>";

        $('body').html(html);
        var self = this;
        var CarpoolClass = Parse.Object.extend("CarpoolClass");

        $('.queryButton').on('click', function(e) {
            e.preventDefault();
            alert("Submitted");

            var newCarpool = new CarpoolClass();

            var departureCity = $("#departureCity").val();
            var destinationCity = $("#destinationCity").val();
            var numOfPassengers = $("#passengers").val();
            var gasAmount = $("#gas").val();
            var departureDate = $("#date").val();
            var departureTime = $("#time").val();

            newCarpool.save({
                Departure: departureCity,
                Destination: destinationCity,
                Seats: numOfPassengers,
                GasMoney: gasAmount,
                Date: departureDate,
                Time: departureTime
            }, {

                success: function() {

                    self.store = new MemoryStore(function() {
                        self.renderLandingView(uname);
                    });
                },
                error: function() {
                    console.log("Err. something went wrong");
                }
            });

            return false;
        });
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

        Parse.initialize(PARSE_APP, PARSE_JS);
        var self = this;
        this.store = new MemoryStore(function() {
           self.renderHomeView();
        });
    }

};

app.initialize();