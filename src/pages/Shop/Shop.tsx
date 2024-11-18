import React from 'react';

const Shop = () => {
    const [time, setTime] = React.useState(new Date().toLocaleTimeString());

    setInterval( () => {
        setTime(prev =>
            prev = new Date().toLocaleTimeString());
        },
        1000);

    return (
        <h2>
            {time}
        </h2>
    );
}

export default Shop;

