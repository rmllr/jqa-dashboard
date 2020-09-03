import React, { Component } from "react";
import { Graph } from "react-d3-graph";
import * as myConfig from "./GraphConfigurationContextMap";

class ContextMapGraph extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.data.length === 0 && !this.props.data.nodes) {
            return "";
        }

        return (
            <div className={"visualization-wrapper"}>
                <div style={{ height: "600px" }}>
                    <Graph
                        id="graph-id" // id is mandatory, if no id is defined rd3g will throw an error
                        data={this.props.data}
                        config={myConfig}
                        onClickNode={this.props.clickOnNode}
                    />
                </div>
            </div>
        );
    }
}

export default ContextMapGraph;
