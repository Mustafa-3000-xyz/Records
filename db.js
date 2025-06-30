import { openDB } from 'idb';

export const dbPromise = openDB('MyAppDB', 1, {
    upgrade(db) {
        if (!db.objectStoreNames.contains('records')) {
            db.createObjectStore('records', { keyPath: 'id' });
        }
    },
});

export async function saveRecord(record) {
    const db = await dbPromise;
    await db.put('records', record);
}

export async function deleteRecord(id) {
    const db = await dbPromise;
    return db.delete('records', id);
}


export async function editingRecord(obj) {
    const db = await dbPromise;
    return db.put('records' ,  obj );
}

export async function getAllRecords() {
    const db = await dbPromise;
    return db.getAll('records');
}

export async function deleteAllRecords() {
    const db = await dbPromise;
    return db.clear("records");
}