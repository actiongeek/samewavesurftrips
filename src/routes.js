import express from 'express';
import config from './config';

const ObjectId = require('mongodb').ObjectID;

let app;

/* 
|--------------------------------------------------------------------------
| Routes Init
|--------------------------------------------------------------------------
*/
export function routesInit(a){
	app = a;
}

/* 
|--------------------------------------------------------------------------
| ROUTES
|--------------------------------------------------------------------------
*/
const router = express.Router();
export function routes() {

	/* 
	|--------------------------------------------------------------------------
	| HOME
	|--------------------------------------------------------------------------
	*/
	router.get('/', function(req,res){
		res.json({ 'msg' : 'Hello World!' })
	});

    return router;
}

