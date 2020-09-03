import { neo4jSession } from "../../views/Dashboard/AbstractDashboardComponent";

class BoundedContextModel {
    constructor(props) {
        const boundedContextQuery =
            "match (c0:BoundedContext), (c1:DDD:BoundedContext)-[r1:DEPENDS_ON]->(c2:DDD:BoundedContext), (c1)-[r2:CONTAINS]->(e:DDD:DomainEvent),\n" +
            "(b:BoundedContext)-[:CONTAINS]->(listener:Class), \n" +
            "(listener)-[]-(e) \n" +
            "MERGE(b)<-[r3:LISTEN_ON]-(e)\n" +
            "return c0,c1,c2,e,r1,r2,r3";

        const contextMapWithAllElements =
            "match (c0:BoundedContext), (c1:DDD:BoundedContext)-[r1:DEPENDS_ON]->(c2:DDD:BoundedContext),\n" +
            "(c1)-[r2:CONTAINS]->(e:DDD:DomainEvent),\n" +
            "(c0)-[r4:CONTAINS]->(c3:DDD),\n" +
            "(b:BoundedContext)-[:CONTAINS]->(listener:Class),\n" +
            "(listener)-[]-(e)\n" +
            "MERGE(b)<-[r3:HANDLED_BY]-(e)\n" +
            "ON MATCH SET c3.boundedContext = c0.name\n" +
            "ON MATCH SET c0.boundedContext = c0.name\n" +
            "return c0,c1,c2,c3,e,r1,r2,r3,r4";

        const elementsOfContextQuery =
            'match(c0:DDD {name: "$context$"})-[r]->(c1:DDD),\n' +
            "(c1)-[r1]->(c2:DDD)\n" +
            'where c1.sourceFileName <> "package-info.java" and not (c2:BoundedContext) \n' +
            "return c0, c1,c2, r, r1";

        const boundedContextWithoutEvents =
            "match (c0:BoundedContext), (c1:DDD:BoundedContext)-[r1:DEPENDS_ON]->(c2:DDD:BoundedContext)" +
            " return c0,c1,c2,r1";

        localStorage.setItem(
            "bounded_context_original_query",
            boundedContextQuery
        );

        this.state = {
            queryString: boundedContextQuery,
            elementsOfContextQuery: elementsOfContextQuery,
            boundedContextWithoutEvents: boundedContextWithoutEvents,
            contextMapWithAllElements: contextMapWithAllElements
        };

        if (!localStorage.getItem("bounded_context_expert_query")) {
            localStorage.setItem(
                "bounded_context_expert_query",
                this.state.queryString
            );
        } else {
            this.state.queryString = localStorage.getItem(
                "bounded_context_expert_query"
            );
        }
    }

    static transformNodeIds(nodes) {
        for (let node of nodes) {
            node.id = "node-" + node.identity.low + "-" + node.identity.high;
            node.name = node.properties.name;
            node.x = Math.floor(Math.random() * 300) + 100;
            node.y = Math.floor(Math.random() * 400) + 200;
        }
    }

    static colorizeNodes(nodes) {
        for (let node of nodes) {
            if (node.labels.indexOf("BoundedContext")) {
                node.color = "#f7dc6f";
                node.dddLabel = "Bounded Context";
            } else {
                node.color = "#dedede";
            }

            if (node.labels.indexOf("DomainEvent") > -1) {
                node.color = "#c39bd2";
                node.dddLabel = "Domain Event";
            } else if (node.labels.indexOf("AggregateRoot") > -1) {
                node.color = "#7dce9f";
                node.dddLabel = "Aggregate Root";
            } else if (node.labels.indexOf("Entity") > -1) {
                node.color = "#73c6b5";
                node.dddLabel = "Entity";
            } else if (node.labels.indexOf("Service") > -1) {
                node.color = "#f19489";
                node.dddLabel = "Service";
            } else if (node.labels.indexOf("ValueObject") > -1) {
                node.color = "#76d7c3";
                node.dddLabel = "Value Object";
            } else if (node.labels.indexOf("Repository") > -1) {
                node.color = "#85c1e9";
                node.dddLabel = "Repository";
            } else if (node.labels.indexOf("Factory") > -1) {
                node.color = "#e59865";
                node.dddLabel = "Factory";
            }
        }
    }

