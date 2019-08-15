import { VehicleBrandInterface } from 'src/app/interfaces/vehicle-brand.interface';

export const VehicleBrands: Array<VehicleBrandInterface> = [
  {
    description: "Acura",
    id: 1,
    models: [
      {description: "Integra GS 1.8", id: 1},
      {description: "Legend 3.2\/3.5", id: 2},
      {description: "NSX 3.0", id: 3}],
    },
  {
    description: "Agrale",
    id: 2,
    models: [
      {description: "MARRU\u00c1 2.8 12V 132cv TDI Diesel", id: 4},
      {description: "MARRU\u00c1 AM 100 2.8  CS TDI Diesel", id: 4564},
      {description: "MARRU\u00c1 AM 100 2.8 CD TDI Diesel", id: 4563},
      {description: "MARRU\u00c1 AM 150 2.8  CS TDI Diesel", id: 4566},
      {description: "MARRU\u00c1 AM 150 2.8 CD TDI Diesel", id: 4565},
      {description: "MARRU\u00c1 AM 200 2.8  CD TDI Diesel", id: 4567},
      {description: "MARRU\u00c1 AM 200 2.8 CS TDI Diesel", id: 4568},
      {description: "MARRU\u00c1 AM 50 2.8 140cv TDI Diesel", id: 4569}
    ]
  },
  {
    description: "Alfa Romeo",
    id: 3,
    models: [
      {description: "145 Elegant 1.7\/1.8 16V", id: 5},
      {description: "145 Elegant 2.0 16V", id: 6},
      {description: "145 Quadrifoglio 2.0", id: 7},
      {description: "145 QV", id: 8},
      {description: "147 2.0 16V 148cv 4p Semi-Aut.", id: 9},
      {description: "155", id: 10},
      {description: "155 Super", id: 11},
      {description: "156 2.5 V6 24V 190cv 4p Aut.", id: 12},
      {description: "156 Sport Wagon 2.0 16V", id: 13},
      {description: "156 Sport Wagon 2.5 V6 24V 4p Aut.", id: 14},
      {description: "156 TS\/Sport\/Elegant 2.0 16V", id: 15},
      {description: "164 3.0 V6", id: 16},
      {description: "164 Super V6 24V", id: 17},
      {description: "166 3.0 V6 24V", id: 18},
      {description: "2300 TI\/TI-4", id: 19},
      {description: "Spider 2.0\/3.0", id: 20}
    ]
  },
  {
    description: "AM Gen",
    id: 4,
    models: [
      {description: "Hummer Hard-Top 6.5 4x4 Diesel TB", id: 21},
      {description: "Hummer Open-Top 6.5 4x4 Diesel TB", id: 22},
      {description: "Hummer Wagon 6.5 4x4 Diesel TB", id: 23}
    ]
  }
]
