import {Actions} from "./actions";


export interface Model<T>{
  id: number,
  model:T,
  actions: Actions
}
