import {Inject} from 'angular2/core'; // Allows us to inject a dependency into a module that's not a component
import {Http, Headers} from 'angular2/http';
import 'rxjs/add/operator/map' // Allows us to map the HTTP response from raw to JSON format

class TodoService {
    constructor(http) {
        this.http = http; // http is an instance of the main Http class
    }
    getAllTodos() {
        return this.http.get('/todos')
            .map((res) => {
                return JSON.parse(res._body);
            });
    }
    postNewTodo(data) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json'); // Set JSON header so that data is parsed by bodyParser on the backend
        return this.http.post('/todos', JSON.stringify(data), {
            headers: headers
        }).map((res) => {
            return JSON.parse(res._body);
        });
    }
    deleteTodo(id) {
        return this.http.delete('/todos/' + id)
            .map((res) => {
                return JSON.parse(res._body);
            });
    }
}

// Declares that Http should be injected each time a new instance of TodoService is created
TodoService.parameters = [new Inject(Http)];

export {TodoService}