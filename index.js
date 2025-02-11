import express from "express";
import "dotenv/config";
import { config } from "dotenv";
const app = express();

const port = 3000;

app.use(express.json());

/*app.get("/", (req, res) => {
  res.send("hi i am prasanth");
});

app.get("/ice-tea", (req, res) => {
  res.send("what flavour of ice tea do you prefer?");
});

app.get("/contact", (req, res) => {
  res.send("contact me at 9894XXXX75");
});
*/
let teaData = [];
let index = 1;

//insert tea
app.post("/teas", (req, res) => {
  const { name, price } = req.body;
  const newTea = { id: index++, name, price };
  teaData.push(newTea);
  res.status(200).send(newTea);
});

//get all tea
app.get("/teas", (req, res) => {
  res.status(200).send(teaData);
  console.log(teaData);
});

//get the tea with id

app.get("/teas/:id", (req, res) => {
  const tea = teaData.find((t) => t.id === parseInt(req.params.id)); //for response we use res.body while for req we use req.params
  //parseINt is used as all the things are in strings by the request and response
  if (!tea) {
    return res.status(404).send("Tea not found");
  }
  res.status(200).send(tea);
});

//to update the info of the tea with id
app.put("/teas/:id", (req, res) => {
  const tea = teaData.find((t) => t.id === parseInt(req.params.id));
  if (!tea) {
    return res.status(404).send("tea not found");
  }
  const { name, price } = req.body;
  tea.name = name;
  tea.price = price;
  res
    .status(202)
    .send(`updated the tea of ${parseInt(req.params.id)} successfully`);
});

//used to delete with the id
app.delete("/teas/:id", (req, res) => {
  const index = teaData.findIndex((t) => t.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).send("No data found with that id ");
  }
  teaData.splice(index, 1); //delete the '1' value of with that index
  res.status(204).send("delete the item successfully");
});

app.listen(port, () => {
  console.log(`server is running on port : ${port} ...`);
});
