import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-rig-info',
  templateUrl: './rig-info.component.html',
  styleUrls: ['./rig-info.component.css']
})
export class RigInfoComponent implements OnInit {
  rigId: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.rigId = params.get('rigId');
      // Fetch data or perform actions based on rigId
    });
  }
}
