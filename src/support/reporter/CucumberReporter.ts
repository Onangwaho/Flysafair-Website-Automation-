import DateUtil from "../utils/DateUtil";
import EnvUtil from "../utils/EnvUtil";

var reporter = require('cucumber-html-reporter');

export default class CucumberReporter {
    public static generate() {
        EnvUtil.setEnv();

        const options = {
            brandTitle: "My Custom Report",
            theme: 'bootstrap',
            jsonFile: 'test-results/reports/cucumber.json',
            output: 'test-results/reports/cucumber.html',
            reportSuiteAsScenarios: true,
            scenarioTimestamp: true,
            launchReport: false,
            columnLayout: 1,
            metadata: {
                "Execution Date": DateUtil.dateGenerator("DD/MM/YYYY", 0, 0, 0),
                "Base URL": process.env.BASE_URL,
                "Environment": process.env.ENVIRONMENT,
                "Browser": process.env.BROWSER,
            },
            // 👇 Custom CSS
            customStyles: `
    body {
      background-color: #f5f5f5ff !important; /* page bg */
      color: #333 !important;              /* default text */
    }
    .page-header {
      background-color: #005180ff !important; /* header bg */
      color: white !important;              /* header text */
    }
    .passed {
      background-color: #FFB6C1 !important; /* green for passed */
      color: white !important;
    }
    .failed {
      background-color: #F44336 !important; /* red for failed */
      color: white !important;
    }
    .skipped, .undefined {
      background-color: #FF9800 !important; /* orange for skipped */
      color: white !important;
    }
    .summary {
      border: 2px solid #004080 !important; /* summary box border */
      border-radius: 6px;
      padding: 10px;
    }
    .scenario-heading {
      font-weight: bold;
      color: #004080 !important;
    }
  `,
        };

        reporter.generate(options);
    }
}

CucumberReporter.generate();