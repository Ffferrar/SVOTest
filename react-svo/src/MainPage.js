import React, {Component, useState} from 'react';
import './MainPage.css'
import Service from "./Service";

class MainPage extends Component {
    constructor(props){
        super(props)
        this.state = {
            note:[],
            currentWorker:[],
            currentTask:[]
        }
        this.dragStartHandler = this.dragStartHandler.bind(this);
        this.dropHandler = this.dropHandler.bind(this);
    }

    //Подгружаем данные с API
    async componentDidMount() {
        Service.getTable().then((response) => {
            this.setState({ note: response.data})
        });;
    }

    dragOverHandler(e) {
        e.preventDefault();
        if (e.target.className == 'test'){
            e.target.style.boxShadow = '0 4px 3px gray'
        }
    }

    dragLeaveHandler(e) {
        e.target.style.boxShadow = 'none'
    }

    dragStartHandler(e, worker, task) {
        console.log(worker);
        this.setState({currentTask: task});
        this.setState({currentWorker: worker});
    }

    dragEndHandler(e) {
        e.target.style.boxShadow = 'none'
    }

    dropHandler(e, worker, task) {
        e.preventDefault();
        const currentIndex = this.state.note[this.state.currentWorker].indexOf(this.state.currentTask)

        this.state.note[this.state.currentWorker].splice(currentIndex, 1)
        const dropIndex = this.state.note[worker].indexOf(task)
        this.state.note[worker].splice(dropIndex + 1, 0, this.state.currentTask)
        this.setState(Object.keys(this.state.note).map(b => {
            if (b === this.state.currentWorker){
                return this.state.currentWorker
            }
            return b
        }))
    }


    render(){
        const {note} = this.state;
        const {currentWorker} = this.state;
        const {currentTask} = this.state;

        return(
            <div className='MainPage'>
                {Object.keys(note).map(worker =>
                    <div className='board'>
                        <div className="board_title">{worker}</div>
                        {
                            note[worker].map(task => (
                                <div
                                    key={task.id}
                                    onDragOver={(e) =>  this.dragOverHandler(e)}
                                    OnDragLeave={e =>  this.dragLeaveHandler(e)}
                                    onDragStart={(e) =>  this.dragStartHandler(e, worker, task)}
                                    onDragEnd={(e) =>  this.dragEndHandler(e)}
                                    onDrop={(e) =>  this.dropHandler(e, worker, task)}
                                    draggable={true}
                                    className="item"
                                >
                                    {task.flight}
                                </div>)
                            )
                        }
                    </div>
                )}
            </div>
        );
    }
}
export default MainPage;