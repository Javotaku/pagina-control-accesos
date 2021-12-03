import { Component, OnInit } from '@angular/core';
import { AcceslogService } from '../acceslog.service';
import * as moment from 'moment';


@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css']
})
export class TablaComponent implements OnInit {
  dataTable: any;

  constructor(private logService: AcceslogService) { }

  ngOnInit(): void {
    this.getData();
  }

  async getData(){
    moment.locale('es-us'); 
    try{
      const accessData: any = await this.logService.getAccessLog();
      const studentsData: any = await this.logService.getStudents();
      const students = studentsData.data;
      const { status, message, data } = accessData;
      if(status){
        for(let log of data)
        {
          log.dateTime = moment(log.dateTime).format('LLL');
          for(let student of students)
            if(log.noCtrl == student.noCtrl)
              log = Object.assign(log, student);
        }
        const reversed = data.reverse();
        this.dataTable = reversed;
      }
    } catch (e){
      console.log('Error al obtener data: ', e);
    }
  }

}
