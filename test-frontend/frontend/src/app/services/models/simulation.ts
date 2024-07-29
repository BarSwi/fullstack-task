import { Result } from "./result"

export interface BaseSimulation {
    ID: number;
    N: string;
    P: number;
    I: number;
    R: number;
    M: number;
    Ti: number;
    Tm: number;
    Ts: number;
}

export interface Simulation extends BaseSimulation{}

export interface SimulationWithResults extends BaseSimulation{
    Results: Result[]
}