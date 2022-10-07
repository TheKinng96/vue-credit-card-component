## v-credit-card

Vue friendly credit card component, forked https://github.com/AfikDeri/v-credit-card

Features:

- Business card support
- Order arrangement support

<img src="./card.gif">

#### Installation

```
npm install --save v-credit-card-component
```

#### usage

Register the component as a plugin and use it globally

```js
import Vue from 'vue';
import VCreditCard from 'v-credit-card-component';

Vue.use(VCreditCard);

// usage
<v-credit-card />;
```

#### Styles

You must import the CSS to get all the card styles

```js
import VCreditCard from 'v-credit-card-component';
import 'v-credit-card-component/dist/VCreditCard.css';
```

#### Available props

| props              | required | options      | default        | explanation                                       |
| ------------------ | -------- | ------------ | -------------- | ------------------------------------------------- |
| direction          | no       | column, row  | row            | Card and form side-by-side or top to bottom       |
| className          | no       | any string   | none           | For any custom design, add your own wrapper class |
| yearDigits         | no       | 2,4 (number) | 2              | construct the expiration year (YY or YYYY)        |
| noCard             | no       | true, false  | false          | Show only the form without the credit card image  |
| trans              | no       | Object       | default labels | Override the default labels with your own         |
| order              | no       | Object       | default orders | Rearrange the input orders                        |
| acceptBusinessCard | no       | boolean      | true           | Will add a toggle for business name input         |

#### Events

You can listen for the `@change` event to get an object of all the form fields with their current values

```html
<template>
  <VCreditCard @change="onInputChanged" />
</template>

<script>
  import VCreditCard from 'v-credit-card-component';

  interface Data {
    name: string;
    businessName: string;
    cardNumber: string;
    expiration: string;
    security: string;
    isBusinessCard: boolean;
  }

  export default {
    // ...
    methods: {
      onInputChanged(values: Data) {
        console.log('Credit card fields', values);
      },
    },
    components: {
      VCreditCard,
    },
  };
</script>
```

#### Example: store the form data in your component

This example shows how to have your local data reflect the changes inside the card component.

```html
<template>
  <VCreditCard @change="onInputChanged" />
</template>

<script>
  import VCreditCard from 'v-credit-card-component';

  export default {
      data() {
          return {
              name: '',
              cardNumber: '',
              expiration: '',
              security: '',
              businessName: '';
              isBusinessCard: '';
          };
      },
      methods: {
          onInputChanged(values) {
              for (const key in values) {
                  this[key] = values[key];
              }
          }
      },
      components: {
          VCreditCard
      }
  }
</script>
```

If you need the card type as well (Visa, Mastercard, etc) you can listen to the `@cardChanged` event.

```html
<template>
  <VCreditCard @cardChanged="cardChanged" />
</template>

<script>
  import VCreditCard from 'v-credit-card-component';

  export default {
    data() {
      return {
        // ...
        cardName: null,
      };
    },
    methods: {
      // ...
      cardChanged(cardName) {
        this.cardName = cardName;
      },
    },
    components: {
      VCreditCard,
    },
  };
</script>
```

#### Translations

If you wish to override the default field labels, you can accomplish that by passing a custom translation object.

```html
<template>
  <VCreditCard :trans="translations" />
</template>

<script>
  import VCreditCard from 'v-credit-card';

  const translations = {
    name: {
      label: '名前',
      placeholder: 'カードホルダー',
    },
    card: {
      label: 'クレジットカード',
      placeholder: 'クレジットカード',
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

  export default {
    data() {
      return {
        translations,
      };
    },
    components: {
      VCreditCard,
    },
  };
</script>
```

## License

MIT © 2018-present
