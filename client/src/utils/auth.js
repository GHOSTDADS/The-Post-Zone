import decode from 'jwt-decode';

class AuthService {
    // check if there is a token and if it is expired. returns true or false
    loggedIn() {
        const token = this.getToken();
        return token && !this.isTokenExpired(token) ? true : false;
    }

    //check to see if token is expired, removes from LS if so, returns true/false.
    isTokenExpired(token) {
        const decoded = decode(token);
        if (decoded.exp < Date.now() / 1000) {
            localStorage.removeItem('id_token');
            return true;
        }
        return false;
    }

    //gets token from LS
    getToken() {
        return localStorage.getItem('id_token');
    }

    //sets the token to LS changes url to feed
    login(idToken) {
        localStorage.setItem('id_token', idToken);
        window.location.assign('/feed');
    }

    //removes token from LS, reloads page
    logout() {
        localStorage.removeItem('id_token');
        window.location.assign('/');
    }
}

export default new AuthService();