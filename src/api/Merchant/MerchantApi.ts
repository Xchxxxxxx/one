import createRequest from "@/utils/request";
const { request } = createRequest();

export const MerchantApi = {
        RegisterMerchant:(dto:any)=>{
            return request.post(`/Product/RegisterMerchant`,
                dto
            )
        },
        //支付保险金
        PayDeposit:(amount:any)=>{
            return request.get(`/User/PayDeposit?price=${amount}`)
        }
    }