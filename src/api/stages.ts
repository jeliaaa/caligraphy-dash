import { axiosV1 } from "../utils/axios";

export const fetchStages = async (serviceId: number) => {
    const response = await axiosV1.get(`/stage/view?serviceId=${serviceId}`);
    return response.data;
};

export const completeStage = async (stageId: number, formdata: FormData) => {
    const response = await axiosV1.patch(`/stage/complete/${stageId}`, formdata, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

