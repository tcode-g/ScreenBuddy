import buddies from "../Buddies";



function DisplayBuddy({selection}:any)
{
    let imagesObj;
    if(selection === null){
        imagesObj = Object.keys(buddies);
    } else {
        imagesObj = selection;
    }

    return (
        <div>
            {imagesObj.map((key: string) => (
                <img key={key} src={buddies[key]} alt={key} />
            ))}
        </div>
    )
}

export default DisplayBuddy;