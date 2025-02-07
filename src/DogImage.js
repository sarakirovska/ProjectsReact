import React from "react";

export default function DogImage({ imgUrl }) {
    return (
        <div>
            <img src={imgUrl} alt="Dog" style={{ width: "300px", borderRadius: "10px" }} />
        </div>
    );
}
