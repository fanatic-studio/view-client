export default {
  EXTENDS_LOCAL_STORE(state: any, store: { [propsName: string]: any }) {
    for (const key in store) {
      state[key] = store[key]
    }
  }
}
