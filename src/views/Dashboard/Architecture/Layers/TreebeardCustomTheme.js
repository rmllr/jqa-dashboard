//'use strict';

export default {
    tree: {
        base: {
            listStyle: "none",
            backgroundColor: "#ffffff",
            margin: "0px",
            padding: "0px",
            color: "#151b1e"
        },
        node: {
            base: {
                position: "relative"
            },
            link: {
                cursor: "pointer",
                position: "relative",
                padding: "0px 5px",
                display: "block"
            },
            activeLink: {
                background: "#EEEEEE",
                border: "1px solid #DDDDDD",
                borderRadius: "3px"
            },
            toggle: {
                base: {
                    position: "relative",
                    display: "inline-block",
                    verticalAlign: "top",
                    marginLeft: "-5px",
                    height: "24px",
                    width: "24px"
                },
                wrapper: {
                    position: "absolute",
                    top: "50%",
                    left: "56%",
                    margin: "-11px 0px 0px -7px",
                    height: "10px"
                },
                height: 12,
                width: 12,
                arrow: {
                    fill: "#9da5ab",
                    strokeWidth: "0px"
                }
            },
            header: {
                base: {
                    display: "inline-block",
                    verticalAlign: "middle",
                    color: "#151b1e"
                },
                connector: {
                    width: "2px",
                    height: "12px",
                    borderLeft: "solid 2px black",
                    borderBottom: "solid 2px black",
                    position: "absolute",
                    top: "0px",
                    left: "-21px"
                },
                title: {
                    verticalAlign: "middle"
                }
            },
            subtree: {
                listStyle: "none",
                paddingLeft: "19px"
            },
            loading: {
                color: "#E2C089"
            }
        }
    }
};