    static generateLegend(nodes) {
        let legend = [];
        let bcs = [];
        for (let node of nodes) {
            if (bcs.indexOf(node.dddLabel) === -1) {
                bcs.push(node.dddLabel);
                legend.push({
                    name: node.dddLabel,
                    color: node.color
                });
            }
        }

        return legend;
    }

    static generateLegendCompleteGraph(nodes) {
        let legend = [];
        let bcs = [];
        for (let node of nodes) {
            if (bcs.indexOf(node.properties.boundedContext) === -1) {
                bcs.push(node.properties.boundedContext);
                legend.push({
                    name: node.properties.boundedContext,
                    color: node.color
                });
            }
        }

        return legend;
    }

    static colorizeNodesByContext(nodes) {
        let bcs = [];
        let colors = [
            "#63b598",
            "#ce7d78",
            "#ea9e70",
            "#a48a9e",
            "#c6e1e8",
            "#648177",
            "#0d5ac1",
            "#f205e6",
            "#1c0365",
            "#14a9ad",
            "#4ca2f9",
            "#a4e43f",
            "#d298e2",
            "#6119d0",
            "#d2737d",
            "#c0a43c",
            "#f2510e",
            "#651be6",
            "#79806e",
            "#61da5e",
            "#cd2f00",
            "#9348af",
            "#01ac53",
            "#c5a4fb",
            "#996635",
            "#b11573",
            "#4bb473",
            "#75d89e",
            "#2f3f94",
            "#2f7b99",
            "#da967d",
            "#34891f",
            "#b0d87b",
            "#ca4751",
            "#7e50a8",
            "#c4d647",
            "#e0eeb8",
            "#11dec1",
            "#289812",
            "#566ca0",
            "#ffdbe1",
            "#2f1179",
            "#935b6d",
            "#916988",
            "#513d98",
            "#aead3a",
            "#9e6d71",
            "#4b5bdc",
            "#0cd36d",
            "#250662",
            "#cb5bea",
            "#228916",
            "#ac3e1b",
            "#df514a",
            "#539397",
            "#880977",
            "#f697c1",
            "#ba96ce",
            "#679c9d",
            "#c6c42c",
            "#5d2c52",
            "#48b41b",
            "#e1cf3b",
            "#5be4f0",
            "#57c4d8",
            "#a4d17a",
            "#225b8",
            "#be608b",
            "#96b00c",
            "#088baf",
            "#f158bf",
            "#e145ba",
            "#ee91e3",
            "#05d371",
            "#5426e0",
            "#4834d0",
            "#802234",
            "#6749e8",
            "#0971f0",
            "#8fb413",
            "#b2b4f0",
            "#c3c89d",
            "#c9a941",
            "#41d158",
            "#fb21a3",
            "#51aed9",
            "#5bb32d",
            "#807fb",
            "#21538e",
            "#89d534",
            "#d36647",
            "#7fb411",
            "#0023b8",
            "#3b8c2a",
            "#986b53",
            "#f50422",
            "#983f7a",
            "#ea24a3",
            "#79352c",
            "#521250",
            "#c79ed2",
            "#d6dd92",
            "#e33e52",
            "#b2be57",
            "#fa06ec",
            "#1bb699",
            "#6b2e5f",
            "#64820f",
            "#1c271",
            "#21538e",
            "#89d534",
            "#d36647",
            "#7fb411",
            "#0023b8",
            "#3b8c2a",
            "#986b53",
            "#f50422",
            "#983f7a",
            "#ea24a3",
            "#79352c",
            "#521250",
            "#c79ed2",
            "#d6dd92",
            "#e33e52",
            "#b2be57",
            "#fa06ec",
            "#1bb699",
            "#6b2e5f",
            "#64820f",
            "#1c271",
            "#9cb64a",
            "#996c48",
            "#9ab9b7",
            "#06e052",
            "#e3a481",
            "#0eb621",
            "#fc458e",
            "#b2db15",
            "#aa226d",
            "#792ed8",
            "#73872a",
            "#520d3a",
            "#cefcb8",
            "#a5b3d9",
            "#7d1d85",
            "#c4fd57",
            "#f1ae16",
            "#8fe22a",
            "#ef6e3c",
            "#243eeb",
            "#1dc18",
            "#dd93fd",
            "#3f8473",
            "#e7dbce",
            "#421f79",
            "#7a3d93",
            "#635f6d",
            "#93f2d7",
            "#9b5c2a",
            "#15b9ee",
            "#0f5997",
            "#409188",
            "#911e20",
            "#1350ce",
            "#10e5b1",
            "#fff4d7",
            "#cb2582",
            "#ce00be",
            "#32d5d6",
            "#117232",
            "#608572",
            "#c79bc2",
            "#00f87c",
            "#77772a",
            "#6995ba",
            "#fc6b57",
            "#f07815",
            "#8fd883",
            "#060e27",
            "#96e591",
            "#21d52e",
            "#d00043",
            "#b47162",
            "#1ec227",
            "#4f0f6f",
            "#1d1d58",
            "#947002",
            "#bde052",
            "#e08c56",
            "#28fcfd",
            "#1bb09b",
            "#36486a",
            "#d02e29",
            "#1ae6db",
            "#3e464c",
            "#a84a8f",
            "#911e7e",
            "#3f16d9",
            "#0f525f",
            "#ac7c0a",
            "#b4c086",
            "#c9d730",
            "#30cc49",
            "#3d6751",
            "#fb4c03",
            "#640fc1",
            "#62c03e",
            "#d3493a",
            "#88aa0b",
            "#406df9",
            "#615af0",
            "#14be47",
            "#2a3434",
            "#4a543f",
            "#79bca0",
            "#a8b8d4",
            "#00efd4",
            "#7ad236",
            "#7260d8",
            "#1deaa7",
            "#06f43a",
            "#823c59",
            "#e3d94c",
            "#dc1c06",
            "#f53b2a",
            "#b46238",
            "#2dfff6",
            "#a82b89",
            "#1a8011",
            "#436a9f",
            "#1a806a",
            "#4cf09d",
            "#c188a2",
            "#67eb4b",
            "#b308d3",
            "#fc7e41",
            "#af3101",
            "#ff065",
            "#71b1f4",
            "#a2f8a5",
            "#e23dd0",
            "#d3486d",
            "#00f7f9",
            "#474893",
            "#3cec35",
            "#1c65cb",
            "#5d1d0c",
            "#2d7d2a",
            "#ff3420",
            "#5cdd87",
            "#a259a4",
            "#e4ac44",
            "#1bede6",
            "#8798a4",
            "#d7790f",
            "#b2c24f",
            "#de73c2",
            "#d70a9c",
            "#125b67",
            "#88e9b8",
            "#c2b0e2",
            "#86e98f",
            "#ae90e2",
            "#1a806b",
            "#436a9e",
            "#0ec0ff",
            "#f812b3",
            "#b17fc9",
            "#8d6c2f",
            "#d3277a",
            "#2ca1ae",
            "#9685eb",
            "#8a96c6",
            "#dba2e6",
            "#76fc1b",
            "#608fa4",
            "#20f6ba",
            "#07d7f6",
            "#dce77a",
            "#77ecca"
        ];
        for (let node of nodes) {
            if (bcs.indexOf(node.properties.boundedContext) === -1) {
                bcs.push(node.properties.boundedContext);
            }

            node.color = colors[bcs.indexOf(node.properties.boundedContext)];
        }
    }

