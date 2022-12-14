<template>
  <div class="vue-credit-card" :class="className">
    <div class="card-form-and-image" :style="{ flexDirection: direction }">
      <div class="credit-card-image" v-if="!noCard">
        <div
          class="credit-card"
          :class="{ flipped }"
          @click="flipped = !flipped"
        >
          <CardFront
            :cardNumber="form.cardNumber"
            :expiration="form.expiration"
            :name="form.name"
            :isTwoDigitsYear="isTwoDigitsYear"
            :color="color"
            :businessName="form.businessName"
            :isBusinessCard="form.isBusinessCard"
            :trans="trans.image"
          >
            <template v-slot:cardIcon>
              <div id="ccsingle">
                <component :is="cardInnerIcon" />
              </div>
            </template>
          </CardFront>
          <CardBack
            :nameBack="form.name"
            :security="form.security"
            :color="color"
            :trans="trans.image"
          />
        </div>
      </div>
      <div class="credit-card-form">
        <div
          class="field"
          :style="{ order: order.businessName }"
          v-if="form.isBusinessCard && acceptBusinessCard"
          :class="{
            success: form.businessName.length > 0 && showValidMark,
            error: errorMessage.businessName && businessNameIsInvalid,
          }"
        >
          <label for="businessName" id="labelBusinessName">
            {{ trans.businessName.label }}
            <slot name="businessNameLabel"></slot>
          </label>
          <input
            :tabindex="order.businessName"
            maxlength="20"
            name="businessName"
            id="businessName"
            type="text"
            :placeholder="trans.businessName.placeholder"
            v-model="form.businessName"
            @focus="flipped = false"
            ref="businessName"
          />
          <p v-if="businessNameIsInvalid">{{ errorMessage.businessName }}</p>
          <!-- Downloaded from FontAwesome -->
          <svg
            class="exclamation"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              fill="red"
              d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zm0-384c13.3 0 24 10.7 24 24V264c0 13.3-10.7 24-24 24s-24-10.7-24-24V152c0-13.3 10.7-24 24-24zm32 224c0 17.7-14.3 32-32 32s-32-14.3-32-32s14.3-32 32-32s32 14.3 32 32z"
            />
          </svg>
          <!-- Downloaded from FontAwesome -->
          <svg
            v-if="form.businessName.length > 0 && showValidMark"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            class="check"
          >
            <path
              fill="green"
              d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"
            />
          </svg>
        </div>
        <div
          class="field"
          :style="{ order: order.name }"
          :class="{
            success: form.name.length > 0 && showValidMark,
            error: errorMessage.cardName && cardNameIsInvalid,
          }"
        >
          <label for="name" id="labelName">
            {{ trans.name.label }}
            <slot name="nameLabel"></slot>
          </label>
          <input
            :tabindex="order.name"
            maxlength="20"
            name="name"
            id="name"
            type="text"
            :placeholder="trans.name.placeholder"
            v-model="form.name"
            @focus="flipped = false"
            @blur="flipped = false"
            ref="cardName"
          />
          <p v-if="cardNameIsInvalid">{{ errorMessage.cardName }}</p>
          <!-- Downloaded from FontAwesome -->
          <svg
            class="exclamation"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              fill="red"
              d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zm0-384c13.3 0 24 10.7 24 24V264c0 13.3-10.7 24-24 24s-24-10.7-24-24V152c0-13.3 10.7-24 24-24zm32 224c0 17.7-14.3 32-32 32s-32-14.3-32-32s14.3-32 32-32s32 14.3 32 32z"
            />
          </svg>
          <!-- Downloaded from FontAwesome -->
          <svg
            v-if="form.name.length > 0 && showValidMark"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            class="check"
          >
            <path
              fill="green"
              d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"
            />
          </svg>
        </div>
        <div
          class="field"
          :style="{ order: order.card }"
          :class="{
            error: innerErrorMessage,
            success: cardIsValid && showValidMark,
          }"
        >
          <label for="cardNumber" id="labelCardNumber">
            {{ trans.card.label }}
            <slot name="cardNumberLabel"></slot>
            <div v-if="tooltip.showTooltip" class="tooltip">
              <p>?</p>
              <div>
                <div class="tooltip-content-wrapper">
                  <p v-html="tooltip.context"></p>
                </div>
              </div>
            </div>
          </label>
          <input
            :tabindex="order.card"
            type="text"
            name="cardNumber"
            id="cardNumber"
            ref="cardNumber"
            pattern="[0-9 ]*"
            inputmode="numeric"
            :placeholder="trans.card.placeholder"
            @focus="flipped = false"
            @keypress="clearError"
          />
          <svg
            v-if="cardIconConfig.showIcon !== false"
            class="ccicon"
            :class="[cardIconConfig.position]"
            width="750"
            height="471"
            viewBox="0 0 750 471"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
          >
            <component :is="cardIcon" />
          </svg>
          <p v-if="innerErrorMessage">{{ innerErrorMessage }}</p>
          <!-- Downloaded from FontAwesome -->
          <svg
            v-if="innerErrorMessage"
            class="exclamation"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              fill="red"
              d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zm0-384c13.3 0 24 10.7 24 24V264c0 13.3-10.7 24-24 24s-24-10.7-24-24V152c0-13.3 10.7-24 24-24zm32 224c0 17.7-14.3 32-32 32s-32-14.3-32-32s14.3-32 32-32s32 14.3 32 32z"
            />
          </svg>
          <!-- Downloaded from FontAwesome -->
          <svg
            v-if="cardIsValid && showValidMark"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            class="check"
          >
            <path
              fill="green"
              d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"
            />
          </svg>
        </div>
        <div class="field-group" :style="{ order: order.security }">
          <div
            class="field"
            :class="{ success: expiryDateIsValid && showValidMark }"
          >
            <label for="expirationDate" id="labelExpiryDate">
              {{ trans.expiration.label }} (mm/{{
                isTwoDigitsYear ? 'yy' : 'yyyy'
              }})
              <slot name="expirationDateLabel"></slot>
            </label>
            <input
              :tabindex="order.security"
              type="text"
              name="expirationDate"
              id="expirationDate"
              pattern="[0-9\/]*"
              ref="expiration"
              :placeholder="isTwoDigitsYear ? 'MM/YY' : 'MM/YYYY'"
              inputmode="numeric"
              @focus="flipped = false"
            />
            <!-- Downloaded from FontAwesome -->
            <svg
              v-if="expiryDateIsValid && showValidMark"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              class="check"
            >
              <path
                fill="green"
                d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"
              />
            </svg>
          </div>
          <div
            class="field"
            :class="{ success: form.security.length === 3 && showValidMark }"
          >
            <label for="securityCode" id="labelSecurityCode">
              {{ trans.security.label }}
              <slot name="securityCodeLabel"></slot>
            </label>
            <input
              :tabindex="order.security"
              type="text"
              name="securityCode"
              id="securityCode"
              ref="security"
              pattern="[0-9]*"
              :placeholder="trans.security.placeholder"
              inputmode="numeric"
              @focus="flipped = true"
            />
            <!-- Downloaded from FontAwesome -->
            <svg
              v-if="form.security.length === 3 && showValidMark"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              class="check"
            >
              <path
                fill="green"
                d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"
              />
            </svg>
          </div>
        </div>
        <div
          class="is-business-card-checkbox"
          :style="{ order: order.isBusinessCardCheckbox }"
          v-if="acceptBusinessCard"
        >
          <input
            :tabindex="order.isBusinessCardCheckbox"
            type="checkbox"
            name="isBusinessCard"
            id="isBusinessCard"
            ref="isBusinessCard"
            v-model="form.isBusinessCard"
          />
          <label for="isBusinessCard" id="labelBusinessCardCheckbox">
            {{ trans.isBusinessCard.label }}
            <slot name="isBusinessCardLabel"></slot>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// Source reference: https://codepen.io/quinlo/pen/YONMEa
