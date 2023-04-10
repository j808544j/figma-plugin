const selectedNode = figma.currentPage.selection[0];
let css = [];
let html = [];
if (selectedNode && selectedNode.type === "FRAME") {
  const textNodes = selectedNode.findAll((node) => node.type === "TEXT");

  textNodes.forEach((textNode) => {
    console.log("textnode", textNode);
    const className = textNode.id;
    const textContent = textNode.characters;
    let textStyle = textNode.getStyledTextSegments([
      "fontName",
      "fontSize",
      "fontWeight",
      "textDecoration",
      "textCase",
      "lineHeight",
      "letterSpacing",
      "fills",
      "textStyleId",
      "fillStyleId",
      "listOptions",
      "indentation",
      "hyperlink",
    ])[0];

    const cssString = `.selector {
        font-family: ${textStyle.fontName.family};
        font-size: ${textStyle.fontSize}px;
        font-weight: ${textStyle.fontWeight};
        letter-spacing: ${textStyle.letterSpacing.value}${
      textStyle.letterSpacing.unit
    };
        line-height: ${
          textStyle.lineHeight.unit === "AUTO"
            ? "normal"
            : `${textStyle.lineHeight.value}${textStyle.lineHeight.unit}`
        };
        text-transform: ${textStyle.textCase.toLowerCase()};
        text-decoration: ${textStyle.textDecoration.toLowerCase()};
        color: rgb(${Math.round(
          textStyle.fills[0].color.r * 255
        )}, ${Math.round(textStyle.fills[0].color.g * 255)}, ${Math.round(
      textStyle.fills[0].color.b * 255
    )});
      }`;

    css.push(cssString);
    html.push(`<div class=${className} > ${textContent}</div>`);
    console.log("ff", html, css);
  });
} else {
  console.log(
    "Please select a valid container node (a frame or a group) that contains text nodes."
  );
}

console.log("ff", html, css);
