export interface ISubUnit {
    organization_id: number;
    unit_name_ar: string;
    unit_name_en?: string | null;
    short_name_ar: string;
    short_name_en?: string | null;
    allow_decimal: boolean;
    multiplier: number;
  }
  
  export interface IUnit {
    id: number;
    organization_id: number;
    unit_name_ar: string;
    unit_name_en?: string | null;
    short_name_ar: string;
    short_name_en?: string | null;
    allow_decimal: boolean;
    multiplier: number;
    sub_units: ISubUnit[];
  }
  
  export interface UnitForm {
    organization_id: number | null;
    unit_name_ar: string;
    unit_name_en?: string | null;
    short_name_ar: string;
    short_name_en?: string | null;
    allow_decimal: boolean;
    multiplier: number;
    sub_units: ISubUnit[];
  }
  