import { useEffect, useState } from "react";

export default function DogFacts({ breed }) {
    const [facts, setFacts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (breed) {
            // Проба со нов API за факти за кучиња
            fetch("https://dog-api.kinduff.com/api/facts?number=5")
                .then((response) => response.json())
                .then((data) => {
                    if (data.facts) {
                        setFacts(data.facts);
                    } else {
                        setFacts(["No facts available at the moment."]);
                    }
                    setLoading(false);
                })
                .catch((error) => {
                    console.error("Error fetching dog facts:", error);
                    setFacts(["Error loading facts. Please try again."]);
                    setLoading(false);
                });
        }
    }, [breed]);

    if (loading) return <div>Loading facts...</div>;

    return (
        <div>
            <h3 style={{ fontSize: '1.2em', color: '#27ae60' }}>Interesting Facts</h3>
            <ul style={{ fontSize: '0.8em', color: '#333', paddingLeft: '0', listStyleType: 'none' }}>
                {facts.map((fact, index) => (
                    <li key={index} style={{ display: 'flex', alignItems: 'center', lineHeight: '1.5', marginBottom: '10px' }}>

                        {fact}
                    </li>
                ))}
            </ul>
        </div>
    );
}
