import React from "react";
import { GamesList } from "./GamesList.jsx";
import "./styles/DataStudy.css";

export default function DataStudy() {
    // Fetching Games List
    const { games } = GamesList();
    
    // Utility Variables and Functions
    const platformTotals = {}
    const genres = {}
    const developers = {}
    let totalGameCount = 0;

    function findMaxinDict(dict) {
        let maxVal = -Infinity;
        let maxKey = null;

        for (const x in dict) {
            if (dict[x] >= maxVal) {
                maxVal = dict[x];
                maxKey = x;
            }
        }

        return [maxKey, maxVal];
    }

    function findRatio(x, y) {
        var rat = 100 * x / y;
        rat = +rat.toFixed(2);
        return rat;
    }

    function addToOrIncrementDict(key, dict) {
        if (key in dict) {
            dict[key] += 1;
        } else {
            dict[key] = 1;
        }
    }

    function genreHandling(key, dict) {
        if (key.includes(',')) {
            // If game has multiple genres
            var multi = key.split(',').map(item => item.trim());
            for (var i of multi) {
                addToOrIncrementDict(i, dict);
            }
        }
    }

    games.forEach(game => {
        // Platforms
        addToOrIncrementDict(game.platform, platformTotals);
        // Genres
        genreHandling(game.genre, genres);
        // Developers
        addToOrIncrementDict(game.developer, developers);
        // Incrementing Total Game Count for Every Document Accessed
        totalGameCount += 1;
    })

    console.log(genres);

    // Find Max from Dictionaries After Everything is Parsed
    let maxPlatform = findMaxinDict(platformTotals);
    let maxGenre = findMaxinDict(genres);
    let maxDeveloper = findMaxinDict(developers);
    
    // Ratio of Most Recurrent Platform, Genre to Total Games Owned
    let platformRatio = findRatio(maxPlatform[1], totalGameCount);
    let genreRatio = findRatio(maxGenre[1], totalGameCount);

    // Actual Component Rendering
    return (
        <div className="data-study">
            <p><b>Total Games: </b><span>{totalGameCount}</span></p>
            <p><b>Most Owned Platform: </b><span>{maxPlatform[0]}</span> with <span>{platformRatio}%</span> of total games.</p>
            <p><b>Most Owned Genre: </b><span>{maxGenre[0]}</span> with <span>{genreRatio}%</span> of total games.</p>
            <p><span>{maxDeveloper[0]}</span> is listed the most out of any other developer at <span>{maxDeveloper[1]}</span> games.</p>
            <div className="list-containers">
                <div className="genre-list">
                    <h1>List of Genres</h1>
                    <ul className="genre-list">
                        {Object.entries(genres).map(([key, value]) => (
                            <li>
                                <p><i>{key}</i> <b>({value})</b></p>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="dev-list">
                    <h1>List of Developers</h1>
                    <ul className="dev-list">
                        {Object.entries(developers).map(([key, value]) => (
                            <li>
                                <p><i>{key}</i> <b>({value})</b></p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
