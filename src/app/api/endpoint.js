const baseUrl = 'https://api-abdii.herokuapp.com/api/v1'

const endpoint = {
    auth: {
        register: baseUrl + '/auth/register',
        login: baseUrl + '/auth/login',
    },
    user: {
        root: baseUrl + '/user',
        me: baseUrl + '/user/me'
    },
    patients: {
        root: baseUrl + '/patients',
    },
    checkUpHistories: {
        root: baseUrl + '/check-up-histories',
    },
}

export default endpoint