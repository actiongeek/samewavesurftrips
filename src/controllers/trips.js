import Trip from '../models/trip';

/* 
|--------------------------------------------------------------------------
| Get Trips
|--------------------------------------------------------------------------
*/
exports.getAll = (req,res) => {

    Trip.find().then(trips => {
		res.json(trips);
	}).catch(err => {
		res.status(422).send(err);
    });
    
}


/* 
|--------------------------------------------------------------------------
| Create Trip
|--------------------------------------------------------------------------
*/
exports.create = (req,res) => {

	const modelData = setDefaultValues(req);

    Trip.create(modelData).then(trip => {
		res.json(trip);
	}).catch(err => {
		res.status(500).send(err);
	});
}

/* 
|--------------------------------------------------------------------------
| Update Trip
|--------------------------------------------------------------------------
*/
exports.update = (req,res) => {

	const modelData = setDefaultValues(req);
	
	Trip.findOneAndUpdate({_id: req.params.id, owner_id:req.user._id}, modelData,{new: true}).then(trip => {
		res.json(trip)
	}).catch(err => {
		res.status(500).send(err);
	})

}

/* 
|--------------------------------------------------------------------------
| Search trips
|--------------------------------------------------------------------------
*/
exports.search = (req,res) => {
	
	const skip = parseInt(req.query.skip) || 0;
	var query = {};

	//search title ---
	req.query['title'] != undefined ? query['title'] = new RegExp(`.*${req.query['title']}.*`,"i") : undefined;

	//search gender ---
	req.query['gender'] != undefined ? query['gender'] = req.query['gender'] : undefined;

	//search surf modality ---
	req.query['surf_modality'] != undefined ? query['surf_modality'] = req.query['surf_modality'] : undefined;

	//search surf level ---
	req.query['surf_level'] != undefined ? query['surf_level'] = req.query['surf_level'] : undefined;

	//search transport ---
	req.query['transport'] != undefined ? query['transport'] = req.query['transport'] : undefined;

	//search accomodation ---
	req.query['accomodation'] != undefined ? query['accomodation'] = req.query['accomodation'] : undefined;
	
	//search max no. surfers ---
	req.query['number_of_surfers'] != undefined ? query['number_of_surfers'] = { $lte: req.query['number_of_surfers'] }  : undefined;


	Trip.find( query ).skip(skip).limit(50).then(trips => {
		res.json(trips);
	}).catch(err => {
		res.status(422).send(err);
	})

}


/* 
|--------------------------------------------------------------------------
| Populate nested objects & defaults 
|--------------------------------------------------------------------------
*/
function setDefaultValues(req) {

	const modelData = Object.assign({}, req.body, { 
       
        owner_id: req.user._id,

		date_times: {
			departure_date_time: req.body.departure_date_time || new Date(),
			return_date_time:  req.body.departure_date_time || new Date()
		}, 

		transport: {
			own_vehicle: req.body.departure_date_time || false,
			offer_rides: req.body.offer_rides || false,
			available_seats: req.body.available_seats || 0,
			bring_own_surfboards: req.body.bring_own_surfboards || false,
			max_surfboards: req.body.max_surfboards || 0,
        }
        
	});

	return modelData;
}


	