import IMask from 'imask';
import cardTypes from './CreditCard/cardTypes';
import { cardMasks, expirationMask, securityMask } from './CreditCard/masks';
import { CardFront, CardBack } from './CreditCard/cards';
import * as InputIcons from './CreditCard/inputIcons';
import * as CardIcons from './CreditCard/cardDisplay';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

interface ITranslationItem {
  label: string;
  placeholder?: string;
}

interface ITranslation {
  name: ITranslationItem;
  businessName: ITranslationItem;
  card: ITranslationItem;
  expiration: ITranslationItem;
  security: ITranslationItem;
  isBusinessCard: ITranslationItem;
  image: {
    cardNumber: string;
    cardholder: string;
    expiration: string;
    valid: string;
    thru: string;
    security: string;
  };
}

interface IData {
  name: string;
  businessName: string;
  cardNumber: string;
  expiration: string;
  security: string;
  isBusinessCard: boolean;
}

interface Order {
  businessName: number;
  name: number;
  card: number;
  security: number;
  isBusinessCardCheckbox: number;
}

interface ICardIconConfig {
  showIcon?: boolean;
  position: 'inline' | 'top';
}

interface ITooltipConfig {
  showTooltip: boolean;
  context: string;
}

interface IErrorMessages {
  card: string;
  cardName?: string;
  businessName?: string;
}

