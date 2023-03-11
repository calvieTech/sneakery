import { Loader } from "@googlemaps/js-api-loader";
import * as dotenv from "dotenv";
dotenv.config();

const loader = new Loader({
  apiKey: process.env.GOOGLEMAPS_KEY,
  version: "weekly",
});

const mapOptions = {
  center: {
    lat: 0,
    lng: 0,
  },
};
