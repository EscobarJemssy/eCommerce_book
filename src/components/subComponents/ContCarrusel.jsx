import React, { useState, useEffect } from "react";

const ContCarrusel = ({category}) => { // category is the prop passed from Carrusel
    return (
        <div className="carrusel-horizontal"> 
            {category.map((cat) => (
                <div key={cat.index} className="cat"> 
                    <img src=""/>
                    <h3>{cat.title}</h3>
                    <p>{cat.author}</p>
                    <p>{cat.price}</p>
                </div>
            ))}
        </div>
    );
}

export default ContCarrusel;