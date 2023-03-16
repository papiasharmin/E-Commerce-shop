
import { MongoClient } from 'mongodb'

const uri =  'mongodb+srv://papiasharmin:PNKjZYsY6WRTUmUC@cluster0.lhg764a.mongodb.net/?retryWrites=true&w=majority'//process.env.MONGODB_URI
const options = {}

let client
let clientPromise: Promise<MongoClient>


  client = new MongoClient(uri, options)
  clientPromise = client.connect()

export default clientPromise
//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