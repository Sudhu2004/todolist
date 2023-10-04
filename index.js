import express from "express";
import bodyParser from "body-parser";
const app = express();
const port = 3000;
var worklist = [];

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs"); // Set the view engine to EJS

app.get("/", (req, res) => {
    res.render("home.ejs");
});

app.get("/todo", (req, res) => {
    res.render("todo.ejs", {
        locals: {
            todolist: worklist
        }
    });
});

app.get("/work", (req, res) => {
    res.render("work.ejs", {
        locals: {
            todotext: worklist
        }
    });
});

app.post("/todoinput", (req, res) => {
    const newWorkItem = req.body.todotext.toLowerCase(); // Convert to lowercase

    const existingIndex = worklist.findIndex(item => item.toLowerCase() === newWorkItem);

    if (existingIndex !== -1) {
        res.render("todo.ejs", {
            locals: {
                todotext: worklist,
                existing: existingIndex
            }
        });
    } else {
        worklist.unshift(req.body.todotext);
        res.render("todo.ejs", { // Render the template after updating the list
            locals: {
                todotext: worklist
            }
        });
    }
});

app.listen(port, () => {
    console.log("Server running on port " + port);
});
