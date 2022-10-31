const express = require("express");
const morgan = require("morgan");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("tiny"));

const about = {
  name: "Salomón Vásquez",
  age: 29,
  email: "ejemplo@ejemplo.com",
  phone: "12345",
  adress: "123 Main st",
  city: "Medellín",
  headline: "student",
  links: [
    {
      name: "1",
      url: "https://ejemplo1",
    },
    {
      name: "2",
      url: "https://ejemplo2",
    },
  ],
  website: "https://IdontHaveAwebSite.com",
  skills: [
    {
      name: "Javascript",
      level: "Rookie",
    },
    {
      name: "React",
      level: "Rookie",
    },
    {
      name: "Node",
      level: "Rookie",
    },
    {
      name: "HTML",
      level: "Rookie",
    },
  ],
};

const products = [
  {
    id: 1,
    title: "new Title marcos",
    price: 100004,
    description: "new Description",
    images: [
      "https://api.lorem.space/image/shoes?w=640&h=480&r=5193",
      "https://api.lorem.space/image/shoes?w=640&h=480&r=2221",
      "https://api.lorem.space/image/shoes?w=640&h=480&r=2672",
    ],
  },
  {
    id: 3,
    title: "new try",
    price: 29,
    description:
      "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J",
    images: [
      "https://api.lorem.space/image/fashion?w=640&h=480&r=4308",
      "https://api.lorem.space/image/fashion?w=640&h=480&r=4555",
      "https://api.lorem.space/image/fashion?w=640&h=480&r=4493",
    ],
  },
  {
    id: 4,
    title: "Licensed Plastic Table",
    price: 808,
    description:
      "Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals",
    images: [
      "https://api.lorem.space/image/fashion?w=640&h=480&r=6769",
      "https://api.lorem.space/image/fashion?w=640&h=480&r=6810",
      "https://api.lorem.space/image/fashion?w=640&h=480&r=2350",
    ],
  },
  {
    id: 5,
    title: "Refined Plastic Shirt",
    price: 252,
    description:
      "The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality",
    images: [
      "https://api.lorem.space/image/watch?w=640&h=480&r=9592",
      "https://api.lorem.space/image/watch?w=640&h=480&r=6436",
      "https://api.lorem.space/image/watch?w=640&h=480&r=4565",
    ],
  },
];

console.log("MyFirstExpress");

app.get("/info", function (req, res) {
  res.send(`<p>Our store has ${products.length} products</p>
  <p>${new Date()}</p>`);
});
app.get("/api/products", function (req, res) {
  res.json(products);
});

app.get("/about", function (req, res) {
  res.json(about);
});

app.get("/api/products/:id", (req, res) => {
  let found = products.find(
    (element) => element.id === parseInt(req.params.id)
  );
  if (found == undefined || found == null) {
    res.status(404).send("Error 404 = Not found");
  } else res.send(found);
});

app.get("/api/products/:id", (req, res) => {
  let found = products.find(
    (element) => element.id === parseInt(req.params.id)
  );
  if (found == undefined || found == null) {
    res.status(404).send("Error 404 = Not found");
  } else res.send(found);
});

app.delete("/api/products/:id", (req, res) => {
  const itemIndex = products.findIndex(
    (element) => element.id === parseInt(req.params.id)
  );
  if (itemIndex >= 0) {
    products.splice(itemIndex, 1);
  }
  res.send(products);
});

app.post("/api/products/", (req, res) => {
  let newproduct = req.body;
  let ProductExistance = false;
  for (let index = 0; index < products.length; index++) {
    if (products[index].title === newproduct.title) {
      ProductExistance = true;
    }
  }
  if (
    newproduct.title === null ||
    newproduct.title === undefined ||
    newproduct.title === "" ||
    newproduct.price === null ||
    newproduct.price === undefined ||
    newproduct.price === ""
  ) {
    res.status(404).send("Error: title or Price required");
  } else if (ProductExistance === true) {
    res.status(404).send("Error: Existing title");
  } else {
    let array = [];
    for (let index = 0; index < products.length; index++) {
      array.push(products[index].id);
    }
    let randomId = Math.floor(Math.random() * 10000);
    while (array.indexOf(randomId) !== -1) {
      randomId = Math.floor(Math.random() * 10000);
    }
    newproduct = Object.assign({ id: randomId }, newproduct);
    products.push(newproduct);
    res.status(201).send(products);
  }
});

app.listen(8080);
