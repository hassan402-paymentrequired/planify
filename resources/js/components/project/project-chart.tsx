import { generateChartData2, getChartData } from '@/lib/utils';
import { Label, PolarGrid, PolarRadiusAxis, RadialBar, RadialBarChart } from 'recharts';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '../ui/chart';

const ProjectChart = ({ project }) => {
    console.log(project);
    const chartData = getChartData(project.start_date, project.due_date);
    const { data: chartData2, config: chartConfig2 } = generateChartData2(project);

    const chartConfig = {
        visitors: {
            label: 'Project Timeline',
        },
        safari: {
            label: 'Safari',
            color: 'var(--chart-2)',
        },
    } satisfies ChartConfig;

    return (
        <div className="grid w-full grid-cols-1 md:grid-cols-3">
            <ChartContainer config={chartConfig} className="aspect-square max-h-[250px]">
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
                                                {chartData[0].elapse.toLocaleString()}
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

            <ChartContainer config={chartConfig2} className="aspect-square max-h-[250px]">
                <RadialBarChart data={chartData2} innerRadius={30} outerRadius={100} width={250} height={250}>
                    <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel nameKey="browser" />} />
                    <PolarGrid gridType="circle" />
                    <RadialBar dataKey="visitors" />
                </RadialBarChart>
            </ChartContainer>

            {/* Legend */}
            <div className="flex flex-col items-start gap-3">
                {project?.users?.map((user, index) => (
                    <div className="flex items-center gap-2" key={user.id}>
                        <div
                            className="size-4"
                            style={{ backgroundColor: `var(${['--chart-2', '--chart-3', '--chart-4', '--chart-5', '--chart-6'][index % 5]})` }}
                        />
                        <span>{user.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProjectChart;
