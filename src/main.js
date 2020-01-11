import MenuComponent from './components/menu/menu';
import FilterComponent from './components/filter/filter';
import BoardComponent from './components/board/board';
import BoardController from './controllers/board';
import {renderElement, RenderPosition} from './utils/render';
import {generateTasks} from './mock/task';
import {generateFilters} from './mock/filter';

const COUNT_TASKS = 20;
const tasks = generateTasks(COUNT_TASKS);

const main = document.querySelector(`.main`);
const control = main.querySelector(`.main__control`);

renderElement(control, new MenuComponent().getElement(), RenderPosition.BEFOREEND);

const filters = generateFilters();
renderElement(main, new FilterComponent(filters).getElement(), RenderPosition.BEFOREEND);

const boardComponent = new BoardComponent();
renderElement(main, boardComponent.getElement(), RenderPosition.BEFOREEND);

const boardController = new BoardController(boardComponent);
boardController.render(tasks);
