const FAV_ITEMS_LABEL = "favItems";

function changeFav(id) {
  let localStorageItems = localStorage.getItem(FAV_ITEMS_LABEL);
  console.log(localStorageItems);

  if (!localStorageItems) {
    localStorage.setItem(FAV_ITEMS_LABEL, JSON.stringify([]));
  }

  let items = JSON.parse(localStorage.getItem(FAV_ITEMS_LABEL));
  items = JSON.parse(localStorage.getItem(FAV_ITEMS_LABEL));

  if (!items.includes(id))
    localStorage.setItem(FAV_ITEMS_LABEL, JSON.stringify([...items, id]));
  else {
    let newItems = items.filter((value) => value !== id);
    localStorage.setItem(FAV_ITEMS_LABEL, JSON.stringify([...newItems]));
  }
}

function isFav(id) {
  let localStorageItems = localStorage.getItem(FAV_ITEMS_LABEL);
  if (!localStorageItems) return false;

  let items = JSON.parse(localStorageItems);

  return items.includes(id);
}

export default { changeFav, isFav };
