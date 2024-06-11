const bcrypt = require('bcrypt');
const User = require('../models/user');
const { sign } = require('jsonwebtoken');

class userController {

    async registerUser(req, res) {
        try {
            const { username, password, email, tellNumber, hasTeacher } = req.body;

            if (!username) return res.status(400).send("É necessario um nome de usuario!")
            if (!password) return res.status(400).send("É necessario uma senha!")
            if (!email) return res.status(400).send("É necessario um email!")
            if (!tellNumber) return res.status(400).send("É necessario um numero de telefone!")

            const userByEmail = await User.findOne({ email })
            if (userByEmail) return res.status(400).send("Este email já esta sendo utilizado")

            const userByPhone = await User.findOne({ tellNumber })
            if (userByPhone) return res.status(400).send("Este número já esta sendo utilizado")

            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({ username, password: hashedPassword, email, tellNumber, hasTeacher });

            await newUser.save();

            res.status(201).send('Usuário registrado com sucesso');
        } catch (err) {
            console.error(err);
            res.status(500).send('Erro ao registrar o usuário');
        }
    }

    async loginUser(req, res) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            if (!user) return res.status(404).send('Usuário não encontrado');

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(401).send('Senha incorreta');

            const token = sign({}, process.env.HASH_USER_TOKEN, {
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
            console.error(error);
            res.status(500).send('Erro ao fazer login');
        }
    }

    async getUser(req, res) {
        try {
            const users = await User.find({}, '-password');
            res.status(200).json(users);
        } catch (err) {
            console.error(error);
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
            console.error(error)
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
            console.error(error)
            res.status(500).send('Erro ao deletar o usuário');
        }
    }

    async addCourseProgressInUserProfile(req, res) {
        const { userId } = req.params
        const { videoId, moduleId, courseId } = req.body

        if (!userId) return res.stats(200).json({ message: 'Usuário não encontrado!' })
        if (!videoId || !moduleId || !courseId) return res.status(400).json({ message: 'Parametros necessarios não encontrados' })

        try {
            const userSelected = await User.findById(userId)
            const newProgress = { videoId, moduleId, courseId }
            for (let i = 0; i < userSelected.progressCourse.length; i++) {
                if (videoId == userSelected.progressCourse[i].videoId) {
                    return res.status(400).json({ message: 'Video ja cadastrado!' })
                }
            }
            await User.findByIdAndUpdate(userId, {
                progressCourse: [...userSelected.progressCourse, newProgress]
            })
            res.status(200).json({ message: 'Aula adicionada com sucesso!' })
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error!' })
        }
    }

}
module.exports = { userController };

