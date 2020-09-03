module.exports = {
    automaticRearrangeAfterDropNode: false,
    collapsible: true,
    height: 600,
    highlightDegree: 2,
    highlightOpacity: 0.2,
    linkHighlightBehavior: true,
    maxZoom: 8,
    minZoom: 0.1,
    nodeHighlightBehavior: true,
    panAndZoom: false,
    staticGraph: false,
    width: 1400,
    directed: true,
    node: {
        color: "#FFC454",
        fontColor: "black",
        fontSize: 12,
        fontWeight: "normal",
        //highlightColor: "red",
        highlightFontSize: 12,
        //highlightFontWeight: "bold",
        highlightStrokeWidth: 1.5,
        labelProperty: "name",
        mouseCursor: "pointer",
        opacity: 1,
        renderLabel: true,
        size: 2000,
        strokeColor: "none",
        strokeWidth: 1.5,
        svg: "",
        symbolType: "circle"
    },
    link: {
        color: "#d3d3d3",
        fontColor: "#000",
        fontSize: 10,
        highlightColor: "#788085",
        highlightFontSize: 20,
        //highlightFontWeight: "bold",
        labelProperty: "type",
        opacity: 1,
        renderLabel: true,
        semanticStrokeWidth: true,
        strokeWidth: 2
    },
    d3: {
        alpha: 0.2,
        gravity: -1500,
        linkLength: 200,
        linkStrength: function(link) {
            if (link.type === "CONTAINS") {
                return 1;
            } else {
                return 0.001;
            }
        }
    }
};
