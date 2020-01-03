import {renderElement, replaceElement, removeElement, RenderPosition} from '../../utils/render';
import SortingComponent from '../../components/sorting/sorting';
import TaskListComponent from '../../components/task-list/task-list';
import NoTasksComponent from '../../components/no-tasks/no-tasks';
import LoadMoreButtonComponent from '../../components/load-more-button/load-more-button';
import TaskComponent from '../../components/task/task';
import TaskEditComponent from '../../components/task-edit/task-edit';

const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;
const START_TASK = 0;
let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;

const renderTasks = (task, place) => {
  const taskComponent = new TaskComponent(task);
  const taskEditComponent = new TaskEditComponent(task);

  const replaceTaskToEdit = () => {
    replaceElement(taskEditComponent, taskComponent);
  };

  const replaceEditToTask = () => {
    replaceElement(taskComponent, taskEditComponent);
  };

  const onEscDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      replaceEditToTask();

      document.removeEventListener(`keydown`, onEscDown);
    }
  };

  taskComponent.setEditButtonClickHandler(() => {
    replaceTaskToEdit();
    document.addEventListener(`keydown`, onEscDown);
  });

  taskEditComponent.setSubmitHandler(replaceEditToTask);

  renderElement(place, taskComponent.getElement(), RenderPosition.BEFOREEND);
};

export default class BoardController {
  constructor(container) {
    this._container = container;

    this._noTasks = new NoTasksComponent();
    this._sortingComponent = new SortingComponent();
    this._taskListComponent = new TaskListComponent();
    this._loadMoreButtonComponent = new LoadMoreButtonComponent();
  }

  render(tasks) {
    const container = this._container.getElement();
    const isTasksArchived = tasks.every((task) => task.isArchive);

    if (isTasksArchived) {
      renderElement(container, this._noTasks.getElement(), RenderPosition.BEFOREEND);
      return;
    }

    renderElement(container, this._sortingComponent.getElement(), RenderPosition.BEFOREEND);
    renderElement(container, this._taskListComponent.getElement(), RenderPosition.BEFOREEND);

    const boardTasks = this._taskListComponent.getElement();
    tasks.slice(START_TASK, showingTasksCount).forEach((task) => {
      renderTasks(task, boardTasks);
    });

    renderElement(container, this._loadMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);

    const loadMoreHandler = () => {
      const prevTasksCount = showingTasksCount;
      showingTasksCount += SHOWING_TASKS_COUNT_BY_BUTTON;

      tasks.slice(prevTasksCount, showingTasksCount).forEach((task) => {
        renderTasks(task, boardTasks);
      });

      if (showingTasksCount >= tasks.length) {
        removeElement(this._loadMoreButtonComponent);
      }
    };

    this._loadMoreButtonComponent.setClickHandler(loadMoreHandler);
  }
}
