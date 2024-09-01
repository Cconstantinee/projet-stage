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

