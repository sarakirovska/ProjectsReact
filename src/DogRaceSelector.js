import React, { useState, useEffect } from "react";

export default function DogRaceSelector({ setDogBreed }) {
    const [breeds, setBreeds] = useState([]);

    useEffect(() => {
        // Повик на API за добивање раси на кучиња
        fetch("https://api.thedogapi.com/v1/breeds")
            .then((response) => response.json())
            .then((data) => {
                // Постави ги расите
                setBreeds(data);
            })
            .catch((error) => console.error("Error fetching dog breeds:", error));
    }, []);

    return (
        <div>
            <label>Choose a breed of dog: </label>
            <select onChange={(e) => {
                const selectedBreed = breeds.find(breed => breed.id === parseInt(e.target.value));
                setDogBreed(selectedBreed);
            }}>
                <option value="">Choose...</option>
                {breeds.map((breed) => (
                    <option key={breed.id} value={breed.id}>
                        {breed.name}
                    </option>
                ))}
            </select>
        </div>
    );
}
