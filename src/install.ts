import CreditCard from './components/CreditCard.vue';

const VCreditCard = {
  install(Vue: any) {
    Vue.component('v-credit-card', CreditCard);
  },
};

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VCreditCard);
}

export default VCreditCard;
