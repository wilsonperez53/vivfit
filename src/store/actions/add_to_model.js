export const addToModal = (item) => {
    console.log("item" + item);
    return {
        type: 'add',
        item
    }
}