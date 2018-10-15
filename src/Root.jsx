'use strict';
class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      "uri": "",
      "text": "",
      "taskcounter": 2,
      "addingText": false,
      "itemClicked": false,
      "displayIcon": true,
      "tasks": [
        {
          "taskText": "ahma",
          "order": 0,
          "opacity": 1,
          "subTask": [
            {
              "text": ""
            }
          ]
        }
      ],
      "test": "its testing for the apis"
    };
  }
  componentDidMount() {
    this.requestForJson();
  }  
  updateJson() {
    var updatedObj = this.state.tasks;
    var data = JSON.stringify(updatedObj);
    var updatedData = JSON.stringify(updatedObj);
    $.ajax({
          url: this.state.uri,
          type: "PUT",
          data: updatedData,
          contentType: "application/json; charset=utf-8",
          dataType: "json",
          success: function (data, textStatus, jqXHR) {
            if(data.status === true ){
              myObject.setState({test: 'its updated json correctly'});
            }
                }
          });
  }
  requestForJson() {
    myObject = this;
    var obj = {
      "status": true,
      "tasks": [
        {
          "taskText": "ahmad",
          "order": 0,
          "opacity": 1,
          "subTask": [
            {
              "text": ""
            }
          ]
        },
        {
          "taskText": "mahmoud",
          "order": 1,
          "opacity": .5,
          "subTask": [
            {
              "text": ""
            }
          ]
        },
        {
          "taskText": "hamdan",
          "order": 2,
          "opacity": .33,
          "subTask": [
            {
              "text": ""
            }
          ]
        }
      ]
    }
    var data = JSON.stringify(obj);
    $.ajax({
      url: "https://api.myjson.com/bins",
      type: "POST",
      data: data,
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function (data, textStatus, jqXHR) {
          // load created json
          myObject.setState({uri : data.uri});          
          $.get(data.uri, function (data, textStatus, jqXHR) {
            if(data.status === true ){
              myObject.setState({test: "it worked" , tasks: data.tasks});
            }
          });
          }
  });
  }
  updateState(event) {
    this.setState({text : event.target.value});
  }
  clearText() {
    this.setState({text : ""})
  }
  addTask() {
    prevTasks = myObject.state.tasks;
    //create a new task node 
    let taskData = {taskText:"" , order: 0 , opacity: 1 , subTask:[{text:""}]};
    taskData.taskText = this.state.text;
    taskData.order = this.state.tasks.length;
    taskData.clicked = false;
    taskData.taskcounter = this.state.tasks.length;
    taskData.opacity = 1/(this.state.tasks.length+1);
    prevTasks.push(taskData);
    this.setState({tasks: prevTasks , taskcounter: this.state.taskcounter+1});
    this.clearText();
    this.updateJson();
  }
  hideIcons() {

  }
  render() {
    return (
      <div className = "root">
        <div className = "adding-area container-fluid">
          <div className = "row">
            <textarea className = "form-control rounded-0 border border-dark text-center shadow bg-white writing-tasks-area" value = {this.state.text} onChange = {this.updateState.bind(this)} >
            </textarea>
          </div>
          <div className = "row">
            <input type = "button" className = "rounded-0 btn-outline-light text-dark btn-lg border border-dark shadow bg-white add-task-button" onClick = {this.addTask.bind(this)} value = "Add Task" disabled = {this.state.text.length === 0}/>
            <input type = "button" className = "rounded-0 btn-outline-light text-dark btn-lg border border-dark shadow bg-white clear-task-button" onClick = {this.clearText.bind(this)} value = "Clear" disabled = {this.state.text.length === 0}/>
          </div>
        </div>          
        <div className = "tasks-container">
          <ul className = "list-group itemsList">
            {
              taskList = this.state.tasks.map((result , i) => {
                (i > 0)
                return (
                  <Task className = "task-item" key = {i} displayIcon = {this.state.displayIcon} hideIcons = {this.hideIcons} taskcounter = {this.state.taskcounter} taskText = {result.taskText} order = {i} opacity = {result.opacity} subTasks = {result.subTask}/>              
                )
            })
            }           
          </ul>
        </div>
      </div>
    );
  }
}
class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      "text":this.props.taskText,
      "order":this.props.order,
      "subTask":this.props.subTask,
      "opacity":this.props.opacity,
      "taskcounter":this.props.taskCounter,
      "displayIcon":this.props.displayIcon
      };
  }
  displaySubTask() { 
    console.log('its displaying');
    if(this.state.subTask.length > 0) {
      console.log("there is subtask");
    }
    else {
      console.log("there is no subtask");
    }
  }
  render() {
    return (
      <li className="list-group-item list-group-item-action list-group-item list-group-item-danger rounded-0 border-0 items" style={{opacity:this.props.opacity}} onClick={this.props.hideIcons.bind(this)}>
        {this.state.text}
        {
          (this.props.taskcounter!=this.state.order)?
              <img onClick={this.props.reOrder} src="image/downArrow.png" id="downArrow" className="tasks-icon" />
            :null
        }
        {
          (this.state.order!=0)?
           <img src="image/upArrow.png" className="tasks-icon" />
            :null
        }
        {
        <img src="image/edit.png" className="tasks-icon" />
        }
      </li>
    );
  }
}
class SubTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      "text": this.props.text,
      "opacity": this.props.opacity
    };
  }
  render() {
    return (
      <li className="list-group-item list-group-item-action list-group-item list-group-item-danger rounded-0 border-0 sub-item" style={{opacity: this.props.opacity}}>
        {this.state.text}
      </li>
    );
  }
}
ReactDOM.render(<Root />,document.getElementById('app'));