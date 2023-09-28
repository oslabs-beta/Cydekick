import React from "react";

const Node = ({ element, setCurrentHTML, setCurrentTestId, currentHTML, currentTestId }) => {
  const [isSelected, setIsSelected] = React.useState(false);
  function handleClick() {
    setIsSelected(!isSelected);
    setCurrentHTML(element.nodeName)
    setCurrentTestId(JSON.stringify(element.attributes))
    console.log(currentHTML);
    console.log(element.attributes)
  }
  React.useEffect(()=>{
    if (isSelected && (currentHTML !== element.nodeName || currentTestId !== JSON.stringify(element.attributes))) setIsSelected(!isSelected);
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

const HtmlDisplay = ({ htmlData, setCurrentHTML, setCurrentTestId, currentHTML, currentTestId }) => {
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