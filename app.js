import express from "express";
import employees from "#db/employees";

const app = express();

app.get("/", (request, response, next) => {
  response.send("Hello employees!");
});

app.get("/employees", (request, response, next) => {
  response.json(employees);
});

app.get("/employees/random", (request, response, next) => {
  const randomIndex = Math.floor(Math.random() * employees.length);
  response.send(employees[randomIndex]);
});

app.get("/employees/:id", (request, response, next) => {
  const { id } = request.params;

  const selectedEmployee = employees.find((employee) => {
    return employee.id === parseInt(id);
  });

  if (!selectedEmployee) {
    response.status(404).send({
      message: "There is no employee with that ID",
    });
  } else {
    response.send(selectedEmployee);
  }
});

export default app;
