    const mongoose = require('mongoose');

    async function main() {
        try{
            mongoose.set("strictQuery", true)
            await mongoose.connect(process.env.URL_DATABASE);
            console.log("Banco conectado")

        }catch(error){
            console.log (`Erro: ${error}`)
        }

    }
    module.exports = main;
