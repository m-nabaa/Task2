'use strict';

class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = {text:'',gitClicked=false,'taskcounter':0,addingText:false,tasks:[{'taskText':'ahmad','order':0,'clicked':false,'subTask':[{'text':''}],'opacity':1}]};
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
    //console.log(taskData)
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
   console.log('its entering');

    $("#downArrow").on('click', function(event) {

    });
    
    
    
  }
  hideAllIcon(){
    $('li').on('click',function(event){
      console.log("some label clicked");
    });
  }
  render() {
    this.hideAllIcon();
    let taskList;
    return (
      <div className="root">
        <div className="container-fluid">
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
              
                 taskList=this.state.tasks.map(i => {
                      (i>0)
                      return (
                              <Task gitClicked={this.state.gitClicked} taskcounter={this.state.taskcounter}  taskDetails={i}  className="task-item"/>
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
      text:this.props.taskDetails.taskText,
      order:this.props.taskDetails.order,
      subTask:this.props.taskDetails.subTask,
      clicked:this.props.taskDetails.clicked
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
    this.state = {'text': props.text };
  }

  render() {
    return (
      <li className="list-group-item list-group-item-action list-group-item list-group-item-danger rounded-0 border-0 items">
        {this.state.text}
      </li>
    );
  }
}

ReactDOM.render(<Root />,document.getElementById('app'));