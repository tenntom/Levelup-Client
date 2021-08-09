import React, { useContext, useEffect } from "react"
import { EventContext } from "./EventProvider.js"
import { useHistory } from "react-router-dom"
import "./Event.css"

export const EventList = (props) => {
    const { events, getEvents, joinEvent, leaveEvent } = useContext(EventContext)
    const history = useHistory()

    useEffect(() => {
        getEvents()
    }, [])

    return (
        <article className="events">
            <header className="events__header">
                <h1>Level Up Game Events</h1>
            </header>
            <div className="new_event">
                <button className="btn btn-2 btn-sep icon-create"
                    onClick={() => {
                        history.push({ pathname: "/events/new" })
                    }}>Add New Event</button>
            </div>
            {
                events.map(event => {
                    // const attending = profile.events.some(evt => evt.id === event.id)
                    return <section key={event.id} className="registration">
                        <div className="event_title">{event.title}</div>
                        <div className="registration__game">{event.game.name}</div>
                        <div>{event.description}</div>
                        <div>Host: {event.gamer}</div>
                        <div>
                            {
                                new Date(event.date).toLocaleDateString("en-US",
                                    {
                                        weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })
                            }
                            @ {event.time}
                        </div>
                        {
                            event.joined
                                ?<button className="btn btn-3" onClick={() => leaveEvent(event.id)}>Leave</button>
                                :<button className="btn btn-2" onClick={() => joinEvent(event.id)}>Join</button>
                        }
                    </section>
                })
            }
        </article >
    )
}