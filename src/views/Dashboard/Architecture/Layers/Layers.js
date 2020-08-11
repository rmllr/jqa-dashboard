import React from "react";
import DashboardAbstract, {
    databaseCredentialsProvided
} from "../../AbstractDashboardComponent";
import { Button, Row, Col, Card, CardBody } from "reactstrap";
import { ResponsiveBubble } from "@nivo/circle-packing";
import LayersModel from "../../../../api/models/LayersModel";
import { Treebeard } from "react-treebeard";

class Layers extends DashboardAbstract {
    constructor(props) {
        super(props);
        this.state = {
            data: {}
        };
    }

    componentDidMount() {
        super.componentDidMount();

        if (databaseCredentialsProvided) {
            const layersModel = new LayersModel();
            layersModel.readLayers(this);
        }
    }

    render() {
        {
            {
                console.log(this.state.data);
            }
        }
        return (
            <div>
                <Row>
                    <Col xs="12" sm="12" md="12">
                        <Card>
                            <CardBody>
                                <Row>
                                    <Col xs="12" sm="6" md="4">
                                        <Card
                                            id="treebeard-component"
                                            data-simplebar
                                            style={{
                                                height: "635px",
                                                overflow: "hidden"
                                            }}
                                        >
                                            <CardBody></CardBody>
                                        </Card>
                                    </Col>
                                    <Col xs="12" sm="6" md="8">
                                        <Card>
                                            <CardBody>
                                                <div
                                                    style={{ height: "600px" }}
                                                >
                                                    <ResponsiveBubble
                                                        root={this.state.data}
                                                        margin={{
                                                            top: 20,
                                                            right: 20,
                                                            bottom: 20,
                                                            left: 20
                                                        }}
                                                        identity="id"
                                                        value="loc"
                                                        colorBy={node => {
                                                            return node.color;
                                                        }}
                                                        animate={true}
                                                    />
                                                </div>
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

export default Layers;
