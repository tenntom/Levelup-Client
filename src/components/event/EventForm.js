import React, { useContext, useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { EventContext } from "./EventProvider"
import { GameContext } from "../game/GameProvider"


export const EventForm = () => {

    const history = useHistory()

    const { createEvent } = useContext(EventContext)
    const { getGames, games } = useContext(GameContext)

    const [currentEvent, setEvent] = useState({
        hostId: 0,
        gameId: 0,
        date: 0,
        time: 0,
        title: "",
        description: "",
        attendees: []
    })

    useEffect(() => {
        getGames()
    }, [])


    const changeEventState = (event) => {
        const newEventState = { ...currentEvent }
        newEventState[event.target.name] = event.target.value
        setEvent(newEventState)
    }


    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Schedule New Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="gameId">Game: </label>
                    <select name="gameId" className="form-control"
                        value={currentEvent.gameId}
                        onChange={changeEventState}>
                        <option value="0">Select a game...</option>
                        {
                            games.map(game => (
                                <option key={game.id} value={game.id}>{game.name}</option>
                            ))
                        }
                    </select>
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="varchar" name="title" required autoFocus className="form-control"
                        value={currentEvent.title}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="date ">Date: </label>
                    <input type="date" name="date" required autoFocus date className="form-control"
                        value={currentEvent.date}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Time: </label>
                    <input type="time" name="time" required autoFocus time className="form-control"
                        value={currentEvent.time}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input type="text" name="description" required autoFocus className="form-control"
                        value={currentEvent.description}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>


            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()

                    const event = {
                        title: currentEvent.title,
                        date: currentEvent.date,
                        time: currentEvent.time,
                        gameId: parseInt(currentEvent.gameId),
                        description: currentEvent.description,
                        hostId: parseInt(currentEvent.hostId)
                    }

                    createEvent(event)
                    .then(() => history.push("/events"))
                }}

                className="btn btn-primary">Create Event</button>

        </form>
    )
}