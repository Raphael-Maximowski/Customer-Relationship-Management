<script setup>
import FavoriteContactCard from '@/components/Cards/FavoriteContactCard.vue'
import FavoriteFunnelCard from '@/components/Cards/FavoriteFunnelCard.vue'
import { contactsManagementStore } from '@/stores/contactsManagement.ts'
import { funnelsManagementStore } from '@/stores/funnelsManagement.ts'
import { computed, onMounted } from 'vue'
import EmptyFavoriteCard from '@/components/Cards/EmptyFavoriteCard.vue'
import { userConfigStore } from '@/stores/userConfigManagement.ts'

const contactsStore = contactsManagementStore()
const funnelStore = funnelsManagementStore()
const userStore = userConfigStore()
const userColorData = userStore.userColorData

const contactsFavoriteData = computed(() => contactsStore.favoriteContacts)
const funnelsFavoriteData = computed(() => funnelStore.favoriteFunnels)

</script>

<template>
  <div class="d-lg-flex w-100 h-100 mt-3 favorite-content">
    <div class="col-lg-6 col-12 d-flex align-items-center justify-content-center h-100 ">
      <div class="h-100 w-75 d-flex flex-column">
        <div :class="['w-100 py-3 rounded-2', userColorData.color]">
          <p class="m-0 text-white ms-3 fw-bold">Favorite Contacts</p>
        </div>
        <div class="list-content h-100 mb-5">
          <FavoriteContactCard
            :key="contact.id"
            v-for="contact in contactsFavoriteData"
            :contact="contact"
          />
          <EmptyFavoriteCard v-if="contactsFavoriteData.length === 0"/>
        </div>
      </div>
    </div>
    <div class="col-lg-6 mt-lg-0 mt-5 col-12 d-flex align-items-center justify-content-center h-100">
      <div class="h-100 w-75 d-flex flex-column">
        <div :class="['w-100 py-3 rounded-2', userColorData.color]">
          <p class="m-0 ms-3 text-white fw-bold">Favorite Funnels</p>
        </div>
        <div class="list-content h-100 mb-5">
          <FavoriteFunnelCard
            :key="funnel.id"
            v-for="funnel in funnelsFavoriteData"
            :funnel="funnel"
          />
          <EmptyFavoriteCard v-if="funnelsFavoriteData.length === 0" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.favorite-content, .list-content {
  overflow: auto;
}

.list-content {
  max-height: 100%;
}
</style>
