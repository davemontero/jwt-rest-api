import { useNavigate } from "react-router-dom";
const Private = () => {
    let navigate = useNavigate();
    const handleLogout = () => {
        localStorage.clear();
        navigate("/");
    }
    return (
        <>
        <h1>Hello World from Private page</h1>
        <button onClick={handleLogout}>logout</button>
        </>
    )
}

export default Private