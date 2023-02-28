import {Actions} from "./actions";


export interface Model<T>{
  id: number,
  attributes:T,
  actions: Actions
}
