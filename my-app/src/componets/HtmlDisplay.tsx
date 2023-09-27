import React from "react";

const Node = ({ element }) => {
  return (
    <div className="pl-5">
      <div>
        <strong>{element.nodeName}</strong>
        {element.attributes.length > 0 && (
          <span>
            {" "}
            (
            {Array.from(element.attributes).map((attr, index) => (
              <span key={index}>
                {attr.name}="{attr.value}"{index < element.attributes.length - 1 ? ", " : ""}
              </span>
            ))}
            )
          </span>
        )}
      </div>
      <div>
        {Array.from(element.children).map((child, index) => (
          <Node key={index} element={child} />
        ))}
      </div>
    </div>
  );
};

const HtmlDisplay = ({ htmlData }) => {
  const parsedHtml = new DOMParser().parseFromString(htmlData, "text/html");

  return (
    <div>
      <Node element={parsedHtml.body} />
    </div>
  );
};

export default HtmlDisplay;