    static transformLinkIds(links) {
        console.log(links);
        for (let link of links) {
            link.id = "rel" + link.identity.low + "-" + link.identity.high;
            link.source = "node-" + link.start.low + "-" + link.start.high;
            link.target = "node-" + link.end.low + "-" + link.end.high;
            link.name = link.type;
        }
    }

    static removeDuplicatedElements(array) {
        array = array.filter(
            (elem, index, self) =>
                self.findIndex(t => {
                    return t.id === elem.id;
                }) === index
        );
        return array;
    }

    readBoundedContext(self) {
        var nodes = [];
        var links = [];
        var contextList = [];
        neo4jSession
            .run(this.state.queryString)
            .then(function(result) {
                console.log(result);
                result.records.forEach(function(record) {
                    nodes.push(record.get("c0"));
                    nodes.push(record.get("c1"));
                    nodes.push(record.get("c2"));
                    nodes.push(record.get("e"));
                    links.push(record.get("r1"));
                    links.push(record.get("r2"));
                    links.push(record.get("r3"));
                });

                BoundedContextModel.transformNodeIds(nodes);
                nodes = BoundedContextModel.removeDuplicatedElements(nodes);
                BoundedContextModel.transformLinkIds(links);
                links = BoundedContextModel.removeDuplicatedElements(links);
                BoundedContextModel.colorizeNodes(nodes);
                const generatedLegend = BoundedContextModel.generateLegend(
                    nodes
                );

                for (let node of nodes) {
                    if (node.labels.indexOf("BoundedContext") > -1) {
                        contextList.push(node.name);
                    }
                }

                console.log(links);
                self.setState({
                    legend: generatedLegend,
                    graphData: {
                        nodes: nodes,
                        links: links
                    },
                    boundedContextList: contextList
                });
            })
            .catch(function(error) {
                console.log(error);
            });
    }

