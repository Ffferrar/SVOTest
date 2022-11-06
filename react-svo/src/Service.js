import axios from 'axios'

const ONLY_TASK_API_URL = 'http://localhost:8080/show';
const TABLE_API_URL = 'http://localhost:8080/';

class Service {
    getOnlyTasks(){
        return axios.get(ONLY_TASK_API_URL);
    }
    getTable(){
        return axios.get(TABLE_API_URL);
    }
}

export default new Service();