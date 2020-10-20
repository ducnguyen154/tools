<template>
  <div>
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
    <b-form-group
      id="g-allow-characters"
      label="Which characters are allowed?"
      label-for="chk-g-allowed-character"
    >
      <b-form-checkbox-group
        id="chk-g-allowed-character"
        v-model="allowedCharacterSelected"
        :options="charactersType"
        stacked
      ></b-form-checkbox-group>
    </b-form-group>
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
      charactersType: [
        { text: 'Numeric digit (0-9)', value: 'number' },
        { text: 'Uppercase letters (A-Z)', value: 'uppercase' },
        { text: 'Lowercase Letters (a-z)', value: 'lowercase' },
      ],
      characters: {
        uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        lowercase: 'abcdefghijklmnopqrstuvwxyz',
        number: '0123456789',
      },
    }
  },
  methods: {
    generateRandomString() {
      const characters = this.allowedCharacterSelected
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
    },
  },
}
</script>
