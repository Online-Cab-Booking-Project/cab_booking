import { Route } from "react-router-dom";
import url from "../configs/urlConfig";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Popup from "./Popup";
import { credentialsActions } from "../react-redux-components/credentials-slice";

function UserProtectedRoutes(props) {
    const isPassenger = useSelector((state) => state.credential.isPassenger);
    const isDriver = useSelector((state) => state.credential.isDriver);

    const dispatch = useDispatch();
    var token = window.sessionStorage.getItem("JWT_TOKEN");

    var onClose = () => {
        setTimeout(() => { window.location.replace('/login') }, 5000);
        return true;
    }


    if (token !== null && token !== undefined && (isPassenger || isDriver)) {
        return <Route path={props.path} exact
            component={props.component} />
    }
    else {
        return <Popup onClose={onClose()} />
    }
}

export default UserProtectedRoutes;