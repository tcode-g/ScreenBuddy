import DisplayBuddy from "../DisplayBuddy";

type ProfileSideBarProps = {
  user: {
    username: string;
    level: number;
    coins: number;
    lastLogin: string;
  };
};

function ProfileSideBar({ user }: ProfileSideBarProps) {
  if (!user) return null;

  return (
    <div
      id="ad21"
      className="profile-sidebar"
      style={{
        color: "#F2F5EA",
        fontFamily: "Fredoka",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem",
        padding: "1rem"
      }}
    >
        {/* <DisplayBuddy selection={["defaultbuddy"]} />  GETTING RID OF THIS, NOT ENOUGH TIME*/}
      <h2 style={{ color: "#E75A7C", fontSize: "1.8rem", margin: "0.5rem 0" }}>
        {user.username}
      </h2>
      <p style={{ margin: "0.3rem 0" }}>
        <strong style={{ color: "#E75A7C" }}>Level:</strong> {user.level}
      </p>
      <p style={{ margin: "0.3rem 0" }}>
        <strong style={{ color: "#E75A7C" }}>Coins:</strong> {user.coins}
      </p>
      <p style={{ margin: "0.3rem 0" }}>
        <strong style={{ color: "#E75A7C" }}>Last Login:</strong> {user.lastLogin}
      </p>
    </div>
  );
}

export default ProfileSideBar;
