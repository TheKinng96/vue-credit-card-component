import HelloWorld from "./components/HelloWorld.vue";

const HelloWorldSimple = {
  install(Vue: any) {
    Vue.component("hello-world", HelloWorld);
  },
};

if (typeof window !== "undefined" && window.Vue) {
  window.Vue.use(HelloWorldSimple);
}

export default HelloWorldSimple;
