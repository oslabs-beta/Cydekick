import React from "react";
import GetFile from "./GetFile";
import Tree from "./tree";

const HierarchyContainer = () => {
    const [fileTree, setFileTree] = React.useState([])
    const [currentComponent, setCurrentComponent] = React.useState(null);
    const [url, setUrl] = React.useState("https://bidet-lovers-c0859ebc4b92.herokuapp.com/")
    const webviewRef = React.useRef(null)

    React.useEffect( () => console.log(currentComponent), [currentComponent])
    function handleClick() {
        const webview = document.getElementById('webview');
        webview.executeJavaScript(
            `
            const leftColumn = document.querySelector('.left-column'); // querySelector('[data-cy="value"]')
            if (leftColumn) {
                const clone = leftColumn.cloneNode(true);
                document.body.innerHTML = '';
                document.body.appendChild(clone);
                clone.style.border = '5px solid red';
            }
        `
);
    }
    function onFormChange(){
        setUrl(document.getElementById("url_form_id").value)
    }
    function handleReset(){
        const webview = document.getElementById('webview');
        if (webview) {
            // Reload the original URL to reset the webview.
            webview.loadURL(url);
        }
    }

    
    return (
        <div>
            <input type='text' id="url_form_id" onChange={onFormChange} placeholder="localhost:9000"/>
            <GetFile setter={setFileTree}></GetFile>
            <Tree data={fileTree} setCurrentComponent={setCurrentComponent} currentComponent={currentComponent}></Tree>
            <webview id='webview' src={url}></webview>
            <button onClick={handleClick}>Test Button</button>
            <button onClick={handleReset}>Reset</button>
        </div>
    )
}
export default HierarchyContainer;
