export type Variable = {
    name: string;
    type: string;
    initialValue: string;
};

export type List = {
    id: number;
    components: Array<number>;
};

export type Component = {
    id: number;
    type: string;
    options: any;
    children?: number;
};

export type PageData = {
    variables?: Array<Variable>;
    lists: Array<List>;
    components: Array<Component>;
};

export type SingleUpcomingWeather = {
    day: string;
    condition: string;
    conditionName: string;
};

export type WeatherData = {
    condition: string;
    conditionName: string;
    temperature: number | null;
    unit: string;
    location: string;
    upcomming: Array<SingleUpcomingWeather>;
};

export type Condition = {
    id: number;
    type: string;
    options: {
        variable: string;
        value: string;
    };
    children: number;
};
