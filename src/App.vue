<template>
  <div id="app">
    <hello-world
      @change="creditInfoChanged"
      :direction="'column'"
      :trans="translations"
    >
      <template v-slot:cardNumberLabel>
        <h1>hihi</h1>
      </template>
      <template v-slot:nameLabel>
        <h1>hihi</h1>
      </template>
    </hello-world>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/CreditCard.vue';

@Component({
  components: {
    HelloWorld,
  },
})
export default class App extends Vue {
  translations = {
    name: {
      label: '名前',
      placeholder: 'カードホルダー',
    },
    card: {
      label: 'クレジットカード',
      placeholder: 'クレジットカード',
    },
    businessName: {
      label: '会社名',
      placeholder: '株式会社　これから',
    },
    expiration: {
      label: '有効期限',
    },
    security: {
      label: 'セキュリティーコード',
      placeholder: 'コード',
    },
    isBusinessCard: {
      label: 'ビジネスカードを使います',
    },
    image: {
      cardNumber: 'クレジットカード',
      cardholder: 'カードホルダー',
      expiration: '有効期限',
      valid: 'valid',
      thru: 'thru',
      security: 'セキュリティーコード',
    },
  };
  creditInfoChanged() {
    // console.log(data);
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
