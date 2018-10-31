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
      taskText: "",
      tasks: []
    };
    return _this;
  }

  _createClass(Root, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      this.requestForJson();
    }
  }, {
    key: "requestForJson",
    value: function requestForJson() {
      currentState = this;
      var obj = {
        "status": true,
        "tasks": [{
          "taskText": "ahmad",
          "order": 0,
          "editMode": false,
          "subTask": [{
            "text": "hamed"
          }]
        }, {
          "taskText": "mahmoud",
          "order": 1,
          "editMode": false,
          "subTask": []
        }, {
          "taskText": "hamdan",
          "editMode": false,
          "order": 2,
          "subTask": []
        }]
      };
      var data = JSON.stringify(obj);
      $.ajax({
        url: "https://api.myjson.com/bins",
        type: "POST",
        data: data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function success(data, textStatus, jqXHR) {
          // load created json
          $.get(data.uri, function (data, textStatus, jqXHR) {
            if (data.status === true) {
              currentState.setState({ tasks: data.tasks });
            }
          });
        }
      });
    }
    //header functionality

  }, {
    key: "updateState",
    value: function updateState(event) {
      this.setState({ taskText: event.target.value });
    }
  }, {
    key: "clearText",
    value: function clearText() {
      this.setState({ taskText: "" });
    }
  }, {
    key: "addTask",
    value: function addTask() {
      prevTasks = currentState.state.tasks;

      var taskData = { subTask: [], editMode: false };
      taskData.taskText = this.state.taskText;
      taskData.order = this.state.tasks.length;

      prevTasks.push(taskData);
      this.setState({ tasks: prevTasks });
      this.clearText();
    }
    // handling child functionality

  }, {
    key: "switchingEditMode",
    value: function switchingEditMode() {
      var prevTasks = currentState.state.tasks;
      prevTasks.map(function (task, i) {
        task.editMode = !task.editMode;
      });
      currentState.setState({ tasks: prevTasks });
    }
  }, {
    key: "updateTasks",
    value: function updateTasks(newTaskText, index) {
      currentState.switchingEditMode();
      var prevTasks = currentState.state.tasks;
      prevTasks[index].taskText = newTaskText;
      currentState.setState({ tasks: prevTasks });
      currentState.changeTaskOrder();
    }
  }, {
    key: "changeTaskOrder",
    value: function changeTaskOrder(type, index) {
      var prevTasks = currentState.state.tasks;
      switch (type) {
        case 'up':
          {
            prevTasks[index].order -= 1;
            prevTasks[index - 1].order += 1;
            break;
          }
        case 'down':
          {
            prevTasks[index].order += 1;
            prevTasks[index + 1].order -= 1;
            break;
          }
        default:
          break;
      }
      prevTasks.sort(function (a, b) {
        return a.order - b.order;
      });
      currentState.setState({ tasks: prevTasks });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return React.createElement(
        "div",
        { className: "main-root container-fluid" },
        React.createElement(
          "div",
          { className: "header-container" },
          React.createElement(
            "div",
            { className: "text-container" },
            React.createElement("textarea", { value: this.state.taskText, onChange: function onChange() {
                _this2.updateState(event);
              }, className: "border border-dark shadow bg-white writing-tasks-area" })
          ),
          React.createElement(
            "div",
            { className: "buttons-container" },
            React.createElement("input", { type: "button", value: "Add Task", onClick: function onClick() {
                return _this2.addTask();
              }, className: "btn btn-outline-dark buttons", disabled: this.state.taskText.length === 0 }),
            React.createElement("input", { type: "button", value: "Clear", onClick: function onClick() {
                _this2.clearText();
              }, className: "btn btn-outline-dark buttons", disabled: this.state.taskText.length === 0 })
          )
        ),
        React.createElement(
          "div",
          { className: "tasks-container" },
          React.createElement(
            "ul",
            { className: "list-group itemsList" },
            this.state.tasks.map(function (result, i) {
              i >= 0;
              return React.createElement(Task, { key: i, index: i,
                changeTaskOrder: _this2.changeTaskOrder, switchToEditMode: _this2.switchingEditMode, updateTasks: _this2.updateTasks,
                taskText: result.taskText, subTask: result.subTask, editMode: result.editMode, order: result.order,
                tasksLength: _this2.state.tasks.length
              });
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
      currentlyEditing: false
    };
    return _this3;
  }
  // icons functionality 


  _createClass(Task, [{
    key: "changeToEditMode",
    value: function changeToEditMode() {
      this.setState({ currentlyEditing: true });
      this.props.switchToEditMode();
    }
  }, {
    key: "moveTaskUp",
    value: function moveTaskUp() {
      this.props.changeTaskOrder('up', this.props.order);
    }
  }, {
    key: "moveTaskDown",
    value: function moveTaskDown() {
      this.props.changeTaskOrder('down', this.props.order);
    }
    //inline updating Tasks

  }, {
    key: "cancelUpdate",
    value: function cancelUpdate() {
      this.props.switchToEditMode();
      this.setState({ currentlyEditing: false });
    }
  }, {
    key: "updateTask",
    value: function updateTask() {
      console.log("enter child update");
      this.props.updateTasks(this.refs.newUpdatedTask.value, this.props.index);
      this.setState({ currentlyEditing: false });
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      return React.createElement(
        "li",
        { className: "list-group-item list-group-item-action list-group-item-danger d-flex justify-content-between border-0 items" },
        React.createElement(
          "div",
          { className: "task-content-container" },
          this.state.currentlyEditing ? React.createElement(
            "div",
            { className: "input-group" },
            React.createElement("input", { type: "text", ref: "newUpdatedTask", defaultValue: this.props.taskText, className: "form-control" }),
            React.createElement(
              "div",
              { className: "input-group-append" },
              React.createElement("input", { type: "button", value: "Update", onClick: function onClick() {
                  return _this4.updateTask();
                }, className: "btn btn-success btn-sm cancel" }),
              React.createElement("input", { type: "button", value: "Cancel", onClick: function onClick() {
                  return _this4.cancelUpdate();
                }, className: "btn btn-danger btn-sm update" })
            )
          ) : React.createElement(
            "div",
            { className: "task-content" },
            this.props.taskText
          ),
          !this.props.editMode ? React.createElement(
            "div",
            { className: "icons-container" },
            React.createElement("i", { onClick: function onClick() {
                return _this4.changeToEditMode();
              }, className: "fa fa-pencil text-primary icon" }),
            this.props.order != 0 ? React.createElement("i", { onClick: function onClick() {
                return _this4.moveTaskUp();
              }, className: "fa fa-long-arrow-up text-success icon" }) : null,
            this.props.order != this.props.tasksLength - 1 ? React.createElement("i", { onClick: function onClick() {
                return _this4.moveTaskDown();
              }, className: "fa fa-long-arrow-down text-danger icon" }) : null
          ) : null
        )
      );
    }
  }]);

  return Task;
}(React.Component);

ReactDOM.render(React.createElement(Root, null), document.getElementById('app'));