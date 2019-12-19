import MenuComponent from './components/menu/menu';
import FilterComponent from './components/filter/filter';
import SortingComponent from './components/sorting/sorting';
import BoardComponent from './components/board/board';
import TaskListComponent from './components/task-list/task-list';
import TaskComponent from './components/task/task';
import TaskEditComponent from './components/task-edit/task-edit';
import LoadMoreButtonComponent from './components/load-more-button/load-more-button';
import {renderElement, RenderPosition} from './utils';
import {generateTasks} from './mock/task';
import {generateFilters} from './mock/filter';

const COUNT_TASKS = 20;
const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;
const START_TASK = 0;
const tasks = generateTasks(COUNT_TASKS);
let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;

const main = document.querySelector(`.main`);
const control = main.querySelector(`.main__control`);

const renderTasks = (task, place) => {
  const taskComponent = new TaskComponent(task);
  const taskEditComponent = new TaskEditComponent(task);

  const editButton = taskComponent.getElement().querySelector(`.card__btn--edit`);
  editButton.addEventListener(`click`, () => {
    place.replaceChild(taskEditComponent.getElement(), taskComponent.getElement());
  });

  const editForm = taskEditComponent.getElement().querySelector(`form`);
  editForm.addEventListener(`submit`, () => {
    place.replaceChild(taskComponent.getElement(), taskEditComponent.getElement());
  });

  renderElement(place, taskComponent.getElement(), RenderPosition.BEFOREEND);
};

const render = () => {
  renderElement(control, new MenuComponent().getElement(), RenderPosition.BEFOREEND);

  const filters = generateFilters();
  renderElement(main, new FilterComponent(filters).getElement(), RenderPosition.BEFOREEND);
  renderElement(main, new BoardComponent().getElement(), RenderPosition.BEFOREEND);

  const board = main.querySelector(`.board`);
  renderElement(board, new SortingComponent().getElement(), RenderPosition.BEFOREEND);
  renderElement(board, new TaskListComponent().getElement(), RenderPosition.BEFOREEND);

  const boardTasks = board.querySelector(`.board__tasks`);
  tasks.slice(START_TASK, showingTasksCount).forEach((task) => {
    renderTasks(task, boardTasks);
  });

  const loadMoreButton = new LoadMoreButtonComponent();
  renderElement(board, loadMoreButton.getElement(), RenderPosition.BEFOREEND);

  const loadMoreHandler = () => {
    const prevTasksCount = showingTasksCount;
    showingTasksCount += SHOWING_TASKS_COUNT_BY_BUTTON;

    tasks.slice(prevTasksCount, showingTasksCount).forEach((task) => {
      renderTasks(task, boardTasks);
    });

    if (showingTasksCount >= tasks.length) {
      loadMoreButton.getElement().remove();
      loadMoreButton.removeElement();
    }
  };

  loadMoreButton.getElement().addEventListener(`click`, loadMoreHandler);
};

render();
