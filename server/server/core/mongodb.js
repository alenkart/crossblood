const config = require('./../configs/' + process.env.NODE_ENV);
const MongoClient = require('mongodb').MongoClient;
const path = require('path');

const mongodb = function (param_config) {

	return new Promise((res, rej) => {

		MongoClient.connect(config.database, (err, db) => {

			if (err) {

				console.log(`App couldn't connect to: ${config.database}`);
				rej(err);
			} else {

				res(db);
			}

		});

	});

};

module.exports = mongodb;