interface IRegex {
  cardName: string;
  businessName: string;
}

@Component({
  components: {
    CardFront,
    CardBack,
  },
})
export default class CreditCard extends Vue {
  @Prop({
    default: () => ({
      name: {
        label: 'Name',
        placeholder: 'Full Name',
      },
      businessName: {
        label: 'Business Name',
        placeholder: 'Business Name',
      },
      card: {
        label: 'Card Number',
        placeholder: 'Card Number',
      },
      expiration: {
        label: 'Expiration',
      },
      security: {
        label: 'Security Code',
        placeholder: 'Code',
      },
      isBusinessCard: {
        label: 'Is business card',
      },
      image: {
        cardNumber: 'card number',
        cardholder: 'cardholder name',
        expiration: 'expiration',
        valid: 'valid',
        thru: 'thru',
        security: 'security code',
      },
    }),
  })
  public trans!: ITranslation;
  @Prop({ default: 'column' }) public direction!: 'row' | 'column';
  @Prop({
    default: () => ({
      businessName: 0,
      name: 1,
      card: 2,
      security: 3,
      isBusinessCardCheckbox: 4,
    }),
  })
  public order!: Order;
  @Prop({ default: true }) public acceptBusinessCard!: boolean;
  @Prop({ default: '' }) public className!: string;
  @Prop({ default: false }) public noCard!: boolean;
  @Prop({ default: 2 }) public yearDigits!: 2 | 4;
  @Prop({
    default: () => ({
      showIcon: true,
      position: 'inline',
    }),
  })
  public cardIconConfig!: ICardIconConfig;
  @Prop({
    default: () => ({
      card: '',
      cardName: 'Please enter only alphabet.',
      businessName: 'Please enter only alphabet.',
    }),
  })
  public errorMessage!: IErrorMessages;
  @Prop({
    default: () => ({
      cardName: '^[A-Za-z\\s]+$',
      businessName: '^[A-Za-z\\s]+$',
    }),
  })
  public regex!: IRegex;
  @Prop({ default: true }) public showValidMark?: boolean;
  @Prop({
    default: () => ({
      showTooltip: false,
      context: '',
    }),
  })
  public tooltip?: ITooltipConfig;

  // Copied of error message
  innerErrorMessage = '';
  defaultColor = 'grey';
  flipped = false;
  cardType = null;
  cardIcon = null;
  cardInnerIcon = null;
  color = 'grey';
  cardNumberMask: any = null;
  expirationDateMask: any = null;
  securityCodeMask: any = null;
  form: IData = {
    name: '',
    businessName: '',
    cardNumber: '',
    expiration: '',
    security: '',
    isBusinessCard: false,
  };
  cardNameRegex: any = null;
  businessNameRegex: any = null;

  @Watch('fields')
  onFieldsChanged() {
    this.form.businessName = this.form.isBusinessCard
      ? this.form.businessName
      : '';

    if (this.cardNameIsInvalid || this.businessNameIsInvalid) {
      this.$emit('hasError', true);
    } else {
      this.$emit('hasError', false);
    }

    this.$emit('change', Object.assign({}, this.$data.form));
  }

  @Watch('cardType')
  onCardTypeChanged(val: any) {
    this.$emit('cardChanged', val);
  }

  @Watch('errorMessage', { deep: true })
  updateError(val: IErrorMessages) {
    this.innerErrorMessage = val.card;
  }

  clearError() {
    if (this.innerErrorMessage) {
      this.innerErrorMessage = '';
    }
  }

  mounted() {
    this.defineMasks();
    this.setMasksListeners();
    this.innerErrorMessage = this.errorMessage.card;

    this.cardNameRegex = new RegExp(this.regex.cardName, 'i');
    this.businessNameRegex = new RegExp(this.regex.businessName, 'i');
  }

  defineMasks() {
    // Mask the Credit Card Number Input
    this.cardNumberMask = new (IMask as any)(this.$refs.cardNumber, cardMasks);

    // Mask the Expiration Date
    this.expirationDateMask = new (IMask as any)(
      this.$refs.expiration,
      expirationMask(this.isTwoDigitsYear),
    );

    // Mask the security code
    this.securityCodeMask = new (IMask as any)(
      this.$refs.security,
      securityMask,
    );
  }

