    const mongoose = require('mongoose');

    async function main() {
        try{
            mongoose.set("strictQuery", true)
            await mongoose.connect("mongodb+srv://allankeven:68IN4cKTClrpCtKe@cluster0.8qhqjji.mongodb.net/");
            console.log("Banco conectado")

        }catch(error){
            console.log (`Erro: ${error}`)
        }

    }
    module.exports = main;
