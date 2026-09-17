import 'dotenv/config'

if(!process.env.MONGO_URI) {
    throw new Error("Mongo_URI not found !")
}
if(!process.env.JWT_SECRET) {
    throw new Error("JWT_secret not found !")
}

export const CONFIG = {
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET,
}