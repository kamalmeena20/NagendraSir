const dns = require("dns");

console.log("Node DNS:", dns.getServers());

dns.resolveSrv(
  "_mongodb._tcp.cluster0.vnwgb29.mongodb.net",
  (err, records) => {
    console.log("Error:", err);
    console.log("Records:", records);
  }
);