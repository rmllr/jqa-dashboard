import React from "react";
import DashboardAbstract, {
    databaseCredentialsProvided
} from "../../AbstractDashboardComponent";
import CustomCardHeader from "../../CustomCardHeader/CustomCardHeader";
import { Row, Col, Card, CardBody } from "reactstrap";
import ContextMapGraph from "./visualizations/ContextMapGraph";
import BoundedContextModel from "../../../../api/models/BoundedContextes";
import "./style.css";

var AppDispatcher = require("../../../../AppDispatcher");

const contextMapDescription =
    "This diagram shows all Domain Driven Design elements and help you to get a overview over the project" +
    " structure. ";

class ContextMap extends DashboardAbstract {
    constructor(props) {
        super(props);

        this.state = {
            query: "",
            graphData: [],
            boundedContextList: [],
            currentContext: "root",
            displayDomainEvents: true,
            eventSwitchDisabled: false,
            legend: []
        };

        this.focusBoundedContext = this.focusBoundedContext.bind(this);
        this.clickOnNode = this.clickOnNode.bind(this);
        this.changeDisplayDomainEvents = this.changeDisplayDomainEvents.bind(
            this
        );
    }

    componentDidMount() {
        super.componentDidMount();

        this.setState({
            query: localStorage.getItem("context_map_expert_query")
        });

        this.updateContextMapData();
    }

    updateContextMapData(context) {
        this.clearContextMap();
        //ROOT VIEW
        if (typeof context === "undefined" && databaseCredentialsProvided) {
            var boundedContextModel = new BoundedContextModel();
            boundedContextModel.readBoundedContext(this);
        }

        //DETAIL VIEW
        if (typeof context !== "undefined" && databaseCredentialsProvided) {
            var boundedContextModel = new BoundedContextModel();
            boundedContextModel.readSpecificContext(this, context);
            this.setState({
                eventSwitchDisabled: true
            });
        }
    }

    clear(event) {
        localStorage.setItem(
            "context_map_expert_query",
            localStorage.getItem("context_map_query")
        );
        this.sendQuery(this);
    }

    clearContextMap() {
        this.setState({
            graphData: []
        });
    }
    sendQuery(event) {
        this.setState({
            query: localStorage.getItem("context_map_query")
        });

        AppDispatcher.handleAction({
            actionType: "EXPERT_QUERY",
            data: {
                queryString: localStorage.getItem("context_map_query")
            }
        });
    }

    focusBoundedContext(context) {
        this.setState({
            currentContext: context
        });
        this.updateContextMapData(context);
    }

    clickOnNode(nodeId) {
        if (
            this.state.graphData !== undefined &&
            this.state.graphData.nodes !== undefined
        ) {
            for (const node of this.state.graphData.nodes) {
                if (
                    node.id === nodeId &&
                    node.labels.indexOf("BoundedContext") > -1
                ) {
                    this.focusBoundedContext(node.name);
                    break;
                }
            }
        }
    }

    isActive(context) {
        return this.state.currentContext === context ? "active" : "";
    }

    resetView() {
        this.setState({
            currentContext: undefined
        });
        this.updateContextMapData();
    }

    showCompleteGraph() {
        this.clearContextMap();
        var boundedContextModel = new BoundedContextModel();
        boundedContextModel.contextMapWithAllNodes(this);
    }

    showContextMapWithoutEvents() {
        this.clearContextMap();
        var boundedContextModel = new BoundedContextModel();
        boundedContextModel.readBoundedContextWithoutDomainEvents(this);
    }

    changeDisplayDomainEvents(checked) {
        this.setState({ displayDomainEvents: checked });
        this.updateContextMapData();
    }

    render() {
        const legend = this.state.legend.map(d => (
            <div
                key={d.name}
                className={"node-description"}
                style={{ backgroundColor: d.color }}
            >
                {d.name}
            </div>
        ));
        let boundedContextNavigation = "";
        if (this.state.boundedContextList.length !== 0) {
            boundedContextNavigation = (
                <ul>
                    <a>
                        <li onClick={() => this.showCompleteGraph()}>
                            Show complete graph
                        </li>
                    </a>
                    <a>
                        <li onClick={() => this.resetView()}>
                            Context Overview with Events
                        </li>
                    </a>
                    <a>
                        <li onClick={() => this.showContextMapWithoutEvents()}>
                            Context Overview without Events
                        </li>
                    </a>
                    <hr />
                    Display specific context:
                    {this.state.boundedContextList.map((d, i) => (
                        <a
                            key={i}
                            onClick={() => this.focusBoundedContext(d)}
                            className={this.isActive(d)}
                        >
                            <li key={i}>{d}</li>
                        </a>
                    ))}
                </ul>
            );
        }

        var redirect = super.render();
        if (redirect.length > 0) {
            return redirect;
        }

        return (
            <div>
                <Row>
                    <Col xs="12" sm="12" md="12">
                        <Card>
                            <CustomCardHeader
                                cardHeaderText={"Context Map"}
                                showExpertMode={false}
                                placement={"bottom"}
                                target={"Popover1"}
                                popoverHeaderText={"Context Map"}
                                popoverBody={contextMapDescription}
                            />
                            <CardBody>
                                <Row>
                                    <Col xs="10" sm="6" md="2">
                                        <Card
                                            data-simplebar
                                            style={{
                                                height: "635px",
                                                overflow: "hidden"
                                            }}
                                        >
                                            <CardBody
                                                className={
                                                    "context-map-navigation"
                                                }
                                            >
                                                {boundedContextNavigation}
                                                <hr />
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col xs="12" sm="8" md="10">
                                        <Card>
                                            <CardBody>{legend}</CardBody>
                                        </Card>
                                        <Card
                                            id="structure-component"
                                            style={{
                                                height: "560px",
                                                overflow: "hidden"
                                            }}
                                        >
                                            <CardBody>
                                                <ContextMapGraph
                                                    data={this.state.graphData}
                                                    clickOnNode={
                                                        this.clickOnNode
                                                    }
                                                ></ContextMapGraph>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default ContextMap;
