import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ShopItem from "./ShopItem";


type item = {
    id: string;
    name: string;
    price: number;
};

function Shop()
{
    const [shopItems, setShopItems] = useState<any>(null);
    const navigate = useNavigate();

    useEffect (() =>{
        const fetchShopItems = async () => {
            const token = localStorage.getItem('token');
            const userId = localStorage.getItem('userId');

            if(!token){
                navigate('login'); // denied
                return;
            }
            
            try{
                const response = await axios.get(`https://cometcontacts4331.com/api/shop/shop`, {headers: { Authorization: `Bearer ${token}`,}, });
                console.log(response.data.items);
                const data: item[] = response.data.items;
                setShopItems(response.data.items);

            } catch(error: any) {
                console.error(error);
                console.log(error);
            }
        };
        fetchShopItems();    




    }, [])

    return shopItems ? (
      
        <div className="genstats-container">
          
            <div >
              <ShopItem items={shopItems} /> 
            </div>
   
        </div>

    ) : (
      <p className="loading-text">Loading...</p>
    );
}

export default Shop;