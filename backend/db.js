const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/surveyApp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
