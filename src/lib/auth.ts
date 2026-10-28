import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const client = new MongoClient(process.env.MONGODB_URL as string);
const db = client.db('wanderlast');

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),

  emailAndPassword: {
    enabled: true,
  },

  user: {
    additionalFields: {
      location: {
        type: "string",
        required: false,
        defaultValue: "",
      },
      nationality: {
        type: "string",
        required: false,
        defaultValue: "",
      },
    },
  },

  // socialProviders:{
  //   google: {
  //       clientId: 
  //       clientSecret:
  //   },
});