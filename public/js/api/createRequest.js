/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest();

    const { url, data, method = 'GET', callback } = options;

    xhr.responseType = 'json';
    
    xhr.onload = () => {
        if(xhr.status >= 200 && xhr.status <= 300) {
            callback(null, xhr.response);
        } else {
            const error = new Error(`Ошибка ${xhr.status}: ${xhr.statusText}`); 
            callback(error);           
        }
    };

    if(method === 'GET' && data) {
        const queryParams = Object.keys(data)
            .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
            .join('&');
        xhr.open(method, `${url}?${queryParams}`);
        xhr.send();
    } else {
        const formData = new FormData();
        if(data) {
            Object.keys(data).forEach(key => {
                formData.append(key, data[key]);
            });
        }
        xhr.open(method, url);
        xhr.send(formData);
    }
};

class User {
    static URL = '/user';
    
    setCurrent(user) {
        localStorage.setItem('user', user);
    }

    current() {
        const userStr = localStorage.getItem('user');
        return userStr? userStr : undefined;
    }

    unsetCurrent() {
        localStorage.removeItem('user');
    }

    fetch(callback) {
        createRequest({
            url: `${this.URL}/current`,
            method: 'GET',
            
        });
    }
}
