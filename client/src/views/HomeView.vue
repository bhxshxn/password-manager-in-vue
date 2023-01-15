<template>
  <div class="flex flex-col min-h-screen">
    <Header />
    <div class="flex-grow"></div>
    <Footer />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import router from "../router";
import axios from "axios";

export default defineComponent({
  name: "HomeView",
  components: { Header, Footer },
  async created() {
    const user = await localStorage.getItem("user");
    if (!user) {
      router.push("/login");
    }

    const pass = await axios.get(
      `http://localhost:3000/api/password/all?user=${user}`
    );
    console.log("pass", pass);
  },
});
</script>
