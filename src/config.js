const config = {
    api: {
        employees: process.env.REACT_APP_EMPLOYEES_URL
    }
};

const env = process.env.REACT_APP_ENV;

export default {
    config,
    env
};