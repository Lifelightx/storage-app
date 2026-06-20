import uploadRepository from "./upload.repository.js";
import { createUploadSchema } from "./upload.validator.js";
import { randomUUID } from "crypto"
class UploadService{

    async createUpload(data){
        uploadId = randomUUID()
        const validated = createUploadSchema.parse(
            data    
        );
        const chunkSize = 10 * 1024 * 1024;

        const totalParts = Math.ceil(
            validated.size / chunkSize
        )
        
        const upload = await uploadRepository.create({
            uploadId,
            filename: validated.filename,
            totalSize: validated.size,
            chunkSize,
            totalParts,

        })
        return upload
    }

    async uploadPart(
        uploadId,
        partNumber,
        request
    ){
        const upload = await uploadRepository.fin
    }

    async completeUpload(){

    }
}

export default new UploadService();