  setMasksListeners() {
    // Update expiration date field
    this.expirationDateMask.on(
      'accept',
      () => (this.form.expiration = this.expirationDateMask.value),
    );

    // Update security code field
    this.securityCodeMask.on(
      'accept',
      () => (this.form.security = this.securityCodeMask.value),
    );

    // Update card number field and card icon
    this.cardNumberMask.on('accept', () => {
      const cardName = this.cardNumberMask.masked.currentMask.cardtype;
      this.form.cardNumber = this.cardNumberMask.value;

      if (this.hasProperty(cardTypes, cardName)) {
        const card = (cardTypes as any)[cardName];

        this.cardIcon = (InputIcons as any)[card.name];
        this.cardInnerIcon = (CardIcons as any)[card.name];
        this.cardType = card.name;
        this.setColor(card.color);
        return;
      }

      this.resetCardDefaults();
    });
  }

  resetCardDefaults() {
    this.cardIcon = null;
    this.cardInnerIcon = null;
    this.cardType = null;
    this.setColor();
  }

  setColor(colorName?: string) {
    this.color = colorName ?? this.defaultColor;
  }

  hasProperty(obj: any, key: string) {
    return !!obj && Object.prototype.hasOwnProperty.call(obj, key);
  }

  get cardNameIsInvalid() {
    if (this.form.name.length <= 0) {
      return false;
    }

    return !this.cardNameRegex.test(this.form.name);
  }

  get businessNameIsInvalid() {
    if (this.form.businessName.length <= 0) {
      return false;
    }

    return !this.businessNameRegex.test(this.form.businessName);
  }

  get cardIsValid() {
    if (!this.innerErrorMessage) {
      let length = this.form.cardNumber.replaceAll(' ', '').length;
      return length >= 14 && length <= 16;
    }

    return false;
  }

  get expiryDateIsValid() {
    if (this.isTwoDigitsYear) {
      return this.form.expiration.length === 5;
    }
    return this.form.expiration.length === 7;
  }

  get isTwoDigitsYear(): boolean {
    return this.yearDigits === 2;
  }

  get fields() {
    return [
      this.form.name,
      this.form.businessName,
      this.form.cardNumber,
      this.form.expiration,
      this.form.security,
      this.form.isBusinessCard,
    ].join('');
  }
}
</script>

