<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-textarea
          clearable
          autofocus
          no-resize
          label="Que voulez-vous partager ?"
          v-model="content"
        />
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col v-show="isGifSelection" cols="12" md="6">
        <p>GIF selection</p>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col v-show="isFileInput" cols="12" md="6">
        <v-file-input
          ref="fileInput"
          label="Charger une image"
          accept="image/*"
          v-model="file"
        />
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="2" md="1">
        <v-btn
          :icon="mdiFileGifBox"
          color="primary"
          @click="isGifSelection = !isGifSelection"
          title="GIF"
        />
      </v-col>
      <v-col cols="2" md="1">
        <v-btn
          :icon="mdiCamera"
          color="secondary"
          @click="openFileInput"
          title="Image"
          >Charger une image</v-btn
        >
      </v-col>
      <v-col cols="2" md="1">
        <v-btn
          :icon="mdiFileImageRemove"
          v-show="file.length || image"
          title="Supprimer l'image"
          @click="clearUpload"
        />
      </v-col>
    </v-row>
    <v-spacer />
    <v-row justify="space-around">
      <v-col cols="6" md="1">
        <v-btn flat to="/">Retour</v-btn>
      </v-col>
      <v-col cols="6" md="1">
        <v-btn color="green-darken-3" text-color="white" @click="createPost"
          >Poster</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import { mdiCamera, mdiFileGifBox, mdiFileImageRemove } from "@mdi/js";
import { useRouter, useRoute } from "vue-router";
import postAPI from "@/api/posts";

const router = useRouter();
const route = useRoute();
const store = useStore();
const postId = route.params?.id;

const content = ref("");

const fileInput = ref("fileInput");

const file = ref([]);

const image = ref("");

if (postId) {
  postAPI.get(postId).then((res) => {
    image.value = res.data.image;
    content.value = res.data.content;
  });
}

const isFileInput = ref(false);

const isGifSelection = ref(false);

const createPost = () => {
  const post = new FormData();
  post.append("content", content.value);
  if (file.value.length > 0) {
    post.append("upload", file.value[0]);
  } else if (image.value) {
    post.append("image", image.value);
  }

  if (postId) {
    store
      .dispatch("posts/modify", { post, id: postId })
      .then(() => router.push("/"));
  } else {
    store.dispatch("posts/create", { post }).then(() => router.push("/"));
  }
};

const openFileInput = () => {
  isFileInput.value = !isFileInput.value;
  if (isFileInput.value) {
    fileInput.value.click();
  } else {
    file.value = [];
  }
};

const clearUpload = () => {
  file.value = [];
  image.value = "";
};
</script>
