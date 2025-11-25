<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 p-4">
    <div class="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
      <!-- Header -->
      <h1 class="text-3xl font-bold text-center mb-6">เข้าสู่ระบบ</h1>

      <!-- Form -->
      <form @submit.prevent="onlogin()" class="space-y-5">
        <!-- Email -->
        <div>
          <input
            v-model="input.username"
            type="text"
            class="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="username"
            required
          />
        </div>

        <!-- Password -->
        <div>
          <input
            v-model="input.password"
            type="password"
            class="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="password"
            required
          />
        </div>

        <!-- Button -->
        <button
          type="submit"
          class="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
        >
          ตกลง
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>

const {login,user} = useAuth()
const input = ref({username:'',password:''});
async function onlogin(){
   await login(input.value)
   console.log(user.value);
   
}
//const data = await $fetch(`http://localhost:81/`);


</script>
