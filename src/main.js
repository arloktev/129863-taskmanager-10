import {createMenuTemplate} from './components/menu/menu';
import {createFilterTemplate} from './components/filter/filter';
import {createSortingTemplate} from './components/sorting/sorting';
import {createBoardTemplate} from './components/board/board';
import {createTaskListTemplate} from './components/task-list/task-list';
import {createTaskTemplate} from './components/task/task';
import {createTaskEditTemplate} from './components/task-edit/task-edit';
import {createLoadMoreButtonTemplate} from './components/load-more-button/load-more-button';

const COUNT_TASKS = 3;

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

const renderTasks = () => {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < COUNT_TASKS; i++) {
    fragment.append(convertStringToElement(createTaskTemplate()));
  }

  return fragment;
};

const render = () => {
  renderComponent(control, createMenuTemplate());
  renderComponent(main, createFilterTemplate());
  renderComponent(main, createBoardTemplate());

  const board = main.querySelector(`.board`);
  renderComponent(board, createSortingTemplate());
  renderComponent(board, createTaskListTemplate());

  const boardTasks = board.querySelector(`.board__tasks`);
  renderComponent(boardTasks, createTaskEditTemplate());

  boardTasks.append(renderTasks());
  renderComponent(board, createLoadMoreButtonTemplate());
};

render();
