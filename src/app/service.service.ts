import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of} from 'rxjs';
import { map, filter, tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

    constructor(private httpClient: HttpClient) { }

    //base url from backend
public baseUrl = " http://localhost:3000/posts"


//post api data
postData(data:any){
  return this.httpClient.post<any>(this.baseUrl, data)
  .pipe( map ((res :any) =>{
 return res;
  }))
}


// get api data
getData(){
  return this.httpClient.get<any>(this.baseUrl);
}

//delete api data
deleteData(id){
  return this.httpClient.delete<any>( this.baseUrl+ '/' + id);
}

//update api data
updateData(data, id){
  return this.httpClient.put<any>( this.baseUrl+ '/' + id, data);
}

//service end
}
