/**
 *  Least Recently Used
 */
class LRUCache {
  capacity: number;
  cache: Map<any, any>;
  constructor(capacity: number) {
    this.capacity = capacity || 5;
    this.cache = new Map();
  }

  /**
   * 向缓存中设置值
   * 1. 如果缓存中存在 key， 覆盖对应的值，将本次的值设为 LRU
   * 2. 如果缓存中不存在 key
   *    2.1 缓存未满，直接设置值，并将本次的值设置为 LRU
   *    2.2 缓存已满，删除最久未被使用的值; 设置本次的值为 LRU
   * @param {*} key
   * @param {*} value
   */
  put(key: any, value: any) {
    if (this.cache.get(key)) {
      this.cache.set(key, value);
      this.refresh(key);
      return null;
    }

    if (this.cache.size >= this.capacity) {
      // map.keys 返回的顺序是设置的顺序，越早设置的越靠前
      this.cache.delete(this.cache.keys().next().value);
    }

    this.cache.set(key, value);
    return null;
  }

  /**
   *
   * 获取缓存中对应键的值
   * 如果存在，返回对应的值，并刷新为 "LRU"
   * 如果不存在，返回 null
   * @param {*} index
   */
  get(key: any) {
    if (!this.cache.has(key)) {
      return -1;
    }

    // 刷新为 LRU
    this.refresh(key);
    return this.cache.get(key);
  }

  private refresh(key: any) {
    const value = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, value);
  }
}

const cache = new LRUCache(2);

console.log(cache.put(1, 1)); // 返回 null   此时cache为【1】
console.log(cache.put(2, 2)); // 返回 null   此时cache为【2,1】
console.log(cache.get(1)); // 返回 1         此时cache为【1,2】，因为使用了1,1变成“新鲜的”
console.log(cache.put(3, 3)); // 返回 null   此时cache为【3,1】，超过容量了，把“老油条”2淘汰
console.log(cache.get(2)); // 返回 -1        此时cache为【3,1】
console.log(cache.put(4, 4)); // 返回 null   此时cache为【4,3】，超过容量了，把“老油条”1淘汰
console.log(cache.get(1)); // 返回 -1        此时cache为【4,3】
console.log(cache.get(3)); // 返回 3         此时cache为【3,4】
console.log(cache.get(4)); // 返回 4         此时cache为【4,3】
