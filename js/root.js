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
      var obj = {
        "status": true,
        "tasks": [{
          "taskText": "ahmad",
          "order": 0,
          "opacity": 1,
          "currentlyEditing": "false",
          "editMode": "false",
          "subTask": [{
            "text": ""
          }]
        }, {
          "taskText": "mahmoud",
          "order": 1,
          "currentlyEditing": "false",
          "editMode": "false",
          "opacity": .5,
          "subTask": [{
            "text": ""
          }]
        }, {
          "taskText": "hamdan",
          "currentlyEditing": "false",
          "editMode": "false",
          "order": 2,
          "opacity": .33,
          "subTask": [{
            "text": ""
          }]
        }]
      };
      currentState = this;
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
  }, {
    key: "onEditMode",
    value: function onEditMode(text, taskOrder) {}
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
    key: "changeState",
    value: function changeState(newText) {

      console.log(newText);
    }
  }, {
    key: "addTask",
    value: function addTask() {
      prevTasks = currentState.state.tasks;
      //create a new task node currentlyEditing:"false" editMode:"false" opacity: 1 order:0 subTask: Array[1] taskText: "ahmad"
      var taskData = { text: "", order: 0, subTask: [], currentlyEditing: false, editMode: false };
      taskData.taskText = this.state.taskText;
      taskData.order = this.state.tasks.length;
      taskData.taskcounter = this.state.tasks.length;

      prevTasks.push(taskData);
      this.setState({ tasks: prevTasks });
      this.clearText();
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
              return React.createElement(Task, { editeProcess: _this2.onEditMode, changeState: _this2.changeState, taskText: result.taskText, key: i, editMode: false, currentlyEditing: false, subTask: result.subTask, order: result.order });
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
      currentlyEditing: _this3.props.currentlyEditing,
      editMode: _this3.props.editMode,
      subTask: _this3.props.subTask,
      order: _this3.props.order
    };
    _this3.oldstate = _this3.state.text;
    return _this3;
  }

  _createClass(Task, [{
    key: "startEditing",
    value: function startEditing() {
      console.log("holla");
      this.setState({ currentlyEditing: true, editMode: true });
      this.props.editeProcess(this.state.text, this.state.order);
    }
  }, {
    key: "updateState",
    value: function updateState(event) {
      this.setState({ text: event.target.value });
    }
  }, {
    key: "cancelingUpdates",
    value: function cancelingUpdates() {
      this.setState({ text: this.props.taskText });
      this.setState({ currentlyEditing: false, editMode: false });
    }
  }, {
    key: "updateStateHandler",
    value: function updateStateHandler() {
      this.setState({ currentlyEditing: false, editMode: false });
      this.props.changeState(this.state.text);
      //call function from parent to handle
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
            React.createElement("input", { type: "text", value: this.state.text, onChange: function onChange() {
                _this4.updateState(event);
              }, className: "form-control" }),
            React.createElement(
              "div",
              { className: "input-group-append" },
              React.createElement("input", { type: "button", value: "Update", onClick: function onClick() {
                  _this4.updateStateHandler();
                }, className: "btn btn-success btn-sm cancel" }),
              React.createElement("input", { type: "button", value: "Cancel", onClick: function onClick() {
                  _this4.cancelingUpdates();
                }, className: "btn btn-danger btn-sm update" })
            )
          ) : React.createElement(
            "div",
            { className: "task-content" },
            this.state.text
          ),
          !this.state.editMode ? React.createElement(
            "div",
            { className: "icons-container" },
            React.createElement("i", { className: "fa fa-pencil text-primary icon", onClick: function onClick() {
                return _this4.startEditing();
              } }),
            React.createElement("i", { className: "fa fa-long-arrow-up text-success icon" }),
            React.createElement("i", { className: "fa fa-long-arrow-down text-danger icon" })
          ) : null
        )
      );
    }
  }]);

  return Task;
}(React.Component);

ReactDOM.render(React.createElement(Root, null), document.getElementById('app'));