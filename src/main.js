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
const tasks = generateTasks(COUNT_TASKS);
let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;

const main = document.querySelector(`.main`);
const control = main.querySelector(`.main__control`);

const renderComponent = (container, template, place = `beforeend`) => {
  return container.insertAdjacentHTML(place, template);
};

const convertStringToElement = (str) => {
  const template = document.createElement(`template`);
  template.innerHTML = str.trim();
  return template.content.firstChild;
};

const renderTasks = (startTask) => {
  const fragment = document.createDocumentFragment();

  tasks.slice(startTask, showingTasksCount).forEach((task) => {
    fragment.append(convertStringToElement(createTaskTemplate(task)));
  });

  return fragment;
};

const createFragments = (...elements) => {
  const fragment = document.createDocumentFragment();

  elements.forEach((element) => {
    fragment.append(convertStringToElement(element));
  });

  return fragment;
};

const render = () => {
  renderComponent(control, createMenuTemplate());

  const filters = generateFilters();

  main.append(createFragments(createFilterTemplate(filters), createBoardTemplate()));

  const board = main.querySelector(`.board`);
  board.append(createFragments(createSortingTemplate(), createTaskListTemplate()));

  const boardTasks = board.querySelector(`.board__tasks`);

  renderComponent(boardTasks, createTaskEditTemplate(tasks[0]));

  boardTasks.append(renderTasks(1));

  renderComponent(board, createLoadMoreButtonTemplate());

  const loadMoreButton = board.querySelector(`.load-more`);

  loadMoreButton.addEventListener(`click`, () => {
    const prevTasksCount = showingTasksCount;
    showingTasksCount += SHOWING_TASKS_COUNT_BY_BUTTON;

    boardTasks.append(renderTasks(prevTasksCount));

    if (showingTasksCount >= tasks.length) {
      loadMoreButton.remove();
    }
  });
};

render();
