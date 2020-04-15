const routeCaller = require("."),
  express = require("express"),
  bodyParser = require("body-parser"),
  router = express.Router();

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));//

app.use("/bot", router);

router.route("/msg").post((req, res, next) => {
  console.log(req.body);
  res.send({ a: 2642 });
});


// Initialize module
let rc = routeCaller(app);
//prepare data
let payload = {
  query: {
    this: "that",
  },
  body: {
    text: "thi is test code...",
  },
};

// Run runMiddleware
rc.runMiddleware("/bot/msg", payload)
  .then((resp) => {
    console.log({ resp });
  })
  .catch(console.error);
