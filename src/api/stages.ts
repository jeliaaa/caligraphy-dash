import { axiosV1 } from "../utils/axios";

export const fetchStages = async (serviceId: number) => {
    const response = await axiosV1.get(`/stage/view?serviceId=${serviceId}`);
    return response.data;
};