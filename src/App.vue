<template>
  <div id="app">
    <hello-world
      @change="creditInfoChanged"
      :direction="'column'"
      :trans="translations"
      :order="order"
      :errorMessage="error"
      @hasError="hasError"
    >
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
  order = {
    businessName: 2,
    name: 2,
    card: 1,
    security: 3,
    isBusinessCardCheckbox: 4,
  };
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
      placeholder: 'Corekara Inc',
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
  error = {
    card: '',
    cardName: 'Please only input alphabet character.',
    businessName: 'Please only input alphabet character.',
  };

  mounted() {
    setTimeout(() => {
      this.error.card = '123123';
    }, 1000);
  }

  hasError(val: boolean) {
    console.log(val);
  }

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
