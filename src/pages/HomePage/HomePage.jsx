import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Bar, Doughnut, Line } from "react-chartjs-2";

import module from "./HomePage.module.css"

import chart1 from "./../../data/chart1.json";

import ChoiceBoxButton from "../../components/ChoiceBoxButton/ChoiceBoxButton";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchCategories, fetchCounts, fetchProducts, fetchProductsByCategory } from "../../redux/products/operations";
import { selectProducts, selectCategories, selectCounts } from "../../redux/products/selectors";

defaults.maintainAspectRatio = false;
defaults.responsive = true;

defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.font.size = 20;
defaults.plugins.title.color = "black";

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
    const dispatch = useDispatch();
    const productsData = useSelector(selectProducts);
    const categoriesData = useSelector(selectCategories);
    const countData = useSelector(selectCounts);

    useEffect(() => {
        dispatch(fetchProducts())
        dispatch(fetchCategories())
        dispatch(fetchCounts())
        dispatch(fetchProductsByCategory())
    }, [dispatch])

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
                                labels: countData?.map((data) => data.category),
                                datasets: [
                                    {
                                        label: "Count",
                                        data: countData?.map((data) => data.count),
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
                                labels: categoriesData?.map((data) => data.category),
                                datasets: [
                                    {
                                        label: "Count",
                                        data: categoriesData?.map((data) => data.predicted_price),
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
                                labels: productsData?.map((data) => data.name),
                                datasets: [
                                    {
                                        label: "Product",
                                        data: productsData?.map((data) => data.predicted_price),
                                        backgroundColor: commonColors,
                                        borderRadius: 5,
                                    },
                                ],
                            }}
                            options={{
                                ...commonChartOptions,
                                plugins: {
                                    ...commonChartOptions.plugins,
                                    title: {
                                        display: true,
                                        text: "Top-5 Expensive Products",
                                        font: { size: 20 },
                                    },
                                    tooltip: {
                                        callbacks: {
                                            title: (tooltipItems) => {
                                                // Показати повну назву у tooltip при наведенні
                                                const index = tooltipItems[0].dataIndex;
                                                return productsData[index].name;
                                            },
                                        },
                                    },
                                },
                                scales: {
                                    ...commonChartOptions.scales,
                                    x: {
                                        ticks: {
                                            callback: function (val) {
                                                const label = this.getLabelForValue(val);
                                                return label.length > 10 ? label.slice(0, 10) + "…" : label;
                                            },
                                            font: { size: 10 },
                                            maxRotation: 45,
                                            minRotation: 0,
                                        },
                                    },
                                },
                            }}
                        />

                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage