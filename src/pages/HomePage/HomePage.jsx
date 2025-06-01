import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Bar, Doughnut, Line } from "react-chartjs-2";

import module from "./HomePage.module.css"

import BackButton from "../../components/BackButton/BackButton";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchCategories, fetchCounts, fetchProducts, fetchProductsByCategory } from "../../redux/products/operations";
import { selectProducts, selectCategories, selectCounts, selectProductsByCategory } from "../../redux/products/selectors";

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

    const productsByCategory = useSelector(selectProductsByCategory);
    const [selectedCategory, setSelectedCategory] = useState("Овочі та фрукти");


    useEffect(() => {
        dispatch(fetchProducts())
        dispatch(fetchCategories())
        dispatch(fetchCounts())
        dispatch(fetchProductsByCategory(selectedCategory))
    }, [dispatch, selectedCategory])

    return (
        <div className={module.container}>
            <BackButton />
            <div className={module.childContainer}>
                <div className={`${module.dataCard} ${module.categoryCard}`}>
                    <div className={module.selectDiv}>
                        <p>Category: </p>
                        <select
                            className={module.selectCategory}
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                            <option>Овочі та фрукти</option>
                            <option>Молочні продукти та яйця</option>
                            <option>Хлібобулочні вироби</option>
                            <option>Напої безалкогольні</option>
                            <option>Кава та чай</option>
                        </select>
                    </div>

                    <Line
                        data={mapChartData(productsByCategory.slice(0, 20), "name", "predicted_price")}
                        options={{
                            ...commonChartOptions,
                            plugins: {
                                ...commonChartOptions.plugins,
                                title: { text: `Ціни: ${selectedCategory}` },
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
                                    },
                                },
                            },
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
                                        label: "Рахунок",
                                        data: countData?.map((data) => data.count),
                                        backgroundColor: commonColors,
                                        borderColor: commonColors,
                                    },
                                ],
                            }}
                            options={{
                                ...commonChartOptions,
                                plugins: { ...commonChartOptions.plugins, title: { text: "Кількість товарів понад категорію" } },
                            }}
                        />
                    </div>

                    <div className={`${module.dataCard} ${module.categoryCard}`}>
                        <Bar
                            data={{
                                labels: categoriesData?.map((data) => data.category),
                                datasets: [
                                    {
                                        label: "Рахунок",
                                        data: categoriesData?.map((data) => data.predicted_price),
                                        backgroundColor: commonColors,
                                        borderRadius: 5,
                                    },
                                ],
                            }}
                            options={{
                                ...commonChartOptions,
                                plugins: { ...commonChartOptions.plugins, title: { text: "Найдорощі категорії" } },
                            }}
                        />
                    </div>

                    <div className={`${module.dataCard} ${module.categoryCard}`}>
                        <Bar
                            data={{
                                labels: productsData?.map((data) => data.name),
                                datasets: [
                                    {
                                        label: "Продукти",
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
                                        text: "Найдорощі продукти",
                                        font: { size: 20 },
                                    },
                                    tooltip: {
                                        callbacks: {
                                            title: (tooltipItems) => {
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