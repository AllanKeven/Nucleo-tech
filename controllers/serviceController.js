/*
const user = require("../models/user");
const {user:ServiceModel} = require("../models/user");


const serviceController = {
    create: async (req, res) =>{
        try{
            const service = {
                username: req.body.username,
                password: req.body.password
            }
            const response = await ServiceModel.create(user);
            res.status(201).json({response, msg : "Serviço criado com sucesso"})
        }catch(error){
            console.log(error)
        }
    }
};

module.exports = serviceController;
*/