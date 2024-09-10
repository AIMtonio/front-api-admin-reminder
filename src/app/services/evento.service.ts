import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
   providedIn: 'root',
})
export class EventoService
{
	private _URL: string = '';
	private _URLCU: string = '';

	constructor(private _httpClient: HttpClient)
	{
		this._URL = `${localStorage.getItem("ipsw")}/clients`;
		this._URLCU = `${localStorage.getItem("ipsw")}/single-client`;
	}

	create(data: any): Observable<any>
	{
		return this._httpClient.post(`${environment.BACKEND_URL}/api/events`, data);
	}


	async create2(data: any): Promise<any>
	{
		console.log(data);
		return this._httpClient.post(`${environment.BACKEND_URL}/api/events`, data).toPromise();
	}



	

}