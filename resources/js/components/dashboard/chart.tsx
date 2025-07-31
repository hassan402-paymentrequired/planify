import * as React from 'react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

export const description = 'Projects created and staff assigned per day';

// const chartData = [
//     { date: '2024-04-01', projects: 5, staff: 12 },
//     { date: '2024-04-02', projects: 3, staff: 8 },
//     { date: '2024-04-03', projects: 7, staff: 15 },
//     { date: '2024-04-04', projects: 2, staff: 5 },
//     { date: '2024-04-05', projects: 6, staff: 10 },
//     { date: '2024-04-06', projects: 8, staff: 20 },
//     { date: '2024-04-07', projects: 4, staff: 10 },
//     { date: '2024-04-08', projects: 9, staff: 15 },
//     { date: '2024-04-09', projects: 1, staff: 3 },
//     { date: '2024-04-10', projects: 7, staff: 12 },
//     { date: '2024-04-11', projects: 8, staff: 18 }
// ];

const chartConfig = {
    projects: {
        label: 'Projects',
        color: 'var(--chart-2)',
    },
    staff: {
        label: 'Staff',
        color: 'var(--chart-1)',
    },
} satisfies ChartConfig;

export function DashboardChartBar({ chartData }) {
    const [activeChart, setActiveChart] = React.useState<keyof typeof chartConfig>('projects');

    const total = React.useMemo(
        () => ({
            projects: chartData?.reduce((acc, curr) => acc + curr.projects, 0),
            staff: chartData?.reduce((acc, curr) => acc + curr.staff, 0),
        }),
        [],
    );

    return (
        <Card className="h-[300px] rounded-none border-none py-0">
            <CardHeader className="flex flex-col items-stretch border-b !p-0 sm:flex-row">
                <div className="hidden flex-1 flex-col justify-center gap-1 px-6 pt-1 pb-3 sm:!py-0 md:flex">
                    <CardTitle>Projects & Staff Activity</CardTitle>
                    <CardDescription>Projects created and staff assigned per day (last 3 months)</CardDescription>
                </div>
                <div className="flex">
                    {['projects', 'staff'].map((key) => {
                        const chart = key as keyof typeof chartConfig;
                        return (
                            <button
                                key={chart}
                                data-active={activeChart === chart}
                                className="data-[active=true]:bg-muted/50 relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l sm:border-t-0 sm:border-l sm:px-8 sm:py-6"
                                onClick={() => setActiveChart(chart)}
                            >
                                <span className="text-muted-foreground text-xs">{chartConfig[chart].label}</span>
                                <span className="text-lg leading-none font-bold sm:text-xl md:text-3xl">
                                    {total[key as keyof typeof total]?.toLocaleString()}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </CardHeader>
            <CardContent className="px-2 sm:p-6">
                <ChartContainer config={chartConfig} className="aspect-auto h-[150px] w-full">
                    <BarChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={32}
                            tickFormatter={(value) => {
                                const date = new Date(value);
                                return date.toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                });
                            }}
                        />
                        <ChartTooltip
                            content={
                                <ChartTooltipContent
                                    className="w-[150px]"
                                    nameKey={activeChart}
                                    labelFormatter={(value) => {
                                        return new Date(value).toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: 'numeric',
                                            year: 'numeric',
                                        });
                                    }}
                                />
                            }
                        />
                        <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`}  radius={8}/>
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
