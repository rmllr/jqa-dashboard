import { neo4jSession } from "../../views/Dashboard/AbstractDashboardComponent";

class DashboardModel {
    constructor(props) {
        const dashboardStructureQuery =
            // architecture metrics (table 1)
            // number of classes
            "OPTIONAL MATCH (t:Type:Class) " +
            "WITH count(t) as classes " +
            // number of interfaces
            "OPTIONAL MATCH (t:Type:Interface) " +
            "WITH classes, count(t) as interfaces " +
            // number of enums
            "OPTIONAL MATCH (t:Type:Enum) " +
            "WITH classes, interfaces, count(t) as enums " +
            // number of annotations
            "OPTIONAL MATCH (t:Type:Annotation) " +
            "WITH  classes, interfaces, enums, count(t) as annotations " +
            // number of methods and lines of code
            "OPTIONAL MATCH (:Artifact)-[:CONTAINS]->(t:Type), (t)-[:DECLARES]->(m:Method) " +
            "WITH classes, interfaces, enums, annotations, count(m) as methods, sum(m.effectiveLineCount) as loc " +
            // number of fields
            "OPTIONAL MATCH (:Artifact)-[:CONTAINS]->(t:Type), (t)-[:DECLARES]->(f:Field) " +
            "RETURN classes, interfaces, enums, annotations, methods, loc, count(f) as fields";

        localStorage.setItem(
            "dashboard_structure_original_query",
            dashboardStructureQuery
        );

        const dashboardDependenciesQuery =
            // relation metrics (table 2)
            // dependencies
            "OPTIONAL MATCH (:Artifact)-[:CONTAINS]->(t:Type), (t)-[d:DEPENDS_ON]->(:Type) " +
            "WITH count(d) as dependencies " +
            // extends
            "OPTIONAL MATCH (:Artifact)-[:CONTAINS]->(t:Type), (t)-[e:EXTENDS]->(superType:Type) " +
            'WHERE superType.name <> "Object" ' +
            "WITH dependencies, count(e) as extends " +
            // implements
            "OPTIONAL MATCH (:Artifact)-[:CONTAINS]->(t:Type), (t)-[i:IMPLEMENTS]->(:Type) " +
            "WITH dependencies, extends, count(i) as implements " +
            // calls
            "OPTIONAL MATCH (:Artifact)-[:CONTAINS]->(t:Type), (t)-[:DECLARES]->(m:Method)-[i:INVOKES]->(:Method) " +
            "WITH dependencies, extends, implements, count(i) as invocations " +
            // reads
            "OPTIONAL MATCH (:Artifact)-[:CONTAINS]->(t:Type), (t)-[:DECLARES]->(m:Method)-[r:READS]->(:Field) " +
            "WITH dependencies, extends, implements, invocations, count(r) as reads " +
            // writes
            "OPTIONAL MATCH (:Artifact)-[:CONTAINS]->(t:Type), (t)-[:DECLARES]->(m:Method)-[w:WRITES]->(:Field) " +
            "RETURN dependencies, extends, implements, invocations, reads, count(w) as writes";
        localStorage.setItem(
            "dashboard_dependencies_original_query",
            dashboardDependenciesQuery
        );

        const dashboardActivityQuery =
            // activity metrics (table)
            // number of authors
            "OPTIONAL MATCH (a:Author) " +
            "WITH count(a) as authors " +
            // number of commits (without merges)
            "OPTIONAL MATCH (c:Commit) " +
            "WHERE NOT c:Merge " +
            "WITH authors, count(c) as commitsWithoutMerges " +
            // number of commits (including merges)
            "OPTIONAL MATCH (c:Commit:Merge) " +
            "RETURN authors, commitsWithoutMerges, count(c) as commitsWithMerges";
        localStorage.setItem(
            "dashboard_activity_original_query",
            dashboardActivityQuery
        );

        const dashboardHotspotQuery =
            // number of commits
            "MATCH (c:Commit)-[:CONTAINS_CHANGE]->()-[:MODIFIES]->(f:File) WHERE NOT c:Merge WITH f, count(c) as commits MATCH (t:Type)-[:HAS_SOURCE]->(f), (t)-[:DECLARES]->(m:Method) RETURN t.fqn as fqn, sum(commits) as commits ORDER BY fqn ASCENDING";
        localStorage.setItem(
            "dashboard_hotspot_original_query",
            dashboardHotspotQuery
        );

        const dashboardPMDQuery =
            // number of violations
            "MATCH (:Report)-[:HAS_FILE]->(file:File:Pmd)-[:HAS_VIOLATION]->(violation:Violation) RETURN count(violation)";
        localStorage.setItem("dashboard_pmd_original_query", dashboardPMDQuery);

        const dashboardTestCoverageQuery =
            // number of violations
            "MATCH (c:Jacoco:Class)-[:HAS_METHOD]->(m:Method:Jacoco)-[:HAS_COUNTER]->(t:Counter) WHERE t.type='INSTRUCTION' RETURN (sum(t.covered)*100)/(sum(t.covered)+sum(t.missed)) as coverage";
        localStorage.setItem(
            "dashboard_test_coverage_original_query",
            dashboardTestCoverageQuery
        );

        const pluginPresenceQuery =
            "OPTIONAL MATCH (x:Git) " +
            "WITH count(x) > 0 as git " +
            "OPTIONAL MATCH (x:Jacoco) " +
            "WITH git, count(x) > 0 as jacoco " +
            "OPTIONAL MATCH (x:Pmd) " +
            "WITH git, jacoco,count(x) > 0 as pmd " +
            "RETURN git, jacoco, pmd";

        this.state = {
            queryStringStructure: dashboardStructureQuery,
            queryStringDependencies: dashboardDependenciesQuery,
            queryStringActivity: dashboardActivityQuery,
            queryStringHotspot: dashboardHotspotQuery,
            queryStringPMD: dashboardPMDQuery,
            queryStringTestCoverage: dashboardTestCoverageQuery,
            queryPluginPresence: pluginPresenceQuery
        };

        if (!localStorage.getItem("dashboard_structure_expert_query")) {
            localStorage.setItem(
                "dashboard_structure_expert_query",
                this.state.queryStringStructure
            );
        } else {
            this.state.queryStringStructure = localStorage.getItem(
                "dashboard_structure_expert_query"
            );
        }

        if (!localStorage.getItem("dashboard_dependencies_expert_query")) {
            localStorage.setItem(
                "dashboard_dependencies_expert_query",
                this.state.queryStringDependencies
            );
        } else {
            this.state.queryStringDependencies = localStorage.getItem(
                "dashboard_dependencies_expert_query"
            );
        }

        if (!localStorage.getItem("dashboard_activity_expert_query")) {
            localStorage.setItem(
                "dashboard_activity_expert_query",
                this.state.queryStringActivity
            );
        } else {
            this.state.queryStringActivity = localStorage.getItem(
                "dashboard_activity_expert_query"
            );
        }

        if (!localStorage.getItem("dashboard_hotspot_expert_query")) {
            localStorage.setItem(
                "dashboard_hotspot_expert_query",
                this.state.queryStringHotspot
            );
        } else {
            this.state.queryStringHotspot = localStorage.getItem(
                "dashboard_hotspot_expert_query"
            );
        }

        if (!localStorage.getItem("dashboard_pmd_expert_query")) {
            localStorage.setItem(
                "dashboard_pmd_expert_query",
                this.state.queryStringPMD
            );
        } else {
            this.state.queryStringPMD = localStorage.getItem(
                "dashboard_pmd_expert_query"
            );
        }

        if (!localStorage.getItem("dashboard_test_coverage_expert_query")) {
            localStorage.setItem(
                "dashboard_test_coverage_expert_query",
                this.state.queryStringTestCoverage
            );
        } else {
            this.state.queryStringTestCoverage = localStorage.getItem(
                "dashboard_test_coverage_expert_query"
            );
        }
    }

