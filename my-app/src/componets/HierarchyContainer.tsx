import React from "react";
import Tree from "./tree";


const HierarchyContainer = (props) => {
    const {url, fileTree, currentComponent, setCurrentComponent} = props;

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
                console.log(resultFromWebview)
                setData(resultFromWebview);
            }
        });
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
            <Tree data={fileTree} setCurrentComponent={setCurrentComponent} currentComponent={currentComponent} htmlData={data}></Tree>
            <webview id='webview' src={url}></webview>
            {data}
        </div>
    )
}
export default HierarchyContainer;
