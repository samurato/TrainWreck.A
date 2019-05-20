import {AxiosInstance} from 'axios';

export class AuthService {
    public axiosInstance: AxiosInstance;

    constructor(axios: AxiosInstance) {
        this.axiosInstance = axios;
        this.login = this.login.bind(this);
        this.getProfile = this.getProfile.bind(this);

        this.setAuthHeader();
    }

    public setAuthHeader = () => {
        if (this.loggedIn()) {
            this.axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + this.getToken();
        } else {
            this.axiosInstance.defaults.headers.common['Authorization'] = undefined;
        }
    }

    public passwordForgot = async (email: string) => {
        await this.axiosInstance.post(`/auth/password-forgot`, {email});
    }

    public passwordReset = async (passwordResetToken: string, password: string) => {
        const res = await this.axiosInstance.post(`/auth/password-reset`, {token: passwordResetToken, password});
        const {token} = res.data;
        if (token) {
            this.setToken(token);
            // get me
            const me = await this.fetchMe();
            this.setProfile(me);
        }
        return res.data;
    }

    public login = async (email, password): Promise<any> => {
        // Get a token
        const res = await this.axiosInstance.post(`/auth/login`, {email, password});
        this.setToken(res.data.token);
        return res;
    }

    public extend = async (): Promise<any> => {
        // Get a token
        const res = await this.axiosInstance.post(`/auth/extend`);
        this.setToken(res.data.token);
        return res;
    }

    public fetchMe = async (): Promise<any> => {
        return this.axiosInstance
            .get(`/users/me`)
            .then((res) => {
                return res.data;
            });
    }

    public loggedIn = () => {
        // Checks if there is a saved token and it's still valid
        const token = this.getToken();
        if (token) {
            if (this.isTokenValid(token)) {
                return true;
            }
        }
        return false;
    }

    public isTokenValid = (token) => {
        if (token) {
            const payload = token.split('.')[1];
            if (payload) {
                const decoded: any = JSON.parse(atob(payload));
                if (Date.now() / 1000 < decoded.exp) {
                    return true;
                }
            }
        }
        return false;
    }

    public setProfile = (profile) => {
        // Saves profile data to localStorage
        localStorage.setItem('profile', JSON.stringify(profile));
    }

    public getProfile = async () => {
        // Retrieves the profile data from localStorage
        const profile = localStorage.getItem('profile');
        return profile ? JSON.parse(profile) : {};
    }

    public setToken = (idToken) => {
        // Saves user token to localStorage
        localStorage.setItem('id_token', idToken);
        this.setAuthHeader();
    }

    public getToken = () => {
        // Retrieves the user token from localStorage
        return localStorage.getItem('id_token');
    }

    public logout = async () => {
        // Clear user token and profile data from localStorage
        localStorage.removeItem('id_token');
        localStorage.removeItem('profile');
        this.setAuthHeader();
        return true;
    }
}
