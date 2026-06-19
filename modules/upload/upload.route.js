import uploadController from "./upload.controller.js"

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