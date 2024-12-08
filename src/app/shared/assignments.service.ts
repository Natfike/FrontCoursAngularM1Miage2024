import { Injectable } from '@angular/core';
import { assignment } from '../assignments/assignment.model';
import { Observable, forkJoin } from 'rxjs';
import { LoggingService } from './logging.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { data } from './data';


@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {
  constructor(private LoggingService: LoggingService,
              private http:HttpClient,
            ) { }

  url = "https://apicoursangularm1miage2024.onrender.com/api/assignments"

  getAssignments(): Observable<assignment[]> {
    return this.http.get<assignment[]>(this.url)
  }

  getAssignmentsPagine(page:number, limit:number): Observable<any> {
    return this.http.get<any>(this.url + "?page=" + page + "&limit=" + limit);
  }

  addAssignment(assignment: assignment): Observable<any> {
    return this.http.post<assignment>(this.url, assignment)
  }

  updateAssignment(assignment: assignment): Observable<any> {
    return this.http.put<assignment>(this.url, assignment);
  }

  deleteAssignment(assignment: assignment | null): Observable<any> {
    return this.http.delete<assignment>(this.url + '/' + assignment?._id)
  }

  getAssignment(id: number): Observable<any> {
    return this.http.get<any>(this.url + '/' + id)
  }

  peuplerDB(){
    let appelsVersAddAssignment: Observable<any>[] = [];
    data.forEach(a => {
      let newAssignment = new assignment();
      newAssignment.nom = a.nom;
      newAssignment.id = a.id;
      newAssignment.dateDeRendu = new Date(a.dateDeRendu);
      newAssignment.rendu = a.rendu;

      appelsVersAddAssignment.push(this.addAssignment(newAssignment));
    });

    return forkJoin(appelsVersAddAssignment);
  }

}
