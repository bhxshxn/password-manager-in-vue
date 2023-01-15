<template>
  <div class="bg-black container-fluid px-12 flex justify-between py-3">
    <button>
      <div class="items-center flex">
        <i class="fa-solid fa-lock text-white text-3xl"></i
        ><span class="text-white text-4xl pl-3">Password Manager</span>
      </div>
    </button>
    <button>
      <div>
        <i class="fa-solid fa-user text-white text-3xl"> </i>
      </div>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Header",
  components: {},
});
</script>
