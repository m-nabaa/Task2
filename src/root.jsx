'use strict';

class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      taskText: "",
      tasks:[],
      uri:""
    };
    myScroll = null;
  }
  
  componentWillMount() {// before first render
    this.requestForJson();
  }
  componentDidMount() { // one time after first render
    myScroll = new IScroll('#wrapper',{mouseWheel: true});
  }
  componentDidUpdate() {// whenever any component update
    myScroll.refresh();
  }
  requestForJson() {
    currentState= this;
    var obj= {
      "status": true,
      "tasks": [
        {
          "taskText": "ahmad",
          "order": 0,
          "editMode": false,
          "obesity": 1,
          "subTask": [
            {
              "text": "hamed"
            },
            {
              "text": "mohammad"
            },
            {
              "text": "Abu Nabaa"
            }
          ]
        },
        {
          "taskText": "mahmoud",
          "order": 1,
          "editMode": false,
          "obesity": 1,
          "subTask": [
            {
              "text": "ali"
            },
            {
              "text": "Abu Nabaa"
            }
          ]
        },
        {
          "taskText": "ali",
          "order": 2,
          "editMode": false,
          "obesity": 1,
          "subTask": [
            {
              "text": "hamed"
            },
            {
              "text": "mohammad"
            },
            {
              "text": "Abu Nabaa"
            }
          ]
        },
        {
          "taskText": "hamdan",
          "order": 3,
          "editMode": false,
          "obesity": 1,
          "subTask": [
            {
              "text": "hamed"
            }
          ]
        },
        {
          "taskText": "ibrahim",
          "order": 4,
          "editMode": false,
          "obesity": 1,
          "subTask": [
            {
              "text": "Abu Nabaa"
            }
          ]
        },
        {
          "taskText": "ziyad",
          "order": 5,
          "editMode": false,
          "obesity": 1,
          "subTask": [
            {
              "text": "Abu Nabaa"
            }
          ]
        },
        {
          "taskText": "hassan",
          "order": 6,
          "editMode": false,
          "obesity": 1,
          "subTask": [
            {
              "text": "Abu Nabaa"
            }
          ]
        },
        {
          "taskText": "haroun",
          "order": 7,
          "editMode": false,
          "obesity": 1,
          "subTask": [
            {
              "text": "Abu Nabaa"
            }
          ]
        },
        {
          "taskText": "sobhi",
          "order": 8,
          "editMode": false,
          "obesity": 1,
          "subTask": [
            {
              "text": "Abu Nabaa"
            }
          ]
        },
        {
          "taskText": "yasser",
          "order": 9,
          "editMode": false,
          "obesity": 1,
          "subTask": [
            {
              "text": "Abu Nabaa"
            }
          ]
        },
        {
          "taskText": "firas",
          "order": 10,
          "editMode": false,
          "obesity": 1,
          "subTask": [
            {
              "text": "Abu Nabaa"
            }
          ]
        }
      ]
    }
    var data= JSON.stringify(obj);
    $.ajax({
      url: "https://api.myjson.com/bins",
      type: "POST",
      data: data,
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function (data, textStatus, jqXHR) {
        currentState.setState({uri: data.uri});
        // load created json
        $.get(data.uri, function (data, textStatus, jqXHR) {
          if(data.status === true ){
            currentState.setState({tasks: data.tasks});
          }
        });
        }
  });
  }
  updateJson() {
    var updatedObj = currentState.state.tasks;
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
              currentState.setState({tasks: data.tasks});
            }
                }
          });
  }
  //header functionality
  updateState(event) {
    this.setState({taskText: event.target.value});
  }
  clearText() {
    this.setState({taskText: ""});
  }
  addTask() {
    prevTasks= currentState.state.tasks;

    let taskData= {subTask:[], editMode:false};
    taskData.taskText= this.state.taskText;
    taskData.order= this.state.tasks.length;
    taskData.obesity= 1/(prevTasks.length+1);
    prevTasks.push(taskData);
    this.setState({tasks: prevTasks});
    this.clearText();
    currentState.updateJson();
  }
  // handling child functionality 
  switchingEditMode() {
    var prevTasks =currentState.state.tasks;
    prevTasks.map((task , i) => {
      task.editMode= !task.editMode;
    });
    currentState.setState({tasks: prevTasks});
  }
  updateTasks(newTaskText, index) {
    currentState.switchingEditMode();
    var prevTasks= currentState.state.tasks;
    prevTasks[index].taskText= newTaskText;
    currentState.setState({tasks: prevTasks});
    currentState.changeTaskOrder();
    currentState.updateJson();
  }
  changeTaskOrder(type, index) {
    var prevTasks= currentState.state.tasks;
    switch(type) {
      case 'up': {
        prevTasks[index].order -= 1;
        prevTasks[index-1].order += 1;
        break;
      }
      case 'down': {
        prevTasks[index].order += 1;
        prevTasks[index+1].order -= 1;
        break;
      }
      default :
      break;
    }
    prevTasks.sort((a, b) => a.order - b.order);
    currentState.setState({tasks: prevTasks});
  }
  render() {
    return (
        <div className= "main-root">
          <div className= "header">
            <div className= "text-container">
              <textarea value= {this.state.taskText} onChange= {() => {this.updateState(event)}} className= "border border-dark shadow bg-white writing-tasks-area">
              </textarea>
            </div>
            <div className= "buttons-container">
              <input type= "button" value= "Add Task" onClick= {() => this.addTask()} className= "btn btn-outline-dark buttons" disabled= {this.state.taskText.length === 0}/>
              <input type= "button" value= "Clear" onClick= {() => {this.clearText()}} className= "btn btn-outline-dark buttons" disabled= {this.state.taskText.length === 0}/>
            </div>
          </div>
          <div className= "task-list-container" id= "wrapper">
            <ul className= "list-group itemsList">
            {
              this.state.tasks.map((result, i) => {
                (i >= 0)
                return (
                  <Task key= {i} index= {i} 
                    changeTaskOrder= {this.changeTaskOrder} switchToEditMode= {this.switchingEditMode} updateTasks= {this.updateTasks} 
                    taskText= {result.taskText} subTask= {result.subTask} editMode= {result.editMode} order= {result.order} 
                    tasksLength= {this.state.tasks.length} taskObesity= {result.obesity}
                  />
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
    this.state= {
      currentlyEditing: false,
      displaySubTask: false
      };
  }
// icons functionality 
  changeToEditMode() {
    this.setState({currentlyEditing: true});
    this.props.switchToEditMode();
  }
  moveTaskUp() {
    this.props.changeTaskOrder('up',this.props.order);
  }
  moveTaskDown() {
    this.props.changeTaskOrder('down',this.props.order);
  }
  //inline updating Tasks
  cancelUpdate() {
    this.props.switchToEditMode();
    this.setState({currentlyEditing: false});
  }
  updateTask() {
    this.props.updateTasks(this.refs.newUpdatedTask.value,this.props.index);
    this.setState({currentlyEditing: false});

  }
  //show-hide sub tasks
  handleSupTask(){
    this.setState({displaySubTask: !this.state.displaySubTask});
    this.props.switchToEditMode();
  }

  render() {
    return(
    <li className= "list-group-item list-group-item-action d-flex justify-content-between border-0 items" 
    style= {{backgroundColor: `hsl(0, 80%, ${60 + (50 / (this.props.tasksLength - this.props.order )- 13)}%)`}}>
        <div className= "task-content-container">
        {
          (this.state.currentlyEditing)
          ? 
            <div className= "input-group">
              <input type= "text" ref= "newUpdatedTask" defaultValue= {this.props.taskText} className= "form-control" />
                <div className= "input-group-append">
                  <input type= "button" value= "Update" onClick= {() => this.updateTask()} className= "btn btn-success btn-sm cancel" />
                  <input type= "button" value= "Cancel" onClick= {() => this.cancelUpdate()} className= "btn btn-danger btn-sm update"/>
                </div>
            </div>
          :
          <div className= "task-content" onClick= {() => this.handleSupTask()}>
            {this.props.taskText}
            {
              (this.state.displaySubTask)?
              <ul className= "list-group itemsList subTaskList">
                {
                  this.props.subTask.map((subs, i) => {
                    return (
                    <SubTask key= {i} text= {subs.text}/>
                    )
                  })
                }
              </ul>
              :null
            }
          </div>
        }
        {
          (!this.props.editMode)?
            <div className= "icons-container">
              <i onClick={() => this.changeToEditMode()} className= "fa fa-pencil text-primary icon" ></i>
              {
                (this.props.order != 0)
                ?
                  <i onClick={() => this.moveTaskUp()} className= "fa fa-long-arrow-up text-success icon"></i> 
                : 
                null
              }
              {
                (this.props.order!=this.props.tasksLength-1)
                ?
                  <i onClick={() => this.moveTaskDown()} className= "fa fa-long-arrow-down text-danger icon"></i> 
                :
                null
              }
            </div>
            :null
        }
        </div>
      </li>
    )
  }
}
class SubTask extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <li className= "list-group-item list-group-item-action list-group-item list-group-item-danger rounded-0 border-0 sub-item items"
      style= {{backgroundColor: `rgb(232, 134, 134)`}}
      >
        {this.props.text}
      </li>
    );
  }
}
ReactDOM.render(<Root />,document.getElementById('app'));