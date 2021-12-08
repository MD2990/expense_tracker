
import connectToDatabase from '../../../utils/mongodb';
export default async function handler(req, res) {
	const { db } = await connectToDatabase();
	const data = await db.collection('sal').find({}).toArray();
	res.json({ data });
}