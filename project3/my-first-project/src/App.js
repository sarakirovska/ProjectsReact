import './App.css';
import { useState, useEffect } from "react";
import DogRaceSelector from "./DogRaceSelector";
import DogInfo from "./DogInfo";
import DogImage from "./DogImage";  // Додај ја за сликите

const API_KEY = "live_UA4WUopavghVkj0BWns8iWkliNfSTGP2yIWz2tUAdogmlSI4msHXne6FR9IBQZzR"; // Вашиот API клуч

function App() {
    const [dogBreed, setDogBreed] = useState(null);
    const [dogImages, setDogImages] = useState([]);

    // Повик за добивање на 4 слики за кучиња
    useEffect(() => {
        fetch(`https://api.thedogapi.com/v1/images/search?limit=8&api_key=${API_KEY}`)
            .then((response) => response.json())
            .then((data) => {
                setDogImages(data); // Поставува четири слики
            })
            .catch((error) => console.error("Error fetching dog images:", error));
    }, []);

    return (
        <div>
            <h1>Welcome to the dog world</h1>

            {/* Рамка со 4 слики */}
            <div className="image-frame">
                {dogImages.map((dog, index) => (
                    <DogImage key={index} imgUrl={dog.url} />
                ))}
            </div>

            {/* Пребарувач за избор на раса */}
            <DogRaceSelector setDogBreed={setDogBreed} />

            {dogBreed && <DogInfo breed={dogBreed} />}
        </div>
    );
}

export default App;
