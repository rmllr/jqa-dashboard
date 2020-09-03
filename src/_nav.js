export default {
    items: [
        {
            name: "Dashboard",
            url: "/dashboard",
            icon: "icon-speedometer"
        },
        {
            name: "Architecture",
            url: "/architecture",
            icon: "fa fa-sitemap",
            children: [
                {
                    name: "Structure",
                    url: "/architecture/structure"
                },
                {
                    name: "File Types",
                    url: "/architecture/file-types"
                },
                {
                    name: "Dependencies",
                    url: "/architecture/dependencies"
                },
                {
                    name: "Context Map",
                    url: "/architecture/context-map"
                }
            ]
        },
        {
            name: "Resource Management",
            url: "/resource-management",
            icon: "icon-people",
            children: [
                {
                    name: "Activity",
                    url: "/resource-management/activity"
                },
                {
                    name: "Knowledge Distribution",
                    url: "/resource-management/knowledge-distribution"
                }
            ]
        },
        {
            name: "Risk Management",
            url: "/risk-management",
            icon: "fa fa-exclamation-triangle",
            children: [
                {
                    name: "Hotspots",
                    url: "/risk-management/hotspots"
                }
            ]
        },
        {
            name: "Quality Management",
            url: "/quality-management",
            icon: "icon-badge",
            children: [
                {
                    name: "Static Code Analysis",
                    url: "/quality-management/static-code-analysis",
                    children: [
                        {
                            name: "PMD",
                            url: "/quality-management/static-code-analysis/pmd"
                        }
                    ]
                },
                {
                    name: "Test Coverage",
                    url: "/quality-management/test-coverage"
                }
            ]
        }
    ]
};
