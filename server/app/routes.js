// app/routes.js
// TODO: more Routes



module.exports = function(app,passport,$,http,bcrypt,User) {

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', function(req, res) {
        res.send('This is the rest-api for the hftl-fridgeApp'); 
    });


    // =====================================
    // SIGNUP ==============================
    // =====================================
    // register a user via post
	
	app.post('/postsignup',function(req,res){
		User.findOne({ username :  req.body.username },
		function(err, user) {
			// if there are any errors, return the error
			if (err) {
				return handleError(err);
				res.status(500).json({message: "Error during DB search"});
			}
			// check to see if theres already a user with that username
			if (user) {
				res.status(400).json({message: "There already is user with that username"});
			} 
			else{

				// if there is no user with that email
				// create the user
				var newUser            = new User();

				// set the user's local credentials
				newUser.username    = req.body.username;
				var hash = bcrypt.hash(req.body.password, 10, function(err, hash){
					if (hash.length>13){
						newUser.password = hash;
						// save the user
						newUser.save(function(err) {
							if (err){ 
								return handleError(err);
								res.status(500).json({message: "Error during hashing"})
							}
							res.status(200).json({message :"User signed up"});
						});
					}
					else{
						res.status(500).json({message: "Error during hashing"})
					}
					

				});

			}

		});
	});    
    

    // =====================================
    // GetEANInfo ==========================
    // =====================================
    // get info for a product via ean and get as json
	// check for json.error / status to see if successful
	
	
	app.get('/geteaninfo',
		passport.authenticate('basic', {session:false}),
		function(req,res){

			if(req.query.ean!= undefined && req.query.ean!="")
			{
				var options= {
					host: 'opengtindb.org',
					port: 80,
					path: '/index.php?cmd=ean1&ean='+req.query.ean+'&sq=1',
					"user-agent": "Mozilla/5.0"
				};

				var html='';
				http.get(options, function(resp){
					resp.setEncoding('binary');
					resp.on('data', function(data) {
						// collect the data chunks to the variable named "html"
						html += data;
					}).on('end', function() {
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
					});
				});
			}
			else
			{
				res.status(400).json({error:'ean tag not found. check querystring'});
			}
			
		}
	);

};