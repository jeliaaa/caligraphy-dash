import { axiosV3 } from "../utils/axios";


export const supervisorLogin = async (login: string, password: string) => {
    const response = await axiosV3.post(`/supervisor/login`, { login, password });
    return response.data;
};

export const supervisorProfile = async () => {
    const response = await axiosV3.get(`/supervisor/profile`);
    return response.data;
};

export const supervisorLogout = async () => {
    const response = await axiosV3.post(`/supervisor/logout`);
    return response.data;
};