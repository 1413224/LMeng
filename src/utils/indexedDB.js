export default class IndexedDB {
    constructor(dbName, storeName, version, callback){
        this.storeName = storeName;
        const indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB;
        const request = indexedDB.open(dbName, version);

        request.onsuccess = e => {
            this.db = e.target.result;
            callback('successfully');
            console.log('Init indexedDB successfully');
        };
        request.onupgradeneeded = e => {
            this.db = e.target.result;
            if(this.db.objectStoreNames.contains(storeName)){
                this.db.deleteObjectStore(storeName);
            }
            this.store = this.db.createObjectStore(storeName);
            console.log('DB version changed, db version: ', this.db.version);
        };
        request.onerror = e => {console.info('Can not open indexedDB', e);};
    }
    
    get(key, callback){
        const transaction = this.db.transaction(this.storeName);
        const objectStore = transaction.objectStore(this.storeName);
        const request = objectStore.get(key);
        request.onerror = e => {console.info('Can not get value', e);};
        request.onsuccess = e => {callback(e.target.result);};
    }

    set(value, key){
        let oldValue;
        this.get(key, function(res){oldValue = res;});

        if(oldValue){
            console.info('You should use function update');
        }else{
            const transaction = this.db.transaction(this.storeName, 'readwrite');
            const objectStore = transaction.objectStore(this.storeName);
            const request = objectStore.add(value, key);
            request.onerror = e => {console.info('Can not add value', e);};
        }
    }

    update(newValue, key){
        this.get(key, function(res){oldValue = res;});

        if(!oldValue){
            console.info('You should use function set');
        }else{
            const transaction = this.db.transaction(this.storeName, 'readwrite');
            const objectStore = transaction.objectStore(this.storeName);
            const request = objectStore.put(newValue, key);

            request.onerror = e => {console.info('Can not update value', e);};
        }
    }

    remove(key){
        const request = this.db.transaction(this.storeName, 'readwrite')
                .objectStore(this.storeName)
                .delete(key);
        request.onerror = e => {console.info('Can not remove value', e);};
    }

    close(){
        this.db.close();
    }
}
