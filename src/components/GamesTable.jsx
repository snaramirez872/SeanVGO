import React, { useEffect, useState } from "react";
import Analysis from "./Analysis.jsx";
import DataStudy from "./DataStudy.jsx";
import { GamesList } from "./GamesList.jsx";
import "./styles/GamesTable.css";

export default function GamesTable() {
    // Fetching Games List
    const { games } = GamesList();

    // For Pagination
    const [currPage, setCurrPage] = useState(1);
    const itemsPerPage = 5;

    const lastIndex = currPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;
    const currGames = games.slice(firstIndex, lastIndex);
    
    // Analysis Pop Up Logic
    const [isAnalysis, setAnalysis] = useState(false);

    function openAnalysis() {
        setAnalysis(true);
    }

    function closeAnalysis() {
        setAnalysis(false);
    }

    // Pagination Handler
    const handlePageChange = (pageNum) => {
        setCurrPage(pageNum);
    }

    // Component Render
    return (
        <div className="games-container">
            <button className="data-study-btn" onClick={openAnalysis}>Analytics</button>

            {isAnalysis && (
                <Analysis onClose={closeAnalysis}>
                    <DataStudy />
                </Analysis>
            )}
            
            <table className="games-table">
                <thead>
                    <tr>
                        <td>Title</td>
                        <td>Genre</td>
                        <td>Developer</td>
                        <td>Release Date</td>
                        <td>Platform Owned</td>
                    </tr>
                </thead>
                <tbody>
                    {currGames.map(game => (
                        <tr key={game.id}>
                            <td>{game.title}</td>
                            <td>{game.genre}</td>
                            <td>{game.developer}</td>
                            <td>{game.release_date}</td>
                            <td>{game.platform}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination */}
            <div className="pagination">
                {Array.from({ length: Math.ceil(games.length / itemsPerPage) }, (_, index) => (
                    <button key={index + 1} onClick={() => handlePageChange(index + 1)}>
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
}
