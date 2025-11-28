export default defineNuxtRouteMiddleware((to,from) => {
  const { user } = useAuth();
  user.value = { role: 1 };
  console.log(user.value.role)
  if (!user.value) return navigateTo("/login");
  if (user.value.role == 0) {
    to.meta.layout = "admin";
  } else if (user.value.role == 1) {
    to.meta.layout = "user1";
  }
   else if (user.value.role == 2) {
    to.meta.layout = "user2";
  }
});
