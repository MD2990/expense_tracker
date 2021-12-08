import { MongoClient } from 'mongodb';

let uri = process.env.MONGODB_URI;
let dbName = process.env.MONGO_DB;

if (!uri) throw new Error('Missing environment variable MONGO_URI');
if (!dbName) throw new Error('Missing environment variable MONGO_DB');

export default async function connectToDatabase() {
	if (global.connection) return global.connection;
	if (!global.connectionPromise) {
		global.connectionPromise = MongoClient.connect(uri, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
	}
	const client = await global.connectionPromise;
	const db = await client.db(dbName);
	global.connection = {
		client,
		db,
	};
	return global.connection;
}
