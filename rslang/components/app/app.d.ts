import View from '../view/view';
import Model from '../model/model';
declare class App {
    view: View;
    model: Model;
    state: string;
    game: string;
    name: string;
    token: string;
    constructor();
    start(): void;
    changeCurrentPage(): void;
    route(ev: Event): void;
    testAPI(command: string): void;
    assignListeners(): void;
    assignTextBookListeners(): void;
    login(): void;
    register(): void;
}
export default App;