    async readPluginPresence(thisBackup) {
        var pluginPresence;
        await Promise.resolve(
            neo4jSession
                .run(this.state.queryPluginPresence)
                .then(function(result) {
                    result.records.forEach(function(record) {
                        pluginPresence = {
                            git: record.get("git"),
                            jacoco: record.get("jacoco"),
                            pmd: record.get("pmd")
                        };
                    });
                })
                .then(function(context) {
                    thisBackup.setState({ pluginPresence: pluginPresence });
                })
                .catch(function(error) {
                    console.log(error);
                })
        );
        return Promise.resolve(thisBackup);
    }

    readStructureMetrics(thisBackup) {
        var structureMetrics = [];

        neo4jSession
            .run(this.state.queryStringStructure)
            .then(function(result) {
                result.records.forEach(function(record) {
                    structureMetrics = {
                        classes: record.get(0).low,
                        interfaces: record.get(1).low,
                        enums: record.get(2).low,
                        annotations: record.get(3).low,
                        methods: record.get(4).low,
                        loc: record.get(5).low,
                        fields: record.get(6).low
                    };

                    //console.log(structureMetrics);
                });
            })
            .then(function(context) {
                thisBackup.setState({ structureMetrics: structureMetrics });
            })
            .catch(function(error) {
                console.log(error);
            });
    }

