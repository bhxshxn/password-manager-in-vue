<template>
  <div class="flex flex-col min-h-screen">
    <Header />
    <div class="flex-grow flex justify-center items-center flex-col">
      <div class="flex flex-col w-[30%] justify-center items-center">
        <div
          class="flex flex-col w-[80%] bg-[#c2fffb] px-12 py-6 justify-center items-center rounded-md"
        >
          <div class="py-4 flex flex-start flex-col w-full">
            <h2 class="text-2xl">Please Login</h2>
            <span class="text-[#eb2929] mb-2 text-sm"
              >*All fields are required.</span
            >
          </div>
          <div class="py-4">
            <input
              type="text"
              class="py-4 bg-white my-3 w-full px-2 outline-none rounded-md"
              placeholder="Username"
              required
              v-model="form.username"
            />
            <input
              type="password"
              class="py-4 bg-white my-3 w-full px-2 outline-none rounded-md"
              placeholder="Password"
              required
              v-model="form.password"
            />
          </div>
          <button
            v-on:click="submit()"
            class="bg-[#1a4fff] w-full py-3 my-3 rounded-md text-white text-lg"
          >
            Login
          </button>
          <ul class="register">
            <button v-on:click="route()">
              New here? <span class="text-blue-800">Sign Up. </span>
            </button>
          </ul>
        </div>
      </div>
    </div>
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
  name: "Login",
  components: { Header, Footer },
  data() {
    interface form {
      username: string;
      password: string;
    }
    return {
      form: <form>{
        username: "",
        password: "",
      },
      isLoading: <boolean>false,
    };
  },
  async created() {
    const user = localStorage.getItem("user");
    if (user) {
      router.push("/");
    }
  },
  methods: {
    route() {
      router.push("/register");
    },
    async submit() {
      this.isLoading = true;
      const user = await axios
        .post("http://localhost:3000/api/user/login", {
          username: this.form.username,
          password: this.form.password,
        })
        .then((res) => {
          localStorage.setItem("user", res.data.user.username);
          router.push("/");
          this.isLoading = false;
          console.log("user", res);
        })
        .catch((err) => {
          alert(err);
        });
    },
  },
});
</script>
