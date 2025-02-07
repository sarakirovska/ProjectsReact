import DogImage from "./DogImage";
import DogFacts from "./DogFacts";
import {useEffect, useState} from "react";

export default function DogInfo({ breed }) {
    const API_KEY ="live_UA4WUopavghVkj0BWns8iWkliNfSTGP2yIWz2tUAdogmlSI4msHXne6FR9IBQZzR"
    const [dogData, setDogData] = useState([]);

    useEffect(() => {
        if (breed) {
            fetch(`https://api.thedogapi.com/v1/images/search?limit=10&breed_ids=${breed.id}&api_key=${API_KEY}`)
                .then((response) => response.json())
                .then((data) => {
                    setDogData(data);
                })
                .catch((error) => console.error("Error fetching dog data:", error));
        }
    }, [breed]);

    if (!dogData.length) return <div>Loading...</div>;

    return (
        <div>
            <h2 style={{ color: '#27ae60' }}>Breed: {breed.name}</h2>

            <div className="image-frame" style={{ display: 'flex', flexDirection: 'row' }}>
                {dogData.map((dog, index) => (
                    <DogImage key={index} imgUrl={dog.url} />
                ))}
            </div>
            <DogFacts breed={breed} />
        </div>
    );
}
