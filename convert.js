const fs = require("fs");

const file = "./init/data.js";

let data = fs.readFileSync(file, "utf8");

data = data.replace(
  /image:\s*\{\s*filename:\s*"listingimage",\s*url:\s*"([^"]+)",?\s*\}/gs,
  'image: "$1"'
);

fs.writeFileSync("./init/data_converted.js", data);

console.log("✅ Conversion completed!");