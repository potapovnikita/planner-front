import settings from '../conf/settings.json';
import api from '../conf/api.json';

class Http {
    constructor() {
        this.request = new XMLHttpRequest();
    }

    get(URL) {
        return new Promise((resolve, reject) => {
            let err = {};
            let res = {};

            this.request.open('GET', URL, true);
            this.request.setRequestHeader(settings.auth.headerName, localStorage.getItem(settings.auth.tokenKey) || null);
            this.request.send();
            this.request.onreadystatechange = () => {
                if (this.request.status == 0 || this.request.status >= 400) {
                    err.status = this.request.status;
                    err.message = this.request.responseText;
                    return reject(err);
                }

                if (this.request.readyState == 4) {
                    res.status = this.request.status;
                    res.data = JSON.parse(this.request.response);
                    res.message = this.request.responseText;
                    resolve(res);
                }
            }
        });
    }
}

const http = new Http();

const __public = (settings, api) => {
    require.ensure([], function(require) {
        require('./_apps_/public/')(settings, api);
        angular.bootstrap(document, ['app']);
    });
}

const __root = (settings, api, user) => {
    require.ensure([], function(require) {
        require('./_apps_/root')(settings, api, user);
        angular.bootstrap(document, ['app']);
    });
}

http.get(settings.backend + api.auth.check).then((res) => {
    __root(settings, api, res.data);
}, (err) => {
    __public(settings, api);
});

