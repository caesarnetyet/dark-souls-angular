interface Actions {
  delete_url: string,
  update_url: string
}

export interface Model<T>{
  id: number,
  model:T,
  actions: Actions
}
