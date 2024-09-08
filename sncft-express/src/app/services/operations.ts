export interface Operation {
    operationId: number;
    departure: {
      location: string;
      time: Date;
    };
    arrival: {
      location: string;
      time: Date;
    };
    
    freight: string[]; // Array to handle multiple cargo
    status: string;
  }

  export interface Filters {
    departure_location:string;
    arrival_location:string;
    time:Date[];
    cargo:string[];
  }
  export interface Schedule {
    schedule_id: number;
    departure_location: string;
    departure_time: string;
    arrival_location: string;
    arrival_time: string;
  }
  
  export interface Train {
    train_id: number;
    train_operator: number;
    locomotive_id: number;
  }
  
  export interface Freight {
    freight_id: number;
    freight_type: string;
    total_units: number;
    total_weight: string;
    total_value: string;
    operation_id: number;
    wagon_id: number;
  }
  
  export interface Route {
    location: string;
    operation_id: number;
    rail_id: number;
    arrival_time: string;
    elapsed_time: number;
  }
  
  export interface OperationDetail {
    operation_id: number;
    schedule_id: number;
    train_id: number;
    status: string;
    schedule: Schedule;
    train: Train;
    freight: Freight[];
    route: Route[];
  }

