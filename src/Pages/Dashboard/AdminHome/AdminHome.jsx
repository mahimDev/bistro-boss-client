import useAuth from "../../../Hooks/useAuth";

const AdminHome = () => {
    const { user } = useAuth()
    return (
        <div>
            <h1 className="text-4xl"> Hi, Welcome {user.displayName ? user.displayName : "Back"}</h1>
        </div>
    );
};

export default AdminHome;