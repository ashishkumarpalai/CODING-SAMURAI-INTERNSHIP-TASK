const express = require("express")

const { ContactModel } = require("../models/contact.model")

const contactRouter = express.Router()


// API endpoint to save messages
contactRouter.post('/', async (req, res) => {
    const { name, email, message } = req.body;
    
    try {
        const contact = new ContactModel({ name, email, message });
        await contact.save();
        res.status(200).send({"message": 'Message sent successfully'});
    } catch (err) {
        console.error(err);
        res.status(500).send('Error saving message.plese fill all the details');
    }
});

module.exports = { contactRouter }