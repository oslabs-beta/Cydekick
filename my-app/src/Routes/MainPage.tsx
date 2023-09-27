import React from "react";
import HierarchyContainer from "../componets/HierarchyContainer";
import { useNavigate } from "react-router";
import StatementPage from "../componets/StatementPage"

const MainPage = (props) =>{
    const {url, fileTree} = props;
    const [currentComponent, setCurrentComponent] = React.useState(null);
    const navigate = useNavigate();


    const handleBackButton = () =>{
        navigate('/')
    }
    console.log(url)
    return(<div>
        {/* <button onClick={handleBackButton}>Go Back not working?</button> */}
        <HierarchyContainer url={url} fileTree={fileTree} currentComponent={currentComponent} setCurrentComponent={setCurrentComponent}/>
    </div>)


}
export default MainPage;