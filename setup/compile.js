const fs = require("fs-extra");
const path = require("path");

const compileWebsite = async () => {
  await fs.mkdirp(path.join(__dirname, "..", "public"));
  await fs.copyFile(
    path.join(__dirname, "..", "dist", "staart.css"),
    path.join(__dirname, "..", "public", "staart.css")
  );
  await fs.copyFile(
    path.join(__dirname, "..", "docs", "index.html"),
    path.join(__dirname, "..", "public", "index.html")
  );
  await fs.writeFile(
    path.join(__dirname, "..", "public", "index.html"),
    (await fs.readFile(path.join(__dirname, "..", "public", "index.html")))
      .toString()
      .replace("../dist/staart.css", "staart.css")
  );
};

compileWebsite()
  .then(() => {})
  .catch(error => console.log("ERROR", error))
  .then(() => process.exit(0));
