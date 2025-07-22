import { Label, PolarGrid, PolarRadiusAxis, RadialBar, RadialBarChart } from 'recharts';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '../ui/chart';

const ProjectChart = () => {
    const chartData = [{ browser: 'safari', visitors: 1260, fill: 'var(--color-safari)' }];
    const chartConfig = {
        visitors: {
            label: 'Project Timeline',
        },
        safari: {
            label: 'Safari',
            color: 'var(--chart-2)',
        },
    } satisfies ChartConfig;

    const chartData2 = [
        { browser: 'chrome', visitors: 275, fill: 'var(--color-chrome)' },
        { browser: 'safari', visitors: 200, fill: 'var(--color-safari)' },
        { browser: 'firefox', visitors: 187, fill: 'var(--color-firefox)' },
        { browser: 'edge', visitors: 173, fill: 'var(--color-edge)' },
        { browser: 'other', visitors: 90, fill: 'var(--color-other)' },
    ];
    const chartConfig2 = {
        visitors: {
            label: 'Visitors',
        },
        chrome: {
            label: 'Chrome',
            color: 'var(--chart-1)',
        },
        safari: {
            label: 'Safari',
            color: 'var(--chart-2)',
        },
        firefox: {
            label: 'Firefox',
            color: 'var(--chart-3)',
        },
        edge: {
            label: 'Edge',
            color: 'var(--chart-4)',
        },
        other: {
            label: 'Other',
            color: 'var(--chart-5)',
        },
    } satisfies ChartConfig;


    const chartData3 = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]
const chartConfig3 = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-2)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)",
  },
  label: {
    color: "var(--background)",
  },
} satisfies ChartConfig

    return (
       
        <div className='grid grid-cols-1 md:grid-cols-3 w-full  '>
                <ChartContainer config={chartConfig} className=" aspect-square max-h-[250px]">
                    <RadialBarChart data={chartData} endAngle={100} innerRadius={80} outerRadius={140} width={250} height={250}>
                        <PolarGrid
                            gridType="circle"
                            radialLines={false}
                            stroke="none"
                            className="first:fill-muted last:fill-background"
                            polarRadius={[86, 74]}
                        />
                        <RadialBar dataKey="visitors" background />
                        <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                            <Label
                                content={({ viewBox }) => {
                                    if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                                        return (
                                            <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                                                <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-4xl font-bold">
                                                    {chartData[0].visitors.toLocaleString()}
                                                </tspan>
                                                <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground">
                                                    Project Timeline
                                                </tspan>
                                            </text>
                                        );
                                    }
                                }}
                            />
                        </PolarRadiusAxis>
                    </RadialBarChart>
                </ChartContainer>
           
                <ChartContainer config={chartConfig2} className=" aspect-square max-h-[250px]">
                    <RadialBarChart data={chartData2} innerRadius={30} outerRadius={100} width={250} height={250}>
                        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel nameKey="browser" />} />
                        <PolarGrid gridType="circle" />
                        <RadialBar dataKey="visitors" />
                    </RadialBarChart>
                </ChartContainer>

                <div className='flex flex-col items-start gap-3'>
                    <div className="flex gap-2 items-center">
                        <div className='size-4 bg-green-600'/>
                        <span>Chrome</span>
                    </div>
                </div>
     </div>
            
    );
};

export default ProjectChart;
