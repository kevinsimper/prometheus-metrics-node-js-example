const express = require("express");
const Prometheus = require("prom-client");

const counter = new Prometheus.Counter({
  name: "hit_counter",
  help: "counts hits"
});

const auto = new Prometheus.Counter({
  name: "hit_counter_auto",
  help: "counts hits"
});

setInterval(() => auto.inc(Math.floor(Math.random() * 10)), 100);

const app = express();

app.get("/", (req, res) => {
  counter.inc();
  res.send("Hello");
});

app.get("/metrics", (req, res) => {
  res.set("Content-Type", Prometheus.register.contentType);
  res.end(Prometheus.register.metrics());
});

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => console.log("Now listening.. http://localhost:" + PORT));
