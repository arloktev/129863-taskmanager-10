import {createMenuTemplate} from './components/menu/menu';
import {createFilterTemplate} from './components/filter/filter';
import {createSortingTemplate} from './components/sorting/sorting';
import {createBoardTemplate} from './components/board/board';
import {createTaskListTemplate} from './components/task-list/task-list';
import {createTaskTemplate} from './components/task/task';
import {createTaskEditTemplate} from './components/task-edit/task-edit';
import {createLoadMoreButtonTemplate} from './components/load-more-button/load-more-button';
import {generateTasks} from './mock/task';
import {generateFilters} from './mock/filter';

const COUNT_TASKS = 20;
const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

const main = document.querySelector(`.main`);
const control = main.querySelector(`.main__control`);

const renderComponent = (container, template, place = `beforeend`) => {
  return container.insertAdjacentHTML(place, template);
};

const render = () => {
  renderComponent(control, createMenuTemplate());

  const filters = generateFilters();

  renderComponent(main, createFilterTemplate(filters));
  renderComponent(main, createBoardTemplate());

  const board = main.querySelector(`.board`);
  renderComponent(board, createSortingTemplate());
  renderComponent(board, createTaskListTemplate());

  const boardTasks = board.querySelector(`.board__tasks`);
  const tasks = generateTasks(COUNT_TASKS);

  renderComponent(boardTasks, createTaskEditTemplate(tasks[0]));
  let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;
  tasks.slice(1, showingTasksCount).forEach((task) => renderComponent(boardTasks, createTaskTemplate(task)));
  renderComponent(board, createLoadMoreButtonTemplate());

  const loadMoreButton = board.querySelector(`.load-more`);

  loadMoreButton.addEventListener(`click`, () => {
    const prevTasksCount = showingTasksCount;
    showingTasksCount += SHOWING_TASKS_COUNT_BY_BUTTON;

    tasks.slice(prevTasksCount, showingTasksCount)
      .forEach((task) => renderComponent(boardTasks, createTaskTemplate(task)));

    if (showingTasksCount >= tasks.length) {
      loadMoreButton.remove();
    }
  });
};

render();