<style lang="scss">
.vue-credit-card {
  display: flex;
  align-items: stretch;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;

  .card-form-and-image {
    display: flex;
    align-items: center;
    justify-content: center;

    .credit-card-form {
      display: flex;
      flex-direction: column;
      align-items: stretch;
      justify-content: space-between;
      max-width: 400px;
      padding: 20px;
      color: #707070;

      .field-group {
        display: flex;

        .field:first-child {
          margin-right: 10px;
        }
      }

      .field {
        position: relative;
        width: 100%;
        margin: 10px 0;
        display: flex;
        flex-direction: column;
        align-items: flex-start;

        label {
          padding-bottom: 5px;
          font-size: 13px;
          display: flex;
          align-items: center;
          justify-content: flex-start;

          .tooltip {
            position: relative;

            > p {
              padding: 0;
              margin: 0;
              border-radius: 50%;
              border: 1px #707070 solid;
              color: #707070;
              width: 1rem;
              height: 1rem;
              margin-left: 0.5rem;
              font-size: 0.7rem;
              transition: all 0.25s ease-in-out;
            }

            > div {
              position: absolute;
              background: #ff7575;
              padding: 0.5rem 1rem;
              opacity: 0;
              top: -0.75rem;
              left: 2.5rem;
              transition: all 0.25s ease-in-out;
              width: max-content;
              border-radius: 0.4rem;

              .tooltip-content-wrapper {
                position: relative;
                &:before {
                  content: ' ';
                  position: absolute;
                  width: 0;
                  height: 0;
                  left: -2rem;
                  top: 50%;
                  bottom: auto;
                  border: 0.5rem solid;
                  border-color: transparent #ff7575 transparent transparent;
                  transform: translateY(-50%);
                }

                p {
                  color: white;
                }
              }
            }

            &:hover {
              > div {
                opacity: 1;
              }
            }
          }
        }

        input {
          box-sizing: border-box;
          margin-top: 3px;
          padding: 15px;
          font-size: 16px;
          width: 100%;
          border-radius: 3px;
          border: 1px solid #dcdcdc;
        }

        svg.exclamation {
          display: none;
        }

        &.success {
          input,
          input:focus,
          input:focus-visible {
            border-color: green;
            outline: 1px solid green;
          }

          svg {
            &.inline {
              right: 38px;
              top: calc(50% - 6px);
            }

            &.check {
              position: absolute;
              width: 1.5rem;
              right: 0.5rem;
              top: 50%;
            }
          }
        }

        &.error {
          input,
          input:focus,
          input:focus-visible {
            border-color: red;
            outline: 1px solid red;
          }

          svg {
            &.inline {
              right: 38px;
              top: 2.25rem;
            }

            &.exclamation {
              position: absolute;
              width: 1.5rem;
              right: 0.5rem;
              top: 2.5rem;
              display: block;
            }

            &.check {
              display: none;
            }
          }

          p {
            margin: 0;
            font-size: 0.875rem;
            color: red;
            margin-top: 0.2rem;
          }
        }
      }

      .is-business-card-checkbox {
        display: flex;
        gap: 0.5rem;
      }
    }
  }

  .ccicon {
    height: 38px;
    width: 60px;
    position: absolute;

    &.inline {
      right: 6px;
      top: calc(50% - 6px);
    }

    &.top {
      right: 2px;
      top: -8px;
      height: 30px;
      width: 50px;
    }
  }

  .credit-card-image {
    width: 100%;
    max-width: 400px;
    max-height: 251px;
    height: 54vw;
    padding: 20px;
    perspective: 1000px;
  }

  #ccsingle {
    position: absolute;
    right: 15px;
    top: 20px;

    svg {
      width: 100px;
      max-height: 60px;
    }
  }

  .credit-card {
    width: 100%;
    max-width: 400px;
    transform-style: preserve-3d;
    transition: transform 0.6s;
    cursor: pointer;

    .front,
    .back {
      position: absolute;
      width: 100%;
      max-width: 400px;
      backface-visibility: hidden;
      color: #47525d;
    }

    .back {
      transform: rotateY(180deg);
    }

    &.flipped {
      transform: rotateY(180deg);
    }

    svg#cardfront,
    svg#cardback {
      width: 100%;
      box-shadow: 1px 5px 6px 0px black;
      border-radius: 22px;
    }

    .lightcolor,
    .darkcolor {
      transition: fill 0.5s;
    }

    .lightblue {
      fill: #03a9f4;
    }

    .lightbluedark {
      fill: #0288d1;
    }

    .red {
      fill: #ef5350;
    }

    .reddark {
      fill: #d32f2f;
    }

    .purple {
      fill: #ab47bc;
    }

    .purpledark {
      fill: #7b1fa2;
    }

    .cyan {
      fill: #26c6da;
    }

    .cyandark {
      fill: #0097a7;
    }

    .green {
      fill: #66bb6a;
    }

    .greendark {
      fill: #388e3c;
    }

    .lime {
      fill: #d4e157;
    }

    .limedark {
      fill: #afb42b;
    }

    .yellow {
      fill: #ffeb3b;
    }

    .yellowdark {
      fill: #f9a825;
    }

    .orange {
      fill: #ff9800;
    }

    .orangedark {
      fill: #ef6c00;
    }

    .grey {
      fill: #bdbdbd;
    }

    .greydark {
      fill: #616161;
    }
  }

  #svgname {
    text-transform: uppercase;
  }

  #cardfront {
    .st2 {
      fill: #ffffff;
    }

    .st3 {
      font-family: 'Source Code Pro', monospace;
      font-weight: 600;
    }

    .st4 {
      font-size: 54.7817px;
    }

    .st5 {
      font-family: 'Source Code Pro', monospace;
      font-weight: 400;
    }

    .st6 {
      font-size: 33.1112px;
    }

    .st7 {
      opacity: 0.6;
      fill: #ffffff;
    }

    .st8 {
      font-size: 24px;
    }

    .st9 {
      font-size: 36.5498px;
    }

    .st10 {
      font-family: 'Source Code Pro', monospace;
      font-weight: 300;
    }

    .st11 {
      font-size: 16.1716px;
    }

    .st12 {
      fill: #4c4c4c;
    }
  }

  #cardback {
    .st0 {
      fill: none;
      stroke: #0f0f0f;
      stroke-miterlimit: 10;
    }

    .st2 {
      fill: #111111;
    }

    .st3 {
      fill: #f2f2f2;
    }

    .st4 {
      fill: #d8d2db;
    }

    .st5 {
      fill: #c4c4c4;
    }

    .st6 {
      font-family: 'Source Code Pro', monospace;
      font-weight: 400;
    }

    .st7 {
      font-size: 27px;
    }

    .st8 {
      opacity: 0.6;
    }

    .st9 {
      fill: #ffffff;
    }

    .st10 {
      font-size: 24px;
    }

    .st11 {
      fill: #eaeaea;
    }

    .st12 {
      font-family: 'Rock Salt', cursive;
    }

    .st13 {
      font-size: 37.769px;
    }
  }
}
</style>
