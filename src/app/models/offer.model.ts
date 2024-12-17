export type OfferModel = {
  id?: number;
  mode: string;
  movementType: string;
  incoterm: string;
  country: string;
  city: string;
  packageType: string;
  unit1: string;
  unit2: string;
  currency: string;
  palletCount: number;
  dimensions: {
    type: string;
    width: number;
    length: number;
    height: number;
  };
};
