// app/routes.js
module.exports = function(app,$,http) {

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', function(req, res) {
        res.send('This is the rest-api for the hftl-fridgeApp'); // load the index.ejs file
    });

    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    //app.get('/login', function(req, res) {

        // render the page and pass in any flash data if it exists
    //    res.render('login.ejs', { message: req.flash('loginMessage') }); 
   // });

    // process the login form
    // app.post('/login', do all our passport stuff here);

    // =====================================
    // REGISTER ============================
    // =====================================
    // register a user via post
    app.post('/register', function(req, res) {
		if(true)
		{
			// send appropriate response if okay
			res.render('signup worked');
		}
    });
	
    // =====================================
    // GetEANInfo ==========================
    // =====================================
    // get info for a product via ean and get
    app.get('/geteaninfo', function(req, res) {

		console.log('got eaninfo request');
		if(req.query.ean!= undefined && req.query.ean!="")
		{
			var options= {
				host: 'opengtindb.org',
				port:80,
				path: '/index.php?cmd=ean1&ean='+req.query.ean+'&sq=1',
				"user-agent": "Mozilla/5.0"
			};

			console.log(options.path);
			console.log(options.host);
			var html='';
			http.get(options, function(resp){
				resp.setEncoding('binary');
				resp.on('data', function(data) {
					// collect the data chunks to the variable named "html"
					html += data;
				}).on('end', function() {
					console.log('trying jquery')
					// the whole of webpage data has been collected. parsing time!
					var prodName = $(html).find('b:contains("Detailname:")').parent().parent().find(':nth-child(2)').text().trim()
					var prodCat = $(html).find('b:contains("Unterkategorie:")').parent().parent().find(':nth-child(2)').text().trim()
					var prodTag = $(html).find('b:contains("Name:")').parent().parent().find(':nth-child(2)').text().trim()
					var productDoc={_id : req.query.ean,name :prodName,mhd:[],category:prodCat,tag :prodTag,unit:"" };
					res.set({
						"Content-Type": "application/json; charset=utf-8",
						"Connection" : "close"
					});
					res.json(productDoc);
					console.log(productDoc);
				});
			});
		}
		else
		{
			res.send('ean not found. check querystring');
		}
		
	});


    // process the signup form
    // app.post('/signup', do all our passport stuff here);

    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    //app.get('/profile', isLoggedIn, function(req, res) {
    //    res.render('profile.ejs', {
    //        user : req.user // get the user out of session and pass to template
    //    });
    //});

    // =====================================
    // LOGOUT ==============================
    // =====================================
    //app.get('/logout', function(req, res) {
    //    req.logout();
    //    res.redirect('/');
    //});
};

// route middleware to make sure a user is logged in
//function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
//    if (req.isAuthenticated())
  //      return next();

    // if they aren't redirect them to the home page
    //res.send('Your are not logged in!');
//}

