import {AxiosInstance} from 'axios';
import {IPaginatedResponse, PaginationQuery} from '../types';

export class UsersService {

    public axiosInstance: AxiosInstance;
    public readonly basePath = '/users';

    constructor(axiosInst: AxiosInstance) {
        this.axiosInstance = axiosInst;
    }

    public create = ({email, password, role}) => {

        return this.axiosInstance
            .post(this.basePath, {email, password, role})
            .then((res) => {
                return res.data;
            });
    }

    public get = ({id}) => {
        return this.axiosInstance
            .get(`${this.basePath}/${id}`)
            .then((res) => {
                return res.data;
            });
    }

    public getAll = (req: { queryParams?: any, pagination?: PaginationQuery } = {}): Promise<IPaginatedResponse<any>> => { //TODO: make types
        return this.axiosInstance
            .get(this.basePath, {params: {...req.pagination, ...req.queryParams}})
            .then((res) => {
                return res.data;
            });
    }

    public update = (input: { id: string, email?: string, role?: string }) => {
        const {id, email, role} = input;

        return this.axiosInstance
            .put(`${this.basePath}/${id}`, {email, role})
            .then((res) => {
                return res.data;
            });
    }

    public delete = (id) => {

        return this.axiosInstance
            .delete(`${this.basePath}/${id}`)
            .then((res) => {
                return res.data;
            });

    }

    public changeMyPassword = ({oldPassword, newPassword}) => {
        return this.axiosInstance
            .post(`${this.basePath}/me/password/`, {oldPassword, newPassword})
            .then((res) => {
                return res.data;
            });
    }

    public getMe = () => {
        return this.axiosInstance
            .get(`${this.basePath}/me`)
            .then((res) => {
                return res.data;
            });
    }

}
