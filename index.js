const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch-commonjs");
const PORT = 8000;
const app = express();

require("dotenv").config({ path: "./.env" });

const subdomain = process.env.SUBDOMAIN;
const appID = process.env.APPID;
const apiToken = process.env.APITOKEN;

app.use(express.json());

app.use(cors());
const corsOptions = {
  origin: "https://kintone-travel-tracker.vercel.app/home",
};

const multipleRecordsEndpoint = `https://${subdomain}.kintone.com/k/v1/records.json?app=${appID}`;
const singleRecordEndpoint = `https://${subdomain}.kintone.com/k/v1/record.json?app=${appID}`;

app.get("/", (req, res) => {
  res.send("Welcome to the backend");
});

app.get("/getData", cors(corsOptions), async (req, res) => {
  try {
    const fetchOptions = {
      method: "GET",
      headers: {
        "X-Cybozu-API-Token": apiToken,
      },
    };
    const response = await fetch(multipleRecordsEndpoint, fetchOptions);
    const jsonResponse = await response.json();
    res.json(jsonResponse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal service error" });
  }
});

app.post("/postData", cors(corsOptions), async (req, res) => {
  try {
    const requestBody = {
      app: appID,
      record: {
        country: {
          value: req.body.country,
        },
        state: {
          value: req.body.state,
        },
        city: {
          value: req.body.city,
        },
        email: {
          value: req.body.email,
        },
        locCoordsX: {
          value: req.body.locCoordsX,
        },
        locCoordsY: {
          value: req.body.locCoordsY,
        },
        imageUrl: {
          value: req.body.imageUrl,
        },
      },
    };
    const options = {
      method: "POST",
      headers: {
        "X-Cybozu-API-Token": apiToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    };
    const response = await fetch(singleRecordEndpoint, options);
    const jsonResponse = await response.json();
    res.json(jsonResponse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal service error" });
  }
});

app.listen(PORT, () => {
  console.log(
    `\n Backend server listening at http://localhost:${PORT} \n Confirm if records are being retrieved at \n http://localhost:${PORT}/getData`
  );
});
