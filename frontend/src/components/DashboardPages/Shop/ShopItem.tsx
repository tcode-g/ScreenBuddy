import axios from "axios";
import React from "react";
import buddies from "../../Buddies";


type item = {
    id: string;
    name: string;
    price: number;
};

type itemProps = {
    items: item[];
};

const ShopItem: React.FC<itemProps> = ({items}) => {
    const handleBuyClick = async (id: string) => {
        try {
            //const response = await axios
        } catch (error){
            console.error('An error has occurred');
        }
    }
    console.log(items);
    
    return(
        <div className="genstats-stats-grid">
            {items.map((item) => 
                (<div className="shop-card" key= {item.id} >
                    <img src={buddies[item.name]} alt={item.name} style={{ width: '200px', height: '200px', objectFit: 'contain'}}/>
                    <h2>{item.name}</h2>
                    <button onClick={() => handleBuyClick(item.id)} className="buy-button">Buy</button>
                </div>        
            ))}
       </div>
    );


}

export default ShopItem;