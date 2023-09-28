import React from "react";


const Webview = (props) => {
    const {url, currentComponent, setData, currentTestId } = props;



    React.useEffect( () => {
        if (currentComponent){
            console.log(currentComponent.name)
            handleReset();
            handleClick();
        }
         // Listen for data from the main process.
    }, [currentComponent])

    function handleClick() {
        console.log('entered function handleClick')
        const webview = document.getElementById('webview');
        console.log('got webview')
        console.log('current test id', currentTestId)
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
        <div className="w-1/2 h-screen flex flex-col p-2">
        <button onClick={handleReset} className="self-end justify-self-end rounded-lg p-2 mb-2 z-1" style={{backgroundColor: "#1DF28F"}}>Refresh</button>
        <webview id='webview' src={url} className="flex-grow"></webview>
      </div>

    )
}
export default Webview;
