import localforage from 'localforage'

const STORE = localforage.createInstance({
  name: 'expense-tracker',
  storeName: 'expense_data'
})

export async function readAll() {
  try {
    const v = await STORE.getItem('expense_tracker:v1')
    return v || { transactions: [], categories: [], settings: {} }
  } catch (e) {
    console.error('localforage read error', e)
    return { transactions: [], categories: [], settings: {} }
  }
}

export async function writeAll(v: any) {
  try {
    await STORE.setItem('expense_tracker:v1', v)
  } catch (e) {
    console.error('localforage write error', e)
  }
}
