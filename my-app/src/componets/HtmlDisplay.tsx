import React from "react";

const Node = ({ element, setCurrentHTML, setCurrentTestId, currentHTML, currentTestId, url, currentComponent }) => {
  const [isSelected, setIsSelected] = React.useState(false);
  function handleClick () {
     if (element.attributes['data-cy']){
      setIsSelected(!isSelected);
      setCurrentHTML(element.nodeName)
      setCurrentTestId(`data-cy=${element.attributes['data-cy'].value}`)
      // Highlight thing on page
      const webview = document.getElementById('webview');
      webview.executeJavaScript(`
        document.querySelector('[data-cy=${element.attributes['data-cy'].value}]').style.border = "2px solid #1DF28F";
      `)

    }
    console.log(currentHTML, currentTestId)
  }
  React.useEffect(()=>{
    if (isSelected && (currentHTML !== element.nodeName || currentTestId !== `data-cy=${element.attributes['data-cy'].value}`)){
      setIsSelected(!isSelected);

    // reload the webview, reselect component
    const webview = document.getElementById('webview');
    webview.loadURL(url);
    
    // reselect component
    webview.executeJavaScript(`
    const leftColumn = document.querySelector('${currentComponent.htmlChildrenTestIds[0]}');
    let result = null;
    if (leftColumn) {
        const clone = leftColumn.cloneNode(true);
        document.body.innerHTML = '';
        document.body.appendChild(clone);
        result = clone.outerHTML;
    }
    result;
`)
    }
  }, [currentHTML, currentTestId])

  return (
    <div className="pl-5">
      <button
        onClick={handleClick}
        className="rounded-lg p-2"
        style={isSelected ? { backgroundColor: 'white' } : { backgroundColor: "transparent" }}
      >
        <strong>{element.nodeName}</strong>
        {element.attributes.length > 0 && (
          <span>
            (
            {Array.from(element.attributes).map((attr, index) => (
              <span key={index}>
                {attr.name}="{attr.value}"
                {index < element.attributes.length - 1 ? ", " : ""}
              </span>
            ))}
            )
          </span>
        )}
      </button>
      <div>
        {Array.from(element.children).map((child, index) => (
          <Node
            key={index}
            element={child}
            setCurrentHTML={setCurrentHTML}
            setCurrentTestId={setCurrentTestId}
            currentHTML={currentHTML}
            currentTestId={currentTestId}
            url={url}
            currentComponent={currentComponent}
          />
        ))}
      </div>
    </div>
  );
};

const HtmlDisplay = ({ htmlData, setCurrentHTML, setCurrentTestId, currentHTML, currentTestId, url, currentComponent }) => {
  const parsedHtml = new DOMParser().parseFromString(htmlData, "text/html");


  return (
    <div>
      <Node
        element={parsedHtml.body}
        setCurrentHTML={setCurrentHTML}
        setCurrentTestId={setCurrentTestId}
        currentHTML={currentHTML}
        currentTestId={currentTestId}
        url={url}
        currentComponent={currentComponent}
      />
    </div>
  );
};

export default HtmlDisplay;
