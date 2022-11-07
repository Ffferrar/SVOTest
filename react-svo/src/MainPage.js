import React, {Component, useState} from 'react';
import './MainPage.css'
import Service from "./Service";

class MainPage extends Component {
    constructor(props){
        super(props)
        this.state = {
            note:[]
        }
    }

    //Подгружаем данные с API
    async componentDidMount() {
        Service.getTable().then((response) => {
            this.setState({ note: response.data})
        });;
    }


    render(){
        const {note, setNote} = this.state;
        const {currentWorker, setCurrentWorker} = this.state;
        const {currentTask, setCurrentTask} = this.state;

        function dragOverHandler(e) {
            e.preventDefault();
            if (e.target.className == 'test'){
                e.target.style.boxShadow = '0 4px 3px gray'
            }
        }

        function dragLeaveHandler(e) {
            e.target.style.boxShadow = 'none'
        }

        function dragStartHandler(e, worker, task) {
            setCurrentWorker(worker)
            setCurrentTask(task)
        }

        function dragEndHandler(e) {
            e.target.style.boxShadow = 'none'
        }

        function dropHandler(e, worker, task) {
            e.preventDefault();
            const currentIndex = null
            if (note[currentWorker]){
                const currentIndex = note[currentWorker].indexOf(currentTask)
            }
            note[currentWorker].splice(currentIndex, 1)
            const dropIndex = note[worker].indexOf(task)
            note[worker].splice(dropIndex + 1, 0, currentTask)
            setNote(Object.keys(note).map(b => {
                if (b === currentWorker){
                    return currentWorker
                }
                return b
            }))
        }

        return(
            <div className='MainPage'>
                {Object.keys(note).map(worker =>
                        <div className='board'>
                            <div className="board_title">{worker}</div>
                            {
                                note[worker].map(task => (
                                    <div
                                        onDragOver={(e) => dragOverHandler(e)}
                                        OnDragLeave={e => dragLeaveHandler(e)}
                                        onDragStart={(e) => dragStartHandler(e, worker, task)}
                                        onDragEnd={(e) => dragEndHandler(e)}
                                        onDrop={(e) => dropHandler(e, worker, task)}
                                        draggable={true}
                                        className="item"
                                        key={task.id}
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