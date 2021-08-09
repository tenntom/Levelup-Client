import React, { useContext, useState, useEffect } from "react"
import { GameContext } from "./GameProvider.js"
import { useHistory, useParams } from 'react-router-dom'


export const GameForm = () => {
    const history = useHistory()
    const { createGame, editGame, getGameTypes, gameTypes, getGameById } = useContext(GameContext)

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentGame, setCurrentGame] = useState({
        name: "",
        description: "",
        numberOfPlayers: 0,
        gamer: "",
        maker: "",
        gameTypeId: 0
    })

    const gameId = useParams()

    /*
        Get game types on initialization so that the <select>
        element presents game type choices to the user.
    */
    useEffect(() => {
        getGameTypes()
    }, [])

    useEffect(() => {
        getGameById(gameId)
            .then((game) => {
                setCurrentGame({
                    id: parseInt(gameId),
                    name: game.name,
                    description: game.description,
                    numberOfPlayers: game.number_of_players,
                    gamer: game.gamer,
                    maker: game.maker,
                    gameTypeId: game.game_type.id
                })
            })
    }, [gameId])


    const handleControlledInputChange = (event) => {
        const newGameState = { ...currentGame }
        newGameState[event.target.name] = event.target.value
        setCurrentGame(newGameState)
    }


    return (
        <form className="gameForm">
            <h2 className="gameForm__name">Register New Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Name: </label>
                    <input type="text" name="name" required autoFocus className="form-control"
                        value={currentGame.name}
                        // onChange={changeGameNameState}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="gameTypeId">Game Type: </label>
                    <select name="gameType" name="gameTypeId" className="form-control" value={currentGame.gameTypeId} onChange={handleControlledInputChange}>
                        <option value="0">Select a type</option>
                        {gameTypes.map(gt => (
                            <option key={gt.id} value={gt.id}>
                                {gt.label}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input type="text" name="description" required autoFocus className="form-control"
                        value={currentGame.description}
                        // onChange={changeGameDescriptionState}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="numberOfPlayers">Number of Players: </label>
                    <input type="text" name="numberOfPlayers" required autoFocus className="form-control"
                        value={currentGame.numberOfPlayers}
                        // onChange={changeGamePlayersState}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="maker">Maker: </label>
                    <input type="text" name="maker" required autoFocus className="form-control"
                        value={currentGame.maker}
                        // onChange={changeGameMakerState}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>

            {
                (gameId)
                    ? <button type="submit"
                        onClick={evt => {
                            // Prevent form from being submitted
                            evt.preventDefault()
                            editGame({
                                id: parseInt(gameId),
                                name: currentGame.name,
                                description: currentGame.description,
                                maker: currentGame.maker,
                                number_of_players: parseInt(currentGame.numberOfPlayers),
                                gameTypeId: parseInt(currentGame.gameTypeId),
                                gamerId: parseInt(currentGame.gamerId)
                            })
                                .then(() => history.push("/games"))
                        }}
                        className="btn btn-primary">Edit</button>

                    : <button type="submit"
                        onClick={evt => {
                            // Prevent form from being submitted
                            evt.preventDefault()

                            const game = {
                                name: currentGame.name,
                                description: currentGame.description,
                                maker: currentGame.maker,
                                number_of_players: parseInt(currentGame.numberOfPlayers),
                                gameTypeId: parseInt(currentGame.gameTypeId),
                                gamerId: parseInt(currentGame.gamerId)
                            }

                            // Send POST request to your API
                            createGame(game)
                                .then(() => history.push("/games"))
                        }}
                        className="btn btn-primary">Create</button>
            }

        </form>
    )
}