const { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner')
const {
    AWS_S3_BUKET_NAME,
    AWS_S3_REGION,
    AWS_S3_KEY,
    AWS_S3_SECRET_KEY
} = require('dotenv').config().parsed;
const fs = require('fs');
const uniqueFilename = require('unique-filename');

const clientS3 = new S3Client({
    region: AWS_S3_REGION,
    credentials: {
        accessKeyId: AWS_S3_KEY,
        secretAccessKey: AWS_S3_SECRET_KEY
    }
})

const fileController = {
    uploadFile: async (path, name) => {
        const stream = fs.createReadStream(path);
        const exten = name.split('.').pop().toLowerCase();
        if (exten !== 'jpg' && exten !== 'jpeg' && exten !== 'gif' && exten !== 'png') {
            fs.unlinkSync(path);
            return 'error';
        }
        const trueName = `${uniqueFilename('projects/', Date.now())}.${exten}`;
        //return trueName;
        const uploadParams = {
            Bucket: AWS_S3_BUKET_NAME,
            Key: trueName,
            Body: stream
        }
        const comand = new PutObjectCommand(uploadParams);
        //console.log(comand);
        //return comand;
        try {
            await clientS3.send(comand);
            const findFileComand = new GetObjectCommand({ Bucket: AWS_S3_BUKET_NAME, Key: trueName });
            const image = await clientS3.send(findFileComand);
            fs.unlinkSync(path);
            return { image, key: trueName };
        } catch (error) {
            console.error(error);
            fs.unlinkSync(path);
            return 'error';
        }
    },
    updateFile: async (path, lastName, newName) => {
        const stream = fs.createReadStream(path);
        const extenNewName = newName.split('.').pop().toLowerCase();
        if (extenNewName !== 'jpg' && extenNewName !== 'jpeg' && extenNewName !== 'gif' && extenNewName !== 'png') {
            fs.unlinkSync(path);
            return 'error';
        }
        const trueName = `${uniqueFilename('projects/', Date.now())}.${extenNewName}`;
        if (lastName !== 'projects/default-img-proy.jpeg') {
            const deleteComand = new DeleteObjectCommand({ Bucket: AWS_S3_BUKET_NAME, Key: lastName });
            await clientS3.send(deleteComand);
        }
        const uploadParams = {
            Bucket: AWS_S3_BUKET_NAME,
            Key: trueName,
            Body: stream
        }
        const comand = new PutObjectCommand(uploadParams);
        try {
            const image = await clientS3.send(comand);
            return { image, key: trueName };
        } catch (error) {
            console.error(error);
            fs.unlinkSync(path);
            return 'error';
        }
    },
    deletefile: async (nameFile) => {
        if (nameFile === 'projects/default-img-proy.jpeg') {
            return true;
        }
        const comand = new DeleteObjectCommand({
            Bucket: AWS_S3_BUKET_NAME,
            Key: nameFile
        })
        return await clientS3.send(comand);
    },
    getUrl: async (nameFile) => {
        const comand = new GetObjectCommand({
            Bucket: AWS_S3_BUKET_NAME,
            Key: nameFile
        })
        const result = await getSignedUrl(clientS3, comand, { expiresIn: 10200 });
        return result;
    }
}

module.exports = fileController;