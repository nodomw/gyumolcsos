import config from "./env.ts";
import { createPool } from "mariadb";
import express from "express";

(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};

const app = express();
const pool = createPool(config.db);

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.method, req.path);
  console.log(req.body);
  next();
});

app.get("/fruits", (req, res) => {
  pool
    .execute("select * from fruits")
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Database query failed");
    });
});

app.get("/fruits/:id", (req, res) => {
  let id = Number(req.params.id);
  if (typeof id === "undefined" || id <= 1) {
    res.status(400).redirect("https://http.cat/400");
  } else {
    pool
      .execute("select * from fruits where id = ?", [id])
      .then((result) => {
        if (result.length === 0) {
          res.status(404).redirect("https://http.cat/404");
        } else {
          res.status(200).json(result);
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Database query failed");
      });
  }
});

app.post("/fruits", (req, res) => {
  if (typeof req.body == "undefined") {
    res.status(400).redirect("https://http.cat/400");
  }

  let name = req.body.name;
  let price = req.body.price;

  if (
    typeof name == "undefined" ||
    typeof price == "undefined" ||
    isNaN(price) ||
    !(price > 0)
  ) {
    res.status(400).redirect("https://http.cat/400");
  } else {
    pool
      .execute("insert into fruits (name, price) values (?, ?)", [name, price])
      .then((result) => {
        res.status(201).json(result);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Database insert failed");
      });
  }
});

app.put("/fruits/:id", (req, res) => {
  let id = Number(req.body.id);
  let name = req.body.name;
  let price = req.body.price;

  if (
    isNaN(id) ||
    id <= 1 ||
    typeof name == "undefined" ||
    typeof price == "undefined" ||
    isNaN(price) ||
    !(price > 0)
  ) {
    console.log(req.body.id, name, price);
    res.status(400).redirect("https://http.cat/400");
  } else {
    pool
      .execute("update fruits set name = ?, price = ? where id = ?", [
        name,
        price,
      ])
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Database update failed");
      });
  }
});

app.listen(config.server.port, (err) => {
  if (err) {
    console.warn(err);
  }

  console.log(`running on ${config.server.port} yurrrrr`);
});
