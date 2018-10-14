'use strict';
class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text:'',
      taskcounter:0,
      addingText:false,
      itemClicked:false,
      tasks:[{taskText:'ahmad',order:0,opacity:1,subTask:[{text:''}]}]
    };
  }
  updateState(event){
    this.setState({text:event.target.value});
  }
  clearText(){
    this.setState({text:''})
  }
  addTask(){
    var allTask=this.state.tasks;
    let taskData=this.state.tasks[0];
    taskData.taskText=this.state.text;
    taskData.order=this.state.tasks.length;
    taskData.clicked=false;
    taskData.taskcounter=this.state.tasks.length;
    taskData.opacity=1/this.state.tasks.length;
    allTask.push(taskData);
    this.setState({allTask:this.state.tasks});
    this.setState({taskcounter:this.state.taskcounter+1});
    this.clearText();
  }
  reOrder(){
    $("#downArrow").on('click', function(event) {
    });
    
    
    
  }
  hideAllIcon(){
    $('li').on('click',function(event){
      console.log("some label clicked");
      //setState({itemClicked:this.state.itemClicked});
      //hide icones
      //display sub task
    });
  }
  render() {
    let taskList;
    return (
      <div className="root">
        <div className="adding-area container-fluid">
          <div className="row">
            <textarea className="form-control rounded-0 border border-dark text-center text-area-style shadow bg-white"  value={this.state.text} onChange={this.updateState.bind(this)} >
            </textarea>
          </div>
          <div className="row">
            <input type="button" className="buttons rounded-0 btn-outline-light text-dark btn-lg border border-dark shadow bg-white" onClick={this.addTask.bind(this)}  value="Add Task" disabled={this.state.text.length === 0}/>
            <input type="button" className="buttons rounded-0 btn-outline-light text-dark btn-lg border border-dark shadow bg-white" onClick={this.clearText.bind(this)} value="Clear" disabled={this.state.text.length === 0}/>
          </div>
        </div>          
        <div className="display-area">
            <ul className="list-group itemsList">
              {
                  taskList=this.state.tasks.map((result, i) => {
                        (i>0)
                        return (
                                <Task className="task-item" key={i} taskcounter={this.state.taskcounter} taskText={result.taskText} order={i} opacity={result.opacity} subTasks={result.subTask} />              
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
      text:this.props.taskText,
      order:this.props.order,
      subTask:this.props.subTask,
      opacity:this.props.opacity,
      taskcounter:this.props.taskCounter
      };
  }
  displaySubTask(){ 
    console.log('its displaying');
    if(this.state.subTask.length>0){
      console.log("there is subtask");
    }
    else{
      console.log("there is no subtask");
    }
  }
  render() {
    return (
      <li className="list-group-item list-group-item-action list-group-item list-group-item-danger rounded-0 border-0 items">
        {this.state.text}
        {
          (this.props.taskcounter!=this.state.order)?
              <img onClick={this.props.reOrder} src="image/downArrow.png" id="downArrow" className="image" />
            :null
        }
        {
          (this.state.order!=0)?
           <img src="image/upArrow.png" className="image" />
            :null
        }
        <img src="image/edit.png" className="image" />
      </li>
    );
  }
}
class SubTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {'text': this.props.text};
  }
  render() {
    return (
      <li className="list-group-item list-group-item-action list-group-item list-group-item-danger rounded-0 border-0 sub-item"style={{opacity: this.props.opacity}}>
        {this.state.text}
      </li>
    );
  }
}
ReactDOM.render(<Root />,document.getElementById('app'));