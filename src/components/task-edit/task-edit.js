import {Colors, MonthNames} from '../../const';
import {formatTime} from '../../utils.js';

const createTagsTemplate = (tags) => {
  return tags
    .map((tag) => {
      return `
        <span class="card__hashtag-inner">
          <input
            type="hidden"
            name="hashtag"
            value="repeat"
            class="card__hashtag-hidden-input"
          />
          <p class="card__hashtag-name">
            #${tag}
          </p>
          <button type="button" class="card__hashtag-delete">
            delete
          </button>
        </span>
      `;
    })
    .join(`\n`);
};

const createColorsTemplate = (colors, currentColor) => {
  return colors
    .map((color) => {
      return `
        <input
          type="radio"
          id="color-${color}-4"
          class="card__color-input card__color-input--${color} visually-hidden"
          name="color"
          value="${color}"
          ${color === currentColor ? `checked` : ``}
        />
        <label
          for="color-${color}-4"
          class="card__color card__color--${color}"
          >${color}</label
        >
      `;
    })
    .join(`\n`);
};

export const createTaskEditTemplate = (task) => {
  const {description, dueDate, tags, color} = task;

  const isDateShowing = !!dueDate;

  const date = isDateShowing ? `${dueDate.getDate()} ${MonthNames[dueDate.getMonth()]}` : ``;
  const time = isDateShowing ? `${formatTime(dueDate)}` : ``;

  const tagsMarkup = createTagsTemplate(Array.from(tags));
  const colorsMarkup = createColorsTemplate(Colors, color);

  return `
    <article class="card card--edit card--${color} card--repeat">
      <form class="card__form" method="get">
        <div class="card__inner">
          <div class="card__color-bar">
            <svg class="card__color-bar-wave" width="100%" height="10">
              <use xlink:href="#wave"></use>
            </svg>
          </div>

          <div class="card__textarea-wrap">
            <label>
              <textarea
                class="card__text"
                placeholder="Start typing your text here..."
                name="text"
              >${description}</textarea>
            </label>
          </div>

          <div class="card__settings">
            <div class="card__details">
              <div class="card__dates">
                <button class="card__date-deadline-toggle" type="button">
                  date: <span class="card__date-status">yes</span>
                </button>

                <fieldset class="card__date-deadline">
                  <label class="card__input-deadline-wrap">
                    <input
                      class="card__date"
                      type="text"
                      placeholder=""
                      name="date"
                      value="${date} ${time}"
                    />
                  </label>
                </fieldset>

                <button class="card__repeat-toggle" type="button">
                  repeat:<span class="card__repeat-status">yes</span>
                </button>

                <fieldset class="card__repeat-days">
                  <div class="card__repeat-days-inner">
                    <input
                      class="visually-hidden card__repeat-day-input"
                      type="checkbox"
                      id="repeat-mo-4"
                      name="repeat"
                      value="mo"
                    />
                    <label class="card__repeat-day" for="repeat-mo-4"
                      >mo</label
                    >
                    <input
                      class="visually-hidden card__repeat-day-input"
                      type="checkbox"
                      id="repeat-tu-4"
                      name="repeat"
                      value="tu"
                      checked
                    />
                    <label class="card__repeat-day" for="repeat-tu-4"
                      >tu</label
                    >
                    <input
                      class="visually-hidden card__repeat-day-input"
                      type="checkbox"
                      id="repeat-we-4"
                      name="repeat"
                      value="we"
                    />
                    <label class="card__repeat-day" for="repeat-we-4"
                      >we</label
                    >
                    <input
                      class="visually-hidden card__repeat-day-input"
                      type="checkbox"
                      id="repeat-th-4"
                      name="repeat"
                      value="th"
                    />
                    <label class="card__repeat-day" for="repeat-th-4"
                      >th</label
                    >
                    <input
                      class="visually-hidden card__repeat-day-input"
                      type="checkbox"
                      id="repeat-fr-4"
                      name="repeat"
                      value="fr"
                      checked
                    />
                    <label class="card__repeat-day" for="repeat-fr-4"
                      >fr</label
                    >
                    <input
                      class="visually-hidden card__repeat-day-input"
                      type="checkbox"
                      name="repeat"
                      value="sa"
                      id="repeat-sa-4"
                    />
                    <label class="card__repeat-day" for="repeat-sa-4"
                      >sa</label
                    >
                    <input
                      class="visually-hidden card__repeat-day-input"
                      type="checkbox"
                      id="repeat-su-4"
                      name="repeat"
                      value="su"
                      checked
                    />
                    <label class="card__repeat-day" for="repeat-su-4"
                      >su</label
                    >
                  </div>
                </fieldset>
              </div>

              <div class="card__hashtag">
                <div class="card__hashtag-list">
                  ${tagsMarkup}
                </div>

                <label>
                  <input
                    type="text"
                    class="card__hashtag-input"
                    name="hashtag-input"
                    placeholder="Type new hashtag here"
                  />
                </label>
              </div>
            </div>

            <div class="card__colors-inner">
              <h3 class="card__colors-title">Color</h3>
              <div class="card__colors-wrap">
                ${colorsMarkup}
              </div>
            </div>
          </div>

          <div class="card__status-btns">
            <button class="card__save" type="submit">save</button>
            <button class="card__delete" type="button">delete</button>
          </div>
        </div>
      </form>
    </article>
  `;
};
