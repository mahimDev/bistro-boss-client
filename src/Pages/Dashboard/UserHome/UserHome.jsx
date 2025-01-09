import useAuth from "../../../Hooks/useAuth";

const UserHome = () => {
    const { user } = useAuth()
    return (
        <div>
            <h1 className="text-4xl"> Hi, Welcome user :{user.displayName ? user.displayName : "Back"}</h1>
        </div>
    );
};

export default UserHome;