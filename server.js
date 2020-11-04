import express from "express";
import mongoose from "mongoose";
import Messages from "./dbMessages.js";

const app = express();
const port = process.env.PORT || 9000;

app.use(express.json());

const connection_url =
  "mongodb+srv://admin:cpcPH4aTBss0B2vb@cluster0.xjyvm.mongodb.net/whatsappdb?retryWrites=true&w=majority";
mongoose.connect(connection_url, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get("/", (req, res) => res.status(200).send("CENGO"));

app.get("/messages/sync", (req, res) => {
  Messages.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.post("/messages/new", (req, res) => {
  const dbMessage = req.body;
  Messages.create(dbMessage, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(`new message created: \n ${data}`);
    }
  });
});

app.listen(port, () => console.log(`Listening on localhost:${port}`));
