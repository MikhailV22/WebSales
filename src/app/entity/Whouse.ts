export class Whouse {
// static instance: User;

//   constructor() {
//     return User.instance = User.instance || this;
//   }	

  id:number;
  name:string;
  name_short?:string;
  real_name:string;
  delivery_commentary?:string;
  delivery_time?:string;
  working_conditions?:string;
  wholesortir?:number;  
  isexternal?:number;
  selected:boolean=false;
}