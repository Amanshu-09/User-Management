import { useSelector } from "react-redux";

function ACL({ children, roles = [] }) {
    const { currentUserData } = useSelector(state => state);

    return (
        roles?.includes(currentUserData.role) ? children : null
    );
}

export default ACL;