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

    dragOverHandler(e, worker) {
        console.log("Я драг оверхэндлер");
        e.preventDefault();
        if (e.target.className == 'task'){
            e.target.style.boxShadow = '0 4px 3px gray'
        }
    }

    dragLeaveHandler(e) {
        console.log("Я драг ливхэндлер");
        e.target.style.boxShadow = 'none'
    }

    dragStartHandler(e, worker, task) {
        console.log("Я драг старт");
        this.setState({currentTask: task});
        this.setState({currentWorker: worker});
    }

    //for failed docking
    dragEndHandler(e) {
        console.log("Я драг ендхэндлер");
        e.target.style.boxShadow = 'none'
    }

    //for docking in the right place of another board
    dropHandler(e, worker, task) {
        console.log("Я драг дропхэндлер");
        e.stopPropagation();

        e.preventDefault();

        Service.putChangeWorker(worker, this.state.currentTask.id).then(response => response.status)
            .catch(err => console.warn(err));
        const currentIndex = this.state.note[this.state.currentWorker].indexOf(this.state.currentTask)
        this.state.note[this.state.currentWorker].splice(currentIndex, 1)
        //Здесь удаляем с текущей доски, поэтому здесь же можно поменять  индекс работника
        const dropIndex = this.state.note[worker].indexOf(task)
        //вообще лучше здесь. Worker - это новая доска, куда мы ее привели
        this.state.note[worker].splice(dropIndex + 1, 0, this.state.currentTask)

        this.setState(Object.keys(this.state.note).map(b => {
            if (b === this.state.currentWorker){
                return this.state.currentWorker;
            }
            return b;
        }))
    }

    dropWorkerHandler(e, worker){
        this.state.note[worker].push(this.state.currentTask)
        const currentIndex = this.state.note[this.state.currentWorker].indexOf(this.state.currentTask)
        this.state.note[this.state.currentWorker].splice(currentIndex, 1)
        this.setState(Object.keys(this.state.note).map(b => {
            if (b === this.state.currentWorker){
                return this.state.currentWorker
            }
            return b
        }))
    }


    render(){
        const {note} = this.state;
        // const {currentWorker} = this.state;
        // const {currentTask} = this.state;

        return(
            <div className='MainPage'>
                {Object.keys(note).map(worker =>
                    <div className='board'
                         onDragOver={(e) =>  this.dragOverHandler(e)}
                         onDrop={(e) =>  this.dropWorkerHandler(e, worker)}>
                        <div className="board_title">{worker}</div>
                        {
                            note[worker].map(task => (
                                <div
                                    key={task.id}
                                    onDragOver={(e) =>  this.dragOverHandler(e, worker)}
                                    onDragLeave={e =>  this.dragLeaveHandler(e)}
                                    onDragStart={(e) =>  this.dragStartHandler(e, worker, task)}
                                    onDragEnd={(e) =>  this.dragEndHandler(e)}
                                    onDrop={(e) =>
                                        this.dropHandler(e, worker, task)
                                    }
                                    draggable={true}
                                    className="item"
                                >
                                    {task.flight}, worker: {task.worker}
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