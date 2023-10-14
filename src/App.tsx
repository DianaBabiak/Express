import {useEffect, useState} from 'react'
import './App.css'
import axios from "axios";

interface MainImageType {
    url: string;
    width: number;
    height: number;
    fileSize: number;
}

interface ImageType {
    main: MainImageType[];
}

interface TodolistType {
    isImportant: boolean;
    id: string;
    title: string;
    description: string;
    addedDate: string;
    order: number;
    images: ImageType;
}

interface GeneralType {
    pagesCount: number;
    page: number;
    pageSize: number;
    totalCount: number;
    items: TodolistType[];
}


function App() {
const [todolists, setTodolists]=useState<TodolistType[]>([])

    useEffect(()=>{
        axios.get<GeneralType>('https://todolists.samuraijs.com/api/1.0/todolists?pageNumber=1&pageSize=10')
            .then(response =>{
                console.log(response.data)
                setTodolists(response.data.items)
            })}, [])


  return (
    <>
        {todolists.map((todo)=>{
            return (
                <div key={todo.id}>
                    <h2>
                        {todo.images.main.length > 0 ? (
                            <img src={todo.images.main[1].url} alt="Изображение" />
                        ) : (
                            <p>Изображение отсутствует</p>
                        )}
                        {todo.title} </h2>
                    <ul>
                        <li> <input type='checkbox' checked={todo.isImportant}/>{todo.description}</li>

                    </ul>
                </div>

            )
        })}

    </>
  )
}

export default App
