const mongoose = require("mongoose");
const Campground = require("../models/campground");
const cities = require("./cities");
const { descriptors, places } = require("./seedHelpers");

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

// add database
const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDb = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    // const random1000 = Math.floor(Math.random() * 1000); => cities[random1000].city
    const random1000 = sample(cities);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      location: `${random1000.city}, ${random1000.state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      image: "https://source.unsplash.com/collection/483251/",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est, amet? Sit cum, soluta doloribus sapiente voluptatem facere hic impedit architecto ipsam perferendis ipsum consequuntur, optio tempore mollitia dicta nihil aliquid!",
      price,
    });
    await camp.save();
  }
};

seedDb().then(() => mongoose.connection.close());
