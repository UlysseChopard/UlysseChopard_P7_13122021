<template>
  <v-app-bar app density="compact">
    <v-app-bar-nav-icon title="menu-icon" @click="$emit('switchDrawer')" />
    <v-img
      max-height="36"
      min-width="200"
      src="/icon-left-font-monochrome-black.svg"
      alt="logo"
      @click="$router.push('/')"
    />
  </v-app-bar>
</template>

<script setup />
