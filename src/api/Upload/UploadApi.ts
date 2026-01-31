import createRequest from "@/utils/request";
const { uploadRequest } = createRequest();

export const UploadApi = {
  Upload:(bucket:any,file:any)=>{
   return uploadRequest.post(`/File/UploadImage/${bucket}`,
        file
   )
},
   Uploads:(bucket:any,files:any)=>{
    return uploadRequest.post(`/File/BatchUploadWithTransaction?bucket=${bucket}`,
        files
    )
   }

};