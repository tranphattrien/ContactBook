const {handle, BadRequestError} = require("../helpers/errors");
const { request } = require("express");
const Contact = db.Contact;

// Creat and save a new contact
exports.create = async(req, res, next) => {
    // Validate request
    if(!req.body.name){
        return next(new BadRequestError(400, "Name can not be empty"));
    }
    // Creat a contact
    const contact = new Contact({
        name: req.body.name,
        email: req.body.email,
        address: req.body.address,
        phone: req.body.phone,
        favorite: req.body.favorite ? true : false,
    });
    // Save contact in the database
    const [error, data] = await handle(contact.save());
    if(error){
        return next( new BadRequestError(500,"An error occurred while creating the contact"));
    }
    return res.send(data);
};
// Retrieve all contacts of a user from the database
exports.findAll = async (req, res, next) => {
    var condition = { };
    const name = req.query.name;
    if(name){
        condition.name = {$regex: new RegExp(name), $options: "i"};
    } 
    const [error, data] = await handle(Contact.find(condition));
    if(error){
        return next(new BadRequestError(500, "An error occurred while retrieving contacts"));
    }
    return res.send(data);
};
// Find a single contact with an id
exports.findOne = async (req, res, next) => {
    const condition = {
        _id: req.params.id,
    };
    const [error, data] = await handle(Contact.findOne(condition));
    if(error){
        return next(new BadRequestError(500, `Error retrieving contact with id=${req.params.id}`));
    }
    if(!data){
        return next(new BadRequestError(404,"Resource not found"));
    }
    return res.send(data);
    
};
// Update a contact by the id in the request
exports.update = async (req, res, next) => {
    if(!req.body){
        return next(new BadRequestError(400, "Data to update can not be empty"));
    }
    const condition = {
        _id: req.params.id,
    };
    const [error, data] = await handle(
        Contact.findOneAndUpdate(condition, req.body, {
            new: true,
        })
    );
    if(error){
        return next(new BadRequestError(500,`Error updating contact with id=${req.params.id}`));
    }
    if(!data){
        return next(new BadRequestError(404, "Resource not found"));
    }
    return res.send({message: "Contact was updated successfully",});
};
// Delete a contact with the specified id in the request
exports.delete = async (req, res,next) => {
    const condition = {
        _id: req.params.id,
    };
    const [error, data] = await handle(
        Contact.findOneAndRemove(condition, {
            new: true,
        })
    );
    if(error){
        return next(new BadRequestError(500,`Could not delete contact with id=${res.params.id}`));
    }
    if(!data){
        return next(new BadRequestError(404, `Not found contact with id=${req.params.id}`));
    }
    return res.send({message: "Contact was delete successfully",});
};
// Delete all contacts of a user from the database
exports.deleteAll = async (req, res, next) => {
    const [error, data] = await handle(
        Contact.deleteMany({ })
    );
    if(error){
        return next(new BadRequestError(500,"An error occurred while removing all contacts"));
    }
    return res.send({
        message: `${data.deleteCount} contacts were deleted successfully`,
    });
};
// Find all favorite a contacts of a user
exports.findAllFavorite = async (req, res, next) => {
    const [error, data] = await handle(
        Contact.find({favorite: true, })
    );
    if(error){
        return next(new BadRequestError(500,"An error occurred while retrieving fovorite contacts"));
    }
    return res.send(data);
};
