import {inject, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../enviroments/enviroment-dev';
import { Simulation, SimulationWithoutID } from '../models/simulation';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class ApiService{
    private static BaseUrl = environment.apiBaseUrl;

    private http = inject(HttpClient);

    private static AllSimulations = ApiService.BaseUrl + "/simulation" + "/getAll";
    private static createSimulation = ApiService.BaseUrl+ "/simulation" + "/createSimulation";
    private static deleteSimulation = ApiService.BaseUrl + "/simulation" + "/deleteSimulation";

    getSimulations(): Observable<Simulation[]>{
        return this.http.get<Simulation[]>(ApiService.AllSimulations)
    }

    createSimulation(simulation : SimulationWithoutID): Observable<Simulation>{
        return this.http.post<Simulation>(ApiService.createSimulation, simulation);
    }
    
    deleteSimulation(id: number) : Observable<any>{
        const url = `${ApiService.deleteSimulation}?id=${id}`;
        return this.http.delete<any>(url)
    }
}