import {useMemo} from 'react'
import {
    Chart,
    Axis,
    Tooltip,
    Point,
    Interval
} from "bizcharts";

var imageMap = {
    John: "https://zos.alipayobjects.com/rmsportal/mYhpaYHyHhjYcQf.png",
    Damon: "https://zos.alipayobjects.com/rmsportal/JBxkqlzhrlkGlLW.png",
    Patrick: "https://zos.alipayobjects.com/rmsportal/zlkGnEMgOawcyeX.png",
    Mark: "https://zos.alipayobjects.com/rmsportal/KzCdIdkwsXdtWkg.png"
};
const scale = {
    vote: {
        min: 0
    }
};

export default () => {
    const data = useMemo(() => {
        return [
            {
                name: "John",
                vote: 35654
            },
            {
                name: "Damon",
                vote: 65456
            },
            {
                name: "Patrick",
                vote: 45724
            },
            {
                name: "Mark",
                vote: 13654
            }
        ];

    }, [])

    return (
        <Chart
            data={data}
            // padding={[60, 20, 40, 60]}
            scale={scale}
            autoFit
            height={400}
        >
            <Axis
                name="vote"
            />
            <Interval
                position="name*vote"
                color={["name", ["#7f8da9", "#fec514", "#db4c3c", "#daf0fd"]]}
            />
            <Tooltip />
            <Point
                position="name*vote"
                size={60}
                shape={[
                    "name",
                    function (name) {
                        return ["image", imageMap[name]];
                    }
                ]}
            />
        </Chart>
    )
}