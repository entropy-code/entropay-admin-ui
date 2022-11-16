let env = process.env.REACT_APP_ENV;
let config = {}

if (env === 'local') {
    // get from .env.local
    config = {
        api: {
            employees: process.env.REACT_APP_EMPLOYEES_URL,
            userAuth: process.env.REACT_APP_USER_AUTH_URL
        },
        app:{
            home: process.env.REACT_APP_HOME
        }
    }
} else {
    // get from docker env
    config = {
        api: {
            employees: window._env_.REACT_APP_EMPLOYEES_URL,
            userAuth: window._env_.REACT_APP_USER_AUTH_URL
        },
        app:{
            home: window._env_.REACT_APP_USER_AUTH_URL
        }
    }
    env = window._env_.REACT_APP_ENV
}

export default {
    config,
    env
};
