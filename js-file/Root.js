var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Root = function (_React$Component) {
  _inherits(Root, _React$Component);

  function Root(props) {
    _classCallCheck(this, Root);

    var _this = _possibleConstructorReturn(this, (Root.__proto__ || Object.getPrototypeOf(Root)).call(this, props));

    _this.state = { text: '', addingText: false, tasks: [{ text: '', order: '', subTask: [], clicked: false }] };
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
    key: 'addText',
    value: function addText() {
      console.log("enter add text");
      var taskData = this.state.tasks[0];
      taskData.text = this.state.text;
      taskData.order = this.state.tasks.length;
      taskData.clicked = false;

      //let data="text:"+task+",order:"+order+",clicked:false";
      console.log(taskData);
      this.state.tasks.push(taskData);
      this.clearText();
    }
  }, {
    key: 'mappingTask',
    value: function mappingTask() {
      //let details=this.state.tasks;
      var textList = this.state.tasks.map(function (i) {
        console.log(i);
      });
    }
  }, {
    key: 'render',
    value: function render() {

      var taskList = this.state.tasks.map(function (i) {
        return React.createElement(Task, { text: i.text });
      });
      console.log(taskList);
      return React.createElement(
        'div',
        { className: 'root' },
        React.createElement(
          'div',
          { className: 'container-fluid' },
          React.createElement(
            'div',
            { className: 'row' },
            React.createElement('textarea', { className: 'form-control rounded-0 border border-dark text-center', value: this.state.text, onChange: this.updateState.bind(this) })
          ),
          React.createElement(
            'div',
            { className: 'row' },
            React.createElement('input', { type: 'button', className: 'button-size rounded-0 btn-outline-light text-dark btn-lg border border-dark', onClick: this.addText.bind(this), value: 'Add Task', disabled: this.state.text.length === 0 }),
            React.createElement('input', { type: 'button', className: 'button-size rounded-0 btn-outline-light text-dark btn-lg border border-dark', onClick: this.clearText.bind(this), value: 'Clear', disabled: this.state.text.length === 0 })
          )
        ),
        React.createElement(
          'div',
          { className: 'display-area' },
          React.createElement(
            'ul',
            { className: 'list-group' },
            taskList
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

    var _this2 = _possibleConstructorReturn(this, (Task.__proto__ || Object.getPrototypeOf(Task)).call(this, props));

    _this2.state = { 'text': props.text };
    return _this2;
  }

  _createClass(Task, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'li',
        { className: 'list-group-item' },
        this.state.text
      );
    }
  }]);

  return Task;
}(React.Component);

ReactDOM.render(React.createElement(Root, null), document.getElementById('app'));