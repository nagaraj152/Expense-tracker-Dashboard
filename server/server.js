const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let transactions = [];

app.get("/transactions",(req,res)=>{
res.json(transactions);
});

app.post("/transactions",(req,res)=>{

const newTransaction = {
_id: Date.now().toString(),
...req.body
};

transactions.push(newTransaction);

res.json(newTransaction);
});

app.delete("/transactions/:id",(req,res)=>{

transactions =
transactions.filter(
t => t._id !== req.params.id
);

res.json({
message:"Deleted"
});
});

app.listen(5000, "127.0.0.1", () => {
    console.log("Server running on http://127.0.0.1:5000");
});