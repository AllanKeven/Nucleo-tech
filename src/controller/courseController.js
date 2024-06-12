const Course = require('../models/courseSchema');
const Module = require('../models/moduleSchema');
const Video = require('../models/videoSchema');

class courseController {
    async createCourse(req, res) {
        const { courseName, author, describe, icon } = req.body;

        if (!courseName || !author || !describe || !icon) return res.status(400).json({ message: 'Algum parametro esta em falta!' })

        try {
            new Course({ courseName, author, describe, icon }).save()
            return res.status(201).json({ message: 'Curso criado com sucesso' })
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' })
        }
    }

    async updateCourse(req, res) {
        const { courseName, author, describe, icon } = req.body;
        const { courseId } = req.params;

        let courseUpdate

        try {
            courseUpdate = await Course.findById(courseId)
        } catch (error) {
            return res.status(400).json({ message: 'Curso invalido!' })
        }

        try {
            await Course.findByIdAndUpdate(courseId, {
                courseName: courseName ? courseName : courseUpdate.courseName,
                author: author ? author : courseUpdate.author,
                describe: describe ? describe : courseUpdate.describe,
                icon: icon ? icon : courseUpdate.icon,
            })
            return res.status(200).json({ message: 'Curso atualizado com sucesso!' })
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' })

        }

    }

    async deleteCourse(req, res) {
        const { courseId } = req.params;

    

        try {
            await Course.findByIdAndDelete(courseId)
            return res.status(200).json({ message: 'Curso removido com sucesso!' })
        } catch (error) {
            console.error(error)
            return res.status(404).json({ message: 'Não foi possivel encontrar ou deletar este curso!' })
        }
    }

    async getAllCourses(req, res) {
        try {
            const courseList = await Course.find({});
            return res.status(200).json(courseList)
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error!' })
        }
    }

    async getAllModule(req,res){
        try{
            const moduleList = await Module.find({});
            return res.status(200).json(moduleList)

        }catch(error){
            return res.status(500).json({message: "Internal server error!"})
        }
    }

    async addNewModule(req, res) {

        let courseSelected

        const { titleModule } = req.body;
        const { courseId } = req.params;
        if (!courseId) return res.status(400).json({ message: 'É necessario um curso para criar um modulo!' })

        try {
            courseSelected = await Course.findById(courseId)
        } catch (error) {
            console.error(error);
            return res.status(404).json({ message: 'O curso selecionado não existe!' })
        }

        if (!titleModule) return res.status(400).json({ message: 'É necessario um titulo para o modulo!' })

        try {
            const newModule = await Module({ titleModule }).save()
            await Course.findByIdAndUpdate(courseId, { modulesIds: [...courseSelected.modulesIds, newModule._id] })
            return res.status(200).json({ message: 'Modulo criado com sucesso!' })
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error!' })
        }
    }

    async updateModule(req, res) {
        const { titleModule } = req.body;
        const { moduleId } = req.params;

        let moduleUpdate

        try {
            moduleUpdate = await Module.findById(moduleId)
        } catch (error) {
            return res.status(400).json({ message: 'Modulo invalido!' })
        }

        try {
            await Module.findByIdAndUpdate(moduleId, {
                titleModule: titleModule ? titleModule : moduleUpdate.titleModule,
            })
            return res.status(200).json({ message: 'Modulo atualizado com sucesso!' })
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' })
        }
    }

    async removeModule(req, res) {
        const { moduleId, courseId } = req.params;

        let courseSelected;
        let moduleSelected;

        try {
            courseSelected = await Course.findById(courseId)
        } catch (error) {
            return res.status(404).json({ message: 'O curso não foi encontrado' })
        }

        try {
            moduleSelected = await Module.findById(moduleId)
        } catch (error) {
            console.error(error)
            return res.status(404).json({ message: 'Não foi possivel encontrar o modulo!' })
        }

        const newListModules = courseSelected.modulesIds.filter(item => item != moduleId)

        try {
            await Course.findByIdAndUpdate(courseId, {
                modulesIds: newListModules
            })

            for (var i = 0; i < moduleSelected.videosIds.length; i++) {
                await Video.findByIdAndDelete(moduleSelected.videosIds[i])
            }

            await Module.findByIdAndDelete(moduleId)

            return res.status(200).json({ message: "Modulo deletado com sucesso!" })
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error!' })
        }
    }

    async addNewVideo(req, res) {
        let moduleSelected
        const { moduleId } = req.params;
        const { videoTitle, describe, videoUrl } = req.body;

        try {
            moduleSelected = await Module.findById(moduleId)
        } catch (error) {
            return res.status(401).json({ message: 'É necessario selecionar um modulo!' })
        }
        try {
            const newVideo = await Video({ videoTitle, describe, videoUrl }).save()
            await Module.findByIdAndUpdate(moduleId, { videosIds: [...moduleSelected.videosIds, newVideo._id] })
            return res.status(200).json({ message: 'Video adicionado com sucesso!' })
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error!' })
        }
    }

    async updateVideo(req, res) {
        const { videoTitle, describe, videoUrl } = req.body;
        const { videoId } = req.params;

        let videoUpdate

        try {
            videoUpdate = await Video.findById(videoId)
        } catch (error) {
            return res.status(400).json({ message: 'Curso invalido!' })
        }

        try {
            await Video.findByIdAndUpdate(videoId, {
                videoTitle: videoTitle ? videoTitle : videoUpdate.videoTitle,
                videoUrl: videoUrl ? videoUrl : videoUpdate.videoUrl,
                describe: describe ? describe : videoUpdate.describe,
            })
            return res.status(200).json({ message: 'Video atualizado com sucesso!' })
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' })
        }
    }

    async deleteVideo(req, res) {
        const { videoId } = req.params;

        try {
            await Video.findByIdAndDelete(videoId)
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error!' })
        }
    }

    async getVideoById(req, res) {
        const { videoId } = req.params
        try {
            const videoSelected = await Video.findById(videoId)
            return res.status(200).json(videoSelected)
        } catch (error) {
            console.error(error);
            return res.status(404).json({ message: 'Video não encontrado!' })
        }
    }

    async getModuleById(req, res) {
        const { moduleId } = req.params

        try {
            const moduleSelected = await Module.findById(moduleId)
            return res.status(200).json(moduleSelected)
        } catch (error) {
            console.error(error);
            return res.status(404).json({ message: 'Modulo não encontrado!' })
        }
    }

    async getCourseById(req, res) {
        const { courseId } = req.params
        try {
            const courseSelected = await Course.findById(courseId)
            return res.status(200).json(courseSelected)
        } catch (error) {
            console.error(error);
            return res.status(404).json({ message: 'Curso não encontrado!' })
        }
    }
}

module.exports = { courseController }