const config = {
    apiEndpont: '/api/v1',
    wsEndpont: 'http://localhost:3001/',
    logoURL: '/logo.png',
};

if (process.env.NODE_ENV === 'development') {
    config.apiEndpont = 'http://localhost:3001/';
}

export default config;
