import React from "react";
import GetFile from "./GetFile";
import Tree from "./tree";

const HierarchyContainer = () => {
    const [fileTree, setFileTree] = React.useState([])
    const [currentComponent, setCurrentComponent] = React.useState(null);
    const [url, setUrl] = React.useState("http://localhost:8080/")
    const [data, setData] = React.useState(null);
    React.useEffect( () => {
        if (currentComponent){
            console.log(currentComponent.name)
            handleReset();
            handleClick();
        }
         // Listen for data from the main process.
    }, [currentComponent])

    function handleClick() {
        const webview = document.getElementById('webview');
        webview.openDevTools();
        webview.executeJavaScript(
            `
            const leftColumn = document.querySelector('[data-cy="${currentComponent.name}"]');
            let result = null;
            if (leftColumn) {
                const clone = leftColumn.cloneNode(true);
                document.body.innerHTML = '';
                document.body.appendChild(clone);
                result = clone.outerHTML;
            }
            result;
        `
        ).then(resultFromWebview => {
            // Here, use the result from the webview to update your React component state
            if (resultFromWebview) {
                setData(resultFromWebview);
            }
        });
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
            <Tree data={fileTree} setCurrentComponent={setCurrentComponent} currentComponent={currentComponent} htmlData={data}></Tree>
            <webview id='webview' src={url}></webview>
            {data}
        </div>
    )
}
export default HierarchyContainer;
