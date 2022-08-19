let env = process.env.REACT_APP_ENV;
let config = {}

if (env === 'local') {
    // get from local.env
    config = {
        api: {
            employees: process.env.REACT_APP_EMPLOYEES_URL
        }
    }
} else {
    // get from docker env
    config = {
        api: {
            employees: window._env_.REACT_APP_EMPLOYEES_URL
        }
    }
    env = window._env_.REACT_APP_ENV
}

export default {
    config,
    env
};
