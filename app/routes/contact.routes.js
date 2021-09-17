const contacts = require("../controllers/contact.controller");
const express = require("express");
const { app } = require("../config");

module.exports = (app) =>{
    var router = express.Router();

    // Creat a new contact
    router.post("/", contacts.create);

    // Retrieve all contacts
    router.get("/", contacts.findAll);

    // Retrieve all favorite contacts
    router.get("/favorite", contacts.findAllFavorite);

    // Retrieve a single contact with id
    router.get("/:id", contacts.findOne);

    // Update a contact with id
    router.put("/:id", contacts.update);

    // Delete a contact with id
    router.delete("/:id", contacts.delete);

    // Delete all contacts
    router.delete("/", contacts.deleteAll);

    app.use("/api/contacts", router);
    
};