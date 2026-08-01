import { MongoClient } from "mongodb"

const uri = process.env.MONGODB_URI
const options = {}

function createClient(): Promise<MongoClient> {
  if (!uri) {
    return Promise.reject(
      new Error("MONGODB_URI is not set. Add it to your .env file.")
    )
  }
  return new MongoClient(uri, options).connect()
}

let clientPromise: Promise<MongoClient>

if (process.env.NODE_ENV === "development") {
  const globalWithMongo = globalThis as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>
  }
  clientPromise = globalWithMongo._mongoClientPromise ?? createClient()
  globalWithMongo._mongoClientPromise = clientPromise
} else {
  clientPromise = createClient()
}

export default clientPromise
