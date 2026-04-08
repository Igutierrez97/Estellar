/* src/types/met.ts */

export interface MetConstituent {
  name: string;
  role: string;
  constituentULAN_URL: string;
}

export interface MetTag {
  term: string;
  AAT_URL: string;
  Wikidata_URL: string;
}

export interface MetObject {
  objectID: number;
  isHighlight: boolean;
  accessionNumber: string;
  isPublicDomain: boolean;
  primaryImage: string;
  primaryImageSmall: string;
  additionalImages: string[];
  constituents: MetConstituent[];
  department: string;
  objectName: string;
  title: string;
  culture: string;
  period: string;
  medium: string;
  dimensions: string;
  creditLine: string;
  objectDate: string;
  objectBeginDate: number;
  objectEndDate: number;
  artistDisplayName: string;
  artistDisplayBio: string;
  artistBeginDate: string;
  artistEndDate: string;
  classification: string;
  city: string;
  country: string;
  repository: string;
  objectURL: string;
  tags: MetTag[];
}

export interface Department {
  departmentId: number;
  displayName: string;
}

export interface MetSearchResponse {
  total: number;
  objectIDs: number[];
}