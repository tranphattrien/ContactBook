const { request } = require("express");

// Creat and save a new contact
exports.create = async(req, res) =>{
    res.send({message: "create handler"});
};
// Retrieve all contacts of a user from the database
exports.findAll = async (req, res) => {
    res.send({message: "findAll handler"});
};
// Find a single contact with an id
exports.findOne = async (req, res) => {
    res.send({message: "findOne handler"});
};
// Update a contact by the id in the request
exports.update = async (req, res) => {
    res.send({message: "update handler"});
};
// Delete a contact with the specified id in the request
exports.delete = async (req, res) => {
    res.send({message: "delete handler"});
};
// Delete all contacts of a user from the database
exports.deleteAll = async (req, res) => {
    res.send({message: "deleteAll handler"});
};
// Find all favorite a contacts of a user
exports.findAllFavorite = async (req, res) => {
    res.send({message: "findAllFavorite handler"});
};
