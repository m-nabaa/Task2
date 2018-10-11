'use strict';

class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = {text:'',addingText:false,tasks:[{text:'',order:'',subTask:[],clicked:false}]};
  }
  updateState(event){
    this.setState({text:event.target.value});
  }
  clearText(){
    this.setState({text:''})
  } 

  addText(){
    console.log("enter add text");
    let taskData=this.state.tasks[0];
    taskData.text=this.state.text;
    taskData.order=this.state.tasks.length;
    taskData.clicked=false;

    //let data="text:"+task+",order:"+order+",clicked:false";
    console.log(taskData);
      this.state.tasks.push(taskData);
      this.clearText();
  }
  mappingTask(){
    //let details=this.state.tasks;
    const textList=this.state.tasks.map(i =>{
      console.log(i)
    })
  }
 
  render() {

    const taskList=this.state.tasks.map(i => {
      return (
        <Task text={i.text} />
      )
    })
    console.log(taskList);
    return (
      <div className="root">
        <div className="container-fluid">
          <div className="row">
            <textarea className="form-control rounded-0 border border-dark text-center"  value={this.state.text} onChange={this.updateState.bind(this)} >
            </textarea>
          </div>
          <div className="row">
            <input type="button" className="button-size rounded-0 btn-outline-light text-dark btn-lg border border-dark" onClick={this.addText.bind(this)}  value="Add Task" disabled={this.state.text.length === 0}/>
            <input type="button" className="button-size rounded-0 btn-outline-light text-dark btn-lg border border-dark" onClick={this.clearText.bind(this)} value="Clear" disabled={this.state.text.length === 0}/>
          </div>
        </div>          
        
        <div className="display-area">
        <ul className="list-group">
          {taskList}
          {/*
            this.state.tasks.map(i =>{
              <Task text={i.text} />
              console.log(i.text+ i.order + i.clicked)
            })
            //this.state.addingText ? <Task text={this.state.text} /> : (null)
          */}
        </ul>
        </div>

      </div>
    );
  }
  
}

class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = {'text': props.text };
  }

  render() {
    return (
      <li className="list-group-item">
        {this.state.text}
      </li>
    );
  }
}

ReactDOM.render(<Root />,document.getElementById('app'));