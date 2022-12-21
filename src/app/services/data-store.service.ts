import {Injectable} from "@angular/core";

@Injectable()
export class DataStoreService {
// will implement indexDb if i have time before.
  //currently for ease will start with local storage.

  addToStorage(key:string, item:object):void{
    let itemToStore = JSON.stringify(item)
    localStorage.setItem(key, itemToStore);
  }
  getItemFromStorage(key:string):any|null{
    const itemFromStorage:string|null = localStorage.getItem(key)
    if(itemFromStorage) {
      const convertedItem:object = JSON.parse(itemFromStorage);
      return convertedItem
    }
    return null;
  }
  deleteItemFromStorage(key:string):void{}
  resetStorage():void{}
}
