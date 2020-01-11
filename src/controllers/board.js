import {renderElement, removeElement, RenderPosition} from '../utils/render';
import TaskController from './task';
import SortingComponent, {SortType} from '../components/sorting/sorting';
import TaskListComponent from '../components/task-list/task-list';
import NoTasksComponent from '../components/no-tasks/no-tasks';
import LoadMoreButtonComponent from '../components/load-more-button/load-more-button';

const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;
const START_TASK = 0;

const renderTasks = (tasks, place, onDataChange, onViewChange) => {
  return tasks.map((task) => {
    const taskController = new TaskController(place, onDataChange, onViewChange);

    taskController.render(task);

    return taskController;
  });
};

export default class BoardController {
  constructor(container) {
    this._container = container;

    this._tasks = [];
    this._showedTaskControllers = [];
    this._showingTasksCount = SHOWING_TASKS_COUNT_ON_START;
    this._noTasks = new NoTasksComponent();
    this._sortingComponent = new SortingComponent();
    this._taskListComponent = new TaskListComponent();
    this._loadMoreButtonComponent = new LoadMoreButtonComponent();

    this._onDataChange = this._onDataChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);

    this._sortingComponent.setClickHandler(this._onSortTypeChange);
  }

  render(tasks) {
    this._tasks = tasks;

    const container = this._container.getElement();
    const isAllTasksArchived = this._tasks.every((task) => task.isArchive);

    if (isAllTasksArchived) {
      renderElement(container, this._noTasks.getElement(), RenderPosition.BEFOREEND);
      return;
    }

    renderElement(container, this._sortingComponent.getElement(), RenderPosition.BEFOREEND);
    renderElement(container, this._taskListComponent.getElement(), RenderPosition.BEFOREEND);

    const boardTasks = this._taskListComponent.getElement();
    const newTasks = renderTasks(this._tasks.slice(START_TASK, this._showingTasksCount), boardTasks, this._onDataChange, this._onViewChange);
    this._showedTaskControllers = this._showedTaskControllers.concat(newTasks);

    this._renderLoadMoreButton();
  }

  _renderLoadMoreButton() {
    if (this._showingTasksCount >= this._tasks.length) {
      return;
    }

    const container = this._container.getElement();
    renderElement(container, this._loadMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);

    this._loadMoreButtonComponent.setClickHandler(() => {

      const prevTasksCount = this._showingTasksCount;
      const taskListElement = this._taskListComponent.getElement();

      this._showingTasksCount = this._showingTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

      const newTasks = renderTasks(this._tasks.slice(prevTasksCount, this._showingTasksCount), taskListElement, this._onDataChange, this._onViewChange);
      this._showedTaskControllers = this._showedTaskControllers.concat(newTasks);

      if (this._showingTasksCount >= this._tasks.length) {
        removeElement(this._loadMoreButtonComponent);
      }
    });
  }

  _onDataChange(taskController, oldData, newData) {
    const index = this._tasks.findIndex((it) => it === oldData);

    if (index === -1) {
      return;
    }

    this._tasks = [].concat(this._tasks.slice(0, index), newData, this._tasks.slice(index + 1));

    taskController.render(this._tasks[index]);
  }

  _onViewChange() {
    this._showedTaskControllers.forEach((it) => it.setDefaultView());
  }

  _onSortTypeChange(sortType) {
    let sortedTasks = [];

    switch (sortType) {
      case SortType.DATE_UP:
        sortedTasks = this._tasks.slice().sort((prev, next) => prev.dueDate - next.dueDate);
        break;
      case SortType.DATE_DOWN:
        sortedTasks = this._tasks.slice().sort((prev, next) => next.dueDate - prev.dueDate);
        break;
      case SortType.DEFAULT:
        sortedTasks = this._tasks.slice(START_TASK, this._showingTasksCount);
        break;
    }

    const taskListElement = this._taskListComponent.getElement();

    taskListElement.innerHTML = ``;

    const newTasks = renderTasks(sortedTasks, taskListElement, this._onDataChange, this._onViewChange);
    this._showedTaskControllers = newTasks;

    if (sortType === SortType.DEFAULT) {
      this._renderLoadMoreButton();
    } else {
      removeElement(this._loadMoreButtonComponent);
    }
  }
}