    readDependencyMetrics(thisBackup) {
        var dependencyMetrics = [];

        neo4jSession
            .run(this.state.queryStringDependencies)
            .then(function(result) {
                result.records.forEach(function(record) {
                    dependencyMetrics = {
                        dependencies: record.get(0).low,
                        extends: record.get(1).low,
                        implements: record.get(2).low,
                        invocations: record.get(3).low,
                        reads: record.get(4).low,
                        writes: record.get(5).low
                    };

                    //console.log(dependencyMetrics);
                });
            })
            .then(function(context) {
                thisBackup.setState({ dependencyMetrics: dependencyMetrics });
            })
            .catch(function(error) {
                console.log(error);
            });
    }

    readActivityMetrics(thisBackup) {
        var activityMetrics = [];

        neo4jSession
            .run(this.state.queryStringActivity)
            .then(function(result) {
                result.records.forEach(function(record) {
                    activityMetrics = {
                        authors: record.get(0).low,
                        commitsWithoutMerges: record.get(1).low,
                        commitsWithMerges: record.get(2).low
                    };

                    //console.log(activityMetrics);
                });
            })
            .then(function(context) {
                thisBackup.setState({ activityMetrics: activityMetrics });
            })
            .catch(function(error) {
                console.log(error);
            });
    }

    readHotspotMetrics(thisBackup) {
        const IDENTIFIER_LIMIT_COUNTING_HOTSPOTS = "limitCountingHotspots";

        var localStorageLimitCountingHotspots = localStorage.getItem(
            IDENTIFIER_LIMIT_COUNTING_HOTSPOTS
        );
        var hotspotMetrics = [];

        neo4jSession
            .run(this.state.queryStringHotspot)
            .then(function(result) {
                var maxCommits = 0;

                result.records.forEach(function(record) {
                    var currentCommmits = record.get(1).low;

                    if (currentCommmits > maxCommits) {
                        maxCommits = currentCommmits;
                    }
                });

                var hotspotCount = 0;
                result.records.forEach(function(record) {
                    var currentCommmits = record.get(1).low;

                    if (
                        Math.round((currentCommmits / maxCommits) * 100) >=
                        localStorageLimitCountingHotspots
                    ) {
                        hotspotCount++;
                    }
                });

                hotspotMetrics = {
                    commitHotspots: hotspotCount
                };
            })
            .then(function(context) {
                thisBackup.setState({
                    hotspotMetrics: hotspotMetrics
                });
            })
            .catch(function(error) {
                console.log(error);
            });
    }

    readStaticCodeAnalysisPMDMetrics(thisBackup) {
        var staticCodeAnalysisPMDMetrics = [];

        neo4jSession
            .run(this.state.queryStringPMD)
            .then(function(result) {
                result.records.forEach(function(record) {
                    staticCodeAnalysisPMDMetrics = {
                        violations: record.get(0).low
                    };

                    //console.log(staticCodeAnalysisPMDMetrics);
                });
            })
            .then(function(context) {
                thisBackup.setState({
                    staticCodeAnalysisPMDMetrics: staticCodeAnalysisPMDMetrics
                });
            })
            .catch(function(error) {
                console.log(error);
            });
    }

    readTestCoverageMetrics(thisBackup) {
        var testCoverageMetrics = [];

        neo4jSession
            .run(this.state.queryStringTestCoverage)
            .then(function(result) {
                result.records.forEach(function(record) {
                    testCoverageMetrics = {
                        overallTestCoverage: record.get(0).low
                    };

                    //console.log(testCoverageMetrics);
                });
            })
            .then(function(context) {
                thisBackup.setState({
                    testCoverageMetrics: testCoverageMetrics
                });
            })
            .catch(function(error) {
                console.log(error);
            });
    }
}

export default DashboardModel;
