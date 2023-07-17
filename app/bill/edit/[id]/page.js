import React from 'react'
import connectToDatabase from "@utils/mongodb";

export default function page({params}) {

	async function getBill() {

		  const { db } = await connectToDatabase();
      const data = await db
        .collection("bill")
        .findOne({ _id: mongodb.ObjectId(params.id) });

      const bill = await jsonify(data);

	}

	console.log(params.id);
	return (
	<></>
  )
}
