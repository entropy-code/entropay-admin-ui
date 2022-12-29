import moment from "moment";
import config from "./config";

const loginUrl = config.config.api.userAuth + "/auth/login?redirectUrl=" + config.config.app.home

const authProvider = {
    login: () => {},
    
    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('expiresAt');
        localStorage.removeItem('auth');
        localStorage.removeItem('config');
        window.location.href = config.config.api.userAuth + "/auth/logout?redirectUrl=" + config.config.app.home;
        return Promise.reject()
    },

    checkAuth: () => {
        const token = localStorage.getItem('token');
        const expiresAt = localStorage.getItem('expiresAt');
        const expiredToken = moment(expiresAt).diff(moment(), 'minutes') < 0;
        if (token == null || expiresAt == null || expiredToken) {
            localStorage.removeItem('token');
            localStorage.removeItem('expiresAt');
            localStorage.removeItem('auth');
            localStorage.removeItem('config');
            window.location.href = loginUrl;    
        }

        return Promise.resolve();
        
    },

    checkError: (error) => {
        const status = error.status;
        if (status === 401 || status === 403) {
            localStorage.removeItem('token');
            window.location.href = loginUrl;
        }
        // other error code (404, 500, etc): no need to log out
        return Promise.resolve();
    },

    getIdentity: async () => {
        if (localStorage.getItem('auth')) {
            const auth = JSON.parse(localStorage.getItem('auth'))
            return Promise.resolve({
                id: auth.id,
                fullName: auth.username,
            })
        } else if (localStorage.getItem('token')) {
            const request = new Request(config.config.api.userAuth + "/auth/identity", {
                method: 'GET',
                headers: new Headers({ "Authorization": "Bearer " + localStorage.getItem('token')}),
            });
            try {
                const response = await fetch(request);
                if (response.status < 200 || response.status >= 300) {
                    throw new Error(response.statusText);
                }
                const auth = await response.json();
                localStorage.setItem('auth', JSON.stringify(auth));
                return Promise.resolve({
                    id: auth.id,
                    fullName: auth.username,
                })
                
            } catch (e) {
                throw new Error('Network error');
            }
        } else {
            return Promise.reject()
        }
    },
        
    getPermissions: async () => {
        if (localStorage.getItem('config')) {
            const config = JSON.parse(localStorage.getItem('config'))
            return Promise.resolve({
                menu: config.menu,
                permissions: config.permissions,
            })
        } else if (localStorage.getItem('token')) {
            const request = new Request(config.config.api.employees + "/config", {
                method: 'GET',
                headers: new Headers({ "Authorization": "Bearer " + localStorage.getItem('token')}),
            });
            try {
                const response = await fetch(request);
                if (response.status < 200 || response.status >= 300) {
                    throw new Error(response.statusText);
                }
                const config = await response.json();
                localStorage.setItem('config', JSON.stringify(config[0]));
                return Promise.resolve({
                    menu: config[0].menu,
                    permissions: config[0].permissions,
                })
                
            } catch (e) {
                throw new Error('Network error');
            }
        } else {
            return Promise.reject()
        }
    },
};

export default authProvider;
