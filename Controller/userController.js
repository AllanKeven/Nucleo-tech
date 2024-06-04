const bcrypt = require('bcrypt'); 
const User = require('../models/user');
const { sign } = require('jsonwebtoken');
 
 class userController{

    async registerUser (req, res){
        try {
            console.log("Entrou")
            const { username, password, email, tellNumber, hasTeacher } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);  
            const newUser = new User({ username, password: hashedPassword, email, tellNumber,hasTeacher});  
            await newUser.save();
            res.status(201).send('Usuário registrado com sucesso');
        } catch (err) {
            console.log(err);
            res.status(500).send('Erro ao registrar o usuário');
        }
    }

    async loginUser (req, res){
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            if (!user) return res.status(404).send('Usuário não encontrado');
    
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(401).send('Senha incorreta');
    
            const token = sign({}, "158789237109234sfdadf",{
                subject: user.id,
                expiresIn: "1d"
            })

            res.status(200).json({
                authenticated: true,
                token,
                username: user.username,
                email: user.email,
                id: user.id
            });
        } catch (err) {
            res.status(500).send('Erro ao fazer login');
        }
    }

    async getUser (req, res){
        try {
            const users = await User.find({}, '-password');  
            res.status(200).json(users);
        } catch (err) {
            res.status(500).send('Erro ao obter os usuários');
        }

    }

    async updateUser(req, res) {
        try {
            const { id } = req.params;
            const { username, email, hasTeacher } = req.body;
            const updatedUser = await User.findByIdAndUpdate(id, { username, email, hasTeacher }, { new: true });
            if (!updatedUser) return res.status(404).send('Usuário não encontrado');
            res.status(200).json(updatedUser);
        } catch (err) {
            res.status(500).send('Erro ao atualizar o usuário');
        }
    }

    async deleteUser(req, res) {
        try {
            const { id } = req.params;
            const deletedUser = await User.findByIdAndDelete(id);
            if (!deletedUser) return res.status(404).send('Usuário não encontrado');
            res.status(200).send('Usuário deletado com sucesso');
        } catch (err) {
            res.status(500).send('Erro ao deletar o usuário');
        }
    }

}
module.exports = {userController};

