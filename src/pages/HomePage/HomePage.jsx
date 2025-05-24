import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Bar, Doughnut, Line } from "react-chartjs-2";

import module from "./HomePage.module.css"

import chart1 from "./../../data/chart1.json";
import chart2 from "./../../data/chart2.json";
import chart3 from "./../../data/chart3.json";
import chart4 from "./../../data/chart4.json";

import ChoiceBoxButton from "../../components/ChoiceBoxButton/ChoiceBoxButton";

defaults.maintainAspectRatio = false;
defaults.responsive = true;

defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.font.size = 20;
defaults.plugins.title.color = "black";

// Common chart options
const commonChartOptions = {
    elements: {
        line: { tension: 0.5 },
    },
    plugins: {
        title: { display: true, align: "start", font: { size: 20 }, color: "black" },
    },
    scales: {
        y: { beginAtZero: true },
    },
};

const commonColors = [
    "rgba(43, 63, 229, 0.8)",
    "rgba(250, 192, 19, 0.8)",
    "rgba(253, 135, 135, 0.8)",
];

const mapChartData = (chartData, labelKey, dataKey) => ({
    labels: chartData.map((data) => data[labelKey]),
    datasets: [
        {
            label: dataKey,
            data: chartData.map((data) => data[dataKey]),
            backgroundColor: commonColors,
            borderColor: commonColors,
            borderWidth: 2,
        },
    ],
});

const HomePage = () => {
    return (
        <div className={module.container}>
            <ChoiceBoxButton />
            <div className={module.childContainer}>
                <div className={`${module.dataCard} ${module.categoryCard}`}>
                    <Line
                        data={mapChartData(chart1, "product", "price")}
                        options={{
                            ...commonChartOptions,
                            plugins: { ...commonChartOptions.plugins, title: { text: "Product Price Over Time" } },
                        }}
                    />
                </div>

                <div className={module.dataRow}>
                    <div className={`${module.dataCard} ${module.categoryCard}`}>
                        <Doughnut
                            data={{
                                labels: chart2.map((data) => data.category),
                                datasets: [
                                    {
                                        label: "Count",
                                        data: chart2.map((data) => data.productCount),
                                        backgroundColor: commonColors,
                                        borderColor: commonColors,
                                    },
                                ],
                            }}
                            options={{
                                ...commonChartOptions,
                                plugins: { ...commonChartOptions.plugins, title: { text: "Product Count Over Category" } },
                            }}
                        />
                    </div>

                    <div className={`${module.dataCard} ${module.categoryCard}`}>
                        <Bar
                            data={{
                                labels: chart3.map((data) => data.category),
                                datasets: [
                                    {
                                        label: "Count",
                                        data: chart3.map((data) => data.averagePrice),
                                        backgroundColor: commonColors,
                                        borderRadius: 5,
                                    },
                                ],
                            }}
                            options={{
                                ...commonChartOptions,
                                plugins: { ...commonChartOptions.plugins, title: { text: "Top-5 Expensive Categories" } },
                            }}
                        />
                    </div>

                    <div className={`${module.dataCard} ${module.categoryCard}`}>
                        <Bar
                            data={{
                                labels: chart4.map((data) => data.product),
                                datasets: [
                                    {
                                        label: "Product",
                                        data: chart4.map((data) => data.price),
                                        backgroundColor: commonColors,
                                        borderRadius: 5,
                                    },
                                ],
                            }}
                            options={{
                                ...commonChartOptions,
                                plugins: { ...commonChartOptions.plugins, title: { text: "Top-5 Expensive Products" } },
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage