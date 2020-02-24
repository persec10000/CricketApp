import * as axios from 'axios';

class API {
    baseUrl: string;

    constructor() {
        this.baseUrl = 'http://localhost/cricketpro/mobile/api/index.php';
    }

    sendRequest = async data => {
        try {
            let formData = new FormData();
            for (var key in data) {
                formData.append(key, data[key]);
            }
            const response = await axios.post(this.baseUrl, formData);
            return response.data;
        } catch (error) {
            return error;
        }
    };
}

export default new API();
