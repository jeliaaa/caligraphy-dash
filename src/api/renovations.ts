import { axiosV1 } from "../utils/axios";

export const fetchRenovations = async () => {
    const response = await axiosV1.get(`/renovation/view`);
    return response.data;
};

export const fetchRenovationsSingle = async (trackId: string) => {
    const response = await axiosV1.get(`/renovation/view/${trackId}`);
    return response.data;
};

