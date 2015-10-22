// app/routes.js
// TODO: more Routes



module.exports = function(app,passport,$,http,bcrypt,User,Product,Fridge,FridgeContent,Withdrawel,Reports) {

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
	
	app.post('/postsignup',function postSignup(req,res){
		User.findOne({ username :  req.body.username },
		function UserfindOne(err, user) {
			// if there are any errors, return the error
			if (err) {
				res.status(500).json({message: "Error during DB search"});
				return;
			}

			// check to see if theres already a user with that username
			if (user) {
				res.status(400).json({message: "There already is a user with that username"});
				return;
			} 


			// if there is no user with that email
			// create the user
			var newUser            = new User();

			// set the user's local credentials
			newUser.username    = req.body.username;
			var hash = bcrypt.hash(req.body.password, 10, function hashingPW(err, hash){
				if (hash.length<=13){
					res.status(500).json({message: "Error during hashing"})
					return;
				}

				newUser.password = hash;
				// save the user
				newUser.save(function saveNewUser(err,user) {
					if (err){ 
						res.status(500).json({message: "Error during saving user"});
						return;
					}						
					
					var newFridge = new Fridge();
					
					console.log(user);
					newFridge.owner = user.username;
					newFridge.name  = "1";
					
					newFridge.save(function saveNewFridge(err,fridge){
						if (err){ 
							res.status(500).json({message: "Error during saving fridge"});
							return;
						}	
						res.status(200).json({message :"User signed up"});
					});
				});

			});			
		});
	});    
    

    // =====================================
    // GetEANInfo ==========================
    // =====================================
    // get info for a product via ean and get as json
	// check for json.error / status to see if successful
	
	
	app.get('/geteaninfo',
		//if (req.secure) use for ssl check
		passport.authenticate('basic', {session:false}),
		function(req,res){
			var reqEan = req.query.ean;
			if(reqEan!= undefined && reqEan!="")
			{
				Product.findOne({ ean :  reqEan },
				function findProduct(err,product){
					if(err){
						res.status(500).json({message: "Error during DB search"});
						return;
					}
					else{
						if(product){
							res.status(200).json(product);
						}
						else{
							var options= {
								host: 'opengtindb.org',
								port: 80,
								path: '/index.php?cmd=ean1&ean='+reqEan+'&sq=1',
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
									
									var newProduct = new Product();
									
									newProduct.ean  	= reqEan;
									newProduct.name 	= prodName;
									newProduct.mhd		= [];
									newProduct.category = prodCat.length>=2?prodCat:""; // check if product category exists if not keep empty
									newProduct.tag		= prodTag.length>=2?prodTag:"";
									newProduct.unit		= "";
									
									newProduct.save(function(err,product) {
										if (err){ 
											res.set({
												"Content-Type": "application/json; charset=utf-8",
												"Connection" : "close"
											});										
											res.status(500).json({message: "Error during saving new Product"})
											return;
										}
										res.status(200).json(product);
									});
								});
							});
							
						}
						
					}
				
				});
			}
			else
			{
				res.status(400).json({error:'ean tag not found. check querystring'});
			}
			
		}
	);

};