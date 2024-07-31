import { defineStore, acceptHMRUpdate } from "pinia";

export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    userId: localStorage.getItem('userId') || "",
    username: localStorage.getItem('username') || "",
    password: localStorage.getItem('password') || "",
    avatar: localStorage.getItem('avatar') || ""
  }),
  getters: {
    // 示例getter，返回带有前缀的用户名
    prefixedUsername: (state) => {
      return `User: ${state.username}`;
    }
  },
  actions: {
    // 设置用户ID并存储到本地
    setUserId(id: string) {
      this.userId = id;
      localStorage.setItem('userId', id);
    },
    // 设置用户名和密码并存储到本地
    setUserCredentials(username: string, password: string) {
      this.username = username;
      this.password = password;
      localStorage.setItem('username', username);
      localStorage.setItem('password', password);
    },
    // 设置用户头像
    setUserAvatar(avatar: string) {
      this.avatar = avatar;
      localStorage.setItem('avatar', avatar);
    },
    // 清除用户信息
    clearUser() {
      this.userId = "";
      this.username = "";
      this.password = "";
      localStorage.removeItem('userId');
      localStorage.removeItem('username');
      localStorage.removeItem('password');
    }
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
