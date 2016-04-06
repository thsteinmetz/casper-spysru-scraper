var system = require('system');
var fs = require('fs');
var casper = require('casper').create({
    pageSettings: {
        loadImages: true
    },
    onTimeout: function () {
        this.echo('CasperJS timing out!');
    },
    clientScripts: [
        './jquery.min.js',
    ],
    timeout: 40000,
    verbose: true,
    stepTimeout: 30000,
    onError: function (self, m) {   // Any "error" level message will be written
        console.log('FATAL:' + m); // on the console output and PhantomJS will
        self.exit();               // terminate
    }
});

/**
 * Limits of proxies displayed on country page
 * @type {Array}
 */
var xpps = [];
xpps[30] = 0;
xpps[50] = 1;
xpps[100] = 2;
xpps[200] = 3;

var country = system.args[4];
var xpp = system.args[5];

/**
 * Handle limit if one is set
 */
xpp = (xpps[xpp]) ? xpps[xpp] : 3;

/**
 * We POST to the proxy country page with 'xpp' being set to 3 so we get 200 results.
 * xpp = 0 => 30
 * xpp = 1 => 50
 * xpp = 2 => 100
 * xpp = 3 => 200
 */
casper.start().viewport(1700, 1080).then(function(){
    this.open('http://spys.ru/free-proxy-list/' + country.toUpperCase() + '/', {
        method: 'post',
        data: {
            'xpp': xpp
        },
    });
});

/**
 * Use jQuery (I'm lazy) to go to the table holding our proxies and then use some regext to strip out their
 * Javascript puzzle that generates the port number and then another regex to strip out the html surrounding
 * the ":"
 */
casper.then(function(){
    var proxies = this.evaluate(function() {
        var p = []
        $.each($('body > table:nth-child(3) > tbody > tr:nth-child(4) > td > table td:nth-child(1) font.spy14'), function(){
            var ip = $(this).html();
            ip = ip.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
            ip = ip.replace('<font class="spy2">:</font>', ':');
            p.push(ip);
        });
        return p;
    });
    this.echo(proxies.join()); // dump to console seperate by comma
});

casper.run();