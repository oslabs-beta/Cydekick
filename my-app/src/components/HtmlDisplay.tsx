import React from "react";

type NodeProps = {
  setCurrentHTML: React.Dispatch<React.SetStateAction<string>>,
  currentHTML: string,
  currentTestId: string,
  element: Element,
  setCurrentTestId: React.Dispatch<React.SetStateAction<string>>,
}

const Node = ({ element, setCurrentHTML, setCurrentTestId, currentHTML, currentTestId}:NodeProps) => {
  const [isSelected, setIsSelected] = React.useState(false);
  function handleClick () {
     if (element.attributes.getNamedItem("data-cy") ){
      setIsSelected(!isSelected);
      setCurrentHTML(element.nodeName)
      setCurrentTestId(`data-cy=${element.attributes.getNamedItem("data-cy") .value}`)
      // Highlight thing on page
      const webview = document.getElementById('webview') as Electron.WebviewTag | null;
      webview.executeJavaScript(`
        document.querySelector('[data-cy=${element.attributes.getNamedItem("data-cy") .value}]').style.border = "2px solid #1DF28F";
      `)

    }
    console.log(currentHTML, currentTestId)
  }
  React.useEffect(()=>{
    if (isSelected && (currentHTML !== element.nodeName || currentTestId !== `data-cy=${element.attributes.getNamedItem("data-cy") .value}`)){
      setIsSelected(!isSelected);
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
          />
        ))}
      </div>
    </div>
  );
};

type HtmlDisplayProps = {
  htmlData:string,
  setCurrentHTML: React.Dispatch<React.SetStateAction<string>>,
  setCurrentTestId: React.Dispatch<React.SetStateAction<string>>,
  currentHTML:string,
  currentTestId:string,
}

const HtmlDisplay: React.FC<HtmlDisplayProps> = ({
  htmlData,
  setCurrentHTML,
  setCurrentTestId,
  currentHTML,
  currentTestId,
}: HtmlDisplayProps) => {
  const parsedHtml = new DOMParser().parseFromString(htmlData, "text/html");


  return (
    <div>
      <Node
        element={parsedHtml.body}
        setCurrentHTML={setCurrentHTML}
        setCurrentTestId={setCurrentTestId}
        currentHTML={currentHTML}
        currentTestId={currentTestId}
      />
    </div>
  );
};

export default HtmlDisplay;
