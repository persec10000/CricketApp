export const getDisplayName = WrappedComponent => {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
};
export function multiGetObject(stores) {
    var obj = {};
    stores.map((result, i, store) => {
        let key = store[i][0];
        let value = store[i][1];
        var newObj = {[key]: value};
        obj = Object.assign(newObj, obj);
    });
    return obj;
}