    readBoundedContextWithoutDomainEvents(self) {
        var nodes = [];
        var links = [];
        var contextList = [];
        neo4jSession
            .run(this.state.queryString)
            .then(function(result) {
                console.log(result);
                result.records.forEach(function(record) {
                    nodes.push(record.get("c0"));
                    nodes.push(record.get("c1"));
                    nodes.push(record.get("c2"));
                    links.push(record.get("r1"));
                });

                BoundedContextModel.transformNodeIds(nodes);
                nodes = BoundedContextModel.removeDuplicatedElements(nodes);
                BoundedContextModel.transformLinkIds(links);
                links = BoundedContextModel.removeDuplicatedElements(links);
                BoundedContextModel.colorizeNodes(nodes);
                const generatedLegend = BoundedContextModel.generateLegend(
                    nodes
                );

                for (let node of nodes) {
                    if (node.labels.indexOf("BoundedContext") > -1) {
                        contextList.push(node.name);
                    }
                }

                self.setState({
                    legend: generatedLegend,
                    graphData: {
                        nodes: nodes,
                        links: links
                    },
                    boundedContextList: contextList
                });
            })
            .catch(function(error) {
                console.log(error);
            });
    }

    readSpecificContext(self, context) {
        var nodes = [];
        var links = [];
        neo4jSession
            .run(
                this.state.elementsOfContextQuery.replace("$context$", context)
            )
            .then(function(result) {
                console.log(result);
                result.records.forEach(function(record) {
                    nodes.push(record.get("c0"));
                    nodes.push(record.get("c1"));
                    nodes.push(record.get("c2"));
                    links.push(record.get("r"));
                    links.push(record.get("r1"));
                });

                BoundedContextModel.transformNodeIds(nodes);
                nodes = BoundedContextModel.removeDuplicatedElements(nodes);
                BoundedContextModel.transformLinkIds(links);
                links = BoundedContextModel.removeDuplicatedElements(links);
                BoundedContextModel.colorizeNodes(nodes);
                const generatedLegend = BoundedContextModel.generateLegend(
                    nodes
                );

                self.setState({
                    legend: generatedLegend,
                    graphData: {
                        nodes: nodes,
                        links: links
                    }
                });
            })
            .catch(function(error) {
                console.log(error);
            });
    }

    contextMapWithAllNodes(self) {
        var nodes = [];
        var links = [];
        neo4jSession
            .run(this.state.contextMapWithAllElements)
            .then(function(result) {
                console.log(result);
                result.records.forEach(function(record) {
                    nodes.push(record.get("c0"));
                    nodes.push(record.get("c1"));
                    nodes.push(record.get("c2"));
                    nodes.push(record.get("c3"));
                    nodes.push(record.get("e"));
                    links.push(record.get("r1"));
                    links.push(record.get("r2"));
                    links.push(record.get("r3"));
                    links.push(record.get("r4"));
                });

                BoundedContextModel.transformNodeIds(nodes);
                nodes = BoundedContextModel.removeDuplicatedElements(nodes);
                BoundedContextModel.transformLinkIds(links);
                links = BoundedContextModel.removeDuplicatedElements(links);
                BoundedContextModel.colorizeNodesByContext(nodes);
                const generatedLegend = BoundedContextModel.generateLegendCompleteGraph(
                    nodes
                );

                self.setState({
                    legend: generatedLegend,
                    graphData: {
                        nodes: nodes,
                        links: links
                    }
                });
            })
            .catch(function(error) {
                console.log(error);
            });
    }
}

export default BoundedContextModel;
