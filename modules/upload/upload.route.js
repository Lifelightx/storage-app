import uploadController from "./upload.controller"

export default async function uploadRoutes(
    fastify,
    options
) {
    fastify.post("/",
        uploadController.createUpload
    );

    fastify.put("/:uploadId/parts/:partNumber",
        uploadController.uploadPart
    );

    fastify.post("/:uploadId/complete",
        uploadController.completeUpload
    );
    

}