class Node {
  constructor(slug, title) {
    this.slug = slug;
    this.title = title;
    this.children = [];
  }
}

export class ServicesTree {
  constructor(slugDictionaries) {
    this.slugDictionaries = slugDictionaries;
    this.slug = "services";
    this.title = "Services";
    this.children = [];
  }
  get completeMenu() {
    return this.children;
  }
  add(arr, service) {
    let count = 0;
    while (count < arr.length) {
      let current = this;
      for (let i = 0; i < arr.length; i++) {
        let found = current.children.find((node) => node.slug === arr[i]);

        if (!found) {
          let slugDictionary = this.slugDictionaries.find(
            (definition) => definition.slug === arr[i]
          )?.slugTitle;
          if (!slugDictionary) {
            slugDictionary = service.serviceTitle || service.packagePageTitle;
          }
          let newNode = new Node(arr[i], slugDictionary);
          current.children.push(newNode);
          current = newNode;
        } else {
          current = found;
        }

        count++;
      }
    }
  }
}
