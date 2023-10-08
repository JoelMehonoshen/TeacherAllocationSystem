export default interface formResponses {
  // Name of the academic
  name: string;
  // ID of the academic
  id: any;
  // Scale 1-10, academic's willingness to teach that class
  willingness: number;
  // Scale 1-10, academic's expertise in that area
  expertise: number;
  // Number, academic's prior years of experience in this class
  priorYears: number;
  // String, YYYY/S year/semester of the response - e.g., 2021/2
  yearSem: string;
}
