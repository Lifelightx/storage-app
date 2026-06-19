import uploadService from "./upload.service.js";

class UploadController{
    async createUpload(req, reply) {
        const result = await uploadService.createUpload(
            req.body
        )

        return reply.code(201).send(result)
    }

    async uploadPart(req, reply){
        const result = await uploadService.uploadPart(
            req.params.uploadId,
            req.param.partNumber,
            req
        )
        return reply.send(result)
    }

    async completeUpload(req, reply){
        const result = await uploadService.completeUpload(
            req.params.uploadId,

        )
        return reply.send(result)
    }

}



export default new UploadController();