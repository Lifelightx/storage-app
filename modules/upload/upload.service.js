import uploadRepository from "./upload.repository.js";

class UploadService{

    async createUpload(data){
        const upload = await uploadRepository.create({
            filename: data.filename,
            size: data.size
        })
        return upload
    }

    async uploadPart(
        uploadId,
        partNumber,
        request
    ){
        return 
    }

    async completeUpload(){

    }
}

export default new UploadService();