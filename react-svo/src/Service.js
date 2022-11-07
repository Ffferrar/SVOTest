import axios from 'axios'

const ONLY_TASK_API_URL = 'http://localhost:8080/show';
const TABLE_API_URL = 'http://localhost:8080/';
const CHANGING_WORKER_URL = 'http://localhost:8080/move'

class Service {
    getOnlyTasks(){
        return axios.get(ONLY_TASK_API_URL);
    }

    getTable(){
        return axios.get(TABLE_API_URL);
    }

    putChangeWorker(worker, taskName){
        return axios.post(CHANGING_WORKER_URL, {params: {worker, taskName}});
    }
}

export default new Service();