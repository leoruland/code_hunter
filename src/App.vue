<script setup>
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <HelloWorld msg="Vite + Vue" />
  <div v-if="updateExists" class="update-banner">
    <p>Ein neues Update ist verfügbar!</p>
    <button @click="refreshApp">Aktualisieren</button>
  </div>
  <router-view />
</template>

<script>
export default {
  data() {
    return {
      updateExists: false,
      registration: null
    }
  },
  
  created() {
    document.addEventListener('swUpdated', this.showRefreshUI, { once: true })
    
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (this.refreshing) return
      this.refreshing = true
      window.location.reload()
    })
  },
  
  methods: {
    showRefreshUI(e) {
      this.registration = e.detail
      this.updateExists = true
    },
    
    refreshApp() {
      this.updateExists = false
      if (!this.registration || !this.registration.waiting) return
      this.registration.waiting.postMessage({ type: 'SKIP_WAITING' })
    }
  }
}
</script>

<style>
.update-banner {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: #4DBA87;
  color: white;
  padding: 15px 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  display: flex;
  gap: 15px;
  align-items: center;
  z-index: 1000;
}
</style>
