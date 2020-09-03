import React from "react";
import Loadable from "react-loadable";

import DefaultLayout from "./containers/DefaultLayout";

function Loading() {
    return <div>Loading...</div>;
}

const Dashboard = Loadable({
    loader: () => import("./views/Dashboard"),
    loading: Loading
});

const Structure = Loadable({
    loader: () => import("./views/Dashboard/Architecture/Structure/Structure"),
    loading: Loading
});

const FileTypes = Loadable({
    loader: () => import("./views/Dashboard/Architecture/FileTypes/FileTypes"),
    loading: Loading
});

const Dependencies = Loadable({
    loader: () =>
        import("./views/Dashboard/Architecture/Dependencies/Dependencies"),
    loading: Loading
});

const ContextMap = Loadable({
    loader: () =>
        import("./views/Dashboard/Architecture/ContextMap/ContextMap"),
    loading: Loading
});

const Activity = Loadable({
    loader: () =>
        import("./views/Dashboard/ResourceManagement/Activity/Activity"),
    loading: Loading
});

const KnowledgeDistribution = Loadable({
    loader: () =>
        import(
            "./views/Dashboard/ResourceManagement/KnowledgeDistribution/KnowledgeDistribution"
        ),
    loading: Loading
});

const Hotspots = Loadable({
    loader: () => import("./views/Dashboard/RiskManagement/Hotspots/Hotspots"),
    loading: Loading
});

const StaticCodeAnalysisPMD = Loadable({
    loader: () =>
        import(
            "./views/Dashboard/QualityManagement/StaticCodeAnalysis/PMD/PMD"
        ),
    loading: Loading
});

const TestCoverage = Loadable({
    loader: () =>
        import("./views/Dashboard/QualityManagement/TestCoverage/TestCoverage"),
    loading: Loading
});

const Settings = Loadable({
    loader: () => import("./views/Dashboard/Header/Settings"),
    loading: Loading
});

const CustomQuery = Loadable({
    loader: () => import("./views/Dashboard/Header/CustomQuery"),
    loading: Loading
});

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
    { path: "/", exact: true, name: "Home", component: DefaultLayout },
    { path: "/dashboard", name: "Dashboard", component: Dashboard },
    {
        path: "/architecture",
        exact: true,
        name: "Architecture",
        component: Structure
    },
    {
        path: "/architecture/structure",
        name: "Structure",
        component: Structure
    },
    {
        path: "/architecture/file-types",
        name: "File Types",
        component: FileTypes
    },
    {
        path: "/architecture/dependencies",
        name: "Dependencies",
        component: Dependencies
    },
    {
        path: "/architecture/context-map",
        name: "Context Map",
        component: ContextMap
    },
    {
        path: "/resource-management",
        exact: true,
        name: "Resource Management",
        component: Activity
    },
    {
        path: "/resource-management/activity",
        name: "Activity",
        component: Activity
    },
    {
        path: "/resource-management/knowledge-distribution",
        name: "Knowledge Distribution",
        component: KnowledgeDistribution
    },
    {
        path: "/risk-management",
        exact: true,
        name: "Risk Management",
        component: Hotspots
    },
    {
        path: "/risk-management/hotspots",
        name: "Hotspots",
        component: Hotspots
    },
    {
        path: "/quality-management",
        exact: true,
        name: "Quality Management",
        component: StaticCodeAnalysisPMD
    },
    {
        path: "/quality-management/static-code-analysis",
        name: "Static Code Analysis",
        component: StaticCodeAnalysisPMD
    },
    {
        path: "/quality-management/static-code-analysis/pmd",
        name: "PMD",
        component: StaticCodeAnalysisPMD
    },
    {
        path: "/quality-management/test-coverage",
        name: "Test Coverage",
        component: TestCoverage
    },
    { path: "/settings", name: "Settings", component: Settings },
    { path: "/custom-query", name: "Custom Query", component: CustomQuery }
];

export default routes;
