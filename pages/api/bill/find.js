import connectToDatabase from '../../../utils/mongodb';

var mongodb = require('mongodb');

export default async function handler(req, res) {
	const { db } = await connectToDatabase();
	const data = await db
		.collection('bill')
		.findOne({ _id: mongodb.ObjectId(req.query._id) });
	res.json({ data });
}
