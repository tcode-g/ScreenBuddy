import DisplayBuddy from "../DisplayBuddy";

type ProfileSideBarProps = {
    user: {
        username: string;
        level: number;
        coins: number;
        lastLogin: string;
    }
}

function ProfileSideBar({ user }: ProfileSideBarProps)
{
    if(user === null){
        return;
    }
    console.log(user);
    return(
        <div id="ad21" className="profile-sidebar">
            <DisplayBuddy selection={['defaultbuddy']} />
            <h2 >{user.username}</h2>    
            <ul>Level {user.level}</ul>
            <ul>Coins {user.coins}</ul>
            <ul>Last login{user.lastLogin}</ul>
        </div>
    );
};

export default ProfileSideBar;