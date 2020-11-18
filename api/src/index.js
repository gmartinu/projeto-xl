const _baseUrl = "/api/v1";
const cors = require("cors");
const app = require("express")();
const bodyParser = require("body-parser");
const { sequelize } = require("./models");

require("dotenv").config();

app.use(bodyParser.urlencoded({ limit: "50mb", extended: false }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());

app.use(_baseUrl, require("./routes"));

sequelize
  .sync({ 
    // logging: false, 
    // force: true 
  })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("dbInit.js: Database synced");
      console.log("Online! Rodando na porta " + process.env.PORT);
    });
  })
  .catch(async (error) => {
    console.log("Cannot sync database! See error below!!!");
    console.error(error);
    console.log("Cannot sync database! See error above!!!");
  });