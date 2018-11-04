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
      tasks: [],
      uri: ""
    };
    myScroll = null;
    return _this;
  }

  _createClass(Root, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      // before first render
      this.requestForJson();
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      // one time after first render
      myScroll = new IScroll('#wrapper', { mouseWheel: true });
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      // whenever any component update
      myScroll.refresh();
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
          "obesity": 1,
          "subTask": [{
            "text": "hamed"
          }, {
            "text": "mohammad"
          }, {
            "text": "Abu Nabaa"
          }]
        }, {
          "taskText": "mahmoud",
          "order": 1,
          "editMode": false,
          "obesity": 1,
          "subTask": [{
            "text": "ali"
          }, {
            "text": "Abu Nabaa"
          }]
        }, {
          "taskText": "ali",
          "order": 2,
          "editMode": false,
          "obesity": 1,
          "subTask": [{
            "text": "hamed"
          }, {
            "text": "mohammad"
          }, {
            "text": "Abu Nabaa"
          }]
        }, {
          "taskText": "hamdan",
          "order": 3,
          "editMode": false,
          "obesity": 1,
          "subTask": [{
            "text": "hamed"
          }]
        }, {
          "taskText": "ibrahim",
          "order": 4,
          "editMode": false,
          "obesity": 1,
          "subTask": [{
            "text": "Abu Nabaa"
          }]
        }, {
          "taskText": "ziyad",
          "order": 5,
          "editMode": false,
          "obesity": 1,
          "subTask": [{
            "text": "Abu Nabaa"
          }]
        }, {
          "taskText": "hassan",
          "order": 6,
          "editMode": false,
          "obesity": 1,
          "subTask": [{
            "text": "Abu Nabaa"
          }]
        }, {
          "taskText": "haroun",
          "order": 7,
          "editMode": false,
          "obesity": 1,
          "subTask": [{
            "text": "Abu Nabaa"
          }]
        }, {
          "taskText": "sobhi",
          "order": 8,
          "editMode": false,
          "obesity": 1,
          "subTask": [{
            "text": "Abu Nabaa"
          }]
        }, {
          "taskText": "yasser",
          "order": 9,
          "editMode": false,
          "obesity": 1,
          "subTask": [{
            "text": "Abu Nabaa"
          }]
        }, {
          "taskText": "firas",
          "order": 10,
          "editMode": false,
          "obesity": 1,
          "subTask": [{
            "text": "Abu Nabaa"
          }]
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
          currentState.setState({ uri: data.uri });
          // load created json
          $.get(data.uri, function (data, textStatus, jqXHR) {
            if (data.status === true) {
              currentState.setState({ tasks: data.tasks });
            }
          });
        }
      });
    }
  }, {
    key: "updateJson",
    value: function updateJson() {
      var updatedObj = currentState.state.tasks;
      var data = JSON.stringify(updatedObj);
      var updatedData = JSON.stringify(updatedObj);
      $.ajax({
        url: this.state.uri,
        type: "PUT",
        data: updatedData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function success(data, textStatus, jqXHR) {
          if (data.status === true) {
            currentState.setState({ tasks: data.tasks });
          }
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
      taskData.obesity = 1 / (prevTasks.length + 1);
      prevTasks.push(taskData);
      this.setState({ tasks: prevTasks });
      this.clearText();
      currentState.updateJson();
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
      currentState.updateJson();
    }
  }, {
    key: "changeTaskOrder",
    value: function changeTaskOrder() {
      var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
      var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

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
          {
            prevTasks.map(function (result, i) {
              result.order = i;
            });
          }
          break;
      }
      prevTasks.sort(function (a, b) {
        return a.order - b.order;
      });
      currentState.setState({ tasks: prevTasks });
    }
  }, {
    key: "removeTask",
    value: function removeTask(index) {
      var prevTasks = currentState.state.tasks;
      prevTasks.splice(index, 1);
      currentState.changeTaskOrder();
      currentState.setState({ tasks: prevTasks });
      currentState.updateJson();
    }
    //handle subTask functionality

  }, {
    key: "removeSubTask",
    value: function removeSubTask(taskIndex, subTaskIndex) {
      var newTasks = currentState.state.tasks;
      var newSubTask = newTasks[taskIndex].subTask;
      newSubTask.splice(subTaskIndex, 1);
      newTasks.subTask = newSubTask;
      currentState.setState({ tasks: newTasks });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return React.createElement(
        "div",
        { className: "main-root" },
        React.createElement(
          "div",
          { className: "header" },
          React.createElement(
            "div",
            { className: "text-container" },
            React.createElement("textarea", { value: this.state.taskText, onChange: function onChange() {
                _this2.updateState(event);
              },
              className: "writing-tasks-area" })
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
          { className: "task-list-container", id: "wrapper" },
          React.createElement(
            "ul",
            { className: "list-group itemsList list-try" },
            this.state.tasks.map(function (result, i) {
              i >= 0;
              return React.createElement(Task, { key: i, index: i,
                changeTaskOrder: _this2.changeTaskOrder, removeTask: _this2.removeTask, switchToEditMode: _this2.switchingEditMode,
                updateTasks: _this2.updateTasks, removeSubTask: _this2.removeSubTask,
                taskText: result.taskText, subTask: result.subTask, editMode: result.editMode, order: result.order,
                tasksLength: _this2.state.tasks.length, taskObesity: result.obesity
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
      currentlyEditing: false,
      displaySubTask: false
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
      this.props.updateTasks(this.refs.newUpdatedTask.value, this.props.index);
      this.setState({ currentlyEditing: false });
    }
    //show-hide sub tasks

  }, {
    key: "handleSupTask",
    value: function handleSupTask() {
      this.setState({ displaySubTask: !this.state.displaySubTask });
      this.props.switchToEditMode();
    }
  }, {
    key: "removeTask",
    value: function removeTask() {
      this.props.removeTask(this.props.index);
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      backgroundColor = {
        background: "hsl(5, 75%, " + (60 + 40 / this.props.tasksLength * this.props.index) + "%)"
      };
      return React.createElement(
        "li",
        { className: "list-group-item list-group-item-action d-flex justify-content-between border-0 items",
          style: backgroundColor },
        React.createElement(
          "div",
          { className: "task-content-container" },
          this.state.currentlyEditing ? React.createElement(
            "div",
            { className: "input-group" },
            React.createElement("input", { type: "text", ref: "newUpdatedTask", defaultValue: this.props.taskText, className: "form-control" }),
            React.createElement(
              "div",
              { className: "input-group-append update-buttons-container" },
              React.createElement("input", { type: "button", value: "Update", onClick: function onClick() {
                  return _this4.updateTask();
                }, className: "btn btn-success btn-sm update" }),
              React.createElement("input", { type: "button", value: "Cancel", onClick: function onClick() {
                  return _this4.cancelUpdate();
                }, className: "btn btn-danger btn-sm cancel" })
            )
          ) : React.createElement(
            "div",
            { className: "task-content" },
            React.createElement(
              "div",
              { onClick: function onClick() {
                  return _this4.handleSupTask();
                }, className: "task-text" },
              this.props.taskText
            ),
            this.state.displaySubTask ? React.createElement(
              "ul",
              { className: "list-group itemsList subTaskList" },
              this.props.subTask.map(function (subs, i) {
                return React.createElement(SubTask, { key: i, text: subs.text, taskIndex: _this4.props.index, index: i, removeSubTask: _this4.props.removeSubTask });
              })
            ) : null
          ),
          !this.props.editMode ? React.createElement(
            "div",
            { className: "icons-container" },
            React.createElement("i", { onClick: function onClick() {
                return _this4.changeToEditMode();
              }, className: "fa fa-pencil text-primary icon" }),
            React.createElement("i", { onClick: function onClick() {
                return _this4.removeTask();
              }, className: "fa fa-times icon" }),
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

var SubTask = function (_React$Component3) {
  _inherits(SubTask, _React$Component3);

  function SubTask(props) {
    _classCallCheck(this, SubTask);

    return _possibleConstructorReturn(this, (SubTask.__proto__ || Object.getPrototypeOf(SubTask)).call(this, props));
  }

  _createClass(SubTask, [{
    key: "render",
    value: function render() {
      var _this6 = this;

      return React.createElement(
        "li",
        { className: "list-group-item list-group-item-danger sub-item d-flex justify-content-between",
          style: { backgroundColor: "rgb(232, 134, 134)" }
        },
        this.props.text,
        React.createElement("i", { onClick: function onClick() {
            return _this6.props.removeSubTask(_this6.props.taskIndex, _this6.props.index);
          }, className: "fa fa-times icon" })
      );
    }
  }]);

  return SubTask;
}(React.Component);

ReactDOM.render(React.createElement(Root, null), document.getElementById('app'));