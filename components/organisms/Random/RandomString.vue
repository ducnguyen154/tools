<template>
  <div>
    <b-row>
      <b-col cols="5">
        <b-form-group
          id="g-num-of-result"
          :label="`Num of random results (max ${numOfResultMax})`"
          label-for="txt-num-of-result"
          description="The number of random string would you want to generate."
        >
          <b-form-input
            id="txt-num-of-result"
            v-model.number="numOfResult"
            type="number"
            :max="numOfResultMax"
          ></b-form-input>
        </b-form-group>
        <b-form-group
          id="g-string-length"
          :label="`String length (max ${stringLengthMax})`"
          label-for="txt-string-length"
          description="Number of characters in random string."
        >
          <b-form-input
            id="txt-string-length"
            v-model.number="stringLength"
            type="number"
            :max="stringLengthMax"
          ></b-form-input>
        </b-form-group>
      </b-col>
      <b-col cols="m6">
        <b-form-group
          id="g-allow-characters"
          label-for="chk-g-allowed-character"
          label="Character options"
        >
          <b-form-radio
            v-model="letterMethod"
            name="letter-method"
            value="chooseLetter"
            >Which characters are allowed?</b-form-radio
          >
          <div style="padding-left: 20px">
            <b-form-checkbox-group
              id="chk-g-allowed-character"
              v-model="allowedCharacterSelected"
              :options="charactersType"
              stacked
              :disabled="isCustomLetterMode"
            ></b-form-checkbox-group>
          </div>
          <br />
          <b-form-radio
            v-model="letterMethod"
            name="letter-method"
            value="customLetter"
            >or Input custom characters set</b-form-radio
          >
          <b-form-input
            id="chk-g-custom-character"
            v-model="customLetter"
            :disabled="!isCustomLetterMode"
          ></b-form-input>
        </b-form-group>
      </b-col>
    </b-row>
    <b-form-group>
      <b-button
        id="btn-generate"
        size="sm"
        variant="info"
        @click="generateRandomString"
      >
        Generate
      </b-button>
    </b-form-group>
    <!--eslint-disable-next-line vue/no-v-html-->
    <b-alert variant="info" show v-html="randomString"></b-alert>
  </div>
</template>

<script>
export default {
  data() {
    return {
      randomString: '',
      numOfResult: 6,
      numOfResultMax: 32,
      stringLength: 8,
      stringLengthMax: 64,
      allowedCharacterSelected: ['uppercase', 'lowercase', 'number'],
      letterMethod: 'chooseLetter',
      charactersType: [
        { text: 'Numeric digit (0-9)', value: 'number' },
        { text: 'Uppercase letters (A-Z)', value: 'uppercase' },
        { text: 'Lowercase Letters (a-z)', value: 'lowercase' },
        { text: 'Symbol', value: 'symbol' }
      ],
      characters: {
        uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        lowercase: 'abcdefghijklmnopqrstuvwxyz',
        number: '0123456789',
        symbol: '!@#$%^&*()_+=-[{}]:;\'"/?,.<>\\|'
      },
      customLetter: 'abc'
    }
  },
  computed: {
    isCustomLetterMode() {
      return this.letterMethod === 'customLetter'
    }
  },
  methods: {
    generateRandomString() {
      const characters = this.isCustomLetterMode
        ? this.customLetter
        : this.allowedCharacterSelected
            .map((type) => {
              return this.characters[type]
            })
            .join('')
      this.randomString = Array.apply(
        null,
        Array(Math.max(1, Math.min(this.numOfResultMax, this.numOfResult)))
      )
        .map(() => {
          return Array.apply(
            null,
            Array(
              Math.max(1, Math.min(this.stringLengthMax, this.stringLength))
            )
          )
            .map(() => {
              return characters.charAt(
                Math.floor(Math.random() * characters.length)
              )
            })
            .join('')
        })
        .join('<br />')
    }
  }
}
</script>
