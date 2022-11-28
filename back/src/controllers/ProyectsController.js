const { Proyect } = require("../db");
const { uploadFile, updateFile, deletefile } = require("../s3config");
const { isAdmin } = require("../Utils/auth");
const { setError, sendSuceess, sendMessage } = require("../Utils/setMessages");


const ProyectController = {
    getProyects: async (req, res) => {
        const { id } = req.params;
        const { numPro } = req.query;
        try {
            let result;
            if (id) {
                result = await Proyect.findByPk(id);
                if (!result) {
                    return res.status(404).json(sendMessage('error', 'Projet not found'));
                }
                return res.status(200).json(sendSuceess(result));
            } else {
                result = await Proyect.findAll(numPro ? { limit: parseInt(numPro) } : {});
                return res.status(200).json(sendSuceess(result));
            }
        } catch (error) {
            res.json(setError(error));
        }
    },
    newProyect: async (req, res) => {
        const { deToken } = req.headers;
        const { name, description, date, gitrepo, deployurl } = req.body;
        if (req.files) {
            var { imageProy:
                { name: fileName,
                    tempFilePath
                }
            } = req.files;
        }
        //console.log(deToken);
        if (!await isAdmin(deToken)) {
            return res.status(403).json(sendMessage('error', 'Error of authentication'))
        }
        //console.log(req.body);
        if (!name || !description || !date || !gitrepo) {
            return res.status(404).json(sendMessage('error', 'Missing data, Try again'));
        }
        //console.log(req.files);
        const image = req.files ? await uploadFile(tempFilePath, fileName) : null;
        //console.log(image);
        const newProyect = {
            name,
            description,
            date: new Date(date),
            gitrepo,
            deployurl
        };
        //console.log(image);
        (image && image !== 'error') ? newProyect.image = image.key : null;
        //console.log(newProyect);
        try {
            const result = await Proyect.create(newProyect);
            return res.status(202).send(sendSuceess(result));
        } catch (error) {
            return res.json(setError(error))
        }
    },
    updateProyect: async (req, res) => {
        const { deToken } = req.headers;
        const { id } = req.params;
        const { name, description, date, gitrepo, deployurl } = req.body;
        if (req.files) {
            var { imageProy:
                { name: fileName,
                    tempFilePath
                }
            } = req.files;
        }
        if (!await isAdmin(deToken)) {
            return res.status(403).json(sendMessage('error', 'Error of authentication'))
        }
        if (!name && !description && !date && !gitrepo && !deployurl) {
            return res.status(404).json(sendMessage('error', 'Missing data, try again'));
        }

        const proyectToUpdate = await Proyect.findByPk(id);
        if (!proyectToUpdate) {
            return res.status(404).json(sendMessage('error', 'Projet not found'))
        }
        console.log(req.files);
        const image = req.files ? await updateFile(tempFilePath, proyectToUpdate.image, fileName) : null;
        console.log(image)
        const proyectData = {
            name,
            description,
            gitrepo,
            deployurl
        };

        // if (image || image !== 'error') {
        //     proyectData.image = image.key
        // }
        date ? proyectData.date = new Date(date) : null;
        (image && image !== 'error') ? proyectData.image = image.key : null;

        try {
            const result = await proyectToUpdate.update(proyectData);
            return res.status(202).json(sendSuceess(result));
        } catch (error) {
            return res.json(setError(error));
        }
    },
    deleteProyect: async (req, res) => {
        const { id } = req.params;
        const { deToken } = req.headers;
        if (!await isAdmin(deToken)) {
            return res.status(403).json(sendMessage('error', 'You can not delete this data'));
        }
        try {
            const proyToDelete = await Proyect.findByPk(id);
            if (!proyToDelete) {
                return res.status(404).json(sendMessage('error', 'Projet not found'));
            }
            await deletefile(proyToDelete.image);
            const result = await proyToDelete.destroy();
            return res.status(202).json(sendSuceess({
                DeletedProy: proyToDelete,
                msg: 'Successfull to delete this project'
            }))
        } catch (error) {
            return res.json(setError(error));
        }
    },
}

module.exports = ProyectController;