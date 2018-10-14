var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Root = function (_React$Component) {
  _inherits(Root, _React$Component);

  function Root(props) {
    _classCallCheck(this, Root);

    var _this = _possibleConstructorReturn(this, (Root.__proto__ || Object.getPrototypeOf(Root)).call(this, props));

    _this.state = {
      text: '',
      taskcounter: 0,
      addingText: false,
      itemClicked: false,
      tasks: [{ taskText: 'ahmad', order: 0, opacity: 1, subTask: [{ text: '' }] }]
    };
    return _this;
  }

  _createClass(Root, [{
    key: 'updateState',
    value: function updateState(event) {
      this.setState({ text: event.target.value });
    }
  }, {
    key: 'clearText',
    value: function clearText() {
      this.setState({ text: '' });
    }
  }, {
    key: 'addTask',
    value: function addTask() {
      var allTask = this.state.tasks;
      var taskData = this.state.tasks[0];
      taskData.taskText = this.state.text;
      taskData.order = this.state.tasks.length;
      taskData.clicked = false;
      taskData.taskcounter = this.state.tasks.length;
      taskData.opacity = 1 / this.state.tasks.length;
      allTask.push(taskData);
      this.setState({ allTask: this.state.tasks });
      this.setState({ taskcounter: this.state.taskcounter + 1 });
      this.clearText();
    }
  }, {
    key: 'reOrder',
    value: function reOrder() {
      $("#downArrow").on('click', function (event) {});
    }
  }, {
    key: 'hideAllIcon',
    value: function hideAllIcon() {
      $('li').on('click', function (event) {
        console.log("some label clicked");
        //setState({itemClicked:this.state.itemClicked});
        //hide icones
        //display sub task
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var taskList = void 0;
      return React.createElement(
        'div',
        { className: 'root' },
        React.createElement(
          'div',
          { className: 'adding-area container-fluid' },
          React.createElement(
            'div',
            { className: 'row' },
            React.createElement('textarea', { className: 'form-control rounded-0 border border-dark text-center text-area-style shadow bg-white', value: this.state.text, onChange: this.updateState.bind(this) })
          ),
          React.createElement(
            'div',
            { className: 'row' },
            React.createElement('input', { type: 'button', className: 'buttons rounded-0 btn-outline-light text-dark btn-lg border border-dark shadow bg-white', onClick: this.addTask.bind(this), value: 'Add Task', disabled: this.state.text.length === 0 }),
            React.createElement('input', { type: 'button', className: 'buttons rounded-0 btn-outline-light text-dark btn-lg border border-dark shadow bg-white', onClick: this.clearText.bind(this), value: 'Clear', disabled: this.state.text.length === 0 })
          )
        ),
        React.createElement(
          'div',
          { className: 'display-area' },
          React.createElement(
            'ul',
            { className: 'list-group itemsList' },
            taskList = this.state.tasks.map(function (result, i) {
              i > 0;
              return React.createElement(Task, { className: 'task-item', key: i, taskcounter: _this2.state.taskcounter, taskText: result.taskText, order: i, opacity: result.opacity, subTasks: result.subTask });
            })
          )
        )
      );
    }
  }]);

  return Root;
}(React.Component);

var Task = function (_React$Component2) {
  _inherits(Task, _React$Component2);

  function Task(props) {
    _classCallCheck(this, Task);

    var _this3 = _possibleConstructorReturn(this, (Task.__proto__ || Object.getPrototypeOf(Task)).call(this, props));

    _this3.state = {
      text: _this3.props.taskText,
      order: _this3.props.order,
      subTask: _this3.props.subTask,
      opacity: _this3.props.opacity,
      taskcounter: _this3.props.taskCounter
    };
    return _this3;
  }

  _createClass(Task, [{
    key: 'displaySubTask',
    value: function displaySubTask() {
      console.log('its displaying');
      if (this.state.subTask.length > 0) {
        console.log("there is subtask");
      } else {
        console.log("there is no subtask");
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'li',
        { className: 'list-group-item list-group-item-action list-group-item list-group-item-danger rounded-0 border-0 items' },
        this.state.text,
        this.props.taskcounter != this.state.order ? React.createElement('img', { onClick: this.props.reOrder, src: 'image/downArrow.png', id: 'downArrow', className: 'image' }) : null,
        this.state.order != 0 ? React.createElement('img', { src: 'image/upArrow.png', className: 'image' }) : null,
        React.createElement('img', { src: 'image/edit.png', className: 'image' })
      );
    }
  }]);

  return Task;
}(React.Component);

var SubTask = function (_React$Component3) {
  _inherits(SubTask, _React$Component3);

  function SubTask(props) {
    _classCallCheck(this, SubTask);

    var _this4 = _possibleConstructorReturn(this, (SubTask.__proto__ || Object.getPrototypeOf(SubTask)).call(this, props));

    _this4.state = { 'text': _this4.props.text };
    return _this4;
  }

  _createClass(SubTask, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'li',
        { className: 'list-group-item list-group-item-action list-group-item list-group-item-danger rounded-0 border-0 sub-item', style: { opacity: this.props.opacity } },
        this.state.text
      );
    }
  }]);

  return SubTask;
}(React.Component);

ReactDOM.render(React.createElement(Root, null), document.getElementById('app'));