import {inject, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../enviroments/enviroment-dev';
import { Simulation } from '../models/simulation';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class ApiService{
    private static BaseUrl = environment.apiBaseUrl;

    private http = inject(HttpClient);

    private static AllSimulations = ApiService.BaseUrl + "/simulation" + "/getAll";

    getSimulations(): Observable<Simulation[]>{
        return this.http.get<Simulation[]>(ApiService.AllSimulations)
    }
}