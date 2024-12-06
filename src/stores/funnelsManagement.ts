import { defineStore } from 'pinia'
import { computed, reactive } from 'vue'

export const funnelsManagementStore = defineStore('funnelsManagement', () => {
  const funnelsData = reactive({
    funnelsInArray: [
      { name: 'Ele Goxxt', description: 'OLA OLA OLA OLA', id: 1, date: '2024/12/34' },
      { name: 'Teste1', description: 'OLA OLA OLA OLA', id: 2, date: '2024/12/34' },
      { name: 'Teste1', description: 'OLA OLA OLA OLA', id: 3, date: '2024/12/34' },
      { name: 'Teste1', description: 'OLA OLA OLA OLA', id: 4, date: '2024/12/34' },
      { name: 'Teste1', description: 'OLA OLA OLA OLA', id: 5, date: '2024/12/34' },
      { name: 'Teste1', description: 'OLA OLA OLA OLA', id: 6, date: '2024/12/34' },
      { name: 'Teste1', description: 'OLA OLA OLA OLA', id: 7, date: '2024/12/34' },
      { name: 'Teste1', description: 'OLA OLA OLA OLA', id: 8, date: '2024/12/34' },
      { name: 'Teste1', description: 'OLA OLA OLA OLA', id: 9, date: '2024/12/34' },
      { name: 'Teste1', description: 'OLA OLA OLA OLA', id: 10, date: '2024/12/34' }
    ]
  })

  const funnelsDataGetter = computed(() => funnelsData.funnelsInArray)

  const insertNewFunnel = (funnelData) => {
    if (!funnelData) return;
    funnelData.funnelsInArray.push(funnelData)
  }

  return { funnelsDataGetter, insertNewFunnel }